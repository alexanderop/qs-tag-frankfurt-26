/**
 * Conveyor belts and filter splitters.
 */
import { type BeltColor, type BeltPath, type TileRect, pointAt, rectPx, T } from "../geometry";
import { circle, plate } from "./primitives";

export const BELT_COLORS: Record<BeltColor, { frame: string; dark: string }> = {
  yellow: { frame: "#d4a12a", dark: "#6b4f12" },
  red: { frame: "#c8432f", dark: "#5e1c13" },
  blue: { frame: "#3b8bd8", dark: "#17395c" },
  green: { frame: "#4fae4a", dark: "#1d4a1b" },
  purple: { frame: "#9b5de5", dark: "#3d1f63" },
};

export function strokePath(g: CanvasRenderingContext2D, belt: BeltPath, color: string, width: number) {
  g.strokeStyle = color;
  g.lineWidth = width;
  g.beginPath();
  belt.points.forEach((p, i) => (i === 0 ? g.moveTo(p.x, p.y) : g.lineTo(p.x, p.y)));
  g.stroke();
}

export function drawBelt(g: CanvasRenderingContext2D, belt: BeltPath, phase: number) {
  const colors = BELT_COLORS[belt.color];
  g.lineJoin = "miter";
  g.lineCap = "square";
  strokePath(g, belt, "#121212", 19);
  strokePath(g, belt, colors.dark, 18);
  strokePath(g, belt, colors.frame, 15);
  g.lineCap = "butt";
  strokePath(g, belt, "#26282b", 11);
  strokePath(g, belt, "#383b3f", 9);

  // Moving slats and the chevron arrows printed on the belt surface.
  const half = 4.5;
  const slat = 3.4;
  const offset = phase % slat;
  g.lineWidth = 1;
  g.strokeStyle = "rgba(0,0,0,0.45)";
  g.beginPath();
  for (let d = offset; d < belt.total; d += slat) {
    const p = pointAt(belt, d);
    const nx = -Math.sin(p.angle);
    const ny = Math.cos(p.angle);
    g.moveTo(p.x - nx * half, p.y - ny * half);
    g.lineTo(p.x + nx * half, p.y + ny * half);
  }
  g.stroke();

  const arrow = T / 2;
  g.strokeStyle = "rgba(190,195,200,0.55)";
  g.lineWidth = 1.4;
  g.lineCap = "round";
  g.beginPath();
  for (let d = phase % arrow; d < belt.total - 2; d += arrow) {
    const p = pointAt(belt, d);
    const cos = Math.cos(p.angle);
    const sin = Math.sin(p.angle);
    g.moveTo(p.x - cos * 2.5 - sin * 3, p.y - sin * 2.5 + cos * 3);
    g.lineTo(p.x + cos * 0.5, p.y + sin * 0.5);
    g.lineTo(p.x - cos * 2.5 + sin * 3, p.y - sin * 2.5 - cos * 3);
  }
  g.stroke();
}

/**
An unpowered belt: standing still and dimmed.
*/
export function drawIdleBelt(g: CanvasRenderingContext2D, belt: BeltPath) {
  drawBelt(g, belt, 0);
  g.lineCap = "square";
  strokePath(g, belt, "rgba(8,10,14,0.5)", 19);
  g.lineCap = "butt";
}

/**
A filter splitter; the dot shows which item it diverts. An unpowered one is dimmed.
*/
export function drawSplitter(g: CanvasRenderingContext2D, r: TileRect, color: BeltColor = "yellow", dot = "#b071ff", powered = true) {
  const p = rectPx(r);
  plate(g, p.x + 3, p.y + 1, p.w - 6, p.h - 2, "#4c5156", 3);
  g.fillStyle = BELT_COLORS[color].frame;
  g.fillRect(p.x + 5, p.y + 4, p.w - 10, 4);
  g.fillRect(p.x + 5, p.y + p.h - 8, p.w - 10, 4);
  g.fillStyle = dot;
  circle(g, p.cx, p.cy, 3.5);
  g.fill();
  if (powered) return;
  g.fillStyle = "rgba(8,10,14,0.5)";
  g.fillRect(p.x + 3, p.y + 1, p.w - 6, p.h - 2);
}

