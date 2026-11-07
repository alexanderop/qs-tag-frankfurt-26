/**
 * Small canvas helpers every factory sprite is built from.
 */
import { type RectPx, type TileRect, rectPx } from "../geometry";

export const FONT = "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";

export function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16_807) % 2_147_483_647;
    return (s - 1) / 2_147_483_646;
  };
}

export function rr(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath();
  g.roundRect(x, y, w, h, r);
}

export function circle(g: CanvasRenderingContext2D, x: number, y: number, r: number) {
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
}

export function bolts(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, inset: number) {
  g.fillStyle = "#a9afb5";
  for (const [bx, by] of [
    [x + inset, y + inset],
    [x + w - inset, y + inset],
    [x + inset, y + h - inset],
    [x + w - inset, y + h - inset],
  ] as const) {
    circle(g, bx, by, 1.3);
    g.fill();
  }
}

/**
Metal plate with a light top-left edge and a dark bottom-right edge.
*/
export function plate(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, base: string, r = 4) {
  rr(g, x, y, w, h, r);
  g.fillStyle = base;
  g.fill();
  g.lineWidth = 1.5;
  g.strokeStyle = "#121315";
  g.stroke();
  g.strokeStyle = "rgba(255,255,255,0.16)";
  g.lineWidth = 1;
  const path1 = new Path2D();
  path1.moveTo(x + 2, y + h - 3);
  path1.lineTo(x + 2, y + 2);
  path1.lineTo(x + w - 3, y + 2);
  g.stroke(path1);
  g.strokeStyle = "rgba(0,0,0,0.35)";
  const path2 = new Path2D();
  path2.moveTo(x + w - 2, y + 3);
  path2.lineTo(x + w - 2, y + h - 2);
  path2.lineTo(x + 3, y + h - 2);
  g.stroke(path2);
}

/**
Shadows fall to the south-east, long and soft-edged, like in the game.
*/
export function paintShadow(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, height: number) {
  const dx = height * 1.1;
  const dy = height * 0.45;
  const shape = new Path2D();
  shape.moveTo(x + w, y + 2);
  shape.lineTo(x + w + dx, y + 2 + dy);
  shape.lineTo(x + w + dx, y + h + dy);
  shape.lineTo(x + dx * 0.5, y + h + dy);
  shape.lineTo(x + 2, y + h);
  shape.lineTo(x + w, y + h);
  shape.closePath();
  g.save();
  g.filter = "blur(2px)";
  g.fillStyle = "rgba(8,5,2,0.5)";
  g.fill(shape);
  g.filter = "none";
  g.fillStyle = "rgba(8,5,2,0.25)";
  g.fill(shape);
  g.restore();
}

export function ease(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

export function workGlow(g: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, on: boolean, clock: number) {
  if (!on) return;
  const pulse = 0.25 + Math.sin(clock * 6) * 0.08;
  const glow = g.createRadialGradient(x, y, 0, x, y, r);
  glow.addColorStop(0, color);
  glow.addColorStop(1, "rgba(0,0,0,0)");
  g.globalAlpha = pulse;
  g.fillStyle = glow;
  circle(g, x, y, r);
  g.fill();
  g.globalAlpha = 1;
}

export function progressBar(g: CanvasRenderingContext2D, p: RectPx, progress: number) {
  if (progress <= 0) return;
  const w = p.w - 16;
  g.fillStyle = "rgba(0,0,0,0.65)";
  g.fillRect(p.x + 8, p.y + p.h + 2, w, 3);
  g.fillStyle = "#ffa21c";
  g.fillRect(p.x + 8, p.y + p.h + 2, w * progress, 3);
}


