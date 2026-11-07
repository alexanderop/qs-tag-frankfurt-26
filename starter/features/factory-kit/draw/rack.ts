/**
 * A storage rack with numbered slots stacked bottom-up, each with a verdict
 * light. Made for a PR stack: what waits, what passed, where the ceiling is.
 */
import { type TileRect, rectPx } from "../geometry";
import { type ItemSprite, drawItem } from "./items";
import { circle, FONT, plate, rr } from "./primitives";

export interface RackSlot {
  label: string;
  /**
  The item sitting in the slot, if any.
  */
  item?: ItemSprite;
  light: "off" | "green" | "red";
  /**
  Already gone (landed): the slot shows a dim check instead of an item.
  */
  done?: boolean;
}

const LIGHT: Record<RackSlot["light"], string> = { off: "#1c1c1c", green: "#4ade6b", red: "#ff3b2f" };

function drawSlot(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, slot: RackSlot) {
  rr(g, x, y, w, h, 2);
  g.fillStyle = slot.done ? "rgba(40,60,44,0.9)" : "rgba(12,12,14,0.85)";
  g.fill();
  g.font = `800 10px ${FONT}`;
  g.textAlign = "left";
  g.textBaseline = "middle";
  g.fillStyle = slot.done ? "#7dff8a" : "#f4f1ea";
  g.fillText(slot.done ? `${slot.label} ✓` : slot.label, x + 4, y + h / 2 + 0.5);
  if (slot.item && !slot.done) drawItem(g, slot.item, x + w - 22, y + h / 2, 9);
  g.fillStyle = LIGHT[slot.light];
  g.shadowColor = LIGHT[slot.light];
  g.shadowBlur = slot.light === "off" ? 0 : 6;
  circle(g, x + w - 8, y + h / 2, 3.5);
  g.fill();
  g.shadowBlur = 0;
  g.strokeStyle = "#0a0a0a";
  g.lineWidth = 1;
  g.stroke();
}

/**
 * `slots[0]` is the bottom slot. A red bar is drawn under slot
 * `ceilingUnder` when given: nothing from that slot up can land.
 */
export function drawStackRack(g: CanvasRenderingContext2D, r: TileRect, slots: RackSlot[], ceilingUnder: number | null) {
  const p = rectPx(r);
  plate(g, p.x + 2, p.y + 2, p.w - 4, p.h - 4, "#3a3e43", 4);
  const pad = 5;
  const gap = 3;
  const h = (p.h - pad * 2 - gap * (slots.length - 1)) / slots.length;
  slots.forEach((slot, i) => {
    const y = p.y + p.h - pad - (i + 1) * h - i * gap;
    drawSlot(g, p.x + pad, y, p.w - pad * 2, h, slot);
  });
  if (ceilingUnder === null) return;
  const y = p.y + p.h - pad - ceilingUnder * (h + gap) + gap / 2;
  g.fillStyle = "#ff3b2f";
  g.fillRect(p.x - 4, y - 2, p.w + 8, 4);
  g.font = `800 9px ${FONT}`;
  g.textAlign = "right";
  g.textBaseline = "middle";
  g.lineWidth = 2.5;
  g.strokeStyle = "#000";
  g.strokeText("CEILING", p.x - 6, y);
  g.fillStyle = "#ff6b5b";
  g.fillText("CEILING", p.x - 6, y);
}
