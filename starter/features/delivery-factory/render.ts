import { type TileRect, pointAt, rectPx } from "../factory-kit/geometry";
import { drawBelt, drawSplitter } from "../factory-kit/draw/belts";
import { drawChest, drawLamp, drawPoles, drawRadar, drawSolar } from "../factory-kit/draw/decor";
import { type Ground, paintFloor, paintNature, paintPond, paintTerrain } from "../factory-kit/draw/ground";
import { type Swing, drawInserter } from "../factory-kit/draw/inserter";
import { drawItem } from "../factory-kit/draw/items";
import {
  drawAssembler,
  drawBeacon,
  drawChemPlant,
  drawLab,
  drawRocket,
  drawSilo,
  LAUNCH_SECONDS,
} from "../factory-kit/draw/machines";
import {
  type Floater,
  type LabelTone,
  type Particle,
  altIcon,
  drawFloaters,
  drawLabel,
  drawSmoke,
  selection,
  statusIcon,
  upgradeBadge,
} from "../factory-kit/draw/overlay";
import { circle, paintShadow, plate, rr, seeded, workGlow } from "../factory-kit/draw/primitives";
import type { Layout } from "./layout";
import {
  type ItemKind,
  type MachineId,
  type SimState,
  type StationId,
  beacons,
  bottleneck,
  machineStatus,
  MACHINE_IDS,
  STATION_IDS,
  ROCKET_PARTS,
  waiting,
} from "./sim";

// ================================================================ view state

/**
Everything the renderer owns that the simulation does not care about.
*/
export interface View {
  /**
  Seconds of animation time; frozen while paused.
  */
  clock: number;
  /**
  Distance the belt surfaces have scrolled, in world px.
  */
  beltPhase: number;
  selected: StationId | null;
  hovered: StationId | null;
  spin: number;
  swings: Record<string, Swing>;
  idle: Record<string, number>;
  smoke: Particle[];
  floaters: Floater[];
  launchAt: number | null;
  nextPuff: number;
}

export function createView(): View {
  return {
    clock: 0,
    beltPhase: 0,
    selected: null,
    hovered: null,
    spin: 0,
    swings: {},
    idle: {},
    smoke: [],
    floaters: [],
    launchAt: null,
    nextPuff: 0,
  };
}

export const STATION_COLORS: Record<StationId, string> = {
  business: "#b36bff",
  dev: "#3fb6f5",
  review: "#f5a524",
  qa: "#5bd16b",
  ship: "#e8e8e8",
};

export const STATION_NAMES: Record<StationId, string> = {
  business: "Business",
  dev: "Dev + AI",
  review: "Code review",
  qa: "QA & testing",
  ship: "Release",
};

const RECIPE_ICON: Record<MachineId, ItemKind> = {
  business: "ticket",
  dev: "pr",
  review: "approved",
  qa: "approved",
};


// ================================================================ static layer

function paintPipes(g: CanvasRenderingContext2D, layout: Layout) {
  const pump = layout.power.pump;
  const boiler = rectPx(layout.power.boiler);
  g.strokeStyle = "#1b1c1e";
  g.lineWidth = 9;
  g.lineCap = "butt";
  g.beginPath();
  g.moveTo(pump.x, pump.y);
  g.lineTo(boiler.x, pump.y);
  g.stroke();
  g.strokeStyle = "#6f7378";
  g.lineWidth = 7;
  g.stroke();
  g.strokeStyle = "rgba(255,255,255,0.25)";
  g.lineWidth = 1.5;
  g.beginPath();
  g.moveTo(pump.x, pump.y - 2);
  g.lineTo(boiler.x, pump.y - 2);
  g.stroke();
}

export function paintStatic(layout: Layout, pixelScale: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = Math.max(1, Math.ceil(layout.width * pixelScale));
  c.height = Math.max(1, Math.ceil(layout.height * pixelScale));
  const g = c.getContext("2d")!;
  g.scale(pixelScale, pixelScale);
  const rnd = seeded(20_261_008);
  const ground: Ground = {
    width: layout.width,
    height: layout.height,
    concrete: layout.concrete,
    hazard: layout.hazard,
    belts: Object.values(layout.belts),
    keepClear: [
      { rect: layout.power.pond, pad: 1 },
      { rect: { x: 30, y: 8, w: 15, h: 5 } },
      ...layout.decor.solar.map((rect) => ({ rect, pad: 1 })),
    ],
  };

  paintTerrain(g, ground, rnd);
  paintFloor(g, ground, rnd);
  paintPond(g, layout.power.pond, rnd);
  paintNature(g, ground, rnd);

  for (const id of MACHINE_IDS) {
    for (const m of layout.machines[id]) {
      const p = rectPx(m.rect);
      paintShadow(g, p.x, p.y, p.w, p.h, 16);
    }
  }
  const silo = rectPx(layout.silo);
  paintShadow(g, silo.x + 6, silo.y + 6, silo.w - 12, silo.h - 12, 20);
  for (const r of [layout.power.boiler, ...layout.power.engines]) {
    const p = rectPx(r);
    paintShadow(g, p.x, p.y, p.w, p.h, 12);
  }
  for (const r of [layout.decor.radar, ...layout.decor.solar]) {
    const p = rectPx(r);
    paintShadow(g, p.x + 2, p.y + 2, p.w - 4, p.h - 4, 8);
  }
  paintPipes(g, layout);
  for (const pole of layout.poles) {
    g.strokeStyle = "rgba(10,6,2,0.4)";
    g.lineWidth = 3;
    const path8 = new Path2D();
    path8.moveTo(pole.x, pole.y + 3);
    path8.lineTo(pole.x + 26, pole.y + 10);
    g.stroke(path8);
  }
  return c;
}

// ================================================================ dynamic layer

/**
Orange dot on PRs with a big blast radius: only these get a full review.
*/
function riskMark(g: CanvasRenderingContext2D, x: number, y: number) {
  g.fillStyle = "#ff8a1c";
  g.strokeStyle = "#1a0c00";
  g.lineWidth = 1;
  circle(g, x + 4, y - 4.5, 2.6);
  g.fill();
  g.stroke();
}

function drawBeltItems(g: CanvasRenderingContext2D, sim: SimState, layout: Layout) {
  for (const belt of Object.values(sim.belts)) {
    const path = layout.belts[belt.id];
    for (const bi of belt.items) {
      const p = pointAt(path, bi.d);
      drawItem(g, bi.item.kind, p.x, p.y - 0.5);
      if (sim.upgrades.blast && bi.item.risky && bi.item.kind === "pr") riskMark(g, p.x, p.y);
    }
  }
}
function drawPowerPlant(g: CanvasRenderingContext2D, layout: Layout, view: View, running: boolean) {
  const { pump, boiler, engines } = layout.power;
  // offshore pump
  plate(g, pump.x - 8, pump.y - 7, 16, 14, "#7b5a2c", 3);
  g.fillStyle = "#d3a12a";
  circle(g, pump.x, pump.y, 3.5);
  g.fill();

  // boiler with a flickering firebox
  const b = rectPx(boiler);
  plate(g, b.x + 1, b.y + 1, b.w - 2, b.h - 2, "#4a3f37", 5);
  const flick = running ? 0.6 + Math.random() * 0.4 : 0.2;
  const fire = g.createRadialGradient(b.cx, b.cy + 4, 1, b.cx, b.cy + 4, 14);
  fire.addColorStop(0, `rgba(255,230,120,${flick})`);
  fire.addColorStop(0.6, `rgba(255,110,20,${flick * 0.8})`);
  fire.addColorStop(1, "rgba(80,20,0,0)");
  rr(g, b.cx - 12, b.cy - 1, 24, 10, 2);
  g.fillStyle = "#1a0e08";
  g.fill();
  g.fillStyle = fire;
  g.fill();
  plate(g, b.x + b.w - 16, b.y - 6, 10, 12, "#2d2a28", 2);

  // steam engines with spinning flywheels
  for (const e of engines) {
    const p = rectPx(e);
    plate(g, p.x + 1, p.y + 1, p.w - 2, p.h - 2, "#41464b", 4);
    const cyl = g.createLinearGradient(p.x, p.cy - 13, p.x, p.cy + 13);
    cyl.addColorStop(0, "#b2b7bc");
    cyl.addColorStop(0.5, "#6c7176");
    cyl.addColorStop(1, "#3c4044");
    rr(g, p.x + 8, p.cy - 12, p.w - 40, 24, 10);
    g.fillStyle = cyl;
    g.fill();
    g.strokeStyle = "#17191b";
    g.lineWidth = 1.2;
    g.stroke();
    const wx = p.x + p.w - 18;
    g.fillStyle = "#1b1d1f";
    circle(g, wx, p.cy, 13);
    g.fill();
    g.save();
    g.translate(wx, p.cy);
    g.rotate(view.spin * 2.4);
    g.strokeStyle = "#9aa0a6";
    g.lineWidth = 2;
    g.beginPath();
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      g.moveTo(0, 0);
      g.lineTo(Math.cos(a) * 11, Math.sin(a) * 11);
    }
    g.stroke();
    circle(g, 0, 0, 11);
    g.stroke();
    g.restore();
    const rod = Math.sin(view.spin * 2.4) * 5;
    g.strokeStyle = "#cfd3d6";
    g.lineWidth = 2.5;
    const path11 = new Path2D();
    path11.moveTo(p.x + p.w - 34, p.cy);
    path11.lineTo(wx - 4 + rod, p.cy + Math.cos(view.spin * 2.4) * 5);
    g.stroke(path11);
  }

  if (running && view.clock > view.nextPuff) {
    view.nextPuff = view.clock + 0.12;
    view.smoke.push({
      x: b.x + b.w - 11,
      y: b.y - 6,
      vx: 14 + Math.random() * 10,
      vy: -14 - Math.random() * 8,
      r: 3 + Math.random() * 2,
      born: view.clock,
      life: 2.4,
      shade: 70,
    });
  }
}
function drawDecor(g: CanvasRenderingContext2D, layout: Layout, clock: number) {
  layout.decor.solar.forEach((r) => drawSolar(g, r));
  drawRadar(g, layout.decor.radar, clock);
  layout.decor.chests.forEach((c) => drawChest(g, c));
  layout.decor.lamps.forEach((l) => drawLamp(g, l, clock));
}
// ================================================================ public

/**
Turn simulation events into one-shot visuals.
*/
export function consumeEvents(sim: SimState, view: View, layout: Layout) {
  for (const e of sim.events) {
    if (e.type === "pick") view.swings[`${e.station}-${e.index}-in`] = { at: view.clock, kind: e.kind };
    if (e.type === "drop") view.swings[`${e.station}-${e.index}-out`] = { at: view.clock, kind: e.kind };
    if (e.type === "bug") {
      const p = rectPx(layout.machines.qa[e.index]!.rect);
      view.floaters.push({ text: "bug found!", color: "#ff6b5b", x: p.cx, y: p.y - 6, born: view.clock });
    }
    if (e.type === "ship") {
      const p = rectPx(layout.silo);
      view.swings.silo = { at: view.clock, kind: "approved" };
      view.floaters.push({ text: "+1 shipped", color: "#7dff8a", x: p.cx, y: p.y + 14, born: view.clock });
    }
    if (e.type === "launch") view.launchAt = view.clock;
  }
  sim.events.length = 0;
}

export function advanceView(sim: SimState, view: View, dt: number, beltPxPerSecond: number) {
  view.clock += dt;
  view.beltPhase += dt * beltPxPerSecond;
  view.spin += dt * 2.2;
  for (const id of MACHINE_IDS) {
    sim.stations[id].machines.forEach((m, i) => {
      const key = `${id}-${i}`;
      view.idle[key] = machineStatus(m) === "working" ? 0 : (view.idle[key] ?? 0) + dt;
    });
  }
  if (view.launchAt !== null && view.clock - view.launchAt > LAUNCH_SECONDS) view.launchAt = null;
}

/**
What a starved machine is waiting for.
*/
const INPUT_ICON: Record<MachineId, ItemKind> = {
  business: "ticket",
  dev: "ticket",
  review: "pr",
  qa: "approved",
};

function drawMachine(g: CanvasRenderingContext2D, sim: SimState, view: View, id: MachineId, rect: TileRect, i: number) {
  const m = sim.stations[id].machines[i]!;
  const working = m.current !== null;
  const progress = working ? 1 - m.remaining / m.duration : 0;
  if (id === "business") {
    drawLab(g, rect, progress, view.clock);
    return;
  }
  if (id === "qa") {
    drawChemPlant(g, rect, working, progress, view.clock);
    return;
  }
  const speed = id === "dev" ? 3 + beacons(sim) * 1.5 : 1.6;
  const spin = working ? view.clock * speed + i : i;
  // -1 hides the module slots; dev shows two speed modules once AI is on.
  const aiModules = sim.era === "2026" ? 2 : 0;
  const modules = id === "dev" ? aiModules : -1;
  drawAssembler(g, rect, STATION_COLORS[id], working, progress, spin, view.clock, modules);
}

function drawMachines(g: CanvasRenderingContext2D, layout: Layout, sim: SimState, view: View) {
  for (const id of MACHINE_IDS) {
    layout.machines[id].forEach((spot, i) => drawMachine(g, sim, view, id, spot.rect, i));
  }
  drawSilo(g, layout.silo, view, sim.rocketParts, ROCKET_PARTS);
  for (const id of MACHINE_IDS) {
    layout.machines[id].forEach((spot, i) => {
      if (spot.input) drawInserter(g, spot.input, view.swings[`${id}-${i}-in`], view.clock);
      drawInserter(g, spot.output, view.swings[`${id}-${i}-out`], view.clock);
    });
  }
  drawInserter(g, layout.siloInserter, view.swings.silo, view.clock);
}

function isUpgraded(sim: SimState, id: MachineId): boolean {
  if (id === "review") return sim.upgrades.review || sim.upgrades.blast;
  return id !== "dev" && sim.upgrades[id];
}

function drawMachineIcons(g: CanvasRenderingContext2D, layout: Layout, sim: SimState, view: View) {
  for (const id of MACHINE_IDS) {
    layout.machines[id].forEach((spot, i) => {
      altIcon(g, spot.rect, RECIPE_ICON[id]);
      if (isUpgraded(sim, id)) upgradeBadge(g, spot.rect);
      const status = machineStatus(sim.stations[id].machines[i]!);
      if (status === "working" || (view.idle[`${id}-${i}`] ?? 0) <= 0.5) return;
      const icon = status === "starved" ? INPUT_ICON[id] : RECIPE_ICON[id];
      statusIcon(g, spot.rect, status, icon, view.clock);
    });
  }
}

function labelTone(view: View, hot: StationId | null, id: StationId): LabelTone {
  if (view.selected === id) return "selected";
  return hot === id ? "hot" : "plain";
}

function drawLabels(g: CanvasRenderingContext2D, layout: Layout, sim: SimState, view: View) {
  const hot = bottleneck(sim);
  for (const id of STATION_IDS) {
    const n = waiting(sim, id);
    const text = n > 0 ? `${STATION_NAMES[id]} · ${n} waiting` : STATION_NAMES[id];
    drawLabel(g, layout.labels[id], text, labelTone(view, hot, id));
  }
  drawLabel(g, layout.power.label, "Coffee (power plant)", "plain");
}

function drawBeaconLight(g: CanvasRenderingContext2D, layout: Layout, sim: SimState, view: View) {
  const built = beacons(sim);
  layout.beacons.forEach((b, i) => drawBeacon(g, b, i < built, view.clock, i));
  // beacon light washing over the dev machines
  layout.machines.dev.slice(0, built).forEach(m => {
    const p = rectPx(m.rect);
    workGlow(g, p.cx, p.cy + 20, 40, "#5a96ff", true, view.clock);
  });
}

function stationRects(layout: Layout, id: StationId): TileRect[] {
  return id === "ship" ? [layout.silo] : layout.machines[id].map((m) => m.rect);
}

export function render(
  g: CanvasRenderingContext2D,
  ground: HTMLCanvasElement,
  layout: Layout,
  sim: SimState,
  view: View,
  running: boolean,
) {
  g.drawImage(ground, 0, 0, layout.width, layout.height);
  for (const belt of Object.values(layout.belts)) drawBelt(g, belt, view.beltPhase);
  drawSplitter(g, layout.splitter);
  drawBeltItems(g, sim, layout);
  drawBeaconLight(g, layout, sim, view);
  drawDecor(g, layout, view.clock);
  drawPowerPlant(g, layout, view, running);
  drawMachines(g, layout, sim, view);
  drawMachineIcons(g, layout, sim, view);
  drawPoles(g, layout.poles);
  drawSmoke(g, view);
  drawRocket(g, layout.silo, view);
  drawLabels(g, layout, sim, view);
  if (view.hovered && view.hovered !== view.selected) selection(g, stationRects(layout, view.hovered), "rgba(255,255,255,0.85)", 0);
  if (view.selected) selection(g, stationRects(layout, view.selected), "#ff6bed", view.clock);
  drawFloaters(g, view);
}
