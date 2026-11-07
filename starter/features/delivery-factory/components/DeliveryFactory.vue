<script setup lang="ts">
/**
 * A clickable, animated Factorio-style factory for the software delivery
 * pipeline. Simulation lives in ../sim.ts, drawing in ../render.ts; this file
 * only wires the canvas, the loop, and the HTML controls around it.
 */
import { computed, reactive, ref } from "vue";
import FactoryFrame from "../../factory-kit/components/FactoryFrame.vue";
import { useFactoryCanvas } from "../../factory-kit/useFactoryCanvas";
import { hitStation, LAYOUT } from "../layout";
import {
  advanceView,
  consumeEvents,
  createView,
  paintStatic,
  render,
  STATION_COLORS,
  STATION_NAMES,
} from "../render";
import {
  type Era,
  type SimState,
  type StationId,
  BELT_SPEED,
  bottleneck,
  createSim,
  flowEfficiency,
  HOURS_PER_DAY,
  leadTimeDays,
  MAX_AI_AGENTS,
  perDay,
  RECIPES,
  recipeHours,
  STATION_IDS,
  stationStatus,
  step,
  type UpgradeId,
  LOW_RISK_REVIEW_HOURS,
  UPGRADES,
  waiting,
} from "../sim";

const props = withDefaults(
  defineProps<{ era?: Era; showEraToggle?: boolean }>(),
  {
    era: "2026",
    showEraToggle: true,
  },
);

/** Sim hours per real second at 1× speed. */
const HOURS_PER_SECOND = 1.4;
/** Below this width the map scrolls sideways instead of shrinking further. */
const MIN_CANVAS_WIDTH = 760;
const layout = LAYOUT;
const topo = LAYOUT.topology;

const frame = ref<InstanceType<typeof FactoryFrame>>();

/** Grey placeholders where the floors, machines and silo will appear. */
const skeleton = {
  floors: layout.concrete,
  machines: [...Object.values(layout.machines).flat().map((m) => m.rect), layout.silo],
};

const ui = reactive({
  era: props.era,
  running: true,
  speed: 1,
  selected: null as StationId | null,
  upgrades: {
    review: false,
    blast: false,
    qa: false,
    business: false,
  } as Record<UpgradeId, boolean>,
  tick: 0,
});

let sim: SimState = createSim(ui.era, topo);
let view = createView();
let sinceUi = 0;

// --------------------------------------------------------------- stats for the HTML panels

const stats = computed(() => {
  void ui.tick;
  return {
    ideas: perDay(sim, "business"),
    prs: perDay(sim, "dev"),
    shipped: perDay(sim, "ship"),
    lead: leadTimeDays(sim),
    flow: flowEfficiency(sim),
    reviewQueue: waiting(sim, "review"),
    launches: sim.launches,
    day: Math.floor(sim.time / HOURS_PER_DAY) + 1,
    bottleneck: bottleneck(sim),
  };
});

const DESCRIPTIONS: Record<StationId, string> = {
  business:
    "Product and business. Customer calls, strategy decks, stakeholder alignment, then a ticket. Nobody put an agent in this box, so it still runs at meeting speed.",
  dev: "Three developers, each with a coding agent (the blue beacons). Ticket in, pull request out, in about an hour. Watch the yellow icons: most of the time they wait for work.",
  review:
    "Code review. Two humans still have to read, understand, and trust every diff. Agents write code faster than people can read it, so the red PR belt backs up.",
  qa: "QA and testing. Staging, manual checks, sign-off. One PR in four turns into a bug; the splitter sends it back to dev on the rework belt.",
  ship: "Release. Every shipped feature adds a rocket part. Ten parts and the rocket launches.",
};

const DEV_2022 =
  "Three developers typing code by hand. More than a day per ticket. For twenty years this was the slow part, so every process was tuned around it.";

function describe(id: StationId) {
  return id === "dev" && ui.era === "2022" ? DEV_2022 : DESCRIPTIONS[id];
}

function formatHours(h: number) {
  if (h < 1) return `${Math.round(h * 60)} min`;
  return `${Number.isInteger(h) ? h : h.toFixed(1)} h`;
}

const inspector = computed(() => {
  void ui.tick;
  const id = ui.selected;
  if (!id) return null;
  if (id === "ship") {
    return {
      id,
      name: STATION_NAMES[id],
      status: "Launch pad",
      tone: "ok",
      rows: [
        ["Shipped", String(sim.shipped)],
        ["Rocket parts", `${sim.rocketParts} / 10`],
        ["Launches", String(sim.launches)],
      ],
      text: describe(id),
    };
  }
  const st = sim.stations[id];
  const status = stationStatus(sim, id);
  return {
    id,
    name: STATION_NAMES[id],
    status:
      status === "working"
        ? "Working"
        : status === "starved"
          ? "Waiting for input"
          : "Output full",
    tone: status === "working" ? "ok" : status === "starved" ? "warn" : "bad",
    rows: [
      ["Machines", String(st.machines.length)],
      ["Time per item", formatHours(recipeHours(sim, id))],
      ["Utilization", `${Math.round(st.utilization * 100)}%`],
      ["Waiting on belt", id === "business" ? "n/a" : String(waiting(sim, id))],
      ["Output per day", perDay(sim, id).toFixed(1)],
    ],
    text: describe(id),
  };
});

const canAddAgent = computed(() => {
  void ui.tick;
  return ui.era === "2026" && sim.aiAgents < MAX_AI_AGENTS;
});

// --------------------------------------------------------------- actions

function reset(era: Era = ui.era) {
  ui.era = era;
  sim = createSim(era, topo);
  sim.upgrades = { ...ui.upgrades };
  const selected = view.selected;
  view = createView();
  view.selected = selected;
  ui.tick++;
  if (!ui.running) draw();
}

/** Each upgrade fixes one stage. Ticking them in order walks the bottleneck around. */
const UPGRADE_COPY: Record<
  UpgradeId,
  { title: string; detail: string; extra?: string }
> = {
  review: { title: "AI pre-review + small PRs", detail: "Code review" },
  blast: {
    title: "Review by blast radius",
    detail: "Low-risk PRs (70%)",
    extra: "only risky ones (orange dot) get a full review",
  },
  qa: {
    title: "Automated tests in CI",
    detail: "QA",
    extra: "bugs 25% → 10%",
  },
  business: { title: "AI-assisted product discovery", detail: "Business" },
};
const UPGRADE_ORDER: UpgradeId[] = ["review", "blast", "qa", "business"];

function upgradeEffect(id: UpgradeId) {
  const { detail, extra } = UPGRADE_COPY[id];
  const [from, to] =
    id === "blast"
      ? [recipeHours(sim, "review"), LOW_RISK_REVIEW_HOURS]
      : [RECIPES[ui.era][id], UPGRADES[id].hours];
  const speed = `${detail}: ${formatHours(from)} → ${formatHours(to)} per item`;
  return extra ? `${speed}, ${extra}` : speed;
}

function toggleUpgrade(id: UpgradeId) {
  sim.upgrades[id] = !sim.upgrades[id];
  ui.upgrades[id] = sim.upgrades[id];
  ui.tick++;
  if (!ui.running) draw();
}

function addAgent() {
  if (!canAddAgent.value) return;
  sim.aiAgents++;
  ui.tick++;
}

function select(id: StationId | null) {
  ui.selected = id === ui.selected ? null : id;
  view.selected = ui.selected;
  if (!ui.running) draw();
}

function toggleRunning() {
  ui.running = !ui.running;
  if (ui.running) start();
}

// --------------------------------------------------------------- canvas plumbing

const { ready, draw, start, toWorld } = useFactoryCanvas({
  root: computed(() => frame.value?.root),
  canvas: computed(() => frame.value?.canvas),
  width: layout.width,
  height: layout.height,
  minWidth: MIN_CANVAS_WIDTH,
  paintGround: (scale) => paintStatic(layout, scale),
  render: (g, ground) => render(g, ground, layout, sim, view, ui.running),
  update(dt) {
    step(sim, topo, dt * HOURS_PER_SECOND * ui.speed);
    consumeEvents(sim, view, layout);
    advanceView(sim, view, dt, BELT_SPEED * HOURS_PER_SECOND * ui.speed);
    sinceUi += dt;
    if (sinceUi > 0.25) {
      sinceUi = 0;
      ui.tick++;
    }
  },
  running: () => ui.running,
  onReducedMotion() {
    ui.running = false;
    // Pre-warm so a paused factory still shows the pile-up.
    step(sim, topo, 40);
    // Drop the pre-warm's events: their swings and floaters would freeze on the paused frame.
    sim.events.length = 0;
    ui.tick++;
  },
});

function setCursor(pointer: boolean) {
  const c = frame.value?.canvas;
  if (c) c.style.cursor = pointer ? "pointer" : "default";
}

function onMove(e: PointerEvent) {
  const hit = hitStation(layout, toWorld(e));
  view.hovered = hit;
  setCursor(!!hit);
  if (!ui.running) draw();
}

function onLeave() {
  view.hovered = null;
  if (!ui.running) draw();
}

function onClick(e: PointerEvent) {
  const hit = hitStation(layout, toWorld(e));
  if (hit) select(hit);
}

const ariaLabel = computed(() => {
  void ui.tick;
  const s = stats.value;
  return `Animated factory of a software team in ${ui.era}. Business makes ${s.ideas.toFixed(1)} tickets a day, dev opens ${s.prs.toFixed(1)} pull requests a day, ${s.reviewQueue} pull requests wait for review, ${s.shipped.toFixed(1)} features ship a day.`;
});
</script>

<template>
  <FactoryFrame
    ref="frame"
    title="The delivery factory"
    :ready="ready"
    :width="layout.width"
    :height="layout.height"
    :min-width="MIN_CANVAS_WIDTH"
    :label="ariaLabel"
    :skeleton="skeleton"
    @pointermove="onMove"
    @pointerleave="onLeave"
    @click="onClick"
  >
    <template #meta>
      <span class="day">Day {{ stats.day }}</span>
    </template>
    <template #controls>
      <div
        v-if="showEraToggle"
        class="segmented"
        role="group"
        aria-label="Era"
      >
        <button
          v-for="era in ['2022', '2026'] as const"
          :key="era"
          type="button"
          class="btn"
          :aria-pressed="ui.era === era"
          @click="reset(era)"
        >
          {{ era === "2022" ? "2022 · by hand" : "2026 · with AI" }}
        </button>
      </div>
      <button
        type="button"
        class="btn"
        :aria-pressed="!ui.running"
        @click="toggleRunning"
      >
        {{ ui.running ? "Pause" : "Play" }}
      </button>
      <button
        type="button"
        class="btn"
        :aria-pressed="ui.speed === 3"
        @click="ui.speed = ui.speed === 1 ? 3 : 1"
      >
        {{ ui.speed }}×
      </button>
      <button type="button" class="btn" @click="reset()">Reset</button>
    </template>

    <div class="stats">
      <div class="stat">
        <span class="label">Ideas / day</span>
        <span class="value">{{ stats.ideas.toFixed(1) }}</span>
      </div>
      <div class="stat">
        <span class="label">PRs opened / day</span>
        <span class="value">{{ stats.prs.toFixed(1) }}</span>
      </div>
      <div class="stat">
        <span class="label">Shipped / day</span>
        <span class="value">{{ stats.shipped.toFixed(1) }}</span>
      </div>
      <div class="stat" :class="{ alarm: stats.lead > 3 }">
        <span class="label">Idea → prod</span>
        <span class="value">{{
          stats.lead ? `${stats.lead.toFixed(1)} d` : "–"
        }}</span>
      </div>
      <div class="stat">
        <span class="label">Hands-on time</span>
        <span class="value">{{
          stats.flow ? `${Math.round(stats.flow * 100)}%` : "–"
        }}</span>
      </div>
    </div>

    <fieldset class="upgrades">
      <legend>
        Research upgrades <span>tick one, wait, watch the red label move</span>
      </legend>
      <div class="upgrade-grid">
        <label
          v-for="id in UPGRADE_ORDER"
          :key="id"
          class="upgrade"
          :class="{ on: ui.upgrades[id] }"
        >
          <input
            type="checkbox"
            :checked="ui.upgrades[id]"
            @change="toggleUpgrade(id)"
          />
          <span class="upgrade-box" aria-hidden="true" />
          <span class="upgrade-text">
            <strong>{{ UPGRADE_COPY[id].title }}</strong>
            <small>{{ upgradeEffect(id) }}</small>
          </span>
        </label>
      </div>
    </fieldset>

    <div class="machines" role="group" aria-label="Inspect a machine">
      <button
        v-for="id in STATION_IDS"
        :key="id"
        type="button"
        class="chip"
        :aria-pressed="ui.selected === id"
        :style="{ '--chip': STATION_COLORS[id] }"
        @click="select(id)"
      >
        <span class="swatch" aria-hidden="true" />
        {{ STATION_NAMES[id] }}
        <span v-if="stats.bottleneck === id" class="hot">bottleneck</span>
      </button>
    </div>

    <section v-if="inspector" class="inspector" aria-live="polite">
      <div class="inspector-head">
        <strong>{{ inspector.name }}</strong>
        <span class="pill" :data-tone="inspector.tone">{{
          inspector.status
        }}</span>
      </div>
      <dl>
        <div v-for="[k, v] in inspector.rows" :key="k">
          <dt>{{ k }}</dt>
          <dd>{{ v }}</dd>
        </div>
      </dl>
      <p>{{ inspector.text }}</p>
      <button
        v-if="inspector.id === 'dev' && ui.era === '2026'"
        type="button"
        class="btn primary"
        :disabled="!canAddAgent"
        @click="addAgent"
      >
        {{ canAddAgent ? "Build another AI beacon" : "All beacons built" }}
      </button>
    </section>
    <p v-else class="hint">
      Click a machine to inspect it. Add more AI to dev and “Shipped / day”
      barely moves. Tick the upgrades one by one and watch the bottleneck move.
    </p>
  </FactoryFrame>
</template>

<style scoped>
.upgrades {
  margin: 0;
  padding: 0.7rem 0.75rem 0;
  border: 0;
}

.upgrade-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
  gap: 0.5rem;
}

.upgrades legend {
  padding: 0;
  margin-bottom: 0.4rem;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--f-dim);
}

.upgrades legend span {
  margin-left: 0.4rem;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0;
}

.upgrade {
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
  padding: 0.55rem 0.65rem;
  border: 1px solid var(--f-edge);
  border-radius: 6px;
  background: linear-gradient(#3a393a, #2f2e2f);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.07);
  cursor: pointer;
}

.upgrade:hover {
  border-color: var(--f-orange);
}

.upgrade.on {
  border-color: #5fd068;
  background: linear-gradient(#2f4a31, #263a28);
}

.upgrade input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.upgrade:has(input:focus-visible) {
  outline: 2px solid var(--site-color-focus-ring);
  outline-offset: 2px;
}

.upgrade-box {
  flex: none;
  width: 18px;
  height: 18px;
  margin-top: 1px;
  border-radius: 3px;
  border: 1px solid var(--f-edge);
  background: #1b1a1b;
  box-shadow: inset 0 1px 3px rgb(0 0 0 / 0.6);
}

.upgrade.on .upgrade-box {
  background: #5fd068;
  box-shadow: inset 0 -2px 0 rgb(0 0 0 / 0.25);
}

.upgrade.on .upgrade-box::after {
  content: "";
  display: block;
  width: 5px;
  height: 10px;
  margin: 2px 0 0 6px;
  border: solid #0b1a0c;
  border-width: 0 2.5px 2.5px 0;
  transform: rotate(45deg);
}

.upgrade-text {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  line-height: 1.3;
}

.upgrade-text strong {
  font-size: 0.85rem;
}

.upgrade-text small {
  font-size: 0.75rem;
  color: var(--f-dim);
}

.machines {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding: 0.7rem 0.75rem 0;
}

.inspector {
  margin: 0.7rem 0.75rem 0.85rem;
}

.inspector {
  padding: 0.75rem 0.85rem;
  border-radius: 6px;
  background: #1e1d1e;
  border: 1px solid var(--f-edge);
  box-shadow: inset 0 2px 6px rgb(0 0 0 / 0.5);
}

.inspector-head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.5rem;
}

.pill {
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  background: #3d9f45;
  color: #08140a;
}

.pill[data-tone="warn"] {
  background: #f5c518;
}

.pill[data-tone="bad"] {
  background: #e0332a;
  color: #fff;
}

dl {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8.5rem, 1fr));
  gap: 0.35rem 1rem;
  margin: 0 0 0.5rem;
}

dt {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--f-dim);
}

dd {
  margin: 0;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}

.inspector p {
  margin: 0 0 0.4rem;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--f-text);
}
</style>
