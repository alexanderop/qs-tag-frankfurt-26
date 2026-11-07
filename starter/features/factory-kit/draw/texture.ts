/**
 * The gritty Factorio look: weathered metal, a visible south face that makes
 * machines read as tall, and greebles (pipes, vents, cables). Detail is
 * expensive, so static machine bodies are painted once into a cached sprite
 * and blitted every frame.
 */
import { circle, rr, seeded } from "./primitives";

/**
One sprite per machine, at the last scale it was drawn at. A resize replaces
it instead of adding another, so dragging the window doesn't pile up canvases.
*/
const sprites = new Map<string, { scale: number; canvas: HTMLCanvasElement }>();

/**
Draws `paint` once into an offscreen canvas at the current device scale, then
blits that sprite on every later call with the same key. `paint` draws in world
coordinates, `pad` px of overflow around the box are kept (shadows, pipes).
*/
export function cached(
  g: CanvasRenderingContext2D,
  key: string,
  box: { x: number; y: number; w: number; h: number },
  pad: number,
  paint: (s: CanvasRenderingContext2D) => void,
) {
  const scale = g.getTransform().a || 1;
  const id = `${key}@${box.x},${box.y},${box.w},${box.h}`;
  let sprite = sprites.get(id)?.scale === scale ? sprites.get(id)!.canvas : undefined;
  if (!sprite) {
    sprite = document.createElement("canvas");
    sprite.width = Math.ceil((box.w + pad * 2) * scale);
    sprite.height = Math.ceil((box.h + pad * 2) * scale);
    const s = sprite.getContext("2d")!;
    s.scale(scale, scale);
    s.translate(pad - box.x, pad - box.y);
    paint(s);
    sprites.set(id, { scale, canvas: sprite });
  }
  g.drawImage(sprite, box.x - pad, box.y - pad, box.w + pad * 2, box.h + pad * 2);
}

interface Area {
  x: number;
  y: number;
  w: number;
  h: number;
}

function grime(g: CanvasRenderingContext2D, { x, y, w, h }: Area, rnd: () => number, n: number) {
  for (let i = 0; i < n; i++) {
    const cx = x + rnd() * w;
    const cy = y + rnd() * h;
    const r = 4 + rnd() * Math.min(w, h) * 0.35;
    const grad = g.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0, rnd() < 0.4 ? "rgba(120,62,24,0.32)" : "rgba(12,10,6,0.32)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grad;
    g.fillRect(cx - r, cy - r, r * 2, r * 2);
  }
}

function speckles(g: CanvasRenderingContext2D, { x, y, w, h }: Area, rnd: () => number, n: number) {
  for (let i = 0; i < n; i++) {
    g.fillStyle = rnd() < 0.45 ? `rgba(255,240,210,${0.05 + rnd() * 0.12})` : `rgba(0,0,0,${0.08 + rnd() * 0.18})`;
    g.fillRect(x + rnd() * w, y + rnd() * h, 0.6 + rnd() * 0.9, 0.6 + rnd() * 0.9);
  }
}

/**
Panel seams, and lighter flecks along the rim where the paint rubbed off.
*/
function wear(g: CanvasRenderingContext2D, { x, y, w, h }: Area, rnd: () => number, n: number) {
  g.fillStyle = "rgba(0,0,0,0.28)";
  g.fillRect(x + w * (0.3 + rnd() * 0.15), y, 0.8, h);
  g.fillRect(x, y + h * (0.35 + rnd() * 0.3), w, 0.8);
  const spots = [
    (t: number) => [x + t * w, y],
    (t: number) => [x + w - 2, y + t * h],
    (t: number) => [x + t * w, y + h - 2],
    (t: number) => [x, y + t * h],
  ];
  g.fillStyle = "rgba(255,235,200,0.12)";
  for (let i = 0; i < n; i++) {
    const [ex, ey] = spots[Math.floor(rnd() * 4)]!(rnd());
    g.fillRect(ex!, ey!, 1.5 + rnd() * 3, 1.5);
  }
}

function scratches(g: CanvasRenderingContext2D, { x, y, w, h }: Area, rnd: () => number, n: number) {
  for (let i = 0; i < n; i++) {
    g.fillStyle = `rgba(255,255,255,${0.08 + rnd() * 0.1})`;
    g.save();
    g.translate(x + rnd() * w, y + rnd() * h);
    g.rotate(rnd() * Math.PI);
    g.fillRect(0, 0, 3 + rnd() * 8, 0.5);
    g.restore();
  }
}

/**
Rust, grime, seams and scratches over a metal surface, clipped to the box.
*/
export function weather(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, seed: number, amount = 1) {
  const rnd = seeded(seed);
  const area = { x, y, w, h };
  g.save();
  g.beginPath();
  g.rect(x, y, w, h);
  g.clip();
  grime(g, area, rnd, 6 * amount);
  speckles(g, area, rnd, ((w * h) / 5) * amount);
  wear(g, area, rnd, 10 * amount);
  scratches(g, area, rnd, 4 * amount);
  g.restore();
}

/**
A box seen from slightly south: a lit top face and a darker front face below it,
so the machine reads as tall. Returns the top face.
*/
export function block(
  g: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  depth: number,
  top: [string, string],
  front: string,
  seed: number,
  radius = 3,
) {
  const topH = h - depth;
  // front face
  rr(g, x, y + depth, w, topH, radius);
  g.fillStyle = front;
  g.fill();
  const shade = g.createLinearGradient(0, y + topH - radius, 0, y + h);
  shade.addColorStop(0, "rgba(0,0,0,0)");
  shade.addColorStop(1, "rgba(0,0,0,0.45)");
  g.fillStyle = shade;
  g.fill();
  // vertical ribs on the front
  g.fillStyle = "rgba(0,0,0,0.25)";
  for (let rx = x + 5; rx < x + w - 3; rx += 6) g.fillRect(rx, y + topH, 1, depth - 1);
  // top face
  const grad = g.createLinearGradient(x, y, x + w * 0.4, y + topH);
  grad.addColorStop(0, top[0]);
  grad.addColorStop(1, top[1]);
  rr(g, x, y, w, topH, radius);
  g.fillStyle = grad;
  g.fill();
  weather(g, x, y, w, topH, seed);
  // edges: lit north-west rim, dark outline
  g.strokeStyle = "rgba(255,245,225,0.22)";
  g.lineWidth = 1;
  g.beginPath();
  g.moveTo(x + 1.5, y + topH - 2);
  g.lineTo(x + 1.5, y + 1.5);
  g.lineTo(x + w - 2, y + 1.5);
  g.stroke();
  rr(g, x, y, w, h, radius);
  g.strokeStyle = "#0e0f10";
  g.lineWidth = 1.2;
  g.stroke();
  g.beginPath();
  g.moveTo(x + 1, y + topH);
  g.lineTo(x + w - 1, y + topH);
  g.strokeStyle = "rgba(0,0,0,0.55)";
  g.stroke();
  return { x, y, w, h: topH, cx: x + w / 2, cy: y + topH / 2 };
}

/**
A short pipe stub with a flange, sticking out of a machine.
*/
export function pipeStub(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  const grad = g.createLinearGradient(x, y, w > h ? x : x + w, w > h ? y + h : y);
  grad.addColorStop(0, "#9aa0a4");
  grad.addColorStop(0.5, "#5d6266");
  grad.addColorStop(1, "#2c2f31");
  g.fillStyle = grad;
  g.fillRect(x, y, w, h);
  g.fillStyle = "#26292b";
  if (w > h) {
    g.fillRect(x, y - 1, 2, h + 2);
    g.fillRect(x + w - 2, y - 1, 2, h + 2);
    return;
  }
  g.fillRect(x - 1, y, w + 2, 2);
  g.fillRect(x - 1, y + h - 2, w + 2, 2);
}

/**
A vent grille: dark slots with a lit lower lip.
*/
export function vent(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  g.fillStyle = "#121314";
  g.fillRect(x, y, w, h);
  for (let sy = y + 1; sy < y + h - 1; sy += 2) {
    g.fillStyle = "rgba(255,255,255,0.12)";
    g.fillRect(x + 1, sy + 1, w - 2, 0.6);
  }
}

/**
A small blinking status light.
*/
export function led(g: CanvasRenderingContext2D, x: number, y: number, color: string, on: boolean) {
  g.fillStyle = on ? color : "#1c1c1c";
  if (on) {
    g.shadowColor = color;
    g.shadowBlur = 5;
  }
  circle(g, x, y, 1.4);
  g.fill();
  g.shadowBlur = 0;
}
