/**
 * Machines: assembler, lab, chemical plant, mining drill, beacon, rocket silo.
 */
import { type RectPx, type TileRect, rectPx } from "../geometry";
import type { Particle } from "./overlay";
import { bolts, circle, paintShadow, plate, progressBar, rr, workGlow } from "./primitives";
import { block, cached, led, pipeStub, vent, weather } from "./texture";

export const LAUNCH_SECONDS = 5;

/**
The bits of view state a rocket launch reads and writes.
*/
export interface LaunchFx {
  clock: number;
  launchAt: number | null;
  smoke: Particle[];
}

type Rgb = [string, string];

/**
Palettes for the machine bodies: top-face gradient and the front face.
*/
const STEEL: { top: Rgb; front: string } = { top: ["#8e9aa3", "#55616a"], front: "#2c343a" };
const OLIVE: { top: Rgb; front: string } = { top: ["#8f8762", "#575036"], front: "#322e1d" };
const BRONZE: { top: Rgb; front: string } = { top: ["#a08458", "#5e4a2e"], front: "#352918" };

const DEPTH = 7;

/**
The cached, weathered body every 3×3 machine stands on: corner feet, pipe
stubs north and south, a tall block with vents on its front face. Returns the
top face, where the live parts go.
*/
function machineBody(
  g: CanvasRenderingContext2D,
  r: TileRect,
  kind: string,
  palette: { top: Rgb; front: string },
  extra?: (s: CanvasRenderingContext2D, top: RectPx) => void,
): RectPx {
  const p = rectPx(r);
  const x = p.x + 2;
  const y = p.y + 1;
  const w = p.w - 4;
  const h = p.h - 2;
  const top = { x, y, w, h: h - DEPTH, cx: x + w / 2, cy: y + (h - DEPTH) / 2 };
  cached(g, kind, p, 4, (s) => {
    // pipe stubs into the neighbouring tiles
    pipeStub(s, p.cx - 3, p.y - 2, 6, 5);
    pipeStub(s, p.cx - 3, p.y + p.h - 3, 6, 5);
    // corner feet
    s.fillStyle = "#1b1c1d";
    for (const [fx, fy] of [
      [p.x, p.y + 2],
      [p.x + p.w - 8, p.y + 2],
      [p.x, p.y + p.h - 9],
      [p.x + p.w - 8, p.y + p.h - 9],
    ] as const) {
      s.fillRect(fx, fy, 8, 8);
    }
    block(s, x, y, w, h, DEPTH, palette.top, palette.front, r.x * 31 + r.y * 17 + kind.length);
    vent(s, x + 5, y + h - DEPTH + 2, 9, DEPTH - 3);
    vent(s, x + w - 14, y + h - DEPTH + 2, 9, DEPTH - 3);
    bolts(s, x, y, w, h - DEPTH, 3.5);
    extra?.(s, top);
  });
  return top;
}

/**
A round machine window: dark well with a metal rim.
*/
function well(s: CanvasRenderingContext2D, cx: number, cy: number, r: number, rim = "#2a2d30") {
  s.fillStyle = "rgba(0,0,0,0.45)";
  circle(s, cx + 1, cy + 1.5, r + 3);
  s.fill();
  const ring = s.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
  ring.addColorStop(0, "#c3c8cc");
  ring.addColorStop(1, "#3e4246");
  s.fillStyle = ring;
  circle(s, cx, cy, r + 2.5);
  s.fill();
  s.fillStyle = rim;
  circle(s, cx, cy, r);
  s.fill();
  const inner = s.createRadialGradient(cx, cy - r * 0.4, 1, cx, cy, r);
  inner.addColorStop(0, "#1d1f21");
  inner.addColorStop(1, "#070808");
  s.fillStyle = inner;
  circle(s, cx, cy, r - 1);
  s.fill();
}

export function drawAssembler(
  g: CanvasRenderingContext2D,
  r: TileRect,
  accent: string,
  working: boolean,
  progress: number,
  spin: number,
  clock: number,
  modules: number,
) {
  const top = machineBody(g, r, `assembler-${accent}`, STEEL, (s, t) => {
    // tier stripes on the north rim, like the game's assembler tiers
    s.fillStyle = accent;
    s.fillRect(t.x + 7, t.y + 3, 8, 2.5);
    s.fillRect(t.x + t.w - 15, t.y + 3, 8, 2.5);
    s.fillStyle = "rgba(0,0,0,0.35)";
    s.fillRect(t.x + 7, t.y + 5.5, 8, 1);
    s.fillRect(t.x + t.w - 15, t.y + 5.5, 8, 1);
    well(s, t.cx, t.cy + 1, 15);
  });
  const cx = top.cx;
  const cy = top.cy + 1;
  workGlow(g, cx, cy, 15, accent, working, clock);
  g.save();
  g.translate(cx, cy);
  g.rotate(spin);
  g.strokeStyle = "#a7adb2";
  g.lineWidth = 3;
  g.lineCap = "round";
  g.beginPath();
  for (let i = 0; i < 3; i++) {
    const a = (i * Math.PI * 2) / 3;
    g.moveTo(0, 0);
    g.lineTo(Math.cos(a) * 11, Math.sin(a) * 11);
  }
  g.stroke();
  g.fillStyle = "#d6dadd";
  for (let i = 0; i < 3; i++) {
    const a = (i * Math.PI * 2) / 3;
    circle(g, Math.cos(a) * 11, Math.sin(a) * 11, 2);
    g.fill();
  }
  g.restore();
  g.fillStyle = accent;
  circle(g, cx, cy, 3);
  g.fill();
  led(g, top.x + top.w - 4, top.y + top.h - 4, working ? "#7dff8a" : "#ffb347", !working || Math.sin(clock * 8) > -0.6);

  // module slots along the front face
  if (modules >= 0) {
    for (let i = 0; i < 4; i++) {
      const mx = top.x + 10 + i * 9;
      const my = top.y + top.h + 1;
      g.fillStyle = "#0d0e0f";
      g.fillRect(mx, my, 7, 5);
      if (i < modules) {
        g.fillStyle = "#4f86ff";
        g.fillRect(mx + 1, my + 1, 5, 3);
        g.fillStyle = "#cfe0ff";
        g.fillRect(mx + 2, my + 1.5, 1.5, 1.2);
      }
    }
  }
  progressBar(g, rectPx(r), progress);
}

export function drawLab(g: CanvasRenderingContext2D, r: TileRect, progress: number, clock: number) {
  const top = machineBody(g, r, "lab", BRONZE, (s, t) => {
    // the rotunda the dome sits in
    s.fillStyle = "rgba(0,0,0,0.5)";
    circle(s, t.cx + 2, t.cy + 3, 22);
    s.fill();
    const ring = s.createLinearGradient(t.cx - 21, t.cy - 21, t.cx + 21, t.cy + 21);
    ring.addColorStop(0, "#d2d6da");
    ring.addColorStop(0.5, "#7d8287");
    ring.addColorStop(1, "#383b3e");
    s.fillStyle = ring;
    circle(s, t.cx, t.cy, 20.5);
    s.fill();
    s.strokeStyle = "#111";
    s.lineWidth = 1;
    s.stroke();
    // bolts around the ring
    s.fillStyle = "#2a2c2e";
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      circle(s, t.cx + Math.cos(a) * 18.8, t.cy + Math.sin(a) * 18.8, 0.9);
      s.fill();
    }
  });
  const { cx, cy } = top;
  const dome = g.createRadialGradient(cx - 5, cy - 6, 1, cx, cy, 16);
  const pulse = 0.55 + Math.sin(clock * 3) * 0.15;
  dome.addColorStop(0, `rgba(235,210,255,${pulse + 0.2})`);
  dome.addColorStop(0.45, "rgba(150,85,230,0.85)");
  dome.addColorStop(1, "rgba(28,14,56,1)");
  g.fillStyle = dome;
  circle(g, cx, cy, 16);
  g.fill();
  // science packs orbiting inside the glass
  const colors = ["#ff5a5a", "#5ad15a", "#5aa8ff", "#ffd25a", "#c77dff", "#ffffff"];
  for (let i = 0; i < colors.length; i++) {
    const a = clock * 1.2 + (i * Math.PI * 2) / colors.length;
    g.fillStyle = colors[i]!;
    g.shadowColor = colors[i]!;
    g.shadowBlur = 5;
    circle(g, cx + Math.cos(a) * 10, cy + Math.sin(a) * 10 * 0.8, 1.7);
    g.fill();
  }
  g.shadowBlur = 0;
  g.fillStyle = "rgba(255,255,255,0.5)";
  g.beginPath();
  g.ellipse(cx - 6, cy - 7, 5, 2.5, -0.7, 0, Math.PI * 2);
  g.fill();
  progressBar(g, rectPx(r), progress);
}

export function drawChemPlant(g: CanvasRenderingContext2D, r: TileRect, working: boolean, progress: number, clock: number) {
  const top = machineBody(g, r, "chem", STEEL, (s, t) => {
    for (const tx of [t.x + 13, t.x + t.w - 13]) {
      const ty = t.y + 11;
      s.fillStyle = "rgba(0,0,0,0.45)";
      circle(s, tx + 1.5, ty + 2, 10);
      s.fill();
      s.fillStyle = "#2a2d30";
      circle(s, tx, ty, 9.5);
      s.fill();
      const liquid = s.createRadialGradient(tx - 3, ty - 3, 1, tx, ty, 8);
      liquid.addColorStop(0, "#c8ffad");
      liquid.addColorStop(1, "#2a7f25");
      s.fillStyle = liquid;
      circle(s, tx, ty, 7.5);
      s.fill();
      s.strokeStyle = "#a0a6aa";
      s.lineWidth = 1.5;
      circle(s, tx, ty, 8.7);
      s.stroke();
    }
    well(s, t.cx, t.cy + 7, 10);
  });
  const cx = top.cx;
  const cy = top.cy + 7;
  workGlow(g, cx, cy, 12, "#5bd16b", working, clock);
  if (working) {
    g.fillStyle = "rgba(190,255,170,0.85)";
    for (let i = 0; i < 5; i++) {
      const t = (clock * 0.8 + i * 0.21) % 1;
      circle(g, cx - 6 + ((i * 37) % 12), cy + 7 - t * 12, 1.5 * (1 - t) + 0.5);
      g.fill();
    }
  }
  progressBar(g, rectPx(r), progress);
}

let bladePath: Path2D | undefined;

/**
One spiral blade of the drill bit, built on first use (there's no Path2D during SSR).
*/
function drillBlade(): Path2D {
  if (bladePath) return bladePath;
  bladePath = new Path2D();
  bladePath.moveTo(0, 0);
  bladePath.quadraticCurveTo(7, -2, 11, 4);
  return bladePath;
}

/**
Electric mining drill: a spinning bit in an ore pit, with dust flying while it digs.
*/
export function drawMiningDrill(
  g: CanvasRenderingContext2D,
  r: TileRect,
  accent: string,
  working: boolean,
  progress: number,
  clock: number,
) {
  const top = machineBody(g, r, "drill", OLIVE, (s, t) => {
    // hazard rails on the frame
    for (const ry of [t.y + 3, t.y + t.h - 6]) {
      s.fillStyle = "#c9a227";
      s.fillRect(t.x + 6, ry, t.w - 12, 3);
      s.fillStyle = "#1d1a12";
      for (let hx = t.x + 7; hx < t.x + t.w - 8; hx += 5) s.fillRect(hx, ry, 2, 3);
    }
    // ore pit
    const pit = s.createRadialGradient(t.cx, t.cy, 2, t.cx, t.cy, 15);
    pit.addColorStop(0, "#0b0a09");
    pit.addColorStop(0.7, "#2c2218");
    pit.addColorStop(1, "#4a3a28");
    s.fillStyle = pit;
    circle(s, t.cx, t.cy, 14.5);
    s.fill();
    s.strokeStyle = "#1a1712";
    s.lineWidth = 1.5;
    s.stroke();
  });
  const { cx, cy } = top;
  workGlow(g, cx, cy, 15, accent, working, clock);
  g.save();
  g.translate(cx, cy);
  g.rotate(working ? clock * 5 : 0);
  g.strokeStyle = "#c2c7cc";
  g.lineWidth = 2.6;
  g.lineCap = "round";
  const blade = drillBlade();
  for (let i = 0; i < 4; i++) {
    g.rotate(Math.PI / 2);
    g.stroke(blade);
  }
  g.restore();
  g.fillStyle = accent;
  circle(g, cx, cy, 3.5);
  g.fill();
  g.strokeStyle = "#1c1e20";
  g.lineWidth = 1;
  g.stroke();
  if (working) {
    g.fillStyle = "rgba(200,170,130,0.75)";
    for (let i = 0; i < 6; i++) {
      const t = (clock * 1.3 + i / 6) % 1;
      const a = i * 1.7 + clock;
      const d = 5 + t * 12;
      circle(g, cx + Math.cos(a) * d, cy + Math.sin(a) * d, 1.3 * (1 - t) + 0.4);
      g.fill();
    }
  }
  progressBar(g, rectPx(r), progress);
}

/**
A blueprint ghost: planned, not built yet.
*/
export function drawGhost(g: CanvasRenderingContext2D, r: TileRect) {
  const p = rectPx(r);
  g.fillStyle = "rgba(120,190,255,0.12)";
  rr(g, p.x + 3, p.y + 3, p.w - 6, p.h - 6, 5);
  g.fill();
  g.setLineDash([4, 3]);
  g.strokeStyle = "rgba(150,210,255,0.6)";
  g.lineWidth = 1.2;
  g.stroke();
  circle(g, p.cx, p.cy, Math.min(p.w, p.h) * 0.22);
  g.stroke();
  g.setLineDash([]);
}

/**
A drafting table: a real building with a blueprint sheet on top and a pen
that sketches while it works. For steps that plan (architect, a brief).
*/
export function drawPlanTable(g: CanvasRenderingContext2D, r: TileRect, working: boolean, progress: number, clock: number) {
  const top = machineBody(g, r, "plan", STEEL, (s, t) => {
    const x = t.x + 6;
    const y = t.y + 5;
    const w = t.w - 12;
    const h = t.h - 9;
    s.fillStyle = "#1d4f8f";
    s.fillRect(x, y, w, h);
    s.strokeStyle = "rgba(190,225,255,0.28)";
    s.lineWidth = 0.6;
    for (let gx = x + 5; gx < x + w; gx += 5) {
      s.beginPath();
      s.moveTo(gx, y);
      s.lineTo(gx, y + h);
      s.stroke();
    }
    for (let gy = y + 5; gy < y + h; gy += 5) {
      s.beginPath();
      s.moveTo(x, gy);
      s.lineTo(x + w, gy);
      s.stroke();
    }
    // a sketched box-and-arrow plan
    s.strokeStyle = "#e8f4ff";
    s.lineWidth = 1.2;
    s.strokeRect(x + 5, y + 5, 12, 9);
    s.strokeRect(x + w - 17, y + h - 14, 12, 9);
    s.beginPath();
    s.moveTo(x + 17, y + 10);
    s.lineTo(x + w - 11, y + 10);
    s.lineTo(x + w - 11, y + h - 14);
    s.stroke();
    s.strokeStyle = "#0e0f10";
    s.lineWidth = 1.2;
    s.strokeRect(x, y, w, h);
  });
  // the pen traces a small loop while working
  const a = working ? clock * 4 : 0.8;
  const px = top.cx + Math.cos(a) * 8;
  const py = top.cy + Math.sin(a) * 5;
  g.strokeStyle = "#2a2c2e";
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(top.x + top.w - 4, top.y + 3);
  g.lineTo(px, py);
  g.stroke();
  g.fillStyle = working ? "#ffd25a" : "#c3c8cc";
  circle(g, px, py, 2.2);
  g.fill();
  progressBar(g, rectPx(r), progress);
}

export function drawBeacon(g: CanvasRenderingContext2D, r: TileRect, built: boolean, clock: number, index: number) {
  const p = rectPx(r);
  if (!built) {
    drawGhost(g, r);
    return;
  }
  paintShadow(g, p.x + 4, p.y + 4, p.w - 8, p.h - 8, 14);
  plate(g, p.x + 3, p.y + 3, p.w - 6, p.h - 6, "#3a3e43", 5);
  bolts(g, p.x + 3, p.y + 3, p.w - 6, p.h - 6, 5);
  const glow = g.createRadialGradient(p.cx, p.cy, 0, p.cx, p.cy, 26);
  const pulse = 0.45 + Math.sin(clock * 4 + index) * 0.2;
  glow.addColorStop(0, `rgba(90,150,255,${pulse})`);
  glow.addColorStop(1, "rgba(90,150,255,0)");
  g.fillStyle = glow;
  circle(g, p.cx, p.cy, 26);
  g.fill();
  g.fillStyle = "#1b1d20";
  circle(g, p.cx, p.cy, 12);
  g.fill();
  g.save();
  g.translate(p.cx, p.cy - 2);
  g.rotate(clock * 1.6 + index);
  g.strokeStyle = "#c4cad0";
  g.lineWidth = 2.4;
  g.beginPath();
  g.arc(0, 0, 9, -0.9, 0.9);
  g.stroke();
  g.beginPath();
  g.moveTo(0, 0);
  g.lineTo(9, 0);
  g.stroke();
  g.restore();
  g.fillStyle = "#7fb0ff";
  g.shadowColor = "#7fb0ff";
  g.shadowBlur = 8;
  for (const [lx, ly] of [
    [p.x + 9, p.y + 9],
    [p.x + p.w - 9, p.y + 9],
    [p.x + 9, p.y + p.h - 9],
    [p.x + p.w - 9, p.y + p.h - 9],
  ] as const) {
    circle(g, lx, ly, 1.8);
    g.fill();
  }
  g.shadowBlur = 0;
}

/**
0 = closed, 1 = open. Doors open over the first 15% of a launch and close over the last 15%.
*/
export function doorOpening(t: number): number {
  if (t < 0) return 0;
  return Math.min(1, t / 0.15, (1 - t) / 0.15);
}

/**
`parts` of `maxParts` fill the gauge under the silo.
*/
export function drawSilo(g: CanvasRenderingContext2D, silo: TileRect, fx: LaunchFx, parts: number, maxParts: number) {
  const p = rectPx(silo);
  const inner = 10;
  const corners = [
    [p.x + 6, p.y + 6],
    [p.x + p.w - 22, p.y + 6],
    [p.x + 6, p.y + p.h - 22],
    [p.x + p.w - 22, p.y + p.h - 22],
  ] as const;
  cached(g, "silo", p, 4, (s) => {
    block(s, p.x + 4, p.y + 4, p.w - 8, p.h - 6, 8, ["#7a7e80", "#4c5052"], "#2a2d2f", silo.x * 7 + silo.y, 6);
    rr(s, p.x + inner, p.y + inner, p.w - inner * 2, p.h - inner * 2 - 8, 4);
    s.fillStyle = "rgba(0,0,0,0.18)";
    s.fill();
    s.strokeStyle = "rgba(0,0,0,0.3)";
    s.lineWidth = 1;
    for (let i = 1; i < 4; i++) {
      const o = p.x + inner + ((p.w - inner * 2) / 4) * i;
      s.beginPath();
      s.moveTo(o, p.y + inner);
      s.lineTo(o, p.y + p.h - inner - 8);
      s.stroke();
    }
    for (const [tx, ty] of corners) {
      plate(s, tx, ty, 16, 16, "#33373b", 3);
      weather(s, tx, ty, 16, 16, tx + ty, 0.5);
    }
    vent(s, p.x + 14, p.y + p.h - 9, 22, 5);
    vent(s, p.x + p.w - 36, p.y + p.h - 9, 22, 5);
    pipeStub(s, p.x - 3, p.cy - 4, 6, 8);
    pipeStub(s, p.x + p.w - 3, p.cy - 4, 6, 8);
  });
  for (const [tx, ty] of corners) {
    g.fillStyle = (Math.floor(fx.clock * 2) + tx) % 2 === 0 ? "#ff5a3a" : "#5a1a10";
    circle(g, tx + 8, ty + 8, 2.5);
    g.fill();
  }

  const t = fx.launchAt === null ? -1 : (fx.clock - fx.launchAt) / LAUNCH_SECONDS;
  const open = doorOpening(t);
  const r = 38;
  const cy = p.cy - 4;
  g.fillStyle = "#0b0b0d";
  circle(g, p.cx, cy, r);
  g.fill();
  g.save();
  circle(g, p.cx, cy, r);
  g.clip();
  const slide = open * r;
  for (const side of [-1, 1]) {
    const x = side < 0 ? p.cx - r - slide : p.cx + slide;
    const grad = g.createLinearGradient(x, cy - r, x + r, cy + r);
    grad.addColorStop(0, "#8d9296");
    grad.addColorStop(1, "#5a5e62");
    g.fillStyle = grad;
    g.fillRect(x, cy - r, r, r * 2);
    g.fillStyle = "#c79b1c";
    g.fillRect(side < 0 ? p.cx - slide - 5 : p.cx + slide, cy - r, 5, r * 2);
  }
  g.restore();
  g.strokeStyle = "#2a2c2e";
  g.lineWidth = 5;
  circle(g, p.cx, cy, r + 1);
  g.stroke();
  g.strokeStyle = "#8d9296";
  g.lineWidth = 1.5;
  circle(g, p.cx, cy, r + 4);
  g.stroke();

  // rocket parts gauge
  const w = p.w - 24;
  const bx = p.x + 12;
  const by = p.y + p.h + 3;
  g.fillStyle = "rgba(0,0,0,0.7)";
  g.fillRect(bx - 1, by - 1, w + 2, 6);
  const seg = w / maxParts;
  g.fillStyle = "#ffa21c";
  for (let i = 0; i < parts; i++) g.fillRect(bx + i * seg + 0.5, by, seg - 1, 4);
}

export function drawRocket(g: CanvasRenderingContext2D, silo: TileRect, view: LaunchFx) {
  if (view.launchAt === null) return;
  const t = (view.clock - view.launchAt) / LAUNCH_SECONDS;
  if (t > 1) return;
  const p = rectPx(silo);
  const rise = t < 0.2 ? 0 : ((t - 0.2) / 0.8) ** 2.2;
  const scale = t < 0.2 ? 0.55 + (t / 0.2) * 0.45 : 1 + rise * 0.8;
  const y = p.cy - rise * (p.cy + 160);
  g.save();
  g.translate(p.cx, y);
  g.scale(scale, scale);
  if (t > 0.14) {
    const flick = 0.85 + Math.random() * 0.3;
    const flame = g.createRadialGradient(0, 34, 2, 0, 44, 34 * flick);
    flame.addColorStop(0, "rgba(255,255,230,1)");
    flame.addColorStop(0.3, "rgba(255,190,60,0.95)");
    flame.addColorStop(1, "rgba(255,80,0,0)");
    g.fillStyle = flame;
    g.beginPath();
    g.ellipse(0, 46, 14, 38 * flick, 0, 0, Math.PI * 2);
    g.fill();
  }
  g.fillStyle = "#dcdddf";
  g.strokeStyle = "#232323";
  g.lineWidth = 1.5;
  g.beginPath();
  g.moveTo(0, -40);
  g.quadraticCurveTo(12, -24, 11, 26);
  g.lineTo(-11, 26);
  g.quadraticCurveTo(-12, -24, 0, -40);
  g.fill();
  g.stroke();
  g.fillStyle = "#3a3a3a";
  g.fillRect(-11, 8, 22, 5);
  g.fillStyle = "#e85d4a";
  for (const side of [-1, 1]) {
    const path10 = new Path2D();
    path10.moveTo(side * 10, 10);
    path10.lineTo(side * 20, 30);
    path10.lineTo(side * 10, 26);
    g.fill(path10);
  }
  g.fillStyle = "#4aa3ff";
  circle(g, 0, -14, 4.5);
  g.fill();
  g.restore();

  if (t > 0.14 && t < 0.9) {
    for (let i = 0; i < 4; i++) {
      view.smoke.push({
        x: p.cx + (Math.random() - 0.5) * 40,
        y: Math.min(p.cy + 24, y + 44),
        vx: (Math.random() - 0.5) * 80,
        vy: 8 + Math.random() * 30,
        r: 7 + Math.random() * 9,
        born: view.clock,
        life: 1.5 + Math.random(),
        shade: 200,
      });
    }
  }
}

