---
theme: '@alexop/slidev-theme-brand'
addons:
  - '@alexop/slidev-addon-utils'
title: 'KI-Agenten als QA-Engineer: Automatisierte Qualitätssicherung mit Claude Code & GitHub Actions'
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
  <div>Entwickler aus Deutschland</div>
  <div>Blog: <span class="text-[#ff6bed]">alexop.dev</span></div>
  <div class="mt-8">Meine <span class="text-[#ff6bed] font-bold">zweite</span> Testing-Konferenz.<br/>Die erste: TACON.</div>
</div>

<!--
TIME: 0:45–1:15 (30s)

- Name, Entwickler aus Deutschland, alexop.dev.
- Foto: „Das bin ich auf der TACON. Das hier ist meine zweite Testing-Konferenz, und ich finde die Testing-Szene richtig nice.“
- **Ehrlich sagen:** Ich bin Entwickler, kein QA-Engineer. Ich zeige euch meinen Blick von der Entwicklerseite.
-->

---
layout: statement
---

# 🙋 Alle <span class="text-[#ff6bed]">aufstehen</span>, bitte

<div class="mt-8 text-2xl opacity-80 space-y-3">
  <div v-click>Stehen bleiben: Ihr nutzt KI im Alltag.</div>
  <div v-click>Hinsetzen: Ihr schreibt alle Tests noch von Hand.</div>
  <div v-click class="text-[#ff6bed]">Wer noch steht: Ihr habt automatische Verifikationsschleifen.</div>
</div>

<!--
TIME: 1:15–2:30 (75s)

- [Ask for hands] Erst sollen **alle** aufstehen.
- [click] Wer KI im Alltag nutzt, bleibt stehen. Die anderen setzen sich.
- [click] Wer alle Tests noch von Hand schreibt, setzt sich.
- [click] Wer jetzt noch steht, hat automatische Verifikationsschleifen. **Applaus** für die!
- Danach alle hinsetzen lassen. „Für alle, die jetzt sitzen: Genau darum geht's in den nächsten 30 Minuten.“
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
TIME: 4:30–5:00 (30s)

- **Die Kernthese** des Talks.
- „Weitgehend“ ist bewusst gewählt. Es gibt noch harte Probleme. Aber für einen typischen Frontend-Ticket schreibt der Agent den Code.
- Die Frage ist also nicht mehr „Wer schreibt das?“, sondern „Woher weiß ich, dass es stimmt?“
-->

---
clicks: 1
---

# Wo fangen wir Fehler <span class="text-[#ff6bed]">ab</span>?

<VerificationFunnel />

<!--
TIME: 5:00–5:30 (30s)

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

<v-clicks>

- 📸 Screenshots
- 🎬 Ein Video vom Durchlauf
- ⚖️ Ein Urteil: Ist das Ticket erfüllt?

</v-clicks>

<!--
TIME: 5:30–6:00 (30s)

- So soll ein PR aussehen: nicht nur Code, sondern **Belege**.
- [click] Screenshots von jedem geprüften Szenario.
- [click] Ein Video, damit ich sehe, was der Agent gemacht hat.
- [click] Ein klares Urteil. Dann muss ich nicht raten.
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
TIME: 6:00–6:45 (45s)

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
]" size="lg" />

</div>

<!--
TIME: 6:45–7:30 (45s)

- Ohne Browser ist der Agent blind. Also geben wir ihm Augen und Hände.
- [click] **Playwright CLI:** Kennt ihr schon. Der Agent ruft es über Bash auf.
- [click] **Playwright MCP:** Gut, um lokal zu erkunden. Schiebt aber bei jedem Schritt viel in den Kontext.
- [click] **Agent Browser** von Vercel Labs: Rust-CLI, Accessibility-Snapshot mit Refs wie @e1. Das nutze ich.
- [click] **Computer Use:** Der Agent sieht den Bildschirm und klickt per Maus. Langsam, aber geht überall.
-->

---

# CLI schlägt MCP, sobald es <span class="text-[#ff6bed]">ernst</span> wird

<div class="grid grid-cols-2 gap-10 mt-12 items-end">
  <div class="text-center">
    <div class="text-7xl font-bold opacity-60">114k</div>
    <div class="mt-3 text-xl opacity-80">Tokens pro Test mit <b>MCP</b></div>
  </div>
  <div class="text-center">
    <div class="text-7xl font-bold text-[#ff6bed]">27k</div>
    <div class="mt-3 text-xl opacity-80">Tokens pro Test mit der <b>CLI</b></div>
  </div>
</div>

<div v-click class="mt-12 text-center text-xl opacity-80">MCP zum Erkunden. CLI für alles, was jeden Tag läuft.</div>

<!--
TIME: 7:30–7:45 (15s)

- Gleicher Smoketest, zwei Werkzeuge.
- MCP schiebt jeden Snapshot direkt in den Kontext. Die CLI schreibt auf die Platte, und der Agent liest nur, was er braucht.
- Etwa **4-mal weniger** Tokens. Das heißt günstiger und stabiler, weil der Kontext nicht vollläuft.
- [click] Meine Regel: MCP lokal zum Erkunden, CLI in der Pipeline.
- SOURCE: „Playwright CLI vs MCP: A New Tool for Your Coding Agent“ (114k vs 26,8k), siehe Quality-Night-Deck.
- STREICHKANDIDAT, wenn die Zeit knapp wird.
-->

---

# Ein Befehl baut die <span class="text-[#ff6bed]">Einarbeitungsmappe</span>

<div class="cmds mt-3">
  <div><span>1 · Installieren</span><code>/plugin install pstack --marketplace alexanderop/pstack-claude</code></div>
  <div><span>2 · Im Repo ausführen</span><code>/pstack:create-verification-skill</code></div>
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
]" />

</div>

<div class="mt-5 text-center text-sm opacity-60">pstack: Skills von Lauren Tan (poteto) bei Cursor · Claude-Code-Port: alexanderop/pstack-claude</div>

<!--
TIME: 7:45–8:15 (30s)

- Die Mappe müsst ihr nicht von Hand schreiben. Dafür gibt es **pstack**: eine Sammlung von Skills von Lauren Tan (poteto) bei Cursor. Ich habe sie nach Claude Code portiert.
- Ein Befehl: `/create-verification-skill`.
- [click] Er befragt das Repo, nicht euch: Wie startet die App, wie bedient man sie, welche Belege gibt es?
- [click] Er schreibt einen Skill mit Start-Skript.
- [click] Er legt die Feature Map an, eine Datei pro Feature.
- [click] Wichtig: Er beweist den Skill selbst, einmal komplett durchgespielt. Ein ungetesteter Skill ist nur ein Entwurf.
- [click] Danach pflegt ihr die Map mit `/maintain-verification-skill`, wenn sich die App ändert.
- SOURCE: pstack `skills/create-verification-skill/SKILL.md` (v0.15.36); otto-nuxt-shop Commit 01f006e.
-->
---

# Die <span class="text-[#ff6bed]">Einarbeitungsmappe</span> des Agenten

<div class="grid grid-cols-[0.8fr_1.2fr] gap-8 mt-2 items-center">
<div>

<img src="/bild-mappe.jpeg" alt="Roboter am ersten Arbeitstag liest eine Mappe mit Registern" class="rounded-xl w-full" />

</div>
<div>

<div class="mappe">
  <div class="mappe__file">features/warenkorb.md</div>
  <div v-click class="mappe__row">
    <div class="mappe__label">Was gibt es?</div>
    <code>cart-coupon-valid</code>: <code>SPAR10</code> gibt −10 % auf die Zwischensumme
  </div>
  <div v-click class="mappe__row">
    <div class="mappe__label">Wie komme ich hin?</div>
    Im Header „Warenkorb“ wählen
  </div>
  <div v-click class="mappe__row">
    <div class="mappe__label">Wie bediene ich es?</div>
    <code>agent-browser find role button click --name "+" --exact</code>
  </div>
  <div v-click class="mappe__row is-gotcha">
    <div class="mappe__label">Worauf muss ich achten?</div>
    Der Minus-Button ist „−“ (U+2212), <b>kein Bindestrich</b>.
  </div>
</div>

<div v-click class="mt-5 text-lg">Der Agent muss nicht raten. Er <span class="text-[#ff6bed]">schlägt nach</span>.</div>

</div>
</div>

<style>
.mappe { border: 1px solid rgba(255,255,255,.15); border-radius: 12px; padding: 14px 16px; background: rgba(255,255,255,.03); font-size: 15px; line-height: 1.4; }
.mappe__file { font-family: ui-monospace, monospace; font-size: 13px; opacity: .6; margin-bottom: 8px; }
.mappe__row { padding: 8px 10px; border-left: 3px solid #7a5ca8; margin-top: 8px; border-radius: 4px; background: rgba(122,92,168,.12); }
.mappe__row.is-gotcha { border-left-color: #ff6bed; background: rgba(255,107,237,.14); }
.mappe__label { font-weight: 700; color: #ff6bed; font-size: 13px; text-transform: uppercase; letter-spacing: .04em; margin-bottom: 2px; }
.mappe code { font-size: 13px; }
</style>

<!--
TIME: 8:15–9:00 (45s)

- **Analogie:** Ein Agent ist wie ein neuer Kollege am ersten Tag. Schlau, aber er kennt euren Shop nicht. Und er vergisst jeden Abend alles.
- So sieht die Mappe im Otto-Klon aus: eine Datei pro Feature (Startseite, Suche, Listing, Produktseite, Warenkorb, Merkzettel).
- [click] Was gibt es? Jedes Unterfeature mit erwartetem Verhalten.
- [click] Wie komme ich als Nutzer hin?
- [click] Wie bediene ich es? Echte Befehle, die der Agent kopieren kann.
- [click] Die Gotchas. Mein Lieblingsbeispiel: Der Minus-Button ist ein typografisches Minus, kein Bindestrich. Genau das Wissen, das sonst nur im Kopf einer Testerin steckt.
- [click] Das ist im Grunde ein Testkonzept, das der Agent lesen kann.
- SOURCE: otto-nuxt-shop, Commit 01f006e, `.claude/skills/verify-otto-shop/features/warenkorb.md`
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
]" />

</div>

<div v-click class="grid grid-cols-[1.1fr_1fr] gap-6 mt-5 items-center">
<div>

```text
$ otto-verify.sh doctor
ok   port 3100 owned by our run
ok   GET / renders OTTO homepage (SSR)
ok   /api/products total=184
```

</div>
<div class="text-lg opacity-80">Jeder Agent startet <b>gleich</b>. Nicht jeder erfindet seinen eigenen Weg.</div>
</div>

<!--
TIME: 9:00–9:45 (45s)

- Der Skill ist ein Rezept, das jeder Agent gleich abarbeitet.
- [click] Launch: startet den Shop. Bei mir auf Port 3100, weil 3000 belegt war. Das hat der Agent selbst gemerkt und eingebaut.
- [click] Doctor: Läuft die richtige Instanz? Sind die Daten da?
- [click] Drive: echte Klicks über agent-browser, mit ARIA-Rollen statt fragiler Selektoren.
- [click] Evidence: Vorher-Nachher-Belege pro Schritt.
- [click] Cleanup: Er stoppt nur, was er selbst gestartet hat.
- [click] Das ist echter Output. Ohne den Skill würde jeder Agent-Lauf anders anfangen.
-->

---
layout: statement
---

# Beim Erstellen hat der Agent schon einen <span class="text-[#ff6bed]">echten Bug</span> gefunden.

<div class="mt-8 text-2xl opacity-80">Pfeil nach unten in der Suche markiert keinen Vorschlag.</div>

<div class="mt-6 text-lg opacity-60">9 Minuten · 56 Schritte · 3,37 $</div>

<!--
TIME: 9:45–10:15 (30s)

- Den Bug habe ich nicht eingebaut. Den hat der Agent beim Erkunden des Shops gefunden.
- In der Suche springt ArrowDown immer wieder auf -1. Enter landet dann auf der Ergebnisseite statt beim Produkt.
- Er hat ihn nicht gefixt, sondern in `suche.md` als erwarteten Fehler dokumentiert.
- Kosten für den ganzen Skill: unter 4 Dollar.
- SOURCE: otto-nuxt-shop `app/components/SearchBox.vue:39`, Log `.talk-logs/01-create-verification-skill.jsonl`
-->

---
layout: image
image: /otto-klon.png
backgroundSize: contain
---

<h1 class="sr-only">Unser Beispiel: ein Otto-Klon in Nuxt</h1>

<!--
TIME: 10:15–10:45 (30s)

- Das ist unser laufendes Beispiel: ein Otto-Klon in Nuxt 4 mit dem offenen B2B-Designsystem von OTTO.
- Startseite, Suche, Kategorien, Produktseite, Warenkorb, Merkzettel.
- Inoffizielle Demo, nicht von OTTO.
- Repo: github.com/alexanderop/otto-nuxt-shop
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
TIME: 10:45–11:30 (45s)

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
TIME: 11:30–11:45 (15s)

- Der Agent braucht ein **Orakel**: Was ist richtig, was ist falsch?
- Unklare Kriterien heißt unklares Urteil. Das gilt für Menschen und für Agents.
- Das ist euer Handwerk. Ich komme am Ende darauf zurück.
- STREICHKANDIDAT, wenn die Zeit knapp wird.
-->

---

# Die <span class="text-[#ff6bed]">Verifikationsschleife</span>

<div class="mt-8">

<IconCards flow :width="122" :loop="{ from: 5, to: 1, label: 'Fehler gefunden' }" :items="[
  { icon: '/icons/issue.webp', title: 'Ticket', sub: 'mit Gherkin-Szenarien' },
  { icon: '/funnel/codebasis.webp', title: 'Umsetzen', sub: 'der Agent baut' },
  { icon: '/icons/launch.webp', title: 'App starten', sub: 'mit dem Skill' },
  { icon: '/jira/agent.webp', title: 'Szenarien prüfen', sub: 'im echten Browser' },
  { icon: '/icons/explorativ.webp', title: 'Explorativ testen', sub: 'was keiner aufschrieb', accent: true },
  { icon: '/icons/report.webp', title: 'Report', sub: 'Urteil + Belege' },
]" />

</div>

<!--
TIME: 11:45–12:15 (30s)

- Der ganze Ablauf auf einer Folie.
- [click] Ticket mit Gherkin-Szenarien.
- [click] Der Agent implementiert.
- [click] Er startet die App mit dem Skill.
- [click] Er prüft jedes Szenario im Browser.
- [click] Dann testet er explorativ: Was hat keiner aufgeschrieben?
- [click] Am Ende ein Report. Findet er einen Fehler, geht's zurück in die Implementierung.
-->

---

# Prompt 1: Das <span class="text-[#ff6bed]">Feature bauen</span>

<div class="text-sm opacity-60 -mt-2 mb-3">Der echte Prompt, leicht gekürzt</div>

```text {1|3|4-5|6|7|all}
Implementiere das Ticket docs/tickets/SHOP-42-gutschein.md.

1. Baue das Feature im Warenkorb (/warenkorb).
2. Prüfe danach jedes Gherkin-Szenario im echten Browser
   mit dem Skill verify-otto-shop.
3. Ergänze die Feature Map (features/warenkorb.md) um den Gutschein.
4. Committe die Arbeit auf dem aktuellen Branch. Kein Push.
```

<div v-click class="mt-6 text-lg">Kein Wort dazu, <b>wie</b> er testen soll. Das steht im <span class="text-[#ff6bed]">Skill</span>.</div>

<style>
.slidev-code { font-size: 1.05rem !important; line-height: 1.65 !important; }
</style>

<!--
TIME: 12:15–13:00 (45s)

- Das ist der ganze Prompt. Gekürzt um den Port-Hinweis, den Skill-Pfad und „Antworte auf Deutsch mit einer Zusammenfassung“.
- [click] Das Ticket ist die Quelle, nicht mein Chat-Text.
- [click] Bauen.
- [click] Selbst prüfen: jedes Szenario, im echten Browser, mit dem Skill.
- [click] Die Feature Map wächst mit dem Feature. Der nächste Agent kennt den Gutschein dann schon.
- [click] Committen, nicht pushen. Ein Mensch entscheidet.
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
TIME: 13:00–14:15 (75s)

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
TIME: 14:15–15:15 (60s)

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

# Demo 1: Die drei Szenarien sind <span class="text-[#ff6bed]">grün</span>

<div class="grid grid-cols-2 gap-6 mt-6">
  <div>
    <img src="/shop42-s1-gueltig.png" class="rounded border border-white/20" alt="Warenkorb mit Gutschein SPAR10, Rabatt 0,89 Euro, Gesamt 14,00 Euro" />
    <div class="text-sm opacity-70 mt-2 text-center">Gültig: SPAR10 → −0,89 €, Gesamt 14,00 €</div>
  </div>
  <div>
    <img src="/shop42-s2-ungueltig.png" class="rounded border border-white/20" alt="Warenkorb mit Fehlermeldung Dieser Gutschein ist ungültig" />
    <div class="text-sm opacity-70 mt-2 text-center">Ungültig: „Dieser Gutschein ist ungültig“</div>
  </div>
</div>

<!--
TIME: 15:15–16:00 (45s)

LIVE-OPTION (wenn WLAN stabil):
- Im Repo otto-nuxt-shop auf Branch `feat/gutschein`: `claude` starten.
- Prompt: „Du bist der QA-Agent für den PR auf feat/gutschein. Prüfe SHOP-42 mit verify-otto-shop, teste explorativ, schreibe einen Report.“
- Dauert etwa 2,5 Minuten. Sonst die Screenshots und das Video aus dem echten Lauf zeigen.

- Ein **zweiter** Agent, der QA-Agent, prüft den PR. Er hat den Code nicht geschrieben.
- Alle drei Szenarien grün. „Bis hier hätte das auch ein E2E-Test gekonnt.“
-->

---

# Demo 2: Jetzt wird's <span class="text-[#ff6bed]">explorativ</span>

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
TIME: 16:00–17:15 (75s)

- Das ist das echte Video des QA-Agenten, von ihm selbst mit `agent-browser record` aufgenommen. Rechts die Kapitel, ein Klick springt hin.
- Das Video ist 1:20 lang. Sprich einfach mit, die Einblendung sagt dir, wo du bist.

VOICE-OVER:
- **0:00** „Der Agent startet auf der Startseite und legt eine Mascara in den Warenkorb.“
- **0:04** „Szenario 1: Er löst SPAR10 ein. 89 Cent Rabatt, Gesamt 14 Euro. Grün.“
- **0:09** „Szenario 2: GIBTSNICHT. Die Fehlermeldung kommt. Grün.“
- **0:15** „Ab hier steht nichts mehr im Ticket. Er tippt den Code klein und mit Leerzeichen. Funktioniert.“
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

# Menge ändern, und der Rabatt <span class="text-[#ff6bed]">bleibt stehen</span>

<div class="grid grid-cols-[1.4fr_1fr] gap-8 mt-4 items-center">
  <img src="/shop42-f2-rabatt-zu-hoch.png" class="rounded border border-white/20" alt="Warenkorb mit 8,94 Euro Zwischensumme und 8,05 Euro Rabatt" />
  <div class="text-lg space-y-4">
    <div>Bei 9 Stück eingelöst: <b>−8,05 €</b></div>
    <div>Dann auf 1 Stück reduziert.</div>
    <div v-click class="text-[#ff6bed] text-2xl font-bold">8,05 € Rabatt auf 8,94 €.<br/>Das sind 90 %.</div>
  </div>
</div>

<!--
TIME: 17:15–18:00 (45s)

- Fund F2, Severity Critical.
- Repro: 9 Stück in den Warenkorb, SPAR10 einlösen, auf 1 Stück reduzieren.
- [click] Der Rabatt bleibt bei 8,05 €. Erwartet wären 0,89 €.
- **Ehrlich sagen:** Diesen Bug habe ich absichtlich eingebaut. Der Rabatt wird beim Einlösen als fester Betrag gespeichert. Der QA-Agent wusste das nicht: Der Commit heißt neutral „Rabatt beim Einlösen berechnen und speichern“.
- SOURCE: docs/reports/SHOP-42-qa-report.md, F2
-->

---
layout: image
image: /shop42-f3-negativ.png
backgroundSize: contain
---

<h1 class="sr-only">Gesamtsumme minus 1,39 Euro</h1>

<div v-click class="absolute bottom-16 right-12 bg-[#ff6bed] text-black font-bold text-3xl px-6 py-3 rounded rotate-[-3deg]">Gesamt: −1,39 €</div>

<!--
TIME: 18:00–18:30 (30s)

- Und dann geht er noch weiter. Fund F3, Critical.
- Rabatt bei 9 Stück einlösen, Artikel entfernen, eine Zitrone für 0,71 € reinlegen.
- [click] Gesamtsumme: **minus 1,39 Euro**. Und „Zur Kasse“ ist weiter klickbar.
- Das habe ich nicht vorhergesehen. Ich habe nur den einen Bug eingebaut. Der Agent hat daraus vier Funde gemacht.
-->

---

# Der Report: <span class="text-[#ff6bed]">CRITICAL_BUGS</span>

<div class="grid grid-cols-[1fr_1.3fr] gap-8 mt-6 items-start">
<div>

| Szenario | |
|---|---|
| Gültiger Gutschein | ✅ |
| Ungültiger Gutschein | ✅ |
| Gutschein entfernen | ✅ |
| Reload | ✅ |

</div>
<div>

<v-clicks>

- 🔴 **F2:** Rabatt bleibt hoch bei weniger Menge
- 🔴 **F3:** Gesamtsumme wird negativ
- 🟠 **F1:** Rabatt wächst nicht mit
- 🟠 **F4:** Rabatt kommt ungeprüft aus einem Cookie
- 🟡 **F5:** leere Eingabe meldet „ungültig“

</v-clicks>

</div>
</div>

<div v-click class="mt-6 text-center opacity-80">Mit Repro-Schritten, Erwartet vs. Ist, 12 Screenshots, Video und Ursache. <b>20 Turns · 1,00 $</b></div>

<!--
TIME: 18:30–19:00 (30s)

- Das Urteil ist eines von drei festen Werten: HEALTHY, MINOR_ISSUES, CRITICAL_BUGS.
- Links: Alle Ticket-Szenarien grün.
- [click] Rechts: fünf Funde, zwei davon kritisch.
- [click:4] F4 ist sogar ein Sicherheitsproblem. Mit einem manipulierten Cookie bekommt man 500 € Rabatt.
- [click] Dazu Belege und die Ursache für den Entwickler: `useCoupon.ts:14`. Er schlägt sogar den Fix vor.
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
TIME: 19:00–19:30 (30s)

- **Die Pointe.** Kurz Pause lassen.
- Alle drei Szenarien waren grün. Ein klassischer E2E-Test wäre durchgelaufen.
- Der Agent hat das gemacht, was gute Tester machen: Er hat Fragen gestellt, die keiner aufgeschrieben hat.
-->

---

# So baut ihr das in <span class="text-[#ff6bed]">eurem</span> Frontend nach

<div class="mt-10">

<IconCards :columns="4" size="lg" :items="[
  { icon: '/icons/issue.webp', title: 'Akzeptanzkriterien', sub: 'als Gherkin ins Ticket schreiben' },
  { icon: '/icons/agent-browser.webp', title: 'Einen Browser geben', sub: 'Agent Browser oder Playwright CLI' },
  { icon: '/icons/feature-map.webp', title: 'Feature Map', sub: '/create-verification-skill laufen lassen und pflegen' },
  { icon: '/icons/report.webp', title: 'Festes Report-Format', sub: 'Urteil, Screenshots, Video' },
]" />

</div>

<!--
TIME: 19:30–20:15 (45s)

- Vier Schritte, alle an einem Nachmittag machbar.
- [click] Ohne gute Kriterien kein gutes Urteil.
- [click] Eine CLI reicht. `npm i -g agent-browser` oder Playwright CLI.
- [click] Der Skill erzeugt die Feature Map aus eurem Code. Danach pflegt ihr sie wie Testdoku.
- [click] Feste Urteile machen den Output maschinenlesbar. Das brauchen wir gleich für die CI.
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
]" />

</div>

<div v-click class="mt-6 text-center text-xl opacity-80">Dieselbe Schleife wie lokal. Nur der <b>Auslöser</b> ist jetzt ein Label.</div>

<!--
TIME: 20:15–21:00 (45s)

- Lokal funktioniert's. Jetzt soll es ohne mich laufen.
- [click] Ich setze am PR das Label `qa-verify`. Bewusst ein Label, nicht jeder Push: Ich entscheide, wann sich ein Lauf lohnt.
- [click] GitHub Actions startet den Shop. Mit demselben Skript aus dem Verification-Skill.
- [click] Claude Code findet über den PR das verlinkte GitHub-Issue (`Closes #2`). Das Issue ist das Ticket mit den Gherkin-Szenarien.
- [click] Er prüft im echten Browser, headless in der Cloud.
- [click] Der Report kommt mit Screenshots als Kommentar in den PR. Das Urteil entscheidet, ob der Check grün oder rot wird.
- [click] Gleicher Skill, gleiche Feature Map, gleicher Report wie lokal.
- SOURCE: alexop.dev „Building an AI QA Engineer with Claude Code and Playwright MCP“ (Label-Trigger) und „How to Use Claude Code as an AI QA Tester with Agent Browser“ (--json-schema).
-->

---
zoom: 0.72
---

# Der echte <span class="text-[#ff6bed]">Workflow</span>

<div class="text-sm opacity-60 -mt-2 mb-2">otto-nuxt-shop · .github/workflows/claude-qa.yml (gekürzt)</div>

```yaml {1-3|4-7|8-9|10-17|18-19|20-27|all}
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
TIME: 21:00–22:15 (75s)

- Das ist der echte Workflow aus dem Repo, gekürzt. Er ist am 07.11. mehrfach echt gelaufen.
- [click] **Trigger:** nur wenn ein Label gesetzt wird.
- [click] **Job qa:** nur das Label qa-verify, und **nur Lesezugriff**. Der Agent kann nichts pushen und nichts kommentieren.
- [click] **Shop starten** mit dem Skript aus dem Verification-Skill. Kein eigenes CI-Setup.
- [click] **Claude Code über meine Subscription** (`claude setup-token`), kein API-Key. Budget-Deckel **10 $**, nur freigegebene Tools. `curl` ist bewusst nicht erlaubt. Der Prompt liegt als Datei im Repo. `stream-json` plus ein kleiner Formatter zeigt jeden Schritt live im Log.
- [click] Die Belege gehen als Artefakt raus.
- [click] **Job report, ohne Claude:** Er legt die Screenshots auf einen eigenen Branch, damit sie im Kommentar sichtbar sind, postet den Report und ist das Merge-Gate. Schreibrechte bekommt nur dieser Job.
- [click] Dazu im echten File: Actions per SHA gepinnt, zizmor im Pedantic-Modus ohne Befund.
- SOURCE: otto-nuxt-shop Commits 25d6d59 (live log, budget) und e2f5950 (zwei Jobs, Screenshots); Blogposts „Building an AI QA Engineer…“ und „How to Use Claude Code as an AI QA Tester…“
-->

---

# So sieht das im <span class="text-[#ff6bed]">PR</span> aus

<div class="grid grid-cols-[1.5fr_1fr] gap-6 mt-2 items-start">
  <img src="/ci-pr-kommentar.png" class="rounded border border-white/20" alt="QA-Report des github-actions Bots in PR #1: Urteil CRITICAL_BUGS, Kurzfassung und eingebetteter Screenshot des Warenkorbs" />
  <div class="space-y-4 text-lg">
    <div v-click>🤖 Kommentar vom <b>github-actions</b> Bot</div>
    <div v-click>⚖️ <b>Urteil: CRITICAL_BUGS</b>, der Merge ist blockiert</div>
    <div v-click>📸 <b>13 Screenshots</b> direkt im Kommentar, vorher und nachher pro Fund</div>
    <div v-click class="text-[#ff6bed] font-bold">Diesmal mit einer Rolex: Gesamt −1.512,20 €</div>
    <div v-click class="opacity-70">109 Turns · 1,19 $ · 2,9 Min</div>
  </div>
</div>

<!--
TIME: 22:15–23:00 (45s)

- Das ist der echte Kommentar in PR #1 vom 07.11., kein Mockup.
- [click] Gepostet vom Report-Job, nicht vom Agenten.
- [click] Urteil in der ersten Zeile, der Check ist rot.
- [click] Jedes Szenario und jeder Fund ist mit Screenshot belegt. Ich muss nichts nachklicken, um zu glauben, was da steht.
- [click] Jeder Lauf findet einen anderen Weg zum selben Fehler: lokal die Zitrone, in der Cloud das Sofa, dann die Rolex.
- [click] Unter zwei Dollar, unter drei Minuten.
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
]" />

</div>

<div v-click class="mt-6 grid grid-cols-3 gap-4 text-sm">
  <div class="border border-white/20 rounded px-3 py-2 bg-white/5"><b>Auslöser:</b> Trigger „Work item transitioned“ auf den Status In QA</div>
  <div class="border border-white/20 rounded px-3 py-2 bg-white/5"><b>Agent:</b> derselbe Workflow, nur <code>on: repository_dispatch</code> statt Label</div>
  <div class="border border-white/20 rounded px-3 py-2 bg-white/5"><b>Rückweg:</b> Kommentar + Anhänge über die Jira REST API</div>
</div>

<div v-click class="mt-4 text-center opacity-70">Alle Bausteine sind dokumentiert. Gebaut habe ich es noch nicht.</div>

<!--
TIME: 23:00–23:30 (30s)

- Noch ein Schritt weiter: Kein Label mehr. Der Status im Ticket ist der Auslöser.
- [click] Ein Dev schiebt das Ticket auf „In QA“.
- [click] Jira Automation feuert („Work item transitioned“) und schickt einen Web-Request an GitHub.
- [click] GitHub startet denselben QA-Workflow über `repository_dispatch`. Ticket-Key im `client_payload`.
- [click] Claude liest das Ticket direkt aus Jira, über den Atlassian Rovo MCP Server, und testet im Browser.
- [click] Die Funde mit Screenshots landen als Kommentar und Anhang im Ticket. Bei CRITICAL_BUGS zurück auf „In Arbeit“.
- [click] Die drei Bausteine.
- [click] **Ehrlich sagen:** Das ist ein Teaser. Alle Teile gibt es und sie sind dokumentiert, aber ich habe die Kette noch nicht gebaut.
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
TIME: 23:30–23:45 (15s)

- Das Repo enthält den Shop, den Skill mit Feature Map, das Ticket und den echten QA-Report mit Video.
- TODO vor dem Talk: Branch `feat/gutschein` pushen, sonst sieht das Publikum Ticket und Report nicht.
- Fotografiert den Code jetzt, er kommt am Ende noch mal.
-->

---

# Ehrliche <span class="text-[#ff6bed]">Grenzen</span>

<v-clicks>

- 🎲 **Nicht deterministisch:** zwei Läufe, zwei Wege durch die App
- 💸 **Kosten:** 3,37 $ Skill · 0,90 $ Feature · 1,00 $ QA-Lauf
- 🔐 **Secrets und Fork-PRs:** kein API-Key für fremden Code
- 📉 **4,2 % Recall** im QA-Bench: Der Agent findet längst nicht alle Bugs

</v-clicks>

<!--
TIME: 23:45–24:45 (60s)

- Ich will euch nichts verkaufen. Das hier hat echte Grenzen.
- [click] Derselbe Prompt nimmt nicht zweimal denselben Weg. Darum feste Urteile und Belege.
- [click] Kosten aus meinen echten Läufen mit Opus: Skill einmalig 3,37 $, Feature 0,90 $, QA-Lauf 1,00 $. Mit max-turns und Timeout deckeln.
- [click] Fork-PRs bekommen keine Secrets. Und ein Agent mit Shell-Zugriff auf fremden Code ist ein Risiko.
- [click] Die harte Zahl: **4,2 % Recall** im QA-Bench. Der Agent ergänzt Tests, er ersetzt sie nicht.
- TODO: QA-Bench-Quelle in research/ ablegen und hier verlinken.
-->

---

# Wann der <span class="text-[#ff6bed]">Mensch</span> eingreift

<div class="grid grid-cols-3 gap-5 mt-12 text-center">
  <div v-click class="border border-white/20 rounded px-4 py-6 bg-white/5">
    <div class="text-3xl">✅</div>
    <div class="font-bold text-lg mt-2">Freigabe</div>
    <div class="text-sm opacity-70 mt-1">Ein Mensch entscheidet über den Merge</div>
  </div>
  <div v-click class="border border-white/20 rounded px-4 py-6 bg-white/5">
    <div class="text-3xl">❓</div>
    <div class="font-bold text-lg mt-2">Unklare Anforderungen</div>
    <div class="text-sm opacity-70 mt-1">Der Agent fragt, statt zu raten</div>
  </div>
  <div v-click class="border border-[#ff6bed] rounded px-4 py-6 bg-[#ff6bed]/10">
    <div class="text-3xl">🔴</div>
    <div class="font-bold text-lg mt-2">Kritische Funde</div>
    <div class="text-sm opacity-70 mt-1">Jemand prüft nach, bevor es eskaliert</div>
  </div>
</div>

<!--
TIME: 24:45–25:30 (45s)

- Der Agent liefert Belege. Entscheiden tut ein Mensch.
- [click] Freigabe bleibt beim Menschen.
- [click] Wenn die Kriterien unklar sind, soll der Agent nachfragen.
- [click] Bei CRITICAL_BUGS schaut jemand drauf. Ein Agent kann sich auch irren.
-->

---
layout: cover
background: /bild-rolle.jpeg
---

<div class="w-[36%] text-left">

<h1 class="!text-[2.6rem] !leading-tight">„Wenn ein Agent testen kann, braucht es <span class="text-[#ff6bed]">mich</span> dann noch?“</h1>

</div>

<!--
TIME: 25:30–26:00 (30s)

- Diese Frage stellt sich gerade jeder hier im Saal. Also spreche ich sie offen aus.
- Kurz Pause lassen.
- Meine Antwort: Ja. Aber die Rolle verändert sich.
-->

---
layout: quote
---

> „In some places the title software engineer is going to start to go away, and it's just going to be replaced by **builder**.“

— Boris Cherny, Creator von Claude Code

<!--
TIME: 26:00–26:45 (45s)

- Boris Cherny hat Claude Code bei Anthropic gebaut.
- Übersetzt: Der Titel Software Engineer verschwindet an manchen Stellen. Stattdessen heißt es einfach **Builder**.
- SOURCE: Lenny's Podcast, 19.02.2026, bei 43:06. Aus dem Volltranskript, Audio nicht selbst gehört. research/raw/rollen-verschmelzen-notiz.md
-->

---

# Bei Anthropic <span class="text-[#ff6bed]">codet jeder</span>

<div class="mt-8 text-2xl leading-relaxed opacity-90">
„Our product manager codes, our engineering manager codes, our designer codes, our finance guy codes, our data scientist codes. <span class="text-[#ff6bed]">Everyone on the team codes.</span>“
</div>

<div class="mt-2 text-base opacity-60">Boris Cherny</div>

<div v-click class="mt-10 text-2xl leading-relaxed opacity-90">
„Our roles are <span class="text-[#ff6bed]">blending together</span>: designers ship code, engineers make product decisions, product managers build prototypes and evals.“
</div>

<div v-after class="mt-2 text-base opacity-60">Cat Wu, Head of Product, Claude Code</div>

<!--
TIME: 26:45–27:30 (45s)

- Cherny bei 41:25: Bei uns codet jeder. PM, Engineering Manager, Designerin, sogar der Finanzer.
- [click] Cat Wu, Head of Product bei Claude Code, schreibt das auch offiziell: Die Rollen verschmelzen.
- **Ehrlich sagen:** Beide nennen Engineering, PM und Design. QA nennen sie nicht ausdrücklich.
- „Boris sagt es für Entwickler. Ich sage: Das gilt auch für euch.“
- SOURCE: Lenny's Podcast 41:25; claude.com/resources/articles/product-management-on-the-ai-exponential
-->

---

# Die <span class="text-[#ff6bed]">Gegenstimme</span>

> „Since an AI tool cannot be accountable for anything, it cannot enact or embody a responsible process.“
>
> — James Bach

<v-click>

> „You still want a human looking at the code.“
>
> — Boris Cherny

</v-click>

<!--
TIME: 27:30–27:45 (15s)

- James Bach kennt hier jeder. Er sagt: Ein Tool kann keine Verantwortung tragen.
- Da hat er recht. Darum bleibt die Freigabe beim Menschen.
- Spannend: In einem anderen Beitrag erwartet Bach selbst, dass Tester zu „generalist thinkers“ werden.
- [click] Und sogar Cherny sagt bei 17:13: Ein Mensch soll weiter auf den Code schauen.
- SOURCE: satisfice.com/blog/archives/488069 und /488216; Lenny's Podcast 17:13
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
TIME: 27:45–28:30 (45s)

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
TIME: 28:30–29:00 (30s)

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
TIME: 29:00–29:15 (15s)

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
TIME: 29:15–29:45 (30s)

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
TIME: 29:45–30:00 + Q&A

- Diese Folie bleibt während der Fragen stehen.
- Wenn keiner fragt: „Wer von euch hat heute Morgen noch gestanden? Was nutzt ihr dafür?“
-->
