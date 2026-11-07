/**
 * A tiny model of a software delivery pipeline, built like a Factorio factory.
 * One sim hour is one working hour; a "day" is 8 of them.
 *
 *   business ─ideas belt→ dev ×3 ─PR belt→ review ×2 ─approved belt→ qa ×2 ─out belt→ silo
 *                          ↑                                                   │
 *                          └──────────────── rework belt (bugs) ←── splitter ──┘
 *
 * Belts have real physics: items move at a fixed speed, keep a minimum gap,
 * and stop when the item in front stops. Inserters grab items that pass their
 * pickup point. A slow station shows up the way it does in the game: a belt
 * that backs up and stands still.
 */
import {
  type Belt as KitBelt,
  atEnd,
  canInsert,
  createBelt,
  divert,
  grab,
  insert,
  merge,
  moveBelt as moveKitBelt,
} from "../factory-kit/belts";
import { random } from "../factory-kit/random";

export type StationId = "business" | "dev" | "review" | "qa" | "ship";
export type MachineId = Exclude<StationId, "ship">;
export type ItemKind = "ticket" | "pr" | "approved" | "bug";
export type BeltId = "ideas" | "prs" | "approved" | "out" | "rework";
export type Era = "2022" | "2026";

export interface Item {
  id: number;
  kind: ItemKind;
  bornAt: number;
  /**
  Hours a machine actually spent working on this item.
  */
  touched: number;
  /**
  A PR with a large blast radius: shared code, data, auth, payments.
  */
  risky?: boolean;
}

export type Belt = KitBelt<BeltId, Item>;

export interface Machine {
  current: Item | null;
  /**
  Finished output waiting for space on the output belt.
  */
  held: Item | null;
  remaining: number;
  duration: number;
}

export interface Station {
  id: MachineId;
  machines: Machine[];
  utilization: number;
  /**
  Smoothed count of items standing in front of this station.
  */
  queue: number;
  completed: number[];
}

export interface Port {
  belt: BeltId;
  d: number;
}

/**
Belt geometry the simulation needs; produced by the layout.
*/
export interface Topology {
  lengths: Record<BeltId, number>;
  machines: Record<MachineId, { pick: Port | null; drop: Port }[]>;
  /**
  Where the filter splitter on the out belt diverts bugs.
  */
  split: number;
  /**
  Where the rework belt side-loads onto the ideas belt.
  */
  merge: number;
}

export type SimEvent =
  | { type: "pick" | "drop"; station: MachineId; index: number; kind: ItemKind }
  | { type: "bug"; index: number }
  | { type: "ship" }
  | { type: "launch" };

export interface SimState {
  time: number;
  era: Era;
  aiAgents: number;
  upgrades: Record<UpgradeId, boolean>;
  stations: Record<MachineId, Station>;
  belts: Record<BeltId, Belt>;
  shippedAt: number[];
  nextId: number;
  seed: number;
  shipped: number;
  leadTimes: number[];
  touchTimes: number[];
  rocketParts: number;
  launches: number;
  events: SimEvent[];
}

export const HOURS_PER_DAY = 8;
export const ROCKET_PARTS = 10;
export const MAX_AI_AGENTS = 2;
/**
World pixels per sim hour. One tile is 20px.
*/
export const BELT_SPEED = 90;
const UTIL_TAU = 12;
const QUEUE_TAU = 6;
const BUG_RATE = 0.25;
const BUG_RATE_WITH_TESTS = 0.1;
const STAT_WINDOW = 48;

/**
Hours per item, per machine. Only dev changes between eras.
*/
export const RECIPES: Record<Era, Record<MachineId, number>> = {
  "2022": { business: 2.4, dev: 12, review: 8, qa: 9 },
  "2026": { business: 2.4, dev: 1.5, review: 8, qa: 9 },
};

export type StageUpgrade = "review" | "qa" | "business";
export type UpgradeId = StageUpgrade | "blast";

/**
Share of PRs that touch something risky enough to need a full human review.
*/
export const RISKY_SHARE = 0.3;
/**
Hours for the quick check a low-risk PR gets under blast-radius review.
*/
export const LOW_RISK_REVIEW_HOURS = 0.5;

/**
 * Process upgrades that speed up one stage each. Turning them on one by one
 * walks the bottleneck around the factory: review, then QA, then business,
 * then back to review.
 */
export const UPGRADES: Record<StageUpgrade, { hours: number }> = {
  review: { hours: 3 },
  qa: { hours: 2 },
  business: { hours: 1.2 },
};

export const MACHINE_IDS: MachineId[] = ["business", "dev", "review", "qa"];
export const STATION_IDS: StationId[] = [...MACHINE_IDS, "ship"];
const BELT_IDS: BeltId[] = ["ideas", "prs", "approved", "out", "rework"];

const OUTPUT: Record<Exclude<MachineId, "qa">, ItemKind> = {
  business: "ticket",
  dev: "pr",
  review: "approved",
};

/**
The input belt in front of each station, i.e. its queue.
*/
export const INPUT_BELTS: Record<Exclude<MachineId, "business">, BeltId[]> = {
  dev: ["ideas", "rework"],
  review: ["prs"],
  qa: ["approved"],
};

export function createSim(era: Era, topo: Topology, seed = 7): SimState {
  const station = (id: MachineId): Station => ({
    id,
    machines: topo.machines[id].map(() => ({ current: null, held: null, remaining: 0, duration: 0 })),
    utilization: 0,
    queue: 0,
    completed: [],
  });
  const belt = (id: BeltId): Belt => createBelt(id, topo.lengths[id]);
  const belts = { ideas: belt("ideas"), prs: belt("prs"), approved: belt("approved"), out: belt("out"), rework: belt("rework") };
  return {
    time: 0,
    era,
    aiAgents: 0,
    upgrades: { review: false, blast: false, qa: false, business: false },
    stations: { business: station("business"), dev: station("dev"), review: station("review"), qa: station("qa") },
    belts,
    shippedAt: [],
    nextId: 1,
    seed,
    shipped: 0,
    leadTimes: [],
    touchTimes: [],
    rocketParts: 0,
    launches: 0,
    events: [],
  };
}

export function beacons(s: SimState): number {
  return s.era === "2026" ? 1 + s.aiAgents : 0;
}

function isUpgrade(id: MachineId): id is StageUpgrade {
  return id in UPGRADES;
}

export function recipeHours(s: SimState, id: MachineId): number {
  if (isUpgrade(id) && s.upgrades[id]) return UPGRADES[id].hours;
  const base = RECIPES[s.era][id];
  return id === "dev" && s.era === "2026" ? base / (1 + s.aiAgents) : base;
}

export function bugRate(s: SimState): number {
  return s.upgrades.qa ? BUG_RATE_WITH_TESTS : BUG_RATE;
}

function craftTime(s: SimState, id: MachineId, item: Item): number {
  const jitter = id === "business" ? 0.6 + random(s) * 0.8 : 0.7 + random(s) * 0.6;
  const bugDiscount = item.kind === "bug" ? 0.5 : 1;
  const quickCheck = id === "review" && s.upgrades.blast && !item.risky;
  const hours = quickCheck ? LOW_RISK_REVIEW_HOURS : recipeHours(s, id);
  return hours * jitter * bugDiscount;
}

// ---------------------------------------------------------------- belts

/**
Out belt: ship what reaches the silo, let the filter splitter divert bugs.
*/
function drainOut(s: SimState, topo: Topology, belt: Belt) {
  const last = atEnd(belt);
  if (last) {
    belt.items.pop();
    ship(s, last.item);
  }
  divert(belt, topo.split, s.belts.rework, 0, (item) => item.kind === "bug");
}

/**
Rework belt: side-load bugs back onto the ideas belt in front of dev.
*/
function drainRework(s: SimState, topo: Topology, belt: Belt) {
  merge(belt, s.belts.ideas, topo.merge);
}

const DRAINS: Partial<Record<BeltId, typeof drainOut>> = { out: drainOut, rework: drainRework };

function moveBelt(s: SimState, topo: Topology, belt: Belt, dt: number) {
  // Bugs wait in front of the filter splitter until the rework belt has room.
  const holdBugs = belt.id === "out" ? (item: Item) => (item.kind === "bug" ? topo.split : undefined) : undefined;
  moveKitBelt(belt, BELT_SPEED * dt, holdBugs);
  DRAINS[belt.id]?.(s, topo, belt);
}

// ---------------------------------------------------------------- machines

function output(s: SimState, id: MachineId, item: Item, index: number): Item {
  if (id === "dev") return { ...item, kind: "pr", risky: random(s) < RISKY_SHARE };
  if (id !== "qa") return { ...item, kind: OUTPUT[id] };
  if (random(s) < bugRate(s)) {
    s.events.push({ type: "bug", index });
    return { ...item, kind: "bug" };
  }
  return item;
}

function dropHeld(s: SimState, id: MachineId, index: number, m: Machine, drop: Port) {
  if (!m.held) return;
  const belt = s.belts[drop.belt];
  if (!canInsert(belt, drop.d)) return;
  insert(belt, m.held, drop.d);
  s.events.push({ type: "drop", station: id, index, kind: m.held.kind });
  m.held = null;
}

function loadNext(s: SimState, id: MachineId, index: number, m: Machine, pick: Port | null) {
  if (m.current || m.held) return;
  const next = pick
    ? grab(s.belts[pick.belt], pick.d)
    : { id: s.nextId++, kind: "ticket" as const, bornAt: s.time, touched: 0 };
  if (!next) return;
  m.current = next;
  m.duration = m.remaining = craftTime(s, id, next);
  if (pick) s.events.push({ type: "pick", station: id, index, kind: next.kind });
}

function runMachine(s: SimState, topo: Topology, id: MachineId, index: number, dt: number) {
  const m = s.stations[id].machines[index]!;
  const ports = topo.machines[id][index]!;
  dropHeld(s, id, index, m, ports.drop);
  loadNext(s, id, index, m, ports.pick);

  if (!m.current) return;
  m.remaining -= dt;
  if (m.remaining > 0) return;

  const item = m.current;
  item.touched += m.duration;
  if (id === "business") item.bornAt = s.time;
  m.current = null;
  m.held = output(s, id, item, index);
  s.stations[id].completed.push(s.time);
}

function ship(s: SimState, item: Item) {
  s.shippedAt.push(s.time);
  s.shipped++;
  s.leadTimes.push(s.time - item.bornAt);
  s.touchTimes.push(item.touched);
  if (s.leadTimes.length > 12) {
    s.leadTimes.shift();
    s.touchTimes.shift();
  }
  s.events.push({ type: "ship" });
  s.rocketParts++;
  if (s.rocketParts < ROCKET_PARTS) return;
  s.rocketParts = 0;
  s.launches++;
  s.events.push({ type: "launch" });
}

function trim(stamps: number[], now: number) {
  while (stamps.length > 0 && stamps[0]! < now - STAT_WINDOW) stamps.shift();
}

function tick(s: SimState, topo: Topology, dt: number) {
  s.time += dt;
  for (const id of MACHINE_IDS) {
    const st = s.stations[id];
    st.machines.forEach((_, i) => runMachine(s, topo, id, i, dt));
    const busy = st.machines.filter((m) => m.current).length / st.machines.length;
    st.utilization += (busy - st.utilization) * Math.min(1, dt / UTIL_TAU);
    trim(st.completed, s.time);
  }
  for (const id of BELT_IDS) moveBelt(s, topo, s.belts[id], dt);
  for (const id of MACHINE_IDS) {
    const st = s.stations[id];
    st.queue += (waiting(s, id) - st.queue) * Math.min(1, dt / QUEUE_TAU);
  }
  trim(s.shippedAt, s.time);
}

export function step(s: SimState, topo: Topology, hours: number) {
  let left = hours;
  while (left > 0) {
    const dt = Math.min(left, 0.04);
    tick(s, topo, dt);
    left -= dt;
  }
}

// ---------------------------------------------------------------- read models

export function perDay(s: SimState, id: StationId): number {
  const window = Math.min(STAT_WINDOW, s.time);
  if (window < 4) return 0;
  const stamps = id === "ship" ? s.shippedAt : s.stations[id].completed;
  return (stamps.length / window) * HOURS_PER_DAY;
}

function average(xs: number[]): number {
  return xs.length === 0 ? 0 : xs.reduce((a, b) => a + b, 0) / xs.length;
}

export function leadTimeDays(s: SimState): number {
  return average(s.leadTimes) / HOURS_PER_DAY;
}

/**
Share of lead time someone was actually working on the item.
*/
export function flowEfficiency(s: SimState): number {
  const lead = average(s.leadTimes);
  return lead === 0 ? 0 : average(s.touchTimes) / lead;
}

export function waiting(s: SimState, id: StationId): number {
  if (id === "business" || id === "ship") return 0;
  return INPUT_BELTS[id].reduce((n, b) => n + s.belts[b].items.filter((bi) => bi.still).length, 0);
}

export type MachineStatus = "working" | "starved" | "blocked";

export function machineStatus(m: Machine): MachineStatus {
  if (m.held) return "blocked";
  if (!m.current) return "starved";
  return "working";
}

export function stationStatus(s: SimState, id: MachineId): MachineStatus {
  const statuses = s.stations[id].machines.map(machineStatus);
  if (statuses.includes("working")) return "working";
  return statuses.includes("blocked") ? "blocked" : "starved";
}

/**
The station with the longest queue, once the queue is long enough to matter.
*/
export function bottleneck(s: SimState): MachineId | null {
  let best: MachineId | null = null;
  let most = 4;
  for (const id of ["dev", "review", "qa"] as const) {
    const q = s.stations[id].queue;
    if (q > most) {
      most = q;
      best = id;
    }
  }
  if (!best && s.time > 24 && Math.max(s.stations.review.queue, s.stations.qa.queue) < 2) return "business";
  return best;
}
