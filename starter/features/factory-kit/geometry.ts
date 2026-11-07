/**
 * Tile grid, belt paths and inserters: the geometry every factory scene is
 * built from. A scene describes its map in tiles; everything here turns that
 * into world pixels.
 */

/**
World units per tile.
*/
export const T = 20;

export interface Point {
  x: number;
  y: number;
}

/**
A rectangle in tiles: top-left tile and size.
*/
export interface TileRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type BeltColor = "yellow" | "red" | "blue" | "green" | "purple";

export interface BeltPath<Id extends string = string> {
  id: Id;
  color: BeltColor;
  points: Point[];
  lengths: number[];
  total: number;
}

export interface Inserter {
  /**
  Centre of the tile the inserter stands on.
  */
  at: Point;
  /**
  Where the hand picks up and drops, in world px.
  */
  from: Point;
  to: Point;
}

export interface Label extends Point {
  align: CanvasTextAlign;
}

/**
Centre of tile (x, y) in world px.
*/
export function tc(x: number, y: number): Point {
  return { x: (x + 0.5) * T, y: (y + 0.5) * T };
}

export function rectPx(r: TileRect) {
  return { x: r.x * T, y: r.y * T, w: r.w * T, h: r.h * T, cx: (r.x + r.w / 2) * T, cy: (r.y + r.h / 2) * T };
}

export type RectPx = ReturnType<typeof rectPx>;

/**
A belt through the centres of the given tiles, in order.
*/
export function beltPath<Id extends string>(id: Id, color: BeltColor, tiles: [number, number][]): BeltPath<Id> {
  const points = tiles.map(([x, y]) => tc(x, y));
  const lengths = [0];
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1]!;
    const b = points[i]!;
    lengths.push(lengths[i - 1]! + Math.hypot(b.x - a.x, b.y - a.y));
  }
  return { id, color, points, lengths, total: lengths.at(-1)! };
}

export function pointAt(p: BeltPath, d: number): Point & { angle: number } {
  const dist = Math.max(0, Math.min(p.total, d));
  for (let i = 1; i < p.points.length; i++) {
    if (dist <= p.lengths[i]! || i === p.points.length - 1) {
      const a = p.points[i - 1]!;
      const b = p.points[i]!;
      const seg = p.lengths[i]! - p.lengths[i - 1]!;
      const k = seg === 0 ? 0 : (dist - p.lengths[i - 1]!) / seg;
      return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k, angle: Math.atan2(b.y - a.y, b.x - a.x) };
    }
  }
  return { ...p.points[0]!, angle: 0 };
}

/**
Distance along a belt to the point closest to tile (x, y).
*/
export function distanceTo(p: BeltPath, x: number, y: number): number {
  const target = tc(x, y);
  let best = 0;
  let bestDist = Infinity;
  for (let d = 0; d <= p.total; d += 1) {
    const q = pointAt(p, d);
    const dist = Math.hypot(q.x - target.x, q.y - target.y);
    if (dist < bestDist) {
      bestDist = dist;
      best = d;
    }
  }
  return best;
}

export function inserter(at: [number, number], from: [number, number], to: [number, number]): Inserter {
  return { at: tc(...at), from: tc(...from), to: tc(...to) };
}

/**
True when world point p lies inside tile rect r, grown by pad tiles.
*/
export function insideRect(r: TileRect, p: Point, pad = 0.2): boolean {
  return p.x >= (r.x - pad) * T && p.x <= (r.x + r.w + pad) * T && p.y >= (r.y - pad) * T && p.y <= (r.y + r.h + pad) * T;
}
