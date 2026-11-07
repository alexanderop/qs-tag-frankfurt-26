/**
 * Item sprites that ride the belts. Scenes map their own item kinds onto these.
 */
import { circle, rr } from "./primitives";

/**
 * - ticket: a yellow work order
 * - pr: green circuit
 * - approved: blue processing unit
 * - bug: a small biter
 * - search: magnifying glass
 * - decision: a yellow diamond with a question mark
 * - advice: a purple science pack
 */
export type ItemSprite = "ticket" | "pr" | "approved" | "bug" | "search" | "decision" | "advice";

export type ItemPainter = (g: CanvasRenderingContext2D, s: number, kind: ItemSprite) => void;

export function drawTicket(g: CanvasRenderingContext2D, s: number) {
  g.rotate(-0.15);
  rr(g, -s * 0.42, -s * 0.5, s * 0.84, s, 1);
  g.fillStyle = "#f1dd96";
  g.fill();
  g.strokeStyle = "#5e4a1a";
  g.lineWidth = 0.9;
  g.stroke();
  g.strokeStyle = "#9a7f3a";
  g.lineWidth = 0.8;
  g.beginPath();
  for (let i = 0; i < 3; i++) {
    g.moveTo(-s * 0.25, -s * 0.15 + i * s * 0.22);
    g.lineTo(s * (i === 2 ? 0.05 : 0.25), -s * 0.15 + i * s * 0.22);
  }
  g.stroke();
  g.fillStyle = "#d9463b";
  circle(g, 0, -s * 0.36, s * 0.11);
  g.fill();
}

export function drawCircuit(g: CanvasRenderingContext2D, s: number, kind: ItemSprite) {
  // Green circuit for a fresh PR, blue processing unit once approved.
  const body = kind === "pr" ? "#3fa23a" : "#2f6fd6";
  const edge = kind === "pr" ? "#173f16" : "#122e5e";
  g.fillStyle = "#e0b84c";
  for (let i = -1; i <= 1; i++) {
    g.fillRect(-s * 0.6, i * s * 0.25 - 0.6, s * 0.18, 1.2);
    g.fillRect(s * 0.42, i * s * 0.25 - 0.6, s * 0.18, 1.2);
  }
  rr(g, -s * 0.45, -s * 0.45, s * 0.9, s * 0.9, 1.5);
  g.fillStyle = body;
  g.fill();
  g.strokeStyle = edge;
  g.lineWidth = 1;
  g.stroke();
  g.fillStyle = kind === "pr" ? "#9be36a" : "#9fd0ff";
  g.fillRect(-s * 0.18, -s * 0.18, s * 0.36, s * 0.36);
  g.fillStyle = "rgba(255,255,255,0.35)";
  g.fillRect(-s * 0.4, -s * 0.4, s * 0.8, s * 0.12);
}

export function drawBug(g: CanvasRenderingContext2D, s: number) {
  // A small biter: bugs are the enemy.
  g.strokeStyle = "#2a0707";
  g.lineWidth = 1;
  g.beginPath();
  for (const side of [-1, 1]) {
    for (let i = -1; i <= 1; i++) {
      g.moveTo(side * s * 0.15, i * s * 0.16);
      g.lineTo(side * s * 0.55, i * s * 0.24 - s * 0.06);
    }
  }
  g.stroke();
  g.fillStyle = "#c2352b";
  g.beginPath();
  g.ellipse(0, s * 0.06, s * 0.27, s * 0.36, 0, 0, Math.PI * 2);
  g.fill();
  g.stroke();
  g.fillStyle = "#6e1610";
  circle(g, 0, -s * 0.32, s * 0.17);
  g.fill();
  g.fillStyle = "#ffd25a";
  g.fillRect(-s * 0.1, -s * 0.36, 1.2, 1.2);
  g.fillRect(s * 0.04, -s * 0.36, 1.2, 1.2);
}

export function drawSearch(g: CanvasRenderingContext2D, s: number) {
  g.lineCap = "round";
  g.strokeStyle = "#2a2118";
  g.lineWidth = 3;
  g.beginPath();
  g.moveTo(s * 0.12, s * 0.12);
  g.lineTo(s * 0.48, s * 0.48);
  g.stroke();
  g.strokeStyle = "#a8743a";
  g.lineWidth = 1.8;
  g.stroke();
  circle(g, -s * 0.1, -s * 0.1, s * 0.34);
  g.fillStyle = "rgba(170,220,255,0.75)";
  g.fill();
  g.strokeStyle = "#1c1e20";
  g.lineWidth = 1.6;
  g.stroke();
  g.fillStyle = "rgba(255,255,255,0.7)";
  circle(g, -s * 0.2, -s * 0.2, s * 0.09);
  g.fill();
}

export function drawDecision(g: CanvasRenderingContext2D, s: number) {
  g.beginPath();
  g.moveTo(0, -s * 0.55);
  g.lineTo(s * 0.5, 0);
  g.lineTo(0, s * 0.55);
  g.lineTo(-s * 0.5, 0);
  g.closePath();
  g.fillStyle = "#f5c518";
  g.fill();
  g.strokeStyle = "#4a3a05";
  g.lineWidth = 1;
  g.stroke();
  g.fillStyle = "#2a1f02";
  g.font = `900 ${Math.round(s * 0.8)}px ui-sans-serif, system-ui, sans-serif`;
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText("?", 0, s * 0.04);
}

export function drawAdvice(g: CanvasRenderingContext2D, s: number) {
  // A science-pack flask: what comes back from the lab.
  g.fillStyle = "#3a3d40";
  g.fillRect(-s * 0.14, -s * 0.55, s * 0.28, s * 0.22);
  g.beginPath();
  g.moveTo(-s * 0.14, -s * 0.33);
  g.lineTo(-s * 0.45, s * 0.4);
  g.quadraticCurveTo(-s * 0.47, s * 0.5, -s * 0.36, s * 0.5);
  g.lineTo(s * 0.36, s * 0.5);
  g.quadraticCurveTo(s * 0.47, s * 0.5, s * 0.45, s * 0.4);
  g.lineTo(s * 0.14, -s * 0.33);
  g.closePath();
  g.fillStyle = "#b46cff";
  g.fill();
  g.strokeStyle = "#2b1046";
  g.lineWidth = 1;
  g.stroke();
  g.fillStyle = "rgba(255,255,255,0.45)";
  g.fillRect(-s * 0.2, s * 0.05, s * 0.12, s * 0.3);
}

const ITEM_PAINTERS: Record<ItemSprite, ItemPainter> = {
  ticket: drawTicket,
  pr: drawCircuit,
  approved: drawCircuit,
  bug: drawBug,
  search: drawSearch,
  decision: drawDecision,
  advice: drawAdvice,
};

export function drawItem(g: CanvasRenderingContext2D, kind: ItemSprite, x: number, y: number, size = 9) {
  g.save();
  g.translate(x, y);
  g.fillStyle = "rgba(0,0,0,0.4)";
  g.beginPath();
  g.ellipse(1.2, size * 0.45, size * 0.5, size * 0.17, 0, 0, Math.PI * 2);
  g.fill();
  ITEM_PAINTERS[kind](g, size, kind);
  g.restore();
}

