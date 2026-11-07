/**
 * Overlays drawn above the machines: labels, selection brackets, status
 * icons, smoke and floating text.
 */
import { type Label, type TileRect, rectPx } from "../geometry";
import { type ItemSprite, drawItem } from "./items";
import { circle, FONT, rr } from "./primitives";

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  born: number;
  life: number;
  shade: number;
}

export interface Floater {
  text: string;
  color: string;
  x: number;
  y: number;
  born: number;
}

/**
Dark badge with the machine's recipe, like the game's alt-mode view.
*/
export function altIcon(g: CanvasRenderingContext2D, r: TileRect, kind: ItemSprite) {
  const p = rectPx(r);
  // bottom-left corner, so the machine art in the middle stays visible
  const x = p.x + 10;
  const y = p.y + p.h - 12;
  g.fillStyle = "rgba(12,12,14,0.78)";
  rr(g, x - 7.5, y - 7.5, 15, 15, 3);
  g.fill();
  g.strokeStyle = "rgba(255,255,255,0.18)";
  g.lineWidth = 0.8;
  g.stroke();
  drawItem(g, kind, x, y - 0.5, 9);
}

export type MachineStatus = "working" | "starved" | "blocked";

/**
Blinking corner icon: yellow when a machine waits for input, red when its output is full.
*/
export function statusIcon(g: CanvasRenderingContext2D, r: TileRect, status: Exclude<MachineStatus, "working">, kind: ItemSprite, clock: number) {
  const p = rectPx(r);
  const x = p.x + p.w - 4;
  const y = p.y + 4;
  const blink = 0.65 + Math.sin(clock * 6) * 0.35;
  g.globalAlpha = blink;
  g.fillStyle = "rgba(10,10,10,0.8)";
  circle(g, x, y, 8);
  g.fill();
  g.strokeStyle = status === "starved" ? "#f5c518" : "#ff4b3a";
  g.lineWidth = 2;
  g.stroke();
  drawItem(g, kind, x, y, 8);
  g.globalAlpha = 1;
}

export type LabelTone = "plain" | "selected" | "hot";

const LABEL_FILL: Record<LabelTone, string> = {
  plain: "rgba(14,14,16,0.8)",
  selected: "rgba(255,107,237,0.95)",
  hot: "rgba(214,48,38,0.95)",
};

/**
How far left of the anchor a label starts, as a share of its width.
*/
const ALIGN_SHIFT: Partial<Record<CanvasTextAlign, number>> = { center: 0.5, right: 1 };

/**
`scale` grows the label around its anchor, for maps drawn small.
*/
export function drawLabel(g: CanvasRenderingContext2D, label: Label, text: string, tone: LabelTone, scale = 1) {
  if (scale !== 1) {
    g.save();
    g.translate(label.x, label.y);
    g.scale(scale, scale);
    drawLabel(g, { ...label, x: 0, y: 0 }, text, tone);
    g.restore();
    return;
  }
  g.font = `700 12px ${FONT}`;
  const w = g.measureText(text).width + 14;
  const x = label.x - w * (ALIGN_SHIFT[label.align] ?? 0);
  rr(g, x, label.y - 10, w, 20, 4);
  g.fillStyle = LABEL_FILL[tone];
  g.fill();
  g.strokeStyle = "rgba(255,255,255,0.12)";
  g.lineWidth = 1;
  g.stroke();
  g.fillStyle = tone === "selected" ? "#141414" : "#f4f1ea";
  g.textAlign = "left";
  g.textBaseline = "middle";
  g.fillText(text, x + 7, label.y + 0.5);
}

/**
Corner brackets around each rect.
*/
export function selection(g: CanvasRenderingContext2D, rects: TileRect[], color: string, clock: number) {
  const pad = 4 + Math.sin(clock * 4) * 1.2;
  const len = 10;
  g.strokeStyle = color;
  g.lineWidth = 2.5;
  g.lineCap = "square";
  for (const r of rects) {
    const p = rectPx(r);
    for (const sx of [-1, 1]) {
      for (const sy of [-1, 1]) {
        const cx = p.cx + sx * (p.w / 2 + pad);
        const cy = p.cy + sy * (p.h / 2 + pad);
        const path14 = new Path2D();
        path14.moveTo(cx, cy - sy * len);
        path14.lineTo(cx, cy);
        path14.lineTo(cx - sx * len, cy);
        g.stroke(path14);
      }
    }
  }
}

export function drawSmoke(g: CanvasRenderingContext2D, view: { clock: number; smoke: Particle[] }) {
  view.smoke = view.smoke.filter((p) => view.clock - p.born < p.life);
  for (const p of view.smoke) {
    const age = view.clock - p.born;
    const k = age / p.life;
    g.fillStyle = `rgba(${p.shade},${p.shade - 6},${p.shade - 12},${0.45 * (1 - k)})`;
    circle(g, p.x + p.vx * age, p.y + p.vy * age, p.r * (1 + k * 2.5));
    g.fill();
  }
}

/**
`scale` grows the text, for maps drawn small.
*/
export function drawFloaters(g: CanvasRenderingContext2D, view: { clock: number; floaters: Floater[] }, scale = 1) {
  view.floaters = view.floaters.filter((f) => view.clock - f.born < 1.6);
  g.font = `800 ${Math.round(12 * scale)}px ${FONT}`;
  g.textAlign = "center";
  g.textBaseline = "middle";
  for (const f of view.floaters) {
    const k = (view.clock - f.born) / 1.6;
    g.globalAlpha = 1 - k;
    g.lineWidth = 3;
    g.strokeStyle = "#000";
    g.strokeText(f.text, f.x, f.y - k * 26);
    g.fillStyle = f.color;
    g.fillText(f.text, f.x, f.y - k * 26);
  }
  g.globalAlpha = 1;
}

/**
Green research badge with a double chevron on upgraded machines.
*/
export function upgradeBadge(g: CanvasRenderingContext2D, r: TileRect) {
  const p = rectPx(r);
  const x = p.x + 4;
  const y = p.y + 4;
  rr(g, x - 6, y - 6, 13, 13, 3);
  g.fillStyle = "#3d9f45";
  g.fill();
  g.strokeStyle = "#0b1a0c";
  g.lineWidth = 1;
  g.stroke();
  const chevrons = new Path2D();
  for (const dy of [-2, 2]) {
    chevrons.moveTo(x - 3, y + dy + 1.5);
    chevrons.lineTo(x + 0.5, y + dy - 1.5);
    chevrons.lineTo(x + 4, y + dy + 1.5);
  }
  g.strokeStyle = "#eaffea";
  g.lineWidth = 1.4;
  g.stroke(chevrons);
}


/**
 * An unpowered building: darkened, with the game's blinking no-power sign
 * (yellow bolt in a red-ringed badge) over the middle.
 */
export function noPower(g: CanvasRenderingContext2D, r: TileRect, clock: number) {
  const p = rectPx(r);
  g.fillStyle = "rgba(8,10,14,0.55)";
  rr(g, p.x + 2, p.y + 2, p.w - 4, p.h - 4, 5);
  g.fill();
  // On for 0.7s, off for 0.3s, like the in-game alert.
  if (clock % 1 > 0.7) return;
  const x = p.cx;
  const y = p.cy;
  g.fillStyle = "rgba(12,12,14,0.85)";
  circle(g, x, y, 10);
  g.fill();
  g.strokeStyle = "#ff4b3a";
  g.lineWidth = 2;
  g.stroke();
  g.fillStyle = "#ffd23a";
  g.beginPath();
  g.moveTo(x + 2, y - 7);
  g.lineTo(x - 4, y + 1);
  g.lineTo(x - 0.5, y + 1);
  g.lineTo(x - 2, y + 7);
  g.lineTo(x + 4, y - 1);
  g.lineTo(x + 0.5, y - 1);
  g.closePath();
  g.fill();
}

/**
 * A labelled horizontal gauge: `value` of `max` filled in `color`, with a tick
 * at `mark` (a target) when given. (x, y) is the top-left corner.
 */
export function drawGauge(
  g: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  o: { value: number; max: number; color: string; text: string; mark?: number },
) {
  const k = Math.max(0, Math.min(1, o.value / o.max));
  rr(g, x, y, w, 16, 3);
  g.fillStyle = "rgba(12,12,14,0.85)";
  g.fill();
  g.strokeStyle = "rgba(255,255,255,0.14)";
  g.lineWidth = 1;
  g.stroke();
  g.fillStyle = o.color;
  g.fillRect(x + 2, y + 2, (w - 4) * k, 12);
  if (o.mark !== undefined) {
    g.fillStyle = "#f4f1ea";
    g.fillRect(x + 2 + (w - 4) * Math.min(1, o.mark / o.max) - 1, y, 2, 16);
  }
  g.font = `800 10px ${FONT}`;
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.lineWidth = 2.5;
  g.strokeStyle = "#000";
  g.strokeText(o.text, x + w / 2, y + 8.5);
  g.fillStyle = "#fff";
  g.fillText(o.text, x + w / 2, y + 8.5);
}
