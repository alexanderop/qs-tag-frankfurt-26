---
theme: '@alexop/slidev-theme-brand'
addons:
  - '@alexop/slidev-addon-utils'
title: 'KI-Agenten als QA-Engineer: Automatisierte Qualitätssicherung mit Claude Code & GitHub Actions'
footerEvent: 'QS-Tag Frankfurt 2026'
hideFooter: true
layout: image
image: /qs-tag-frankfurt-2026.jpeg
backgroundSize: contain
transition: slide-left
comark: true
pwa: build
seoMeta:
  ogImage: auto
shiki:
  magicMove:
    easing: ease-in-out
    stagger: 3
duration: 30min
timer: countdown
drawings:
  persist: false
info: |
  ## KI-Agenten als QA-Engineer

  Automatisierte Qualitätssicherung mit Claude Code & GitHub Actions.
  Alexander Opalic, QS-Tag Frankfurt 2026
---

<h1 class="sr-only">QS-Tag Frankfurt 2026</h1>

<!--
Event-Cover. Steht, während der Raum sich setzt. Nicht getimt.
-->

---
layout: cover
background: /titel-mensch-roboter.jpeg
---

<div class="w-[40%] text-left">

<h1 class="!text-5xl !leading-tight">KI-Agenten als<br/><span class="text-[#ff6bed] whitespace-nowrap">QA-Engineer</span></h1>

<div class="mt-4 text-lg opacity-80">Automatisierte Qualitäts&shy;sicherung mit Claude Code & GitHub Actions</div>

<div class="mt-10 text-base opacity-70">Alexander Opalic · QS-Tag Frankfurt 2026</div>

</div>

<!--
TIME: 0:00–0:45 (45s)

- Kurz Hallo sagen.
- **Hook:** „Der letzte Talk des Tages. Also bewegen wir uns erst mal.“
- Keine Notizen nötig, die Slides teile ich am Ende per QR-Code.
-->

---
layout: image-right
image: /alex-tacon.jpeg
backgroundSize: cover
---

# Alexander Opalic

<div class="mt-6 text-xl space-y-3 opacity-90">
  <div>Entwickler bei <span class="text-[#ff6bed] font-bold">Otto Payments</span></div>
  <div class="opacity-70">Entwickler, kein QA-Engineer.</div>
  <div>Blog: <span class="text-[#ff6bed]">alexop.dev</span></div>
  <div class="mt-8 text-lg opacity-70">Meine <span class="text-[#ff6bed] font-bold">zweite</span> Testing-Konferenz.<br/>Die erste: TACON (Foto).</div>
</div>

<!--
TIME: 0:45–1:15 (30s)

- Name, Entwickler bei Otto Payments, alexop.dev.
- „Der Shop, den ihr gleich seht, ist ein privater Nachbau, kein Otto-Code.“
- Foto: „Das bin ich auf der TACON. Das hier ist meine zweite Testing-Konferenz, und ich finde die Testing-Szene richtig nice.“
- **Ehrlich sagen:** Ich bin Entwickler, kein QA-Engineer. Ich zeige euch meinen Blick von der Entwicklerseite.
-->

---

# 🙋 Alle <span class="text-[#ff6bed]">aufstehen</span>, bitte

<div class="text-xl opacity-70 -mt-2">Setzt euch, sobald es nicht mehr passt.</div>

<div class="mt-8">

<IconCards flow :width="170" :items="[
  { icon: '/funnel/mensch.webp', title: 'Alle stehen', sub: 'einmal kurz bewegen' },
  { icon: '/icons/claude-code.webp', title: 'KI im Alltag', sub: 'ChatGPT, Copilot, Claude …', tag: 'stehen bleiben' },
  { icon: '/funnel/statisch.webp', title: 'KI schreibt Tests', sub: 'Tests oder Testfälle mit KI', tag: 'stehen bleiben' },
  { icon: '/jira/agent.webp', title: 'Ein Agent testet selbst', sub: 'automatisch, ohne dass ihr klickt', tag: 'stehen bleiben', accent: true },
]" />

</div>

<div v-click class="mt-8 text-center text-2xl">Wer jetzt noch steht: <b class="text-[#ff6bed]">Lasst uns nachher reden!</b></div>

<!--
TIME: 1:15–2:30 (75s)

- [Ask for hands] Erst sollen **alle** aufstehen. „Letzter Talk des Tages, wir bewegen uns kurz.“
- [click] Stehen bleibt, wer KI im Alltag nutzt. ChatGPT, Copilot, egal was. Die anderen setzen sich.
- [click] Stehen bleibt, wer KI Tests oder Testfälle schreiben lässt.
- [click] Stehen bleibt, wer einen **Agenten** hat, der selbst testet. Automatisch, im Browser oder in der Pipeline, ohne dass jemand klickt.
- [click] Wer jetzt noch steht: Applaus, und ich will nach dem Talk mit euch reden. Kurz fragen: „Was nutzt ihr dafür?“
- Danach alle hinsetzen lassen. „Für alle, die sitzen: Genau darum geht's in den nächsten 30 Minuten.“
-->

---
layout: statement

---

# So haben wir Software <span class="text-[#ff6bed]">ohne KI</span> gebaut

<DeliveryFactory era="2022" />

<!--
TIME: 2:30–3:30 (60s)

- Das ist meine **Delivery Factory** von alexop.dev/lab, gebaut wie eine Fabrik in Factorio. Jede Maschine ist eine Station im Team.
- Gelbes Band: **Business** macht aus Ideen Tickets. Rotes Band: **Dev** macht daraus PRs. Blaues Band: **Code Review**.
- **QA & Testing** prüft jeden PR von Hand. Jeder vierte wird ein Bug, und der Splitter schickt ihn zurück zu Dev.
- **Release** shippt den Rest. 2022 staut es sich **vor Dev**: Code schreiben war der teure Schritt.
- Testen war damals Klickarbeit am Ende des Bands, wenn alles andere schon fertig war.
- SOURCE: alexop.dev/lab/delivery-factory, Blogpost „The Factory Must Grow: AI moved the bottleneck“
-->

---

# Mit KI wandert der <span class="text-[#ff6bed]">Engpass</span>

<DeliveryFactory era="2026" />

<!--
TIME: 3:30–4:30 (60s)

- Gleiche Fabrik, Jahr 2026. Die blauen **Beacons** an Dev sind die Coding-Agents.
- Dev ist jetzt schnell. Das rote Band läuft voll mit PRs.
- Der Stau wandert zu **Code Review** und **QA**. „Shipped / day“ bewegt sich kaum, egal wie viele Beacons ich baue.
- Ich merge mehr PRs als je zuvor und lese immer weniger davon Zeile für Zeile.
- Wer live spielen will: alexop.dev/lab/delivery-factory, da gibt's auch die Research-Upgrades.
-->

---
layout: statement
---

# Coding ist weitgehend <span class="text-[#ff6bed]">gelöst</span>.

<div class="mt-8 text-2xl opacity-80">Wer PRs mergen will, ohne jede Zeile zu lesen,<br/>braucht bessere <span class="text-[#ff6bed]">automatische Verifikation</span>.</div>

<!--
TIME: 4:30–5:15 (45s)

- **Die Kernthese** des Talks.
- „Weitgehend“ ist bewusst gewählt. Es gibt noch harte Probleme. Aber für einen typischen Frontend-Ticket schreibt der Agent den Code.
- Die Frage ist also nicht mehr „Wer schreibt das?“, sondern „Woher weiß ich, dass es stimmt?“
- **Nur aussprechen, nicht auf der Slide:** „Wenn ein Agent codet und testet, braucht es uns dann noch?“ Nicht beantworten. „Die Antwort bekommt ihr am Ende.“
-->

---
clicks: 1
---

# Was braucht die Codebase, damit Agents <span class="text-[#ff6bed]">selbstständig</span> Features bauen?

<VerificationFunnel />

<style>
.funnel { max-height: 360px; }
</style>

<!--
TIME: 5:15–5:45 (30s)

- **Frage an den Saal:** Wie muss ich meine Codebase und Struktur aufbauen, damit ein Agent ein Feature komplett allein umsetzen kann? Antwort: mehrere Schichten, die Fehler abfangen.
- Ein Trichter: Oben fängt man am meisten ab, unten kommt nur noch durch, was alle Schichten davor übersehen haben.
- Codebasis, statische Analyse, Verifikation, Prosa (Regeln für den Agenten, z. B. Skills und AGENTS.md), ganz unten der Mensch im Review.
- [click] **Heute** geht es um die Mitte: Verifikation. Der Agent prüft empirisch im echten Browser, ob das Ticket erfüllt ist.
- Je mehr die oberen Schichten abfangen, desto kleiner wird das menschliche Review.

SOURCE: TODO Urheber des Trichter-Diagramms nachtragen (Vorlage von Alex als Bild geliefert, nachgezeichnet als SVG).
-->

---
layout: image-right
image: /ci-pr-kommentar-video.png
backgroundSize: contain
---

# Das <span class="text-[#ff6bed]">Zielbild</span>

Ein PR, der seinen Beweis gleich mitbringt.

- 📸 Screenshots
- 🎬 Ein Video vom Durchlauf
- ⚖️ Ein Urteil: Ist das Ticket erfüllt?

<!--
TIME: 5:45–6:15 (30s)

- So soll ein PR aussehen: nicht nur Code, sondern **Belege**.
- Screenshots von jedem geprüften Szenario.
- Ein Video, damit ich sehe, was der Agent gemacht hat.
- Ein klares Urteil. Dann muss ich nicht raten.
- Rechts der echte Kommentar des QA-Agenten in PR #1 des Otto-Klons: Urteil oben, darunter das Video als GIF, dann Screenshots. Genau da wollen wir am Ende des Talks hin.
- SOURCE: github.com/alexanderop/otto-nuxt-shop/pull/1 (Lauf 5, Run 42368915488)
-->

---

# Claude Code ist mehr als ein <span class="text-[#ff6bed]">Chatbot</span>

<div class="hub mt-4">
  <div class="hub__node"><img src="/funnel/mensch.webp" alt="" /><b>Du</b></div>
  <div class="hub__arrow">→</div>
  <div class="hub__node is-main"><img src="/icons/claude-code.webp" alt="" /><b>Claude Code</b><span>Agent im Terminal</span></div>
</div>

<div class="w-[640px] mx-auto mt-4">

<IconCards :columns="3" :items="[
  { icon: '/icons/tools.webp', title: 'Tools', sub: 'Bash, Read, Edit, Browser' },
  { icon: '/icons/hooks.webp', title: 'Hooks', sub: 'laufen bei jedem Schritt' },
  { icon: '/funnel/prosa.webp', title: 'Skills', sub: 'Wissen auf Abruf' },
]" />

</div>

<div v-click class="mt-5 text-center text-xl"><b>LLM denkt, Tools handeln, die <span class="text-[#ff6bed]">Schleife</span> wiederholt.</b></div>

<style>
.hub { display: flex; justify-content: center; align-items: center; gap: 10px; }
.hub__node { display: flex; align-items: center; gap: 10px; border: 1px solid rgba(255,255,255,.15); border-radius: 12px; padding: 8px 16px; background: rgba(255,255,255,.04); }
.hub__node img { width: 52px; height: 52px; }
.hub__node b { font-size: 18px; }
.hub__node span { font-size: 13px; opacity: .7; }
.hub__node.is-main { border-color: #ff6bed; background: rgba(255,107,237,.12); }
.hub__node.is-main img { width: 72px; height: 72px; }
.hub__arrow { color: #ff6bed; font-size: 28px; font-weight: 700; }
</style>

<!--
TIME: 6:15–7:00 (45s)

- Claude Code in einem Bild. Ein Agent, der im Terminal läuft.
- [click] **Tools:** lesen, schreiben, Bash ausführen. Damit kann er auch einen Browser steuern.
- [click] **Hooks:** Code, der automatisch bei bestimmten Schritten läuft. Zum Beispiel nach jedem Edit den Linter.
- [click] **Skills:** Markdown-Dateien mit Wissen, die der Agent nur lädt, wenn er sie braucht.
- [click] Mehr ist ein Agent nicht.
-->

---

# Die <span class="text-[#ff6bed]">Augen und Hände</span> des Agenten

<div class="mt-10">

<IconCards :columns="4" :items="[
  { icon: '/icons/playwright-cli.webp', title: 'Playwright CLI', sub: 'Für Teams, die Playwright schon kennen. Stabil und günstig.' },
  { icon: '/icons/playwright-mcp.webp', title: 'Playwright MCP', sub: 'Zum lokalen Erkunden. Bequem, aber teuer im Kontext.' },
  { icon: '/icons/agent-browser.webp', title: 'Agent Browser', sub: 'Mein Favorit. Snapshot mit Refs, gebaut für Agents.', accent: true },
  { icon: '/icons/computer-use.webp', title: 'Computer Use', sub: 'Wenn es keinen Browser gibt: Desktop-Apps, Legacy-UIs.' },
]" size="lg" no-clicks />

</div>

<div class="mt-8 text-center text-xl">Soll der Agent den <b class="text-[#ff6bed]">Browser</b> oder eine <b class="text-[#ff6bed]">App</b> bedienen, braucht er ein Tool dafür.</div>

<!--
TIME: 7:00–8:00 (60s)

- Ohne Browser ist der Agent blind. Wenn Claude Code einen Browser oder eine App bedienen soll, braucht er ein Tool dafür. Also geben wir ihm Augen und Hände.
- **Playwright CLI:** Kennt ihr schon. Der Agent ruft es über Bash auf.
- **Playwright MCP:** Gut, um lokal zu erkunden. Schiebt aber bei jedem Schritt viel in den Kontext.
- **Agent Browser** von Vercel Labs: Rust-CLI, Accessibility-Snapshot mit Refs wie @e1. Das nutze ich.
- **Computer Use:** Der Agent sieht den Bildschirm und klickt per Maus. Langsam, aber geht überall.
- Meine Regel: MCP lokal zum Erkunden, CLI in der Pipeline. Gleicher Smoketest: etwa 114k Tokens mit MCP, 27k mit der CLI (Quelle: „Playwright CLI vs MCP“, siehe Quality-Night-Deck).
-->


---

<div class="grid grid-cols-[0.85fr_1.15fr] gap-8 h-full items-center">
<div>

<h1 class="!text-[2.3rem] !leading-tight">Unser Beispiel: ein <span class="text-[#ff6bed]">Otto-Klon</span> in Nuxt</h1>

<div class="mt-5 text-lg opacity-80 space-y-1">
  <div>Nuxt 4 + das offene B2B-Designsystem von OTTO</div>
  <div>Startseite, Suche, Produktseite, Warenkorb</div>
</div>

<div v-click class="mt-6 text-xl">Unser Auftrag: <b class="text-[#ff6bed]">Gutscheincode im Warenkorb</b></div>

</div>
<div>

<img src="/otto-klon.png" alt="Startseite des Otto-Klons in Nuxt" class="rounded-xl border border-white/15 w-full" />

<div class="mt-2 text-sm opacity-60 text-center">Inoffizielle Demo, nicht von OTTO · github.com/alexanderop/otto-nuxt-shop</div>

</div>
</div>

<!--
TIME: 8:00–8:30 (30s)

- Bevor wir dem Agenten etwas beibringen: Woran arbeiten wir?
- Unser laufendes Beispiel: ein Otto-Klon in Nuxt 4 mit dem offenen B2B-Designsystem von OTTO. Startseite, Suche, Kategorien, Produktseite, Warenkorb, Merkzettel.
- Inoffizielle Demo, nicht von OTTO. Repo: github.com/alexanderop/otto-nuxt-shop
- [click] **Das wollen wir bauen:** Kunden sollen im Warenkorb einen Gutscheincode einlösen. Und der Agent soll selbst beweisen, dass es funktioniert.
-->

---

# Das <span class="text-[#ff6bed]">Ticket</span>: SHOP-42

<div class="text-lg opacity-80 mb-3">„Als Kunde möchte ich einen Gutscheincode im Warenkorb einlösen.“</div>

```gherkin {1-4|6-9|11-14}
Szenario: Gültiger Gutschein
  Angenommen ein Artikel liegt im Warenkorb
  Wenn ich den Code "SPAR10" einlöse
  Dann sinkt die Gesamtsumme um 10 % der Zwischensumme

Szenario: Ungültiger Gutschein
  Angenommen ein Artikel liegt im Warenkorb
  Wenn ich den Code "GIBTSNICHT" einlöse
  Dann sehe ich "Dieser Gutschein ist ungültig"

Szenario: Gutschein entfernen
  Angenommen der Code "SPAR10" ist eingelöst
  Wenn ich den Gutschein entferne
  Dann gilt wieder die volle Gesamtsumme
```

<!--
TIME: 8:30–9:00 (30s)

- Ein ganz normales Ticket. User Story plus drei Gherkin-Szenarien.
- [click] Gültiger Code, Summe sinkt.
- [click] Ungültiger Code, Fehlermeldung.
- [click] Gutschein entfernen, voller Preis.
- Auf der Folie leicht gekürzt. Original: `docs/tickets/SHOP-42-gutschein.md`, Commit c6c529e.
-->

---
layout: statement
---

# Akzeptanzkriterien sind das <span class="text-[#ff6bed]">Testorakel</span>.

<div class="mt-8 text-2xl opacity-80">Gutes Requirements Engineering ist die halbe Verifikation.</div>

<!--
TIME: 9:00–9:15 (15s)

- Der Agent braucht ein **Orakel**: Was ist richtig, was ist falsch?
- Unklare Kriterien heißt unklares Urteil. Das gilt für Menschen und für Agents.
- Das ist euer Handwerk. Ich komme am Ende darauf zurück.
- STREICHKANDIDAT, wenn die Zeit knapp wird.
-->
---

# <span class="text-[#ff6bed]">pstack</span>: Skills von poteto

<div class="text-lg opacity-80 -mt-2">Lauren Tan: React-Compiler-Team, vorher Meta, Netflix und Cursor. pstack macht den Agenten zu einem <b class="text-[#ff6bed]">gründlichen Engineer</b>, nicht zu einem schnellen.</div>

<div class="grid grid-cols-2 gap-6 mt-5">
  <figure class="shot">
    <img src="/poteto-x.png" alt="X-Profil von poteto (Lauren Tan)" />
    <figcaption>x.com/poteto</figcaption>
  </figure>
  <figure class="shot">
    <img class="is-contain" src="/pstack-plugin.png" alt="pstack-Plugin im Repo cursor/plugins auf GitHub" />
    <figcaption>github.com/cursor/plugins · pstack</figcaption>
  </figure>
</div>

<style>
.shot { margin: 0; }
.shot img { width: 100%; height: 300px; object-fit: cover; object-position: top; border-radius: 12px; border: 1px solid rgba(255,255,255,.15); }
.shot img.is-contain { object-fit: contain; background: #0d1117; }
.shot figcaption { margin-top: 6px; font-size: 13px; opacity: .6; text-align: center; }
</style>

<!--
TIME: 9:15–9:45 (30s, neu eingefügt: ab hier alle Zeiten +30s)

- Wer ist poteto? Lauren Tan. Im React-Compiler-Core-Team, vorher bei Meta, Netflix und Cursor (X-Bio, Stand Nov 2026).
- **pstack** ist die Sammlung von Skills, Playbooks und Prinzipien. Das Ziel: weniger Code, aber besserer. „If you want to go fast, go deep first.“
- Entstanden als Cursor-Plugin im Repo cursor/plugins. Inzwischen offiziell auch für Claude Code, im selben Repo.
- SOURCE: github.com/cursor/plugins/tree/main/pstack (README), x.com/poteto
-->

---

# Ein Befehl baut die <span class="text-[#ff6bed]">Einarbeitungsmappe</span>

<div class="cmds mt-3">
  <div><span>1 · Marketplace</span><code>/plugin marketplace add cursor/plugins</code></div>
  <div><span>2 · Installieren</span><code>/plugin install pstack@cursor-plugins</code></div>
  <div><span>3 · Im Repo ausführen</span><code>/pstack:create-verification-skill</code></div>
</div>

<style>
.cmds { display: grid; gap: 6px; }
.cmds div { display: grid; grid-template-columns: 170px 1fr; align-items: center; gap: 12px; }
.cmds span { font-size: 13px; font-weight: 700; color: #ff6bed; text-transform: uppercase; letter-spacing: .04em; }
.cmds code { font-size: 15px; padding: 6px 10px; }
</style>

<div class="mt-5">

<IconCards flow :items="[
  { icon: '/funnel/statisch.webp', title: 'Repo befragen', sub: 'Wie startet die App? Wie bedient man sie?' },
  { icon: '/funnel/prosa.webp', title: 'Skill schreiben', sub: 'SKILL.md + Start-Skript' },
  { icon: '/icons/feature-map.webp', title: 'Feature Map', sub: 'eine Datei pro Feature', accent: true },
  { icon: '/funnel/verifikation.webp', title: 'Selbst beweisen', sub: 'einmal komplett durchspielen' },
  { icon: '/jira/workflow.webp', title: 'Pflegen', sub: '/maintain-verification-skill' },
]" no-clicks />

</div>

<div class="mt-5 text-center text-lg">Bei mir steuert der Skill den Browser mit <b class="text-[#ff6bed]">Agent Browser</b>. Playwright CLI oder MCP gehen genauso.</div>

<div class="mt-2 text-center text-sm opacity-60">pstack: Skills von Lauren Tan (poteto) · offizieller Claude-Code-Support: github.com/cursor/plugins</div>

<!--
TIME: 9:15–9:45 (30s)

- Brücke: Der Agent kennt unseren Otto-Klon nicht. Bevor er SHOP-42 prüfen kann, braucht er eine Einarbeitung.
- Die Mappe müsst ihr nicht von Hand schreiben. Dafür gibt es **pstack**: eine Sammlung von Skills von Lauren Tan (poteto), entstanden bei Cursor. Inzwischen gibt es einen **offiziellen Claude-Code-Port** direkt im Repo cursor/plugins.
- Ein Befehl: `/create-verification-skill`.
- Er befragt das Repo, nicht euch: Wie startet die App, wie bedient man sie, welche Belege gibt es?
- Er schreibt einen Skill mit Start-Skript.
- Er legt die Feature Map an, eine Datei pro Feature.
- Wichtig: Er beweist den Skill selbst, einmal komplett durchgespielt. Ein ungetesteter Skill ist nur ein Entwurf.
- Danach pflegt ihr die Map mit `/maintain-verification-skill`, wenn sich die App ändert.
- **Werkzeug ist austauschbar:** In meinem Setup nimmt der Agent automatisch Agent Browser, weil es installiert ist. Ihr könnt genauso Playwright CLI oder Playwright MCP nutzen. Der Skill beschreibt, was geprüft wird, nicht womit.
- SOURCE: pstack `skills/create-verification-skill/SKILL.md` (v0.15.36); otto-nuxt-shop Commit 01f006e.
-->
---

# Die <span class="text-[#ff6bed]">Einarbeitungsmappe</span> des Agenten

<div class="grid grid-cols-[0.8fr_1.2fr] gap-8 mt-2 items-center">
<div>

<img src="/bild-mappe.jpeg" alt="Roboter am ersten Arbeitstag liest eine Mappe mit Registern" class="rounded-xl w-full" />

</div>
<div>

<div class="space-y-5 text-xl">
  <div class="mappe-row"><img src="/funnel/prosa.webp" alt="" /><div><b>SKILL.md</b><br/><span>die Anleitung: starten, prüfen, bedienen, belegen, aufräumen</span></div></div>
  <div class="mappe-row"><img src="/icons/feature-map.webp" alt="" /><div><b>features/*.md</b><br/><span>die Feature Map: eine Datei pro Feature</span></div></div>
</div>

<div class="mt-6 text-lg">Der Agent muss nicht raten. Er <span class="text-[#ff6bed]">schlägt nach</span>.</div>

</div>
</div>

<style>
.mappe-row { display: flex; gap: 14px; align-items: center; }
.mappe-row img { width: 64px; height: 64px; }
.mappe-row span { font-size: 15px; opacity: .75; }
</style>

<!--
TIME: 9:45–10:05 (20s)

- **Analogie:** Ein Agent ist wie ein neuer Kollege am ersten Tag. Schlau, aber er kennt euren Shop nicht. Und er vergisst jeden Abend alles.
- Also bekommt er eine **Einarbeitungsmappe**. Zwei Teile:
- Die Anleitung: SKILL.md.
- Die Feature Map: eine Datei pro Feature.
- Schauen wir rein.
-->

---
layout: code-editor
project: otto-nuxt-shop
activeFile: SKILL.md
tabs: SKILL.md
step: Die Anleitung
files: |
  .claude/skills/verify-otto-shop
    SKILL.md
    scripts/
      otto-verify.sh
    features/
      README.md
      startseite.md
      suche.md
      produktseite.md
      warenkorb.md
      merkzettel.md
---

```md {1-4|6-7|9-10|12-13|15-16|18-19|all}
---
name: verify-otto-shop
description: Launch the OTTO demo shop and drive it in a real
  browser with agent-browser to prove a change works.
---
## Hard rules
Never touch port 3000. Kill only what you started.

## Launch
$V launch    # nuxt dev on 3100, ready = "Beliebte Kategorien"

## Doctor
$V doctor    # every line must say ok

## Drive
agent-browser open http://localhost:3100/ ; $V wait-ready

## Evidence + Cleanup
$V proof warenkorb-nachher ; $V stop   # Belege bleiben
```

<!--
TIME: 10:05–10:40 (35s)

- So sieht ein Skill aus: eine Markdown-Datei in `.claude/skills/`. Links die ganze Mappe.
- [click] Oben die **Beschreibung**. Nur die liest der Agent immer. Daran erkennt er: Wenn ich die UI beweisen soll, lade ich diesen Skill.
- [click] Harte Regeln. Port 3000 gehört einem anderen Projekt. Nur stoppen, was man selbst gestartet hat.
- [click] Launch, [click] Doctor, [click] Drive, [click] Evidence und Cleanup: echte Befehle aus diesem Repo, keine Beispiele.
- [click] Alles zusammen: eine Anleitung, die jeder Agent gleich abarbeitet.
- Auf der Folie gekürzt und auf Englisch, wie im Repo. Original: 130 Zeilen.
- SOURCE: otto-nuxt-shop Commit 01f006e, `.claude/skills/verify-otto-shop/SKILL.md`
-->

---
layout: code-editor
project: otto-nuxt-shop
activeFile: warenkorb.md
tabs: SKILL.md, warenkorb.md
step: Die Feature Map
files: |
  .claude/skills/verify-otto-shop
    SKILL.md
    scripts/
      otto-verify.sh
    features/
      README.md
      startseite.md
      suche.md
      produktseite.md
      warenkorb.md
      merkzettel.md
---

```md {1|3-6|8-9|11-14|16-18|all}
# Warenkorb

## Sub-features
- cart-qty-plus: `+` erhöht die Menge, Summen und Cookie ziehen mit.
- cart-coupon-valid: SPAR10 gibt −10 % auf die Zwischensumme.
- cart-coupon-invalid: zeigt „Dieser Gutschein ist ungültig“.

## How to get to it (user POV)
- Im Header „Warenkorb“ wählen.

## Driving it with agent-browser
- agent-browser open http://localhost:3100/p/1
- agent-browser find role button click --name "In den Warenkorb"
- agent-browser find role button click --name "+" --exact

## Gotchas
- Der Minus-Button ist „−“ (U+2212), kein Bindestrich.
- Toasts liegen im Shadow DOM. wait --text findet sie nicht.
```

<!--
TIME: 10:40–11:15 (35s)

- Und das ist eine Seite aus der Feature Map: der Warenkorb.
- [click] Jede Datei hat dieselben vier Abschnitte.
- [click] **Was gibt es?** Jedes Unterfeature mit erwartetem Verhalten.
- [click] **Wie komme ich hin?** Aus Sicht der Nutzerin.
- [click] **Wie bediene ich es?** Echte Befehle, die der Agent kopieren kann.
- [click] **Gotchas.** Mein Lieblingsbeispiel: Der Minus-Button ist ein typografisches Minus, kein Bindestrich. Genau das Wissen, das sonst nur im Kopf einer Testerin steckt.
- [click] Das ist im Grunde ein Testkonzept, das der Agent lesen kann.
- SOURCE: otto-nuxt-shop Commit 01f006e, `.claude/skills/verify-otto-shop/features/warenkorb.md` (gekürzt)
-->

---

# So hilft der Skill bei <span class="text-[#ff6bed]">jedem Lauf</span>

<div class="mt-4">

<IconCards flow :items="[
  { icon: '/icons/launch.webp', title: 'Launch', sub: 'startet den Shop auf einem freien Port' },
  { icon: '/icons/doctor.webp', title: 'Doctor', sub: 'prüft, ob die Instanz taugt' },
  { icon: '/icons/drive.webp', title: 'Drive', sub: 'bedient die App wie ein Mensch', accent: true },
  { icon: '/icons/evidence.webp', title: 'Evidence', sub: 'Screenshot, Snapshot, Cookies pro Schritt' },
  { icon: '/icons/cleanup.webp', title: 'Cleanup', sub: 'räumt auf, Belege bleiben' },
]" no-clicks />

</div>

<div class="grid grid-cols-[1.1fr_1fr] gap-6 mt-5 items-center">
<div>

```console
$ otto-verify.sh doctor
ok   port 3100 owned by our run
ok   GET / renders OTTO homepage (SSR)
ok   /api/products total=184
```

</div>
<div class="text-lg opacity-80">Jeder Agent startet <b>gleich</b>. Nicht jeder erfindet seinen eigenen Weg.</div>
</div>

<!--
TIME: 11:15–11:45 (30s)

- Der Skill ist ein Rezept, das jeder Agent gleich abarbeitet.
- Launch: startet den Shop. Bei mir auf Port 3100, weil 3000 belegt war. Das hat der Agent selbst gemerkt und eingebaut.
- Doctor: Läuft die richtige Instanz? Sind die Daten da?
- Drive: echte Klicks über agent-browser, mit ARIA-Rollen statt fragiler Selektoren.
- Evidence: Vorher-Nachher-Belege pro Schritt.
- Cleanup: Er stoppt nur, was er selbst gestartet hat.
- Das ist echter Output. Ohne den Skill würde jeder Agent-Lauf anders anfangen.
-->

---

# Die <span class="text-[#ff6bed]">Verifikationsschleife</span>

<div class="loop mt-2">
<svg class="loop__svg" viewBox="0 0 880 380" aria-hidden="true">
  <defs><marker id="loop-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#ff6bed" /></marker></defs>
    <path d="M 252.1 143.8 A 200 135 0 0 1 371.6 63.1" class="loop__arc" marker-end="url(#loop-head)" />
  <path d="M 508.4 63.1 A 200 135 0 0 1 627.9 143.8" class="loop__arc" marker-end="url(#loop-head)" />
  <path d="M 627.9 236.2 A 200 135 0 0 1 546.0 304.5" class="loop__arc" marker-end="url(#loop-head)" />
  <path d="M 316.9 296.4 A 200 135 0 0 1 252.1 236.2" class="loop__arc loop__arc--back" marker-end="url(#loop-head)" />
  <path d="M 112 190 L 128 190" class="loop__arc" marker-end="url(#loop-head)" />
  <path d="M 545 325 L 718 325" class="loop__arc" marker-end="url(#loop-head)" />
  <text x="264.2" y="283.4" class="loop__label" text-anchor="end">Fehler gefunden</text>
  <text x="631" y="314" class="loop__label" text-anchor="middle">alles grün</text>
  <text x="440" y="186" class="loop__center" text-anchor="middle">Schleife</text>
  <text x="440" y="210" class="loop__center-sub" text-anchor="middle">bis alles grün ist</text>
</svg>
  <div class="loop__card is-io" style="left:55px; top:190px"><img src="/icons/issue.webp" alt="" /><div><b>Ticket</b><span>mit Gherkin</span></div></div>
  <div class="loop__card" style="left:240px; top:190px"><img src="/funnel/codebasis.webp" alt="" /><div><b>Umsetzen</b><span>der Agent baut</span></div></div>
  <div class="loop__card" style="left:440px; top:55px"><img src="/icons/launch.webp" alt="" /><div><b>App starten</b><span>mit dem Skill</span></div></div>
  <div class="loop__card" style="left:640px; top:190px"><img src="/jira/agent.webp" alt="" /><div><b>Szenarien prüfen</b><span>im echten Browser</span></div></div>
  <div class="loop__card is-accent" style="left:440px; top:325px"><img src="/icons/explorativ.webp" alt="" /><div><b>Explorativ testen</b><span>was keiner aufschrieb</span></div></div>
  <div class="loop__card is-io" style="left:800px; top:325px"><img src="/icons/report.webp" alt="" /><div><b>Report</b><span>Urteil + Belege</span></div></div>
</div>

<style>
.loop { position: relative; width: 880px; height: 380px; margin: 0 auto; }
.loop__svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.loop__arc { fill: none; stroke: #ff6bed; stroke-width: 3; }
.loop__arc--back { stroke-dasharray: 7 6; }
.loop__label { fill: #ff6bed; font-size: 15px; font-weight: 700; }
.loop__center { fill: #eaedf3; font-size: 26px; font-weight: 700; }
.loop__center-sub { fill: #eaedf3; opacity: .6; font-size: 14px; }
.loop__card { position: absolute; transform: translate(-50%, -50%); display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-radius: 12px; border: 1px solid rgba(255,255,255,.15); background: #1c1c1c; white-space: nowrap; }
.loop__card img { width: 44px; height: 44px; }
.loop__card b { display: block; font-size: 15px; }
.loop__card span { display: block; font-size: 12px; opacity: .7; }
.loop__card.is-accent { border-color: #ff6bed; background: #2a1a28; }
.loop__card.is-io { flex-direction: column; gap: 4px; text-align: center; padding: 8px 10px; }
</style>

<!--
TIME: 12:15–12:45 (30s)

- Der ganze Ablauf auf einer Folie.
- Ticket mit Gherkin-Szenarien.
- Der Agent implementiert.
- Er startet die App mit dem Skill.
- Er prüft jedes Szenario im Browser.
- Dann testet er explorativ: Was hat keiner aufgeschrieben?
- Findet er einen Fehler, geht's zurück ins Umsetzen. Die Schleife läuft, bis alles grün ist. Erst dann kommt der Report.
-->

---

# Prompt 1: Das <span class="text-[#ff6bed]">Feature bauen</span>

<div class="text-sm opacity-60 -mt-2 mb-3">Der echte Prompt, leicht gekürzt</div>

<div class="prompt">
  <div class="prompt__bar"><i></i><i></i><i></i><span>Claude Code · Prompt</span></div>
  <div class="prompt__body">
    <div class="prompt__lead"><b>›</b> Implementiere das Ticket <code class="is-file">docs/tickets/SHOP-42-gutschein.md</code></div>
    <ol>
      <li><span>1</span><div>Baue das Feature im <em>Warenkorb</em> <code class="is-file">/warenkorb</code></div></li>
      <li><span>2</span><div>Prüfe jedes <em>Gherkin-Szenario</em> im echten Browser<br/>mit dem Skill <code class="is-skill">verify-otto-shop</code></div></li>
      <li><span>3</span><div>Ergänze die <em>Feature Map</em> <code class="is-file">features/warenkorb.md</code> um den Gutschein</div></li>
      <li><span>4</span><div><em>Committe</em> auf dem aktuellen Branch. Kein Push.</div></li>
    </ol>
  </div>
</div>

<div v-click class="mt-6 text-lg">Kein Wort dazu, <b>wie</b> er testen soll. Das steht im <span class="text-[#ff6bed]">Skill</span>.</div>

<style>
.prompt { border: 1px solid rgba(255,255,255,.15); border-radius: 12px; overflow: hidden; background: #1a1d29; }
.prompt__bar { display: flex; align-items: center; gap: 6px; padding: 8px 12px; background: rgba(255,255,255,.05); border-bottom: 1px solid rgba(255,255,255,.08); }
.prompt__bar i { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,.2); }
.prompt__bar span { margin-left: 8px; font-size: 12px; opacity: .6; }
.prompt__body { padding: 16px 20px; font-size: 18px; }
.prompt__lead b { color: #ff6bed; margin-right: 6px; }
.prompt ol { list-style: none; margin: 14px 0 0; padding: 0; display: grid; gap: 10px; }
.prompt li { display: flex; gap: 12px; align-items: flex-start; margin: 0; }
.prompt li > span { flex: none; width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center; background: #ff6bed; color: #1a1d29; font-weight: 700; font-size: 14px; margin-top: 1px; }
.prompt em { font-style: normal; font-weight: 700; color: #f3e6c4; }
.prompt code { font-size: 15px; padding: 1px 8px; border-radius: 6px; }
.prompt code.is-file { background: rgba(255,107,237,.14); color: #ff9ff3; }
.prompt code.is-skill { background: rgba(122,92,192,.35); color: #d9c9ff; }
</style>

<!--
TIME: 12:45–13:30 (45s)

- Das ist der ganze Prompt. Gekürzt um den Port-Hinweis, den Skill-Pfad und „Antworte auf Deutsch mit einer Zusammenfassung“.
- Das Ticket ist die Quelle, nicht mein Chat-Text.
- Bauen.
- Selbst prüfen: jedes Szenario, im echten Browser, mit dem Skill.
- Die Feature Map wächst mit dem Feature. Der nächste Agent kennt den Gutschein dann schon.
- Committen, nicht pushen. Ein Mensch entscheidet.
- [click] Wie man den Shop startet und bedient, steht nicht im Prompt. Das weiß der Agent aus dem Skill.
- Aufruf: `claude -p "…" --model opus --permission-mode bypassPermissions`
- SOURCE: otto-nuxt-shop `.talk-logs/02-implement-gutschein.jsonl`
-->

---

# So baut der Agent das <span class="text-[#ff6bed]">Feature</span>

<div class="grid grid-cols-3 gap-3 mt-6 text-base">
  <div class="border border-white/20 bg-white/5 rounded px-3 py-3 flex gap-3 items-baseline"><span class="text-[#ff6bed] font-mono text-sm">01</span><span>Ticket + Skill lesen</span></div>
  <div class="border border-white/20 bg-white/5 rounded px-3 py-3 flex gap-3 items-baseline"><span class="text-[#ff6bed] font-mono text-sm">02</span><span>Code lesen</span></div>
  <div class="border border-white/20 bg-white/5 rounded px-3 py-3 flex gap-3 items-baseline"><span class="text-[#ff6bed] font-mono text-sm">03</span><span><code>useCoupon.ts</code> + <code>warenkorb.vue</code> schreiben</span></div>
  <div class="border border-white/20 bg-white/5 rounded px-3 py-3 flex gap-3 items-baseline"><span class="text-[#ff6bed] font-mono text-sm">04</span><span>Typecheck</span></div>
  <div class="border border-[#ff6bed] bg-[#ff6bed]/10 rounded px-3 py-3 flex gap-3 items-baseline"><span class="text-[#ff6bed] font-mono text-sm">05</span><span>Shop mit dem Skill starten</span></div>
  <div class="border border-[#ff6bed] bg-[#ff6bed]/10 rounded px-3 py-3 flex gap-3 items-baseline"><span class="text-[#ff6bed] font-mono text-sm">06</span><span>3 Szenarien im Browser</span></div>
  <div class="border border-[#ff6bed] bg-[#ff6bed]/10 rounded px-3 py-3 flex gap-3 items-baseline"><span class="text-[#ff6bed] font-mono text-sm">07</span><span>Eigene Screenshots ansehen</span></div>
  <div class="border border-white/20 bg-white/5 rounded px-3 py-3 flex gap-3 items-baseline"><span class="text-[#ff6bed] font-mono text-sm">08</span><span>CSS-Detail fixen</span></div>
  <div class="border border-white/20 bg-white/5 rounded px-3 py-3 flex gap-3 items-baseline"><span class="text-[#ff6bed] font-mono text-sm">09</span><span>Feature Map ergänzen + Commit</span></div>
</div>

<div v-click class="mt-8 text-center text-xl"><b>15 Tool-Aufrufe · 16 Turns · 0,90 $</b> · alle drei Szenarien grün</div>

<!--
TIME: 13:30–14:45 (75s)

- Das ist der echte Ablauf aus dem Log. Ein Prompt: „Implementiere SHOP-42, prüfe jedes Szenario mit dem Skill, ergänze die Feature Map, committe.“
- Er liest zuerst das Ticket **und** den Verification-Skill. Er weiß also vorher, wie er prüfen wird.
- Nach dem Code startet er den Shop über den Skill und klickt die drei Szenarien durch.
- Spannend: Er schaut sich seine eigenen Screenshots an und fixt danach noch ein CSS-Detail.
- [click] Kosten unter einem Dollar. Commit b70393e.
- Er ergänzt auch die Feature Map um den Gutschein. Die Doku wächst mit dem Feature.
- SOURCE: Log `.talk-logs/02-implement-gutschein.jsonl`
-->

---

# Prompt 2: Der <span class="text-[#ff6bed]">QA-Agent</span>

<div class="text-sm opacity-60 -mt-2 mb-3">Der echte Prompt, leicht gekürzt. Dieser Prompt hat das Video erzeugt.</div>

```text {1|3|5|6-8|9-10|11-13|all}
Du bist der QA-Agent für den PR auf dem Branch feat/gutschein. Ändere keinen Code.

Ticket: docs/tickets/SHOP-42-gutschein.md

1. Prüfe mit dem Skill verify-otto-shop jedes Gherkin-Szenario im echten Browser.
2. Teste danach explorativ rund um den Gutschein, wie ein erfahrener Tester:
   Dinge, die nicht im Ticket stehen (z. B. Schreibweise, doppeltes Einlösen,
   Mengenänderungen, Entfernen von Artikeln, Reload).
3. Nimm den ganzen Browser-Lauf als Video auf (agent-browser record)
   und mache Screenshots von jedem Szenario und jedem Fund.
4. Schreibe einen Report: Urteil (genau eins von HEALTHY, MINOR_ISSUES,
   CRITICAL_BUGS), Szenarien-Tabelle, Funde mit Severity, Repro-Schritten,
   Erwartet vs. Ist und Beleg.
```

<div v-click class="mt-3 text-lg">Punkt 2 ist eine <span class="text-[#ff6bed]">Test-Charter</span>: euer QA-Wissen, als Prompt.</div>

<style>
.slidev-code { font-size: 0.95rem !important; line-height: 1.45 !important; }
</style>

<!--
TIME: 14:45–15:45 (60s)

- Ein **zweiter** Agent. Er hat den Code nicht geschrieben, und er darf ihn nicht ändern.
- [click] Rolle und Grenze: QA-Agent, kein Code.
- [click] Wieder ist das Ticket die Quelle.
- [click] Szenarien zuerst, mit dem Skill.
- [click] **Ehrlich sagen:** Hier steht meine Test-Charter. „Mengenänderungen“ habe ich als Beispiel reingeschrieben. Den eingebauten Bug kannte der Agent nicht, aber ich habe ihm gesagt, wo erfahrene Tester suchen.
  - Negative Gesamtsumme und Cookie-Manipulation standen nicht drin. Die hat er selbst gefunden.
  - Genau das ist der Punkt für euch: Diese Liste ist **QA-Wissen**. Wer weiß, wo es kracht, schreibt die bessere Charter.
- [click] Video und Screenshots: Daher kommt das Video, das ihr gleich seht.
- [click] Festes Urteil und feste Report-Struktur. Damit kann die Pipeline später arbeiten.
- [click:2] Die Charter-Zeile. Darauf komme ich am Ende zurück: Das ist eure Arbeit, eine Ebene höher.
- Danach noch: „Committe nur den Report. Kein Push.“
- SOURCE: otto-nuxt-shop `.talk-logs/03-verify-gutschein.jsonl`, Report-Commit 302bad8
-->


---

# Demo: Erst das Ticket, dann <span class="text-[#ff6bed]">explorativ</span>

<AnnotatedVideo
  class="mt-2"
  src="/shop42-qa-run.webm"
  :chapters="[
    { t: 0, text: 'Startseite öffnen, Mascara in den Warenkorb legen' },
    { t: 4, text: 'Szenario 1: SPAR10 einlösen → −0,89 €', kind: 'pass' },
    { t: 9, text: 'Szenario 2: GIBTSNICHT → „ungültig“', kind: 'pass' },
    { t: 15, text: 'Explorativ: „ spar10 “ klein und mit Leerzeichen', kind: 'pass' },
    { t: 20, text: 'Menge 1 → 5: Rabatt bleibt bei −0,89 €', kind: 'bug' },
    { t: 29, text: 'Bei 9 Stück einlösen, auf 1 reduzieren: −8,05 €', kind: 'bug' },
    { t: 37, text: 'Szenario 3: Gutschein entfernen → 14,89 €', kind: 'pass' },
    { t: 40, text: 'Leere Eingabe und Reload prüfen', kind: 'info' },
    { t: 62, text: 'Zweiter Artikel: Zitrone für 0,71 €' },
    { t: 70, text: 'Nur Zitrone übrig: Gesamt −1,39 €', kind: 'bug' },
    { t: 75, text: 'Cookie auf 500 gesetzt: −493,34 €', kind: 'bug' },
  ]"
/>

<!--
TIME: 15:45–17:15 (90s)

- Ein **zweiter** Agent, der QA-Agent, prüft den PR. Er hat den Code nicht geschrieben.
- Das ist das echte Video des QA-Agenten, von ihm selbst mit `agent-browser record` aufgenommen. Rechts die Kapitel, ein Klick springt hin.
- LIVE-OPTION (wenn WLAN stabil): im Repo otto-nuxt-shop auf `feat/gutschein` `claude` starten, Prompt aus Folie „Prompt 2“. Dauert etwa 2,5 Minuten. Sonst dieses Video.
- Das Video ist 1:20 lang. Sprich einfach mit, die Einblendung sagt dir, wo du bist.

VOICE-OVER:
- **0:00** „Der Agent startet auf der Startseite und legt eine Mascara in den Warenkorb.“
- **0:04** „Szenario 1: Er löst SPAR10 ein. 89 Cent Rabatt, Gesamt 14 Euro. Grün.“
- **0:09** „Szenario 2: GIBTSNICHT. Die Fehlermeldung kommt. Grün.“
- **0:15 VIDEO ANHALTEN.** „Alle drei Szenarien aus dem Ticket: grün. Bis hier hätte das auch ein E2E-Test gekonnt. Ab jetzt steht nichts mehr im Ticket.“
- [Ask for hands] **„Ihr seid die Tester: Wo würdet ihr jetzt suchen?“** Zwei, drei Zurufe abwarten (Menge? Leerzeichen? Entfernen?). Dann weiter abspielen.
- „Er tippt den Code klein und mit Leerzeichen. Funktioniert.“
- **0:20** „Jetzt erhöht er die Menge auf 5. Achtet auf den Rabatt: Er bleibt bei 89 Cent. Das ist der erste Fund.“
- **0:29** „Er dreht es um: bei 9 Stück einlösen, dann auf 1 runter. 8,05 Euro Rabatt auf 8,94 Euro. Das sind 90 Prozent.“
- **0:37** „Szenario 3 nebenbei: Gutschein entfernen, voller Preis. Grün.“
- **0:40** „Leere Eingabe, Reload. Hier sagt der Shop ‚ungültig‘ statt ‚bitte Code eingeben‘. Kleinigkeit.“
- **1:02** „Jetzt wird er gemein: Er legt eine Zitrone für 71 Cent dazu …“
- **1:10** „… und entfernt die Mascara. Gesamtsumme: minus 1,39 Euro.“
- **1:15** „Zum Schluss manipuliert er das Cookie. 500 Euro Rabatt. Das wäre ein echter Preis-Exploit.“

- Kapitel-Zeiten sind aus einzelnen Frames des Videos abgelesen (±1 s). Zwischen 0:40 und 1:02 passiert wenig: Zeit für die Erklärung, dass bisher alles nach Ticket grün ist.
-->

---

# Zwei <span class="text-[#ff6bed]">kritische</span> Funde

<div class="grid grid-cols-2 gap-6 mt-4">
  <div>
    <img src="/shop42-f2-rabatt-zu-hoch.png" class="rounded border border-white/20" alt="Warenkorb mit 8,94 Euro Zwischensumme und 8,05 Euro Rabatt" />
    <div class="mt-3 text-lg">Bei 9 Stück eingelöst, auf 1 reduziert:<br/><b class="text-[#ff6bed]">8,05 € Rabatt auf 8,94 €</b></div>
  </div>
  <div v-click>
    <img src="/shop42-f3-negativ.png" class="rounded border border-white/20" alt="Warenkorb mit einer Zitrone und negativer Gesamtsumme" />
    <div class="mt-3 text-lg">Artikel raus, Zitrone für 0,71 € rein:<br/><b class="text-[#ff6bed]">Gesamt −1,39 €</b>, „Zur Kasse“ geht</div>
  </div>
</div>

<!--
TIME: 17:15–18:00 (45s)

- Fund F2, Critical: 9 Stück, SPAR10 einlösen, auf 1 Stück runter. Der Rabatt bleibt bei 8,05 €. Erwartet wären 0,89 €. Das sind 90 %.
- [click] Fund F3, Critical: Artikel entfernen, eine Zitrone für 71 Cent rein. Gesamtsumme **minus 1,39 Euro**. Und „Zur Kasse“ ist weiter klickbar.
- **Ehrlich sagen:** Einen Bug habe ich absichtlich eingebaut: Der Rabatt wird beim Einlösen als fester Betrag gespeichert. Der QA-Agent wusste das nicht, der Commit heißt neutral „Rabatt beim Einlösen berechnen und speichern“. Aus dem einen Bug hat er vier Funde gemacht.
- SOURCE: docs/reports/SHOP-42-qa-report.md, F2 und F3
-->

---

# Der <span class="text-[#ff6bed]">Report</span> des QA-Agenten

<div class="rep">
  <div class="rep__head">
    <div>
      <div class="rep__title">QA-Report SHOP-42: Gutscheincode im Warenkorb</div>
      <div class="rep__meta">feat/gutschein · Chromium via agent-browser · 12 Screenshots · Video · 20 Turns · 1,00 $</div>
    </div>
    <div class="rep__verdict">CRITICAL_BUGS</div>
  </div>
  <div class="rep__body">
    <div>
      <div class="rep__h">Szenarien aus dem Ticket</div>
      <div class="rep__row"><span class="pill is-pass">PASS</span>Gültiger Gutschein</div>
      <div class="rep__row"><span class="pill is-pass">PASS</span>Ungültiger Gutschein</div>
      <div class="rep__row"><span class="pill is-pass">PASS</span>Gutschein entfernen</div>
      <div class="rep__row"><span class="pill is-pass">PASS</span>Bleibt nach Reload</div>
      <div class="rep__row"><span class="pill is-pass">PASS</span>Höchstens ein Gutschein</div>
    </div>
    <div>
      <div class="rep__h">Funde (explorativ)</div>
      <div class="rep__row"><span class="pill is-crit">CRITICAL</span><b>F2</b> Rabatt bleibt hoch bei weniger Menge</div>
      <div class="rep__row"><span class="pill is-crit">CRITICAL</span><b>F3</b> Gesamtsumme wird negativ</div>
      <div class="rep__row"><span class="pill is-major">MAJOR</span><b>F1</b> Rabatt wächst nicht mit</div>
      <div class="rep__row"><span class="pill is-major">MAJOR</span><b>F4</b> Rabatt ungeprüft aus Cookie</div>
      <div class="rep__row"><span class="pill is-minor">MINOR</span><b>F5</b> Leere Eingabe meldet „ungültig“</div>
    </div>
  </div>
  <div class="rep__foot">Pro Fund: Repro-Schritte · Erwartet vs. Ist · Beleg · Ursache (<code>useCoupon.ts:14</code>)</div>
</div>

<style>
.rep { margin-top: 10px; border: 1px solid rgba(255,255,255,.15); border-radius: 12px; overflow: hidden; background: #1a1d29; }
.rep__head { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 12px 18px; background: rgba(255,255,255,.05); border-bottom: 1px solid rgba(255,255,255,.08); }
.rep__title { font-weight: 700; font-size: 17px; }
.rep__meta { font-size: 12px; opacity: .6; margin-top: 2px; }
.rep__verdict { flex: none; padding: 6px 12px; border-radius: 8px; background: rgba(255,77,77,.18); border: 1px solid #ff4d4d; color: #ff8a8a; font-weight: 800; font-family: var(--slidev-code-font-family, monospace); font-size: 15px; letter-spacing: .03em; }
.rep__body { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 24px; padding: 14px 18px 8px; }
.rep__h { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: #ff6bed; margin-bottom: 8px; }
.rep__row { display: flex; align-items: center; gap: 10px; font-size: 15px; padding: 5px 0; border-bottom: 1px solid rgba(255,255,255,.06); }
.rep__row b { color: #f3e6c4; }
.pill { flex: none; width: 74px; text-align: center; font-size: 11px; font-weight: 800; letter-spacing: .04em; padding: 2px 0; border-radius: 999px; }
.pill.is-pass { background: rgba(74,222,128,.15); color: #6ee7a0; }
.pill.is-crit { background: rgba(255,77,77,.18); color: #ff8a8a; }
.pill.is-major { background: rgba(251,146,60,.18); color: #fdba74; }
.pill.is-minor { background: rgba(250,204,21,.16); color: #fde047; }
.rep__foot { padding: 10px 18px; font-size: 13px; opacity: .7; border-top: 1px solid rgba(255,255,255,.08); }
</style>

<!--
TIME: 18:00–18:30 (30s)

- Das Urteil ist eines von drei festen Werten: HEALTHY, MINOR_ISSUES, CRITICAL_BUGS.
- Links: Alle Ticket-Szenarien und Regeln grün.
- Rechts: fünf Funde, zwei davon kritisch.
- F4 ist sogar ein Sicherheitsproblem. Mit einem manipulierten Cookie bekommt man 500 € Rabatt.
- Dazu Belege und die Ursache für den Entwickler: `useCoupon.ts:14`. Er schlägt sogar den Fix vor.
- Ein Dollar für einen QA-Lauf, der mich als Mensch eine halbe Stunde gekostet hätte.
- SOURCE: otto-nuxt-shop Commit 302bad8, docs/reports/SHOP-42-qa-report.md
-->

---
layout: cover
background: /bild-gherkin.jpeg
---

<div class="w-[42%] text-left">

<h1 class="!text-[2.6rem] !leading-tight">Das stand in <span class="text-[#ff6bed]">keinem</span> <span class="whitespace-nowrap">Gherkin-Szenario.</span></h1>

<div class="mt-6 text-2xl opacity-80">Weil keiner daran gedacht hat.</div>

</div>

<!--
TIME: 18:30–19:00 (30s)

- **Die Pointe.** Kurz Pause lassen.
- Alle drei Szenarien waren grün. Ein klassischer E2E-Test wäre durchgelaufen.
- Der Agent hat das gemacht, was gute Tester machen: Er hat Fragen gestellt, die keiner aufgeschrieben hat.
-->

---

# So baut ihr das in <span class="text-[#ff6bed]">eurem</span> Frontend nach

<div class="mt-10">

<IconCards :columns="5" no-clicks :items="[
  { icon: '/icons/issue.webp', title: 'Akzeptanzkriterien', sub: 'als Gherkin ins Ticket schreiben' },
  { icon: '/icons/agent-browser.webp', title: 'Einen Browser geben', sub: 'Agent Browser oder Playwright CLI' },
  { icon: '/icons/feature-map.webp', title: 'Feature Map', sub: '/create-verification-skill laufen lassen und pflegen' },
  { icon: '/icons/explorativ.webp', title: 'Rubrik fürs Explorative', sub: 'was euch wichtig ist. Bei uns: Accessibility, geht alles per Tab?', accent: true },
  { icon: '/icons/report.webp', title: 'Festes Report-Format', sub: 'Urteil, Screenshots, Video' },
]" />

</div>

<!--
TIME: 19:00–19:45 (45s)

- Fünf Schritte, alle an einem Nachmittag machbar.
- Ohne gute Kriterien kein gutes Urteil.
- Eine CLI reicht. `npm i -g agent-browser` oder Playwright CLI.
- Der Skill erzeugt die Feature Map aus eurem Code. Danach pflegt ihr sie wie Testdoku.
- **Rubrik fürs explorative Testen:** Sagt dem Agenten, worauf er nebenbei achten soll. Was euch wichtig ist, ist von Projekt zu Projekt anders. Bei uns zum Beispiel Accessibility: Kommt man per Tab überall hin? Hat jedes Feld ein Label? Ohne Rubrik testet er nur, was ihm selbst einfällt.
- Feste Urteile machen den Output maschinenlesbar. Das brauchen wir gleich für die CI.
-->

---

# Label setzen, und der Agent testet <span class="text-[#ff6bed]">in der Cloud</span>

<div class="mt-6">

<IconCards flow :items="[
  { icon: '/icons/label.webp', title: 'Label setzen', sub: 'qa-verify am PR', tag: 'Du' },
  { icon: '/jira/workflow.webp', title: 'Shop starten', sub: 'mit dem Skript aus dem Skill', tag: 'GitHub Actions' },
  { icon: '/icons/issue.webp', title: 'Ticket lesen', sub: 'verlinktes GitHub-Issue', tag: 'Claude Code' },
  { icon: '/jira/agent.webp', title: 'Im Browser testen', sub: 'headless in der Cloud', tag: 'Agent Browser', accent: true },
  { icon: '/icons/urteil.webp', title: 'Report + Urteil', sub: 'Kommentar mit Screenshots, Check grün oder rot', tag: 'PR' },
]" no-clicks />

</div>

<div class="mt-6 text-center text-xl opacity-80">Dieselbe Schleife wie lokal. Nur der <b>Auslöser</b> ist jetzt ein Label.</div>

<!--
TIME: 19:45–20:30 (45s)

- Lokal funktioniert's. Jetzt soll es ohne mich laufen.
- Ich setze am PR das Label `qa-verify`. Bewusst ein Label, nicht jeder Push: Ich entscheide, wann sich ein Lauf lohnt.
- GitHub Actions startet den Shop. Mit demselben Skript aus dem Verification-Skill.
- Claude Code findet über den PR das verlinkte GitHub-Issue (`Closes #2`). Das Issue ist das Ticket mit den Gherkin-Szenarien.
- Er prüft im echten Browser, headless in der Cloud.
- Der Report kommt mit Screenshots als Kommentar in den PR. Das Urteil entscheidet, ob der Check grün oder rot wird.
- Gleicher Skill, gleiche Feature Map, gleicher Report wie lokal.
- SOURCE: alexop.dev „Building an AI QA Engineer with Claude Code and Playwright MCP“ (Label-Trigger) und „How to Use Claude Code as an AI QA Tester with Agent Browser“ (--json-schema).
-->

---
zoom: 0.72
---

# Der echte <span class="text-[#ff6bed]">Workflow</span>

<div class="text-sm opacity-60 -mt-2 mb-2">otto-nuxt-shop · .github/workflows/claude-qa.yml (gekürzt)</div>

```yaml
on:
  pull_request:
    types: [labeled]
jobs:
  qa:                      # Claude testet, nur Lesezugriff
    if: github.event.label.name == 'qa-verify'
    permissions: { contents: read, pull-requests: read, issues: read }
    steps:
      - run: .claude/skills/verify-otto-shop/scripts/otto-verify.sh launch
      - env:
          CLAUDE_CODE_OAUTH_TOKEN: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
        run: |
          claude -p "$(envsubst < .github/prompts/qa.md)" \
            --max-budget-usd 10 \
            --allowedTools "Skill,Read,Write,Bash(agent-browser:*),Bash(gh issue view:*),…" \
            --json-schema "$(cat .github/prompts/qa-verdict.schema.json)" \
            --output-format stream-json --verbose | node claude-live-log.mjs
      - uses: actions/upload-artifact@…   # qa-report/ mit Screenshots + Video
  report:                  # ohne Claude: darf schreiben
    needs: qa
    permissions: { contents: write, pull-requests: write }
    steps:
      - run: |   # Screenshots auf Branch qa-evidence, Bild-Links einbetten
          gh pr comment "$PR_NUMBER" --body-file comment.md
      - run: |   # Merge-Gate
          if [ "$VERDICT" = "CRITICAL_BUGS" ]; then exit 1; fi
```

<!--
TIME: 20:30–21:30 (60s)

- Das ist der echte Workflow aus dem Repo, gekürzt. Er ist am 07.11. mehrfach echt gelaufen.
- **Trigger:** nur wenn ein Label gesetzt wird.
- **Job qa:** nur das Label qa-verify, und **nur Lesezugriff**. Der Agent kann nichts pushen und nichts kommentieren.
- **Shop starten** mit dem Skript aus dem Verification-Skill. Kein eigenes CI-Setup.
- **Claude Code über meine Subscription** (`claude setup-token`), kein API-Key. Budget-Deckel **10 $**, nur freigegebene Tools. `curl` ist bewusst nicht erlaubt. Der Prompt liegt als Datei im Repo. `stream-json` plus ein kleiner Formatter zeigt jeden Schritt live im Log.
- Die Belege gehen als Artefakt raus.
- **Job report, ohne Claude:** Er legt die Screenshots auf einen eigenen Branch, damit sie im Kommentar sichtbar sind, postet den Report und ist das Merge-Gate. Schreibrechte bekommt nur dieser Job.
- Dazu im echten File: Actions per SHA gepinnt, zizmor im Pedantic-Modus ohne Befund.
- SOURCE: otto-nuxt-shop Commits 25d6d59 (live log, budget) und e2f5950 (zwei Jobs, Screenshots); Blogposts „Building an AI QA Engineer…“ und „How to Use Claude Code as an AI QA Tester…“
-->

---

# So sieht das im <span class="text-[#ff6bed]">PR</span> aus

<div class="grid grid-cols-[1.5fr_1fr] gap-6 mt-2 items-start">
  <div class="space-y-2">
    <div class="text-xs opacity-60">Belege aus dem Bot-Kommentar, Fund F2: vorher</div>
    <img src="/run5-f2-vorher.jpg" class="rounded border border-white/20 h-[165px] w-full object-cover object-left-top" alt="Warenkorb mit Mascara und Sofa, Rabatt 215,79 Euro" />
    <div class="text-xs opacity-60">nachher: Sofa entfernt</div>
    <img src="/run5-f2-nachher.jpg" class="rounded border border-white/20 h-[165px] w-full object-cover object-left-top" alt="Warenkorb nur mit Mascara, Rabatt 215,79 Euro, Gesamt minus 191,96 Euro" />
  </div>
  <div class="space-y-4 text-lg">
    <div>🤖 Kommentar vom <b>github-actions</b> Bot</div>
    <div>⚖️ <b>Urteil: CRITICAL_BUGS</b>, der Merge ist blockiert</div>
    <div>📸 <b>14 Screenshots</b> und ein Video-GIF direkt im Kommentar</div>
    <div class="text-[#ff6bed] font-bold">Diesmal mit einem Sofa: Gesamt −191,96 €</div>
    <div class="opacity-70">110 Turns · 1,33 $ · 3,1 Min</div>
  </div>
</div>

<!--
TIME: 21:30–22:15 (45s)

- Das ist derselbe Bot-Kommentar wie auf dem Zielbild am Anfang (Lauf 5, Run 42368915488), kein Mockup.
- Gepostet vom Report-Job, nicht vom Agenten.
- Urteil in der ersten Zeile, der Check ist rot.
- Jedes Szenario und jeder Fund ist mit Screenshot belegt. Ich muss nichts nachklicken, um zu glauben, was da steht.
- Jeder Lauf findet einen anderen Weg zum selben Fehler: lokal die Zitrone, in der Cloud ein Sofa für 2.139,99 €. Rabatt beim Sofa eingelöst, Sofa raus, Rabatt bleibt.
- Unter zwei Dollar, rund drei Minuten.
- Link: github.com/alexanderop/otto-nuxt-shop/pull/1
-->

---

# Teaser: Ticket auf „In QA“, und der <span class="text-[#ff6bed]">Agent legt los</span>

<div class="mt-4">

<IconCards flow :items="[
  { icon: '/jira/ticket.webp', title: 'Dev schiebt Ticket', sub: 'auf „In QA“', tag: 'Jira' },
  { icon: '/jira/trigger.webp', title: 'Automation feuert', sub: 'Send web request', tag: 'Jira Automation' },
  { icon: '/jira/workflow.webp', title: 'Workflow startet', sub: 'repository_dispatch', tag: 'GitHub Actions' },
  { icon: '/jira/agent.webp', title: 'Agent liest & testet', sub: 'Ticket via Rovo MCP, Browser', tag: 'Claude Code', accent: true },
  { icon: '/jira/funde.webp', title: 'Funde ins Ticket', sub: 'Kommentar + Screenshots', tag: 'Jira REST API' },
]" no-clicks />

</div>

<div class="mt-6 grid grid-cols-3 gap-4 text-sm">
  <div class="border border-white/20 rounded px-3 py-2 bg-white/5"><b>Auslöser:</b> Trigger „Work item transitioned“ auf den Status In QA</div>
  <div class="border border-white/20 rounded px-3 py-2 bg-white/5"><b>Agent:</b> derselbe Workflow, nur <code>on: repository_dispatch</code> statt Label</div>
  <div class="border border-white/20 rounded px-3 py-2 bg-white/5"><b>Rückweg:</b> Kommentar + Anhänge über die Jira REST API</div>
</div>

<div class="mt-4 text-center opacity-70">Alle Bausteine sind dokumentiert. Gebaut habe ich es noch nicht.</div>

<!--
TIME: 22:15–22:45 (30s)

- Noch ein Schritt weiter: Kein Label mehr. Der Status im Ticket ist der Auslöser.
- Ein Dev schiebt das Ticket auf „In QA“.
- Jira Automation feuert („Work item transitioned“) und schickt einen Web-Request an GitHub.
- GitHub startet denselben QA-Workflow über `repository_dispatch`. Ticket-Key im `client_payload`.
- Claude liest das Ticket direkt aus Jira, über den Atlassian Rovo MCP Server, und testet im Browser.
- Die Funde mit Screenshots landen als Kommentar und Anhang im Ticket. Bei CRITICAL_BUGS zurück auf „In Arbeit“.
- Die drei Bausteine.
- **Ehrlich sagen:** Das ist ein Teaser. Alle Teile gibt es und sie sind dokumentiert, aber ich habe die Kette noch nicht gebaut.
- SOURCE: research/wiki/jira-cloud-agent.md
-->

---
layout: center
class: text-center
---

# Alles zum <span class="text-[#ff6bed]">Nachbauen</span>

<div class="flex justify-center mt-6">
  <img src="https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=https%3A%2F%2Fgithub.com%2Falexanderop%2Fotto-nuxt-shop" class="w-64 h-64 bg-white p-3 rounded" alt="QR-Code zu github.com/alexanderop/otto-nuxt-shop" />
</div>

<div class="mt-4 text-lg opacity-80">github.com/alexanderop/otto-nuxt-shop</div>
<div class="mt-1 text-sm opacity-60">Shop, Verification-Skill, Ticket, QA-Report mit Video</div>

<!--
TIME: 22:45–23:00 (15s)

- Das Repo enthält den Shop, den Skill mit Feature Map, das Ticket und den echten QA-Report mit Video.
- TODO vor dem Talk: Branch `feat/gutschein` pushen, sonst sieht das Publikum Ticket und Report nicht.
- Fotografiert den Code jetzt, er kommt am Ende noch mal.
-->

---

# Der Agent prüft. Ob wir es wollen, entscheidet ein <span class="text-[#ff6bed]">Mensch</span>.

<div class="grenze mt-8">
  <div class="grenze__col">
    <div class="grenze__h">Das kann der QA-Agent</div>
    <div class="grenze__item"><span>✅</span><div><b>Funktioniert es so, wie wir es wollten?</b><small>jedes Szenario aus dem Ticket, mit Beleg</small></div></div>
    <div class="grenze__item"><span>🧭</span><div><b>Was haben wir nicht bedacht?</b><small>explorativ: Fälle, die keiner aufschrieb</small></div></div>
  </div>
  <div class="grenze__col is-human">
    <div class="grenze__h">Das bleibt beim Menschen</div>
    <div class="grenze__item"><span>🚢</span><div><b>Wollen wir das überhaupt shippen?</b><small>Freigabe und Produktentscheidung</small></div></div>
    <div class="grenze__item"><span>💗</span><div><b>Fühlt es sich gut an?</b><small>Geschmack lässt sich nicht als Gherkin schreiben</small></div></div>
  </div>
</div>

<div class="mt-8 text-center text-lg opacity-70">Morgen vielleicht: <b class="text-[#ff6bed]">KPIs</b> aus echter Nutzung, und das Produkt verbessert sich selbst.</div>

<style>
.grenze { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.grenze__col { border: 1px solid rgba(255,255,255,.15); border-radius: 12px; padding: 16px 18px; background: rgba(255,255,255,.04); }
.grenze__col.is-human { border-color: #ff6bed; background: rgba(255,107,237,.08); }
.grenze__h { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: #ff6bed; margin-bottom: 10px; }
.grenze__item { display: flex; gap: 12px; align-items: flex-start; padding: 8px 0; }
.grenze__item > span { font-size: 22px; line-height: 1.2; }
.grenze__item b { display: block; font-size: 17px; color: #eaedf3; }
.grenze__item small { display: block; font-size: 13px; opacity: .65; margin-top: 2px; }
</style>

<!--
TIME: 23:00–24:00 (60s)

- Das eine Problem, das ich sehe. Der QA-Agent sagt mir zwei Dinge: Funktioniert das Feature so, wie wir es wollten? Und durch das explorative Testen: Was haben wir nicht bedacht?
- Was er mir nicht sagt: Wollen wir das überhaupt shippen? Fühlt es sich gut an?
- Dafür brauchen wir trotzdem einen Menschen. Ich sage: zum Glück. Der bestätigt am Ende und entscheidet.
- **Ausblick, meine Vermutung:** In Zukunft arbeiten wir wahrscheinlich mehr mit KPIs. Das Produkt passt sich automatisch an, je nachdem, wie Endnutzer es benutzen. Dann verbessert es sich selbst. Da sind wir aber noch nicht.
- Falls gefragt, Grenzen aus meinen Läufen: nicht deterministisch (zwei Läufe, zwei Wege), Kosten (3,37 $ Skill, 0,90 $ Feature, 1,00 $ QA-Lauf), Fork-PRs bekommen keine Secrets, 4,2 % Recall im QA-Bench. TODO: QA-Bench-Quelle in research/ ablegen.
-->
---

# Wann der <span class="text-[#ff6bed]">Mensch</span> eingreift

<div class="mt-10">

<IconCards :columns="3" size="lg" no-clicks :items="[
  { icon: '/icons/urteil.webp', title: 'Freigabe', sub: 'Ein Mensch entscheidet über den Merge' },
  { icon: '/icons/issue.webp', title: 'Unklare Anforderungen', sub: 'Der Agent fragt, statt zu raten' },
  { icon: '/jira/funde.webp', title: 'Kritische Funde', sub: 'Jemand prüft nach, bevor es eskaliert', accent: true },
]" />

</div>

<!--
TIME: 24:00–24:45 (45s)

- Der Agent liefert Belege. Entscheiden tut ein Mensch.
- Freigabe bleibt beim Menschen.
- Wenn die Kriterien unklar sind, soll der Agent nachfragen.
- Bei CRITICAL_BUGS schaut jemand drauf. Ein Agent kann sich auch irren.
-->

---
layout: cover
background: /bild-rolle.jpeg
---

<div class="w-[36%] text-left">

<h1 class="!text-[2.6rem] !leading-tight">„Wenn ein Agent testen kann, braucht es <span class="text-[#ff6bed]">mich</span> dann noch?“</h1>

</div>

<!--
TIME: 24:45–25:15 (30s)

- **Rückgriff:** „Am Anfang habe ich euch eine Antwort versprochen. Hier ist sie.“
- Diese Frage stellt sich gerade jeder hier im Saal. Also spreche ich sie offen aus.
- Kurz Pause lassen.
- Meine Antwort: Ja. Aber die Rolle verändert sich.
-->

---

<div class="bq">
  <div class="bq__who">
    <img src="/boris-cherny.jpg" alt="Boris Cherny" />
    <b>Boris Cherny</b>
    <span>Creator von Claude Code</span>
  </div>
  <blockquote class="bq__text">
    <span class="bq__mark">“</span>In some places the title software engineer is going to start to go away, and it's just going to be replaced by <em>builder</em>.
  </blockquote>
</div>

<style>
.bq { display: grid; grid-template-columns: 220px 1fr; gap: 48px; align-items: center; height: 100%; }
.bq__who { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 4px; }
.bq__who img { width: 200px; height: 200px; border-radius: 50%; object-fit: cover; border: 4px solid #ff6bed; margin-bottom: 12px; }
.bq__who b { font-size: 20px; color: #eaedf3; }
.bq__who span { font-size: 14px; opacity: .65; }
.bq__text { margin: 0; padding: 0; border: none; background: none; font-size: 2.6rem; line-height: 1.25; font-weight: 600; color: #eaedf3; text-wrap: balance; position: relative; }
.bq__mark { position: absolute; left: -0.55em; top: -0.35em; font-size: 2.2em; color: #ff6bed; line-height: 1; }
.bq__text em { font-style: normal; color: #ff6bed; }
</style>

<!--
TIME: 25:15–26:00 (45s)

- Boris Cherny hat Claude Code bei Anthropic gebaut.
- Übersetzt: Der Titel Software Engineer verschwindet an manchen Stellen. Stattdessen heißt es einfach **Builder**. Bei Anthropic codet laut ihm jeder: PM, Designerin, sogar der Finanzer.
- Cat Wu, Head of Product bei Claude Code, schreibt das auch offiziell (nicht mehr auf der Slide, nur sagen): „Our roles are blending together: designers ship code, engineers make product decisions, product managers build prototypes and evals.“
- **Ehrlich sagen:** Beide nennen Engineering, PM und Design. QA nennen sie nicht ausdrücklich. „Ich sage: Das gilt auch für euch.“
- SOURCE: Lenny's Podcast, 19.02.2026, bei 43:06 und 41:25. Aus dem Volltranskript, Audio nicht selbst gehört. research/raw/rollen-verschmelzen-notiz.md; claude.com/resources/articles/product-management-on-the-ai-exponential
-->


---

# Jeder kann alles. Jeder hat eine <span class="text-[#ff6bed]">Spezialität</span>.

<div class="flex justify-center items-end gap-6 mt-10 h-56">
  <div class="flex flex-col items-center gap-2">
    <div class="w-24 h-16 bg-white/15 rounded-t"></div>
    <div class="text-sm opacity-70">Code</div>
  </div>
  <div class="flex flex-col items-center gap-2">
    <div class="w-24 h-16 bg-white/15 rounded-t"></div>
    <div class="text-sm opacity-70">Design</div>
  </div>
  <div class="flex flex-col items-center gap-2">
    <div class="w-24 h-16 bg-white/15 rounded-t"></div>
    <div class="text-sm opacity-70">Produkt</div>
  </div>
  <div v-click class="flex flex-col items-center gap-2">
    <div class="w-24 h-48 bg-[#ff6bed]/70 rounded-t"></div>
    <div class="text-sm text-[#ff6bed] font-bold">Qualität</div>
  </div>
</div>

<div v-click class="mt-8 text-center text-lg opacity-80">Risiken einschätzen. Gute Akzeptanzkriterien schreiben. Wissen, wo es kracht.</div>

<!--
TIME: 26:15–27:00 (45s)

- Cherny bei 42:46: Die Rollen überlappen zu etwa 50 Prozent, und manche Leute haben Spezialitäten.
- Mein Bild: Jeder kann alles ein bisschen. Code, Design, Produkt.
- [click] Und jeder hat eine Spezialität. Eure ist **Qualität**.
- [click] Das heißt: Risiken einschätzen, gute Kriterien schreiben, wissen, wo es kracht. Das kann der Agent nicht für euch.
-->

---
layout: statement
---

# Der Agent hat den Bug gefunden,<br/>weil jemand gute <span class="text-[#ff6bed]">Vorarbeit</span> gemacht hat.

<div class="mt-8 text-2xl opacity-80">Gherkin-Szenarien, Test-Charter, Feature Map.<br/>Das ist <b>eure</b> Arbeit, nur eine Ebene höher.</div>

<!--
TIME: 27:00–27:30 (30s)

- Die Wendung, die Mut machen soll.
- Erinnert euch an die Demo: Der Agent kannte die Szenarien, weil sie jemand gut aufgeschrieben hat.
- Er hat bei Mengenänderungen gesucht, weil die Test-Charter im Prompt es ihm gesagt hat.
- Er wusste, wie der Warenkorb funktioniert, weil jemand die Feature Map gepflegt hat.
- Ihr klickt weniger. Ihr baut die Systeme, mit denen geprüft wird.
-->

---
layout: cover
background: /bild-builder.jpeg
---

<div class="w-[42%] text-left">

<h1 class="!text-5xl !leading-tight">Werdet <span class="text-[#ff6bed]">Builder</span> mit Qualitäts-Spezialität.</h1>

</div>

<!--
TIME: 27:30–27:45 (15s)

- Der Schlusssatz. Langsam sagen, dann kurz stehen lassen.
-->

---

# Drei Dinge für <span class="text-[#ff6bed]">Montag</span>

<div class="grid grid-cols-[1.4fr_1fr] gap-8 mt-6 items-center">
<div>

<IconCards :columns="3" :items="[
  { icon: '/icons/issue.webp', title: 'Akzeptanzkriterien', sub: 'die ein Agent prüfen kann' },
  { icon: '/icons/feature-map.webp', title: 'Browser + Feature Map', sub: 'für euren Agenten' },
  { icon: '/icons/explorativ.webp', title: 'Explorativ suchen', sub: 'nicht nur bestätigen lassen', accent: true },
]" />

</div>
<div class="flex flex-col items-center">
  <img src="https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=https%3A%2F%2Fgithub.com%2Falexanderop%2Fotto-nuxt-shop" class="w-56 h-56 bg-white p-3 rounded" alt="QR-Code zu github.com/alexanderop/otto-nuxt-shop" />
  <div class="mt-2 text-sm opacity-70">otto-nuxt-shop</div>
</div>
</div>

<!--
TIME: 27:45–28:15 (30s)

- [click] Kriterien zuerst. Das ist der größte Hebel.
- [click] Browser und Feature Map. Ein Nachmittag Arbeit.
- [click] Bestätigen kann jeder Test. Der Wert kommt aus dem Explorativen.
- Repo-QR noch einmal.
-->

---
layout: center
class: text-center
---

# Danke! <span class="text-[#ff6bed]">Fragen?</span>

<div class="mt-6 text-xl opacity-70">alexop.dev</div>

<!--
TIME: 28:15 + Q&A (1:45 Puffer bis 30:00)

- Diese Folie bleibt während der Fragen stehen.
- Wenn keiner fragt: „Wer von euch hat heute Morgen noch gestanden? Was nutzt ihr dafür?“
-->
