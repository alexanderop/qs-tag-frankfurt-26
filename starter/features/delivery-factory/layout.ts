import {
  type BeltPath as KitBeltPath,
  type Inserter,
  type Label,
  type Point,
  type TileRect,
  beltPath,
  distanceTo,
  insideRect,
  inserter,
  T,
  tc,
} from "../factory-kit/geometry";
import type { BeltId, MachineId, Port, StationId, Topology } from "./sim";

export type BeltPath = KitBeltPath<BeltId>;

export interface MachineSpot {
  rect: TileRect;
  input: Inserter | null;
  output: Inserter;
  pick: Port | null;
  drop: Port;
}

export interface Layout {
  width: number;
  height: number;
  belts: Record<BeltId, BeltPath>;
  machines: Record<MachineId, MachineSpot[]>;
  silo: TileRect;
  siloInserter: Inserter;
  splitter: TileRect;
  beacons: TileRect[];
  labels: Record<StationId, Label>;
  power: { pond: TileRect; pump: Point; boiler: TileRect; engines: TileRect[]; label: Label };
  poles: Point[];
  decor: { radar: TileRect; solar: TileRect[]; chests: Point[]; lamps: Point[] };
  concrete: TileRect[];
  hazard: TileRect[];
  topology: Topology;
}

function build(): Layout {
  const belts: Record<BeltId, BeltPath> = {
    ideas: beltPath("ideas", "yellow", [[6, 6], [10, 6], [10, 10], [21, 10]]),
    prs: beltPath("prs", "red", [[13, 4], [47, 4], [47, 16], [35, 16]]),
    approved: beltPath("approved", "blue", [[40, 22], [19, 22]]),
    out: beltPath("out", "yellow", [[25, 28], [4, 28], [4, 26]]),
    rework: beltPath("rework", "yellow", [[11, 27], [11, 11]]),
  };

  const machines: Record<MachineId, MachineSpot[]> = {
    business: [
      {
        rect: { x: 2, y: 5, w: 3, h: 3 },
        input: null,
        output: inserter([5, 6], [4, 6], [6, 6]),
        pick: null,
        drop: { belt: "ideas", d: 0 },
      },
    ],
    dev: [13, 17, 21].map((cx) => ({
      rect: { x: cx - 1, y: 6, w: 3, h: 3 },
      input: inserter([cx, 9], [cx, 10], [cx, 8]),
      output: inserter([cx, 5], [cx, 6], [cx, 4]),
      pick: { belt: "ideas" as const, d: distanceTo(belts.ideas, cx, 10) },
      drop: { belt: "prs" as const, d: distanceTo(belts.prs, cx, 4) },
    })),
    review: [39, 35].map((cx) => ({
      rect: { x: cx - 1, y: 18, w: 3, h: 3 },
      input: inserter([cx, 17], [cx, 16], [cx, 18]),
      output: inserter([cx, 21], [cx, 20], [cx, 22]),
      pick: { belt: "prs" as const, d: distanceTo(belts.prs, cx, 16) },
      drop: { belt: "approved" as const, d: distanceTo(belts.approved, cx, 22) },
    })),
    qa: [23, 19].map((cx) => ({
      rect: { x: cx - 1, y: 24, w: 3, h: 3 },
      input: inserter([cx, 23], [cx, 22], [cx, 24]),
      output: inserter([cx, 27], [cx, 26], [cx, 28]),
      pick: { belt: "approved" as const, d: distanceTo(belts.approved, cx, 22) },
      drop: { belt: "out" as const, d: distanceTo(belts.out, cx, 28) },
    })),
  };

  const ports = (id: MachineId) => machines[id].map(({ pick, drop }) => ({ pick, drop }));
  const topology: Topology = {
    lengths: {
      ideas: belts.ideas.total,
      prs: belts.prs.total,
      approved: belts.approved.total,
      out: belts.out.total,
      rework: belts.rework.total,
    },
    machines: { business: ports("business"), dev: ports("dev"), review: ports("review"), qa: ports("qa") },
    split: distanceTo(belts.out, 12, 28),
    merge: distanceTo(belts.ideas, 11, 10),
  };

  return {
    width: 50 * T,
    height: 30 * T,
    belts,
    machines,
    silo: { x: 1, y: 18, w: 7, h: 7 },
    siloInserter: inserter([4, 25], [4, 26], [4, 24]),
    splitter: { x: 12, y: 27, w: 1, h: 2 },
    beacons: [12, 16, 20].map((x) => ({ x, y: 11, w: 3, h: 3 })),
    labels: {
      business: { x: 3.5 * T, y: 4.1 * T, align: "center" },
      dev: { x: 17.5 * T, y: 2.3 * T, align: "center" },
      review: { x: 41.4 * T, y: 19.5 * T, align: "left" },
      qa: { x: 16.6 * T, y: 25.5 * T, align: "right" },
      ship: { x: 4.5 * T, y: 16.9 * T, align: "center" },
    },
    power: {
      pond: { x: 25, y: 9, w: 5, h: 5 },
      pump: tc(30, 11),
      boiler: { x: 31, y: 10, w: 3, h: 2 },
      engines: [
        { x: 34, y: 9, w: 5, h: 3 },
        { x: 39, y: 9, w: 5, h: 3 },
      ],
      label: { x: 38.5 * T, y: 7.4 * T, align: "center" },
    },
    poles: [
      tc(8, 3),
      tc(15, 2),
      tc(24, 7),
      tc(31, 7),
      tc(44, 7),
      tc(44, 13),
      tc(37, 15),
      tc(31, 19),
      tc(27, 24),
      tc(16, 23),
      tc(9, 22),
      tc(8, 13),
    ],
    decor: {
      radar: { x: 26, y: 16, w: 3, h: 3 },
      solar: [21, 24, 27].flatMap((y) => [43, 46].map((x) => ({ x, y, w: 3, h: 3 }))),
      chests: [tc(16, 17), tc(17, 17), tc(19, 17), tc(20, 17), tc(16, 18), tc(17, 18)],
      lamps: [tc(7, 9), tc(15, 9), tc(19, 9), tc(23, 12), tc(32, 18), tc(30, 23), tc(16, 27), tc(8, 15)],
    },
    concrete: [
      { x: 1, y: 2, w: 23, h: 13 },
      { x: 15, y: 15, w: 28, h: 15 },
      { x: 9, y: 22, w: 6, h: 8 },
    ],
    hazard: [{ x: 0, y: 17, w: 9, h: 13 }],
    topology,
  };
}

export const LAYOUT = build();

export function hitStation(layout: Layout, p: Point): StationId | null {
  const inside = (r: TileRect) => insideRect(r, p);
  for (const id of ["business", "dev", "review", "qa"] as const) {
    if (layout.machines[id].some((m) => inside(m.rect))) return id;
  }
  if (layout.beacons.some((b) => inside(b))) return "dev";
  if (inside(layout.silo)) return "ship";
  return null;
}
