/**
 * The static ground layer: desert, concrete, hazard stripes, water, trees.
 * Painted once into an offscreen canvas and blitted every frame.
 */
import { type BeltPath, type TileRect, pointAt, rectPx, T } from "../geometry";
import { circle } from "./primitives";

/**
What the ground painter needs to know about a map.
*/
export interface Ground {
  /**
  Map size in world px.
  */
  width: number;
  height: number;
  concrete: TileRect[];
  hazard: TileRect[];
  belts: BeltPath[];
  /**
  Extra areas where no trees or rocks may grow, grown by `pad` tiles.
  */
  keepClear: { rect: TileRect; pad?: number }[];
}

export function blockedGrid(ground: Ground): boolean[][] {
  const cols = Math.ceil(ground.width / T);
  const rows = Math.ceil(ground.height / T);
  const grid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => false));
  const block = (r: TileRect, pad = 0) => {
    for (let y = r.y - pad; y < r.y + r.h + pad; y++) {
      for (let x = r.x - pad; x < r.x + r.w + pad; x++) {
        if (grid[y]?.[x] !== undefined) grid[y]![x] = true;
      }
    }
  };
  ground.concrete.forEach((r) => block(r));
  ground.hazard.forEach((r) => block(r));
  ground.keepClear.forEach(({ rect, pad }) => block(rect, pad));
  for (const b of ground.belts) {
    for (let d = 0; d <= b.total; d += T / 2) {
      const p = pointAt(b, d);
      block({ x: Math.floor(p.x / T), y: Math.floor(p.y / T), w: 1, h: 1 }, 1);
    }
  }
  return grid;
}

export function paintTerrain(g: CanvasRenderingContext2D, ground: Ground, rnd: () => number) {
  const { width: w, height: h } = ground;
  g.fillStyle = "#8f5d2d";
  g.fillRect(0, 0, w, h);
  for (let i = 0; i < 40; i++) {
    const x = rnd() * w;
    const y = rnd() * h;
    const r = 30 + rnd() * 130;
    const grad = g.createRadialGradient(x, y, 0, x, y, r);
    const dark = rnd() > 0.5;
    grad.addColorStop(0, dark ? "rgba(84,48,18,0.4)" : "rgba(196,134,72,0.3)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grad;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  }
  for (let i = 0; i < (w * h) / 40; i++) {
    g.fillStyle =
      rnd() < 0.5 ? `rgba(60,34,12,${0.12 + rnd() * 0.28})` : `rgba(222,160,96,${0.1 + rnd() * 0.22})`;
    const s = 0.8 + rnd() * 1.8;
    g.fillRect(rnd() * w, rnd() * h, s, s);
  }
}

/**
Stone-brick paving like the game's stone path: staggered bricks of mixed grey
with dark grout, chipped corners and a lit top edge.
*/
function paintBricks(g: CanvasRenderingContext2D, r: TileRect, rnd: () => number) {
  const p = rectPx(r);
  g.fillStyle = "#4a4743";
  g.fillRect(p.x, p.y, p.w, p.h);
  const rowH = T / 2;
  for (let row = 0; row * rowH < p.h; row++) {
    const y = p.y + row * rowH;
    let x = p.x - (row % 2 ? rnd() * 8 : 0);
    while (x < p.x + p.w) {
      const bw = 11 + rnd() * 13;
      const x0 = Math.max(x, p.x);
      const x1 = Math.min(x + bw, p.x + p.w);
      const v = 88 + rnd() * 18;
      const warm = rnd() * 6;
      g.fillStyle = `rgb(${v + warm},${v + warm * 0.5 - 1},${v - 4})`;
      g.beginPath();
      g.roundRect(x0 + 0.5, y + 0.5, x1 - x0 - 1, rowH - 1, 1.5);
      g.fill();
      g.fillStyle = "rgba(255,250,240,0.07)";
      g.fillRect(x0 + 1.2, y + 0.8, x1 - x0 - 2.4, 1);
      g.fillStyle = "rgba(0,0,0,0.14)";
      g.fillRect(x0 + 1, y + rowH - 1.8, x1 - x0 - 2, 1);
      for (let k = 0; k < 4; k++) {
        g.fillStyle = rnd() < 0.5 ? "rgba(0,0,0,0.16)" : "rgba(255,255,255,0.07)";
        g.fillRect(x0 + rnd() * (x1 - x0), y + 1 + rnd() * (rowH - 2), 1, 1);
      }
      x += bw;
    }
  }
  // grime where the stone meets the dirt
  g.strokeStyle = "rgba(20,12,4,0.55)";
  g.lineWidth = 2;
  g.strokeRect(p.x + 1, p.y + 1, p.w - 2, p.h - 2);
}

export function paintFloor(g: CanvasRenderingContext2D, ground: Ground, rnd: () => number) {
  for (const r of ground.concrete) {
    const p = rectPx(r);
    g.fillStyle = "rgba(20,12,4,0.35)";
    g.fillRect(p.x - 1, p.y - 1, p.w + 2, p.h + 2);
  }
  for (const r of ground.concrete) paintBricks(g, r, rnd);
  for (const r of ground.hazard) {
    const p = rectPx(r);
    g.save();
    g.beginPath();
    g.rect(p.x, p.y, p.w, p.h);
    g.clip();
    g.fillStyle = "#c79b1c";
    g.fillRect(p.x, p.y, p.w, p.h);
    g.strokeStyle = "#252220";
    g.lineWidth = 7;
    for (let d = -p.h; d < p.w + p.h; d += 16) {
      const path3 = new Path2D();
      path3.moveTo(p.x + d, p.y);
      path3.lineTo(p.x + d + p.h, p.y + p.h);
      g.stroke(path3);
    }
    for (let y = r.y; y < r.y + r.h; y++) {
      for (let x = r.x; x < r.x + r.w; x++) {
        g.fillStyle = "rgba(0,0,0,0.2)";
        g.fillRect(x * T + T - 1, y * T, 1, T);
        g.fillRect(x * T, y * T + T - 1, T, 1);
      }
    }
    g.restore();
  }
}

export function paintPond(g: CanvasRenderingContext2D, pond: TileRect, rnd: () => number) {
  const p = rectPx(pond);
  const blobs = Array.from({ length: 7 }, () => ({
    x: p.x + 18 + rnd() * (p.w - 36),
    y: p.y + 18 + rnd() * (p.h - 36),
    r: 18 + rnd() * 16,
  }));
  const layer = (color: string, grow: number) => {
    g.fillStyle = color;
    for (const b of blobs) {
      circle(g, b.x, b.y, b.r + grow);
      g.fill();
    }
  };
  layer("#6a4521", 6);
  layer("#2f5f80", 2);
  layer("#244b6a", -2);
  layer("#1d3d58", -9);
  g.strokeStyle = "rgba(180,220,255,0.25)";
  g.lineWidth = 1;
  for (let i = 0; i < 12; i++) {
    const x = p.x + 20 + rnd() * (p.w - 40);
    const y = p.y + 20 + rnd() * (p.h - 40);
    const path4 = new Path2D();
    path4.moveTo(x, y);
    path4.lineTo(x + 6 + rnd() * 6, y);
    g.stroke(path4);
  }
}

export function paintTree(g: CanvasRenderingContext2D, x: number, y: number, size: number, rnd: () => number) {
  g.fillStyle = "rgba(25,12,0,0.35)";
  g.beginPath();
  g.ellipse(x + size * 0.9, y + size * 0.35, size * 1.1, size * 0.55, 0.3, 0, Math.PI * 2);
  g.fill();
  if (rnd() < 0.3) {
    // dead desert tree
    g.strokeStyle = "#4b3420";
    g.lineCap = "round";
    for (let i = 0; i < 5; i++) {
      const a = rnd() * Math.PI * 2;
      g.lineWidth = 2 - i * 0.2;
      const path5 = new Path2D();
      path5.moveTo(x, y);
      path5.lineTo(x + Math.cos(a) * size, y + Math.sin(a) * size);
      g.stroke(path5);
    }
    return;
  }
  const greens = ["#3b5120", "#4d6a27", "#5f7f2e", "#7a9636"];
  for (let layer = 0; layer < 4; layer++) {
    g.fillStyle = greens[layer]!;
    const n = 6 - layer;
    for (let i = 0; i < n; i++) {
      const a = rnd() * Math.PI * 2;
      const d = rnd() * size * (0.55 - layer * 0.1);
      circle(g, x + Math.cos(a) * d - layer, y + Math.sin(a) * d - layer * 1.2, size * (0.5 - layer * 0.08));
      g.fill();
    }
  }
}

export function paintRock(g: CanvasRenderingContext2D, x: number, y: number, s: number, rnd: () => number) {
  g.fillStyle = "rgba(25,12,0,0.35)";
  g.beginPath();
  g.ellipse(x + s * 0.5, y + s * 0.3, s, s * 0.6, 0, 0, Math.PI * 2);
  g.fill();
  const base = 110 + rnd() * 30;
  g.fillStyle = `rgb(${base},${base - 8},${base - 18})`;
  g.beginPath();
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2;
    const r = s * (0.75 + rnd() * 0.3);
    g.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r * 0.75);
  }
  g.closePath();
  g.fill();
  g.fillStyle = "rgba(255,255,255,0.18)";
  g.beginPath();
  g.ellipse(x - s * 0.2, y - s * 0.25, s * 0.45, s * 0.25, -0.4, 0, Math.PI * 2);
  g.fill();
}

export function paintNature(g: CanvasRenderingContext2D, ground: Ground, rnd: () => number) {
  const grid = blockedGrid(ground);
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y]!.length; x++) {
      if (grid[y]![x]) continue;
      const roll = rnd();
      const px = (x + rnd()) * T;
      const py = (y + rnd()) * T;
      if (roll < 0.1) {
        paintTree(g, px, py, 8 + rnd() * 7, rnd);
        continue;
      }
      if (roll < 0.15) {
        paintRock(g, px, py, 3 + rnd() * 5, rnd);
        continue;
      }
      if (roll < 0.3) {
        g.strokeStyle = rnd() > 0.5 ? "rgba(98,118,40,0.8)" : "rgba(140,140,60,0.7)";
        g.lineWidth = 1;
        for (let k = 0; k < 4; k++) {
          const path6 = new Path2D();
          path6.moveTo(px, py);
          path6.lineTo(px + (rnd() - 0.5) * 7, py - 2 - rnd() * 5);
          g.stroke(path6);
        }
      }
    }
  }
}

