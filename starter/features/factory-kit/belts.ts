/**
 * Belt physics shared by every factory scene. Items move at a fixed speed,
 * keep a minimum gap, and stop when the item in front stops, so a slow
 * machine shows up as a belt that backs up and stands still.
 */

export interface BeltItem<I> {
  item: I;
  /**
  Distance along the belt path in world pixels.
  */
  d: number;
  /**
  True when the item barely moved last tick: it is queueing.
  */
  still?: boolean;
}

export interface Belt<Id extends string, I> {
  id: Id;
  length: number;
  /**
  Sorted by `d`, back of the belt first.
  */
  items: BeltItem<I>[];
}

export const ITEM_GAP = 10;
/**
How close to an inserter's pickup point an item must be to get grabbed.
*/
export const PICK_WINDOW = 7;

export function createBelt<Id extends string, I>(id: Id, length: number): Belt<Id, I> {
  return { id, length, items: [] };
}

export function canInsert<I>(belt: Belt<string, I>, d: number): boolean {
  return belt.items.every((bi) => Math.abs(bi.d - d) >= ITEM_GAP);
}

export function insert<I>(belt: Belt<string, I>, item: I, d: number) {
  const at = belt.items.findIndex((bi) => bi.d > d);
  const entry = { item, d };
  if (at === -1) belt.items.push(entry);
  if (at !== -1) belt.items.splice(at, 0, entry);
}

/**
 * Move every item `distance` px forward, front item first. `stopAt` lets a
 * scene hold some items earlier than the belt end, e.g. in front of a filter
 * splitter that diverts them.
 */
export function moveBelt<I>(belt: Belt<string, I>, distance: number, stopAt?: (item: I, d: number) => number | undefined) {
  let limit = belt.length;
  for (let i = belt.items.length - 1; i >= 0; i--) {
    const bi = belt.items[i]!;
    const stop = stopAt?.(bi.item, bi.d);
    const cap = stop === undefined ? limit : Math.min(limit, stop);
    const next = Math.max(bi.d, Math.min(bi.d + distance, cap));
    bi.still = next - bi.d < distance * 0.5;
    bi.d = next;
    limit = bi.d - ITEM_GAP;
  }
}

/**
Take the item within PICK_WINDOW of d, if any. `accept` makes it a filter inserter.
*/
export function grab<I>(belt: Belt<string, I>, d: number, accept?: (item: I) => boolean): I | null {
  const at = belt.items.findIndex((bi) => Math.abs(bi.d - d) <= PICK_WINDOW && (!accept || accept(bi.item)));
  if (at === -1) return null;
  return belt.items.splice(at, 1)[0]!.item;
}

/**
The front item, once it has reached the end of the belt.
*/
export function atEnd<I>(belt: Belt<string, I>): BeltItem<I> | undefined {
  const last = belt.items.at(-1);
  return last && last.d >= belt.length - 0.01 ? last : undefined;
}

/**
Move the first item that has reached `at` onto another belt at `toD`, if there is room.
*/
export function divert<I>(from: Belt<string, I>, at: number, to: Belt<string, I>, toD: number, match: (item: I) => boolean) {
  const i = from.items.findIndex((bi) => match(bi.item) && bi.d >= at - 0.01);
  if (i === -1 || !canInsert(to, toD)) return;
  const [moved] = from.items.splice(i, 1);
  insert(to, moved!.item, toD);
}

/**
Side-load the front item onto another belt once it reaches the end.
*/
export function merge<I>(from: Belt<string, I>, to: Belt<string, I>, toD: number) {
  const last = atEnd(from);
  if (!last || !canInsert(to, toD)) return;
  from.items.pop();
  insert(to, last.item, toD);
}
