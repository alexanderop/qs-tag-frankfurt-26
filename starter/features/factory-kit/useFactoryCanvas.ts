/**
 * Canvas plumbing every factory scene needs: crisp sizing for the device
 * pixel ratio, a cached ground layer, a requestAnimationFrame loop that only
 * runs while the canvas is on screen, and pointer → world coordinates.
 */
import { onBeforeUnmount, onMounted, type Ref, ref } from "vue";
import type { Point } from "./geometry";

export interface FactoryCanvasOptions {
  root: Ref<HTMLElement | undefined>;
  canvas: Ref<HTMLCanvasElement | undefined>;
  /**
  Map size in world px.
  */
  width: number;
  height: number;
  /**
  Below this CSS width the map scrolls sideways instead of shrinking further.
  */
  minWidth: number;
  /**
  Paint the static ground once per resize, at `pixelScale` device px per world px.
  */
  paintGround: (pixelScale: number) => HTMLCanvasElement;
  /**
  Draw one frame in world coordinates.
  */
  render: (g: CanvasRenderingContext2D, ground: HTMLCanvasElement) => void;
  /**
  Advance the scene by `dt` real seconds.
  */
  update: (dt: number) => void;
  running: () => boolean;
  /**
  Called once on mount when the reader prefers reduced motion, before the first frame.
  */
  onReducedMotion?: () => void;
}

export function useFactoryCanvas(o: FactoryCanvasOptions) {
  /**
  False until the first frame is drawn.
  */
  const ready = ref(false);
  let ground: HTMLCanvasElement | null = null;
  let frame = 0;
  let last = 0;
  let visible = false;

  function draw() {
    const c = o.canvas.value;
    if (!c || !ground) return;
    const g = c.getContext("2d");
    if (!g) return;
    const scale = c.width / o.width;
    g.setTransform(scale, 0, 0, scale, 0, 0);
    o.render(g, ground);
  }

  function loop(now: number) {
    frame = 0;
    if (!visible || !o.running()) return;
    const dt = Math.min(0.1, last ? (now - last) / 1000 : 0);
    last = now;
    o.update(dt);
    draw();
    frame = requestAnimationFrame(loop);
  }

  function start() {
    if (frame || !visible || !o.running()) return;
    last = 0;
    frame = requestAnimationFrame(loop);
  }

  function resize() {
    const el = o.root.value;
    const c = o.canvas.value;
    if (!el || !c) return;
    if (el.clientWidth === 0) return;
    const width = Math.max(el.clientWidth, o.minWidth);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssHeight = (width * o.height) / o.width;
    c.width = Math.round(width * dpr);
    c.height = Math.round(cssHeight * dpr);
    ground = o.paintGround(c.width / o.width);
    draw();
    ready.value = true;
  }

  function toWorld(e: PointerEvent): Point {
    const rect = o.canvas.value!.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * o.width,
      y: ((e.clientY - rect.top) / rect.height) * o.height,
    };
  }

  let resizeObserver: ResizeObserver | undefined;
  let intersectionObserver: IntersectionObserver | undefined;

  onMounted(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) o.onReducedMotion?.();
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(o.root.value!);
    intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      if (visible) start();
    });
    intersectionObserver.observe(o.canvas.value!);
    resize();
  });

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame);
    resizeObserver?.disconnect();
    intersectionObserver?.disconnect();
  });

  return { ready, draw, start, toWorld };
}
