/**
mulberry32 on a state object, so a reset replays the same run.
*/
export function random(s: { seed: number }): number {
  s.seed = (s.seed + 0x6D_2B_79_F5) >>> 0;
  let t = s.seed;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296;
}
