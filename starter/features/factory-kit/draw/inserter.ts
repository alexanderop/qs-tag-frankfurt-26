/**
 * The yellow inserter arm that swings items between belts and machines.
 */
import type { Inserter } from "../geometry";
import { type ItemSprite, drawItem } from "./items";
import { circle, ease, plate } from "./primitives";

export interface Swing {
  at: number;
  kind: ItemSprite;
}

export const SWING_SECONDS = 0.45;

export function drawInserter(g: CanvasRenderingContext2D, ins: Inserter, swing: Swing | undefined, clock: number) {
  const { at } = ins;
  const home = Math.atan2(ins.from.y - at.y, ins.from.x - at.x);
  const reach = Math.hypot(ins.from.x - at.x, ins.from.y - at.y) * 0.85;
  const t = swing ? (clock - swing.at) / SWING_SECONDS : 2;
  const carrying = t < 0.5;
  const outbound = carrying ? home + Math.PI * ease(t * 2) : home;
  const angle = !carrying && t < 1 ? home + Math.PI + Math.PI * ease((t - 0.5) * 2) : outbound;

  // base
  plate(g, at.x - 7, at.y - 7, 14, 14, "#3a3d40", 2);
  g.fillStyle = "#d3a12a";
  circle(g, at.x, at.y - 1, 4.5);
  g.fill();
  g.strokeStyle = "#5c4210";
  g.lineWidth = 1;
  g.stroke();

  // arm: shoulder → elbow → hand, lifted a little for a fake 3/4 view
  const hx = at.x + Math.cos(angle) * reach;
  const hy = at.y + Math.sin(angle) * reach - 3;
  const ex = (at.x + hx) / 2 - Math.sin(angle) * 2;
  const ey = (at.y + hy) / 2 - 6;
  g.lineCap = "round";
  g.strokeStyle = "rgba(0,0,0,0.3)";
  g.lineWidth = 3;
  g.beginPath();
  g.moveTo(at.x + 4, at.y + 2);
  g.lineTo(hx + 5, hy + 6);
  g.stroke();
  g.strokeStyle = "#202224";
  g.lineWidth = 3.6;
  g.beginPath();
  g.moveTo(at.x, at.y - 2);
  g.lineTo(ex, ey);
  g.lineTo(hx, hy);
  g.stroke();
  g.strokeStyle = "#a3a8ad";
  g.lineWidth = 2;
  g.stroke();
  g.fillStyle = "#2a2a2a";
  circle(g, hx, hy, 2.2);
  g.fill();
  if (carrying && swing) drawItem(g, swing.kind, hx, hy - 1, 8);
}

