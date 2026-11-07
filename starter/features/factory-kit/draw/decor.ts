/**
 * Decoration that makes a map read as a factory: power poles, solar panels,
 * radar, chests, lamps.
 */
import { type Point, type TileRect, rectPx } from "../geometry";
import { circle, plate } from "./primitives";

export function poleTop(p: { x: number; y: number }) {
  return { x: p.x, y: p.y - 24 };
}

/**
Power poles wired to each other in order.
*/
export function drawPoles(g: CanvasRenderingContext2D, poles: Point[]) {
  g.strokeStyle = "rgba(205,120,55,0.9)";
  g.lineWidth = 0.9;
  for (let i = 1; i < poles.length; i++) {
    const a = poleTop(poles[i - 1]!);
    const b = poleTop(poles[i]!);
    for (const off of [-5, 5]) {
      const path12 = new Path2D();
      path12.moveTo(a.x + off, a.y);
      path12.quadraticCurveTo((a.x + b.x) / 2 + off, (a.y + b.y) / 2 + 10, b.x + off, b.y);
      g.stroke(path12);
    }
  }
  for (const p of poles) {
    const top = poleTop(p);
    g.fillStyle = "#2b2d30";
    g.fillRect(p.x - 4, p.y - 3, 8, 6);
    g.strokeStyle = "#5d6267";
    g.lineWidth = 3;
    const path13 = new Path2D();
    path13.moveTo(p.x, p.y);
    path13.lineTo(top.x, top.y + 2);
    g.stroke(path13);
    g.strokeStyle = "#8b9196";
    g.lineWidth = 1;
    g.beginPath();
    for (let y = p.y - 4; y > top.y + 3; y -= 5) {
      g.moveTo(p.x - 1.5, y);
      g.lineTo(p.x + 1.5, y - 2.5);
    }
    g.stroke();
    g.fillStyle = "#3a3d40";
    g.fillRect(top.x - 7, top.y - 1, 14, 3);
    g.fillStyle = "#c87533";
    g.fillRect(top.x - 7, top.y - 3, 3, 3);
    g.fillRect(top.x + 4, top.y - 3, 3, 3);
  }
}

export function drawSolar(g: CanvasRenderingContext2D, r: TileRect) {
  const p = rectPx(r);
  plate(g, p.x + 2, p.y + 2, p.w - 4, p.h - 4, "#2c3036", 2);
  const cell = (p.w - 10) / 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const x = p.x + 5 + i * cell;
      const y = p.y + 5 + j * cell;
      const grad = g.createLinearGradient(x, y, x + cell, y + cell);
      grad.addColorStop(0, "#3d6aa8");
      grad.addColorStop(0.5, "#1d3460");
      grad.addColorStop(1, "#14244a");
      g.fillStyle = grad;
      g.fillRect(x + 0.5, y + 0.5, cell - 1, cell - 1);
      g.strokeStyle = "rgba(160,200,255,0.25)";
      g.lineWidth = 0.6;
      const path15 = new Path2D();
      path15.moveTo(x + cell / 2, y + 1);
      path15.lineTo(x + cell / 2, y + cell - 1);
      path15.moveTo(x + 1, y + cell / 2);
      path15.lineTo(x + cell - 1, y + cell / 2);
      g.stroke(path15);
    }
  }
  g.fillStyle = "rgba(255,255,255,0.12)";
  g.beginPath();
  g.moveTo(p.x + 5, p.y + 5);
  g.lineTo(p.x + p.w * 0.45, p.y + 5);
  g.lineTo(p.x + 5, p.y + p.h * 0.45);
  g.fill();
}

export function drawRadar(g: CanvasRenderingContext2D, r: TileRect, clock: number) {
  const p = rectPx(r);
  plate(g, p.x + 6, p.y + 6, p.w - 12, p.h - 12, "#3a3e43", 4);
  g.fillStyle = "#24272a";
  circle(g, p.cx, p.cy, 13);
  g.fill();
  g.save();
  g.translate(p.cx, p.cy - 3);
  g.rotate(clock * 0.9);
  const dish = g.createLinearGradient(-20, 0, 20, 0);
  dish.addColorStop(0, "#6c7277");
  dish.addColorStop(0.5, "#d2d6da");
  dish.addColorStop(1, "#6c7277");
  g.fillStyle = dish;
  g.beginPath();
  g.ellipse(0, -6, 20, 7, 0, 0, Math.PI);
  g.fill();
  g.strokeStyle = "#1c1e20";
  g.lineWidth = 1.2;
  g.stroke();
  g.strokeStyle = "#9aa0a6";
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(0, -6);
  g.lineTo(0, 4);
  g.stroke();
  g.restore();
}

export function drawChest(g: CanvasRenderingContext2D, at: { x: number; y: number }) {
  g.fillStyle = "rgba(10,6,2,0.35)";
  g.fillRect(at.x - 6, at.y - 5, 15, 13);
  plate(g, at.x - 7, at.y - 7, 14, 14, "#8b8f93", 2);
  g.fillStyle = "#5b5f63";
  g.fillRect(at.x - 7, at.y - 1.5, 14, 3);
  g.fillStyle = "#2a2c2e";
  g.fillRect(at.x - 1.5, at.y - 3, 3, 4);
}

export function drawLamp(g: CanvasRenderingContext2D, at: { x: number; y: number }, clock: number) {
  const glow = g.createRadialGradient(at.x, at.y, 0, at.x, at.y, 26);
  const flick = 0.22 + Math.sin(clock * 1.3 + at.x) * 0.03;
  glow.addColorStop(0, `rgba(255,236,170,${flick})`);
  glow.addColorStop(1, "rgba(255,236,170,0)");
  g.fillStyle = glow;
  circle(g, at.x, at.y, 26);
  g.fill();
  g.fillStyle = "#3a3d40";
  circle(g, at.x, at.y, 4.5);
  g.fill();
  g.fillStyle = "#fff3c4";
  circle(g, at.x, at.y, 2.5);
  g.fill();
}

