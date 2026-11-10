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

Wenn alle sitzen:

- „Hallo zusammen! Schön, dass ihr alle hier in meiner Session seid.“
- „Ich hoffe, ihr hattet bis jetzt einen guten Tag und habt schon viel gelernt.“
- „… und ihr habt noch ein bisschen Energie übrig für meinen Slot.“
- Dann weiter zur Titel-Slide.
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

<HamcrabPose class="absolute right-12 top-4" :size="150" :pose="['sit', 'dance', 'stand', 'tired', 'sit', 'clap'][$clicks] ?? 'clap'" />

<div class="text-xl opacity-70 -mt-2">Dann setzt euch hin, wenn …</div>

<div class="mt-8">

<IconCards flow :width="170" :items="[
  { icon: '/funnel/mensch.webp', title: 'Alle stehen', sub: 'einmal kurz bewegen' },
  { icon: '/icons/claude-code.webp', title: '… ihr KI nicht im Alltag nutzt', sub: 'ChatGPT, Copilot, Claude …', tag: 'hinsetzen' },
  { icon: '/funnel/statisch.webp', title: '… KI bei euch keine Tests schreibt', sub: 'weder Tests noch Testfälle', tag: 'hinsetzen' },
  { icon: '/jira/agent.webp', title: '… bei euch kein Agent selbst testet', sub: 'automatisch, ohne dass ihr klickt', tag: 'hinsetzen', accent: true },
]" />

</div>

<div v-click class="mt-8 text-center text-2xl">Wer jetzt noch steht: <b class="text-[#ff6bed]">Lasst uns nachher reden!</b></div>

<!--
TIME: 1:15–2:30 (75s)

- [click] [Ask for hands] Erst sollen **alle** aufstehen. „Letzter Talk des Tages, wir bewegen uns kurz.“
- [click] „Setzt euch hin, wenn ihr KI nicht im Alltag nutzt.“ ChatGPT, Copilot, egal was.
- [click] „Setzt euch hin, wenn KI bei euch keine Tests oder Testfälle schreibt.“
- [click] „Setzt euch hin, wenn bei euch kein **Agent** selbst testet.“ Automatisch, im Browser oder in der Pipeline, ohne dass jemand klickt.
- [click] Wer jetzt noch steht: Applaus, und ich will nach dem Talk mit euch reden. Kurz fragen: „Was nutzt ihr dafür?“
- Danach alle hinsetzen lassen. „Für alle, die sitzen: Genau darum geht's in den nächsten 30 Minuten.“
- Der Hamcrab oben rechts macht mit: sitzt → tanzt beim Aufstehen → steht → wird müde → setzt sich → klatscht für alle, die noch stehen. Nicht kommentieren, nur wirken lassen.
-->

---

# Mit KI wandert der <span class="text-[#ff6bed]">Engpass</span>

<div class="flows mt-5">
  <div class="flow">
    <div class="flow__tag">Ohne KI</div>
    <div class="flow__title">Code schreiben war teuer</div>
    <div class="flow__row"><div class="flow__name">Anforderungen</div><div class="flow__track"><div class="flow__bar" style="width:80%"></div></div></div>
    <div class="flow__row"><div class="flow__name">Entwicklung</div><div class="flow__track"><div class="flow__bar is-hot" style="width:22%"></div><span class="flow__jam">Engpass</span></div></div>
    <div class="flow__row"><div class="flow__name">Code Review</div><div class="flow__track"><div class="flow__bar" style="width:70%"></div></div></div>
    <div class="flow__row"><div class="flow__name">QA</div><div class="flow__track"><div class="flow__bar" style="width:60%"></div></div></div>
    <div class="flow__row"><div class="flow__name">Release</div><div class="flow__track"><div class="flow__bar" style="width:75%"></div></div></div>
    <div class="flow__sub">Alles wartet auf Dev.</div>
  </div>
  <div class="flow is-now">
    <div class="flow__tag">Mit KI</div>
    <div class="flow__title">Code ist billig</div>
    <div class="flow__row"><div class="flow__name">Anforderungen</div><div class="flow__track"><div class="flow__bar is-hot" style="width:28%"></div><span class="flow__jam">Engpass</span></div></div>
    <div class="flow__row"><div class="flow__name">Entwicklung <span class="flow__ai">+ KI</span></div><div class="flow__track"><div class="flow__bar" style="width:95%"></div></div></div>
    <div class="flow__row"><div class="flow__name">Code Review</div><div class="flow__track"><div class="flow__bar is-hot" style="width:25%"></div><span class="flow__jam">Engpass</span></div></div>
    <div class="flow__row"><div class="flow__name">QA</div><div class="flow__track"><div class="flow__bar is-hot" style="width:22%"></div><span class="flow__jam">Engpass</span></div></div>
    <div class="flow__row"><div class="flow__name">Release</div><div class="flow__track"><div class="flow__bar" style="width:40%"></div></div></div>
    <div class="flow__sub">Dev ist schnell. Jetzt wartet alles auf <b>klare Anforderungen</b>, <b>Review</b> und <b>QA</b>.</div>
  </div>
</div>

<div class="mt-4 text-center text-sm opacity-60">Durchsatz pro Station · nach meiner Delivery Factory, alexop.dev/lab/delivery-factory</div>

<style>
.flows { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.flow { border: 1px solid rgba(255,255,255,.15); border-radius: 14px; padding: 14px 18px; background: rgba(255,255,255,.04); }
.flow.is-now { border-color: #ff6bed; background: rgba(255,107,237,.06); }
.flow__tag { font-size: 11px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; opacity: .6; }
.flow.is-now .flow__tag { color: #ff6bed; opacity: 1; }
.flow__title { font-size: 20px; font-weight: 700; color: #eaedf3; margin: 2px 0 12px; }
.flow__row { display: grid; grid-template-columns: 130px 1fr; align-items: center; gap: 10px; padding: 5px 0; }
.flow__name { font-size: 14px; color: #eaedf3; white-space: nowrap; }
.flow__ai { font-size: 11px; font-weight: 700; color: #1a1d29; background: #f3e6c4; border-radius: 6px; padding: 1px 5px; margin-left: 4px; }
.flow__track { position: relative; height: 22px; background: rgba(255,255,255,.05); border-radius: 6px; display: flex; align-items: center; }
.flow__bar { height: 100%; border-radius: 6px; background: rgba(255,255,255,.28); }
.flow__bar.is-hot { background: #ff6bed; }
.flow__jam { margin-left: 8px; font-size: 11px; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; color: #ff6bed; }
.flow__sub { margin-top: 10px; font-size: 14px; opacity: .8; }
.flow__sub b { color: #ff6bed; }
</style>

<!--
TIME: 2:30–4:00 (90s)

- Links: So haben wir Software **ohne KI** gebaut. Der Balken ist, wie viel eine Station pro Tag schafft. Entwicklung war der schmalste Balken: Code schreiben war der teure Schritt. Alles hat auf Dev gewartet.
- Testen war damals Klickarbeit am Ende des Bands, wenn alles andere schon fertig war.
- Rechts: **mit KI**. Coding-Agents machen Dev breit und schnell. Der Engpass verschwindet nicht, er wandert.
- Jetzt warten wir auf **klare Anforderungen** (was genau soll gebaut werden?), auf **Code Review** (wer liest all die PRs?) und auf **QA** (stimmt es wirklich?).
- Ich merge mehr PRs als je zuvor und lese immer weniger davon Zeile für Zeile.
- Das Bild kommt aus meiner Delivery Factory, gebaut wie eine Fabrik in Factorio. Wer live spielen will: alexop.dev/lab/delivery-factory.
- SOURCE: alexop.dev/lab/delivery-factory, Blogpost „The Factory Must Grow: AI moved the bottleneck“. Die Balkenlängen sind illustrativ, keine Messwerte.
-->

---
layout: statement
---

# Coding ist weitgehend <span class="text-[#ff6bed]">gelöst</span>.

<div class="mt-8 text-2xl opacity-80">Wer PRs mergen will, ohne jede Zeile zu lesen,<br/>braucht bessere <span class="text-[#ff6bed]">automatische Verifikation</span>.</div>

<!--
TIME: 4:00–4:45 (45s)

- **Die Kernthese** des Talks.
- „Weitgehend“ ist bewusst gewählt. Es gibt noch harte Probleme. Aber für ein typisches Frontend-Ticket schreibt der Agent den Code.
- Die Frage ist also nicht mehr „Wer schreibt das?“, sondern „Woher weiß ich, dass es stimmt?“
- **Nur aussprechen, nicht auf der Slide:** „Wenn ein Agent codet und testet, braucht es uns dann noch?“ Nicht beantworten. „Die Antwort bekommt ihr am Ende.“
-->

---
clicks: 1
---

# Wie fangen wir Fehler ab, wenn Agents <span class="text-[#ff6bed]">selbstständig</span> Features bauen?

<VerificationFunnel />

<style>
.funnel { max-height: 360px; }
</style>

<!--
TIME: 4:45–5:15 (30s)

- **Frage an den Saal:** Wie fangen wir Fehler ab, wenn ein Agent ein Feature komplett allein umsetzt? Anders gefragt: Was braucht es, damit wir Agenten-Code abnehmen können? Antwort: mehrere Schichten, die Fehler abfangen.
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

Ein PR, an dem die Belege schon hängen.

- Screenshots
- Ein Video vom Durchlauf
- Ein Urteil: Ist das Ticket erfüllt?

<!--
TIME: 5:15–5:45 (30s)

- So soll ein PR aussehen: Code plus **Belege**.
- Screenshots von jedem geprüften Szenario.
- Ein Video, damit ich sehe, was der Agent gemacht hat.
- Ein klares Urteil. Dann muss ich nicht raten.
- Rechts der echte Kommentar des QA-Agenten in PR #1 des Otto-Klons: Urteil oben, darunter das Video als GIF, dann Screenshots. Genau da wollen wir am Ende des Talks hin.
- SOURCE: github.com/alexanderop/otto-nuxt-shop/pull/1 (Lauf 5, Run 42368915488)
-->

---

# Ein Agent arbeitet in einer <span class="text-[#ff6bed]">Schleife</span>, bis die Aufgabe erledigt ist

<div class="mt-8">

<IconCards flow no-clicks :width="146" :loop="{ from: 3, to: 1, label: 'noch nicht fertig' }" :items="[
  { icon: '/icons/issue.webp', title: 'Auftrag', sub: '„Baue den Gutschein ein“', tag: 'Du' },
  { icon: '/icons/claude-code.webp', title: 'Überlegen', sub: 'Was ist der nächste Schritt?' },
  { icon: '/icons/tools.webp', title: 'Werkzeug nutzen', sub: 'Datei lesen, Befehl ausführen, klicken', accent: true },
  { icon: '/icons/fund-pruefen.webp', title: 'Ergebnis ansehen', sub: 'Hat es geklappt?' },
  { icon: '/icons/szenario-ok.webp', title: 'Fertig', sub: 'er meldet sich zurück' },
]" />

</div>

<div class="mt-6 text-center text-xl opacity-80">Ein Chatbot antwortet. Ein Agent <b class="text-[#ff6bed]">handelt</b> und prüft sein Ergebnis selbst.</div>

<!--
TIME: 5:45–6:10 (25s)

- Viele kennen Claude Code nur als Coding-Tool. Claude Code ist ein **Agent** im Terminal. Ihr sagt, was ihr wollt, und er arbeitet, bis es erledigt ist.
- Der Unterschied zum Chatbot ist diese Schleife: Er überlegt den nächsten Schritt, nutzt ein Werkzeug, schaut sich das Ergebnis an. Passt es nicht, dreht er noch eine Runde. Das macht er Dutzende Male, ohne dass ihr dazwischen klickt.
- Werkzeuge sind zum Beispiel: Dateien lesen und schreiben, Befehle im Terminal ausführen, im Browser klicken.
- Code schreiben ist nur eine Sache. Er liest Tickets, sammelt Screenshots, schreibt Reports. Fast alles davon ist Testarbeit. Darum ist er für QA interessant.
- Merkt euch die Schleife. Der ganze Rest des Talks ist diese Schleife mit anderen Werkzeugen.
-->

---

# Claude Code kann alles, wofür er ein <span class="text-[#ff6bed]">Werkzeug</span> hat

<div class="text-lg opacity-70 -mt-2">Für den <b class="text-[#ff6bed]">Browser</b> braucht er ein Tool. Hier sind vier.</div>

<div class="mt-8">

<IconCards :columns="4" :items="[
  { icon: '/icons/playwright-cli.webp', title: 'Playwright CLI', sub: 'Für Teams, die Playwright schon kennen. Stabil und günstig.' },
  { icon: '/icons/playwright-mcp.webp', title: 'Playwright MCP', sub: 'Zum lokalen Erkunden. Bequem, aber teuer im Kontext.' },
  { icon: '/icons/agent-browser.webp', title: 'Agent Browser', sub: 'Mein Favorit. Snapshot mit Refs, gebaut für Agents.', accent: true },
  { icon: '/icons/computer-use.webp', title: 'Computer Use', sub: 'Wenn es keinen Browser gibt: Desktop-Apps, Legacy-UIs.' },
]" size="lg" no-clicks />

</div>

<!--
TIME: 6:10–7:00 (50s)

- Die Schleife kann nur, wofür es ein Werkzeug gibt. Ohne Browser sieht der Agent die App nicht. Wenn Claude Code einen Browser oder eine App bedienen soll, braucht er ein Tool dafür. Hier sind vier.
- **Playwright CLI:** Kennt ihr schon. Der Agent ruft es über Bash auf.
- **Playwright MCP:** Gut, um lokal zu erkunden. Schiebt aber bei jedem Schritt viel in den Kontext.
- **Agent Browser** von Vercel Labs: Rust-CLI, Accessibility-Snapshot mit Refs wie @e1. Das nutze ich.
- **Computer Use:** Der Agent sieht den Bildschirm und klickt per Maus. Langsam, aber geht überall.
- Meine Regel: MCP lokal zum Erkunden, CLI in der Pipeline. Gleicher Smoketest: etwa 114k Tokens mit MCP, 27k mit der CLI (Quelle: „Playwright CLI vs MCP“, siehe Quality-Night-Deck).
-->

---
clicks: 3
---

# So <span class="text-[#ff6bed]">sieht</span> der Agent eine Webseite

<div class="ab mt-3">
  <div class="ab__col">
    <div class="ab__h">Was ihr seht</div>
    <div class="ab__page">
      <div class="ab__pagebar"><i></i><i></i><i></i><span>otto-shop / warenkorb</span></div>
      <div class="ab__pagebody">
        <div class="ab__el ab__title">Warenkorb <em v-show="$clicks >= 1">heading</em></div>
        <div class="ab__sum">
          <div><span>Zwischensumme</span><span>8,94 €</span></div>
          <div><span>Versand</span><span>5,95 €</span></div>
          <div v-if="$clicks >= 3" class="is-new"><span>Gutschein (SPAR10)</span><span>−0,89 €</span></div>
          <div class="ab__total" :class="{ 'is-new': $clicks >= 3 }"><span>Gesamt</span><span>{{ $clicks >= 3 ? '14,00 €' : '14,89 €' }}</span></div>
        </div>
        <div v-if="$clicks < 3" class="ab__row">
          <div class="ab__el ab__input"><span class="ab__ph" v-if="$clicks < 2">Gutscheincode</span><span v-else>SPAR10</span> <em v-show="$clicks >= 1">textbox</em></div>
          <div class="ab__el ab__btn" :class="{ 'is-hit': $clicks === 2 }">Einlösen <em v-show="$clicks >= 1">button</em></div>
        </div>
        <div v-else class="ab__row">
          <div class="ab__done">Gutschein <b>SPAR10</b> eingelöst</div>
          <div class="ab__link">Gutschein entfernen</div>
        </div>
      </div>
    </div>
  </div>
  <div class="ab__arrow">→</div>
  <div class="ab__col">
    <div class="ab__h">Was der Agent sieht und tut</div>
    <div class="ab__term">
      <div v-if="$clicks === 0"><span class="c-dim">$ ▍</span></div>
      <div v-if="$clicks >= 1" :class="{ 'is-old': $clicks > 1 }">
        <div><span class="c-dim">$</span> agent-browser <b>snapshot</b></div>
        <div>- <span class="c-ref">heading</span> "Warenkorb" <span class="c-dim">[ref=e6]</span></div>
        <div>- <span class="c-ref">textbox</span> "Gutscheincode" <span class="c-dim">[ref=e23]</span></div>
        <div>- <span class="c-ref">button</span> "Einlösen" <span class="c-dim">[ref=e24]</span></div>
      </div>
      <div v-if="$clicks >= 2" class="mt-2" :class="{ 'is-old': $clicks > 2 }">
        <div><span class="c-dim">$</span> agent-browser <b>find</b> role <span class="c-ref">textbox</span> <span class="c-dim">\</span></div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;fill "SPAR10" --name "Gutscheincode"</div>
        <div><span class="c-dim">$</span> agent-browser <b>find</b> role <span class="c-ref">button</span> click --name "Einlösen"</div>
      </div>
      <div v-if="$clicks >= 3" class="mt-2">
        <div><span class="c-dim">$</span> agent-browser <b>wait</b> --text "Gutschein (SPAR10)"</div>
        <div><span class="c-dim">$</span> agent-browser <b>get text</b> ".summary__rows"</div>
        <div class="c-out">Gutschein (SPAR10) −0,89 € · Gesamt 14,00 €</div>
      </div>
    </div>
  </div>
</div>

<div class="ab__loop mt-4">
  <div :class="{ on: $clicks === 1 }"><b>1</b> hinschauen <code>snapshot</code></div>
  <span>→</span>
  <div :class="{ on: $clicks === 2 }"><b>2</b> handeln <code>find … fill</code> <code>click</code></div>
  <span>→</span>
  <div :class="{ on: $clicks === 3 }"><b>3</b> prüfen <code>wait</code> <code>get text</code></div>
</div>

<div class="mt-4 text-center text-lg">Er sucht wie ein Screenreader: nach <b class="text-[#ff6bed]">Rolle und Name</b>. Ihr kennt das als <code>getByRole</code>.</div>

<style>
.ab { display: grid; grid-template-columns: 340px auto minmax(0, 1fr); gap: 14px; align-items: start; }
.ab__h { font-size: 12px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: #ff6bed; margin-bottom: 8px; }
.ab__arrow { color: #ff6bed; font-size: 32px; font-weight: 700; padding-top: 110px; }
.ab__page { border-radius: 10px; overflow: hidden; background: #f4f4f4; color: #222; border: 1px solid rgba(255,255,255,.2); height: 262px; }
.ab__pagebar { display: flex; gap: 5px; align-items: center; padding: 6px 10px; background: #ddd; }
.ab__pagebar i { width: 8px; height: 8px; border-radius: 50%; background: #aaa; }
.ab__pagebar span { margin-left: 8px; font-size: 11px; color: #666; }
.ab__pagebody { padding: 14px 22px 14px 16px; }
.ab__el { position: relative; }
.ab__el em { position: absolute; top: -10px; right: -10px; font-style: normal; font-size: 10px; font-weight: 800; background: #ff6bed; color: #1a1d29; border-radius: 999px; padding: 1px 7px; font-family: var(--slidev-code-font-family, monospace); }
.ab__title { display: inline-block; font-size: 20px; font-weight: 700; padding-right: 34px; }
.ab__sum { margin-top: 8px; font-size: 14px; }
.ab__sum > div { display: flex; justify-content: space-between; padding: 2px 0; }
.ab__sum .is-new { color: #1a7f37; font-weight: 700; }
.ab__total { margin-top: 4px; padding-top: 6px !important; border-top: 1px solid #ccc; font-weight: 700; font-size: 16px; }
.ab__row { display: flex; gap: 12px; margin-top: 16px; align-items: center; }
.ab__input { flex: 1; border: 1px solid #bbb; border-radius: 6px; padding: 6px 10px; background: #fff; font-size: 14px; }
.ab__ph { color: #999; }
.ab__btn { border: 1.5px solid #222; border-radius: 6px; padding: 6px 12px; font-weight: 700; font-size: 14px; background: #fff; }
.ab__btn.is-hit { background: #222; color: #fff; }
.ab__done { flex: 1; font-size: 12px; }
.ab__done b { color: #222 !important; }
.ab__link { font-size: 12px; text-decoration: underline; white-space: nowrap; }
.ab__term { border-radius: 10px; background: #1a1d29; border: 1px solid rgba(255,255,255,.15); padding: 12px 14px; font-family: var(--slidev-code-font-family, monospace); font-size: 12.5px; line-height: 1.7; color: #eaedf3; height: 262px; white-space: nowrap; overflow: hidden; }
.ab__term b { color: #f3e6c4; }
.ab__term .is-old { opacity: .45; }
.c-dim { opacity: .5; }
.c-ref { color: #ff6bed; font-weight: 700; }
.c-out { color: #6ee7a0; }
.ab__loop { display: flex; justify-content: center; align-items: center; gap: 12px; }
.ab__loop > span { color: #ff6bed; font-weight: 700; }
.ab__loop > div { display: flex; align-items: center; gap: 8px; padding: 6px 14px; border: 1px solid rgba(255,255,255,.15); border-radius: 999px; background: rgba(255,255,255,.04); font-size: 15px; opacity: .6; }
.ab__loop > div.on { opacity: 1; border-color: #ff6bed; background: rgba(255,107,237,.12); }
.ab__loop b { display: inline-grid; place-items: center; width: 20px; height: 20px; border-radius: 50%; background: #ff6bed; color: #1a1d29; font-size: 12px; }
.ab__loop code { font-size: 13px; }
</style>

<!--
TIME: 7:00–8:00 (60s)

- Was macht Agent Browser? Es ist ein Programm im Terminal, das einen echten Browser steuert. Links der Warenkorb, wie ihr ihn seht.
- [click] **Hinschauen.** Mit `snapshot` bekommt der Agent die Seite als **Liste**. Jedes Element hat eine **Rolle** und einen **Namen**: eine Überschrift „Warenkorb“, ein Textfeld „Gutscheincode“, ein Knopf „Einlösen“. Die pinken Marken links zeigen die Rolle.
- [click] **Handeln.** Er sagt nicht „klicke bei Pixel 400, 300“. Er sagt: „Finde das Textfeld mit dem Namen Gutscheincode und schreibe SPAR10 hinein. Finde den Knopf Einlösen und klicke.“
- [click] **Prüfen.** Er wartet, bis der Text „Gutschein (SPAR10)“ auf der Seite steht, und liest dann die Zusammenfassung aus: 89 Cent Rabatt, Gesamt 14 Euro. So prüft er sein eigenes Ergebnis.
- Das ist die Schleife von eben, nur mit echten Befehlen: hinschauen, handeln, prüfen.
- Für euch: Rolle und Name ist genau das, was ein **Screenreader** vorliest. In Playwright heißt das `getByRole`. Darum klappt es gut auf barrierearmen Seiten und schlecht auf Seiten ohne Labels.
- Falls gefragt: Zum Auslesen der Summe nutzt er einen CSS-Selektor (`.summary__rows`), ganz ohne geht es nicht. Der Snapshot vergibt auch Nummern (`ref=e23`), über die er direkt klicken könnte (`click @e23`). In meinem Lauf hat er fast immer Rolle und Name genommen, weil die Namen schon in der Feature Map stehen. Weitere Befehle: `open`, `screenshot`, `record` für das Video.
- SOURCE: Befehle wörtlich aus dem lokalen Lauf, otto-nuxt-shop `.talk-logs/03-verify-gutschein.jsonl` (Szenario 1). Snapshot-Zeilen aus `.data/verify/evidence/SHOP-42-qa/s1-vorher.aria.txt`, gekürzt. Die Ausgabe von `get text` steht im Lauf zeilenweise, hier in einer Zeile und ohne Zwischensumme und Versand. `agent-browser --help` (v0.38.2).
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
TIME: 8:30–8:55 (25s)

- Ein ganz normales Ticket. User Story plus drei Gherkin-Szenarien.
- Gültiger Code, Summe sinkt.
- [click] Ungültiger Code, Fehlermeldung.
- [click] Gutschein entfernen, voller Preis.
- Die Akzeptanzkriterien sind das **Testorakel**: Was ist richtig, was ist falsch? Unklare Kriterien, unklares Urteil. Das ist euer Handwerk, ich komme am Ende darauf zurück.
- Auf der Folie leicht gekürzt: Die zwei Regeln (Gutschein bleibt nach Reload, höchstens ein Gutschein) fehlen, sie tauchen im Report wieder auf. Original: `docs/tickets/SHOP-42-gutschein.md`, Commit c6c529e.
-->

---
layout: statement
---

# Der Agent soll das <span class="text-[#ff6bed]">im echten Shop</span> prüfen.

<div class="mt-8 text-2xl opacity-80">Aber er kennt den Shop nicht.</div>

<!--
TIME: 8:55–9:05 (10s)

- Der Agent soll genau diese drei Szenarien im echten Shop durchklicken.
- Aber er weiß nicht, wie man den Shop startet, wo der Warenkorb ist, wie man einen Gutschein eingibt.
- Wie bei einem neuen Kollegen am ersten Tag …
-->

---

# Ein Agent ist ein neuer Kollege, der jeden Abend <span class="text-[#ff6bed]">alles vergisst</span>

<div class="text-xl opacity-80 -mt-1">Darum bekommt er eine <b class="text-[#ff6bed]">Einarbeitungsmappe</b>. Bei Claude Code heißt sie <b>Skill</b>.</div>

<div class="mt-8">

<IconCards :columns="2" size="lg" no-clicks :items="[
  { icon: '/funnel/prosa.webp', title: 'SKILL.md', sub: 'Shop starten, bedienen, Belege sammeln', tag: 'Arbeitsanweisung' },
  { icon: '/icons/feature-map.webp', title: 'Feature Map', sub: 'pro Feature: Was gibt es? Wie komme ich hin? Wo hakt es?', tag: 'Testkonzept', accent: true },
]" />

</div>

<!--
TIME: 9:05–9:30 (25s)

- **Analogie:** Ein Agent ist wie ein neuer Kollege am ersten Tag. Schlau, aber er kennt euren Shop nicht. Und er vergisst jeden Abend alles.
- Was gebt ihr einem neuen Kollegen? Eine **Einarbeitungsmappe**. Bei Claude Code heißt so eine Mappe „Skill“. Es ist nur ein Ordner mit Markdown-Dateien im Repo.
- Zwei Teile, in euren Worten: Die **SKILL.md** ist die Arbeitsanweisung. Wie starte ich die Testumgebung, wie bediene ich den Shop, wie sammle ich Belege?
- Die **Feature Map** ist das Testkonzept: eine Datei pro Feature. Was gibt es, wie komme ich hin, wo hakt es?
- Er muss nicht raten, er schlägt nach.
-->

---

# So nutzt der Agent die Mappe in <span class="text-[#ff6bed]">jedem Lauf</span>

<div class="mt-10">

<IconCards flow no-clicks :items="[
  { icon: '/icons/issue.webp', title: 'Auftrag', sub: '„Prüfe SHOP-42 im Browser“' },
  { icon: '/funnel/prosa.webp', title: 'Mappe erkennen', sub: 'er kennt nur den Klappentext', tag: 'description' },
  { icon: '/icons/launch.webp', title: 'Shop starten', sub: 'Skript + Selbsttest', tag: 'launch · doctor' },
  { icon: '/icons/feature-map.webp', title: 'Nachschlagen', sub: 'features/warenkorb.md', accent: true },
  { icon: '/icons/evidence.webp', title: 'Klicken + Belege', sub: 'Screenshot je Schritt' },
]" />

</div>

<div class="mt-8 text-center text-xl opacity-80">Er lädt nur, was er braucht. Ohne Mappe fängt jeder Lauf <b>bei null</b> an.</div>

<!--
TIME: 9:30–9:55 (25s)

- Was passiert, wenn der Agent den Auftrag bekommt „Prüfe SHOP-42 im Browser“?
- Er kennt von jeder Mappe nur den **Klappentext**, die Beschreibung. Daran erkennt er: Für diese Aufgabe brauche ich die Mappe für den Shop. Erst dann lädt er sie ganz.
- Er startet den Shop mit dem Skript aus der Mappe und macht einen Selbsttest: Läuft der Shop, sind Daten da?
- Dann schlägt er das Feature nach. Für den Gutschein ist das die Seite über den Warenkorb.
- Erst jetzt klickt er, und sammelt bei jedem Schritt einen Screenshot.
- Jeder Agent fängt so auf **dieselbe** Weise an. Ohne Mappe würde jeder Lauf raten: Wie startet das, welcher Port, wo ist der Warenkorb?
- Gleich seht ihr die zwei Dateien dazu.
- SOURCE: otto-nuxt-shop Commit 01f006e, `.claude/skills/verify-otto-shop/SKILL.md`
-->

---
layout: code-editor
project: otto-nuxt-shop
activeFile: SKILL.md
tabs: SKILL.md
step: Die Arbeitsanweisung
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

```md {1-4|6-7|9-19|all}
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
TIME: 9:55–10:20 (25s)

- Die Arbeitsanweisung in echt: eine Markdown-Datei in `.claude/skills/`. Links die ganze Mappe.
- Oben der **Klappentext**, die Beschreibung. Nur die liest der Agent immer.
- [click] Harte Regeln. Port 3000 gehört einem anderen Projekt. Nur stoppen, was man selbst gestartet hat.
- [click] Die Schritte von eben: starten, Selbsttest, bedienen, Belege sichern und aufräumen. Echte Befehle aus diesem Repo, keine Beispiele. `$V` ist nur die Abkürzung für das Start-Skript.
- [click] Alles zusammen: eine Anleitung, die jeder Agent gleich abarbeitet.
- Falls gefragt: Port 3100 hat der Agent selbst gewählt, weil 3000 belegt war. `doctor` meldet z. B. „ok port 3100 owned by our run“, „ok /api/products total=184“.
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
- cart-qty-minus: `−` verringert die Menge. Bei 1 fliegt die Position raus.
- cart-shipping: unter 79 € kostet der Versand 5,95 €, sonst kostenlos.

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
TIME: 10:20–10:45 (25s)

- Und das ist eine Seite aus der Feature Map: der Warenkorb. Jedes Feature bekommt so eine Datei, links seht ihr Startseite, Suche, Produktseite, Merkzettel.
- Jede Datei hat dieselben vier Abschnitte.
- [click] **Was gibt es?** Jedes Unterfeature mit erwartetem Verhalten. Der Gutschein steht noch nicht drin. Den trägt der Agent gleich selbst nach.
- [click] **Wie komme ich hin?** Aus Sicht der Nutzerin.
- [click] **Wie bediene ich es?** Echte Befehle, die der Agent kopieren kann.
- [click] **Gotchas.** Mein Lieblingsbeispiel: Der Minus-Button ist ein typografisches Minus, kein Bindestrich. Genau das Wissen, das sonst nur im Kopf einer Testerin steckt.
- [click] Das ist ein Testkonzept, das der Agent lesen kann.
- Falls gefragt, Gotchas aus der Suche: Ein bekannter Bug steht drin, den der Agent als fehlgeschlagen melden soll, statt den Test abzuschwächen. Und „uhr“ findet nichts, weil die Seed-Daten englisch sind. Kein Bug.
- SOURCE: otto-nuxt-shop Commit 01f006e, `.claude/skills/verify-otto-shop/features/warenkorb.md` und `suche.md` (gekürzt)
-->

---

# Die Mappe schreibt ihr nicht von Hand: <span class="text-[#ff6bed]">ein Befehl</span>

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

<div class="mt-5 text-center text-base opacity-70"><b>pstack</b> von Lauren Tan (poteto), React-Compiler-Team · github.com/cursor/plugins</div>

<!--
TIME: 10:45–11:10 (25s)

- Die Mappe müsst ihr nicht von Hand schreiben. Ein Befehl aus pstack: `/create-verification-skill`.
- Er befragt das Repo, nicht euch: Wie startet die App, wie bedient man sie, welche Belege gibt es?
- Er schreibt die SKILL.md mit Start-Skript und legt die Feature Map an, eine Datei pro Feature.
- Wichtig: Er beweist den Skill selbst, einmal komplett durchgespielt. Erst danach kann man sich auf den Skill verlassen.
- Danach pflegt ihr die Map mit `/maintain-verification-skill`, wenn sich die App ändert.
- **Wer steckt dahinter?** pstack kommt von poteto, Lauren Tan. Im React-Compiler-Core-Team, vorher bei Meta, Netflix und Cursor (X-Bio, Stand Nov 2026). Eine Sammlung von Skills, Playbooks und Prinzipien: weniger Code, aber besserer. „If you want to go fast, go deep first.“ Entstanden als Cursor-Plugin, inzwischen offiziell auch für Claude Code.
- **Werkzeug ist austauschbar:** In meinem Setup nimmt der Agent automatisch Agent Browser, weil es installiert ist. Ihr könnt genauso Playwright CLI oder Playwright MCP nutzen. Der Skill beschreibt, was geprüft wird, nicht womit.
- SOURCE: pstack `skills/create-verification-skill/SKILL.md` (v0.15.36), github.com/cursor/plugins/tree/main/pstack (README), x.com/poteto; otto-nuxt-shop Commit 01f006e.
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
TIME: 11:10–11:55 (45s)

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

<div class="mt-10">

<IconCards flow no-clicks :width="146" :loop="{ from: 3, to: 1, label: 'CSS-Detail nachgebessert' }" :items="[
  { icon: '/icons/issue.webp', title: 'Lesen', sub: 'Ticket, Skill, Code' },
  { icon: '/funnel/codebasis.webp', title: 'Bauen', sub: 'useCoupon.ts, warenkorb.vue', tag: '+ Typecheck' },
  { icon: '/jira/agent.webp', title: 'Im Browser prüfen', sub: '3 Szenarien mit dem Skill', accent: true },
  { icon: '/icons/evidence.webp', title: 'Screenshots ansehen', sub: 'die eigenen Belege' },
  { icon: '/icons/feature-map.webp', title: 'Commit', sub: 'Feature Map ergänzt' },
]" />

</div>

<div class="mt-6 text-center text-base opacity-80">Er schreibt auch <b>deterministische Tests</b>. Aber nicht alles hat einen E2E-Test.<br/>Darum prüft er zusätzlich <span class="text-[#ff6bed]">im echten Browser</span>, bis alles grün ist.</div>

<!--
TIME: 11:55–13:00 (65s)

- Der Agent nutzt den Verification-Skill nicht erst in der QA. Er nutzt ihn schon, während er das Feature baut.
- Natürlich schreibt er auch Unit- und Komponenten-Tests. Aber in den meisten Projekten haben wir nicht für alles E2E-Tests. Genau diese Lücke schließt die Prüfung im Browser.
- Das ist der echte Ablauf aus dem Log. Ein Prompt: „Implementiere SHOP-42, prüfe jedes Szenario mit dem Skill, ergänze die Feature Map, committe.“
- Er liest zuerst das Ticket **und** den Verification-Skill. Er weiß also vorher, wie er prüfen wird.
- Nach dem Code startet er den Shop über den Skill und klickt die drei Szenarien durch.
- Spannend ist der Pfeil zurück: Er schaut sich seine eigenen Screenshots an, sieht ein CSS-Detail und baut nach.
- Kosten unter einem Dollar (15 Tool-Aufrufe, 0,90 $). Commit b70393e.
- Er ergänzt auch die Feature Map um den Gutschein. Die Doku wächst mit dem Feature.
- SOURCE: Log `.talk-logs/02-implement-gutschein.jsonl`
-->

---
layout: statement
---

# Derselbe Skill macht danach <span class="text-[#ff6bed]">QA</span>.

<div class="mt-8 text-2xl opacity-80">Ein <b>zweiter</b> Agent, der den Code nicht geschrieben hat.<br/>Er hakt nicht nur Szenarien ab, er testet auch <b>explorativ</b>.</div>

<!--
TIME: 13:00–13:10 (10s)

- Der Entwickler-Agent hat den Skill und Agent Browser genutzt, um das Feature zu bauen.
- Dieselbe Mappe können wir jetzt ein zweites Mal nutzen: für die QA.
- **Unabhängigkeit des Testens:** Wer baut, prüft nicht allein. Darum ein zweiter Agent mit frischem Kontext. Er hat den Code nicht geschrieben und kennt die Abkürzungen des ersten nicht.
- Aber diesmal reicht es nicht, die drei Szenarien abzuhaken. Der QA-Agent soll auch explorativ testen, wie ein erfahrener Tester.
-->

---

# Prompt 2: Der <span class="text-[#ff6bed]">QA-Agent</span>

<div class="text-sm opacity-60 -mt-2 mb-3">Der echte Prompt, leicht gekürzt. Aus diesem Lauf stammen die Bilder gleich.</div>

<div class="prompt">
  <div class="prompt__bar"><i></i><i></i><i></i><span>Claude Code · Prompt</span></div>
  <div class="prompt__body">
    <div class="prompt__lead"><b>›</b> Du bist der <em>QA-Agent</em> für den PR auf <code class="is-file">feat/gutschein</code>. Ändere keinen Code.</div>
    <div class="prompt__lead opacity-80">Ticket: <code class="is-file">docs/tickets/SHOP-42-gutschein.md</code></div>
    <ol>
      <li><span>1</span><div>Prüfe mit dem Skill <code class="is-skill">verify-otto-shop</code> jedes <em>Gherkin-Szenario</em> im echten Browser</div></li>
      <li class="is-charter"><span>2</span><div>Teste danach <em>explorativ</em> rund um den Gutschein, wie ein erfahrener Tester<small>Schreibweise, doppeltes Einlösen, Mengenänderungen, Artikel entfernen, Reload</small></div></li>
      <li><span>3</span><div>Nimm den ganzen Lauf als <em>Video</em> auf und mache <em>Screenshots</em> von jedem Szenario und Fund</div></li>
      <li><span>4</span><div>Schreibe einen <em>Report</em> mit festem Urteil: <code class="is-skill">HEALTHY</code> <code class="is-skill">MINOR_ISSUES</code> <code class="is-skill">CRITICAL_BUGS</code></div></li>
    </ol>
  </div>
</div>

<div class="mt-4 text-lg">Punkt 2 ist eine <span class="text-[#ff6bed]">Test-Charter</span>. Darin steckt euer QA-Wissen.</div>

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
.prompt li.is-charter { margin: 0 -10px; padding: 6px 10px; border: 1px solid #ff6bed; border-radius: 10px; background: rgba(255,107,237,.08); }
.prompt__body { font-size: 16px; padding: 12px 18px; }
.prompt ol { gap: 6px; margin-top: 10px; }
.prompt small { display: block; font-size: 14px; opacity: .7; margin-top: 2px; }
</style>

<!--
TIME: 13:10–14:10 (60s)

- Ein **zweiter** Agent. Er hat den Code nicht geschrieben, und er darf ihn nicht ändern.
- Rolle und Grenze: QA-Agent, kein Code.
- Wieder ist das Ticket die Quelle.
- Szenarien zuerst, mit dem Skill.
- **Ehrlich sagen:** Hier steht meine Test-Charter. „Mengenänderungen“ habe ich als Beispiel reingeschrieben. Den eingebauten Bug kannte der Agent nicht, aber ich habe ihm gesagt, wo erfahrene Tester suchen.
  - Cookie-Manipulation stand nicht drin. Und dass „Artikel entfernen“ zu einer negativen Gesamtsumme führt, auch nicht. Das hat er selbst gefunden.
  - Genau das ist der Punkt für euch: Diese Liste ist **QA-Wissen**. Wer weiß, wo es kracht, schreibt die bessere Charter.
- Video und Screenshots: Daher kommen die Standbilder, die ihr gleich seht.
- Festes Urteil und feste Report-Struktur. Damit kann die Pipeline später arbeiten.
- Die Charter-Zeile. Darauf komme ich am Ende zurück: Das ist eure Arbeit, eine Ebene höher.
- Danach noch: „Committe nur den Report. Kein Push.“
- SOURCE: otto-nuxt-shop `.talk-logs/03-verify-gutschein.jsonl`, Report-Commit 302bad8
-->


---
clicks: 10
---

# Demo: Erst das Ticket, dann <span class="text-[#ff6bed]">explorativ</span>

<AnnotatedStills
  class="mt-2"
  dir="/shop42"
  :step="$clicks"
  :chapters="[
    { t: 0, text: 'Mascara in den Warenkorb legen' },
    { t: 4, text: 'Szenario 1: SPAR10 einlösen → −0,89 €', kind: 'pass' },
    { t: 9, text: 'Szenario 2: GIBTSNICHT → „ungültig“', kind: 'pass' },
    { t: 15, text: 'Explorativ: „ spar10 “ mit Leerzeichen', kind: 'pass' },
    { t: 20, text: 'Menge 1 → 5', kind: 'bug', severity: 'major', finding: 'Rabatt −0,89 € statt −4,47 €' },
    { t: 29, text: 'Bei 9 Stück einlösen, auf 1 reduzieren', kind: 'bug', severity: 'critical', finding: '−8,05 € Rabatt: 90 % statt 10 %' },
    { t: 37, text: 'Szenario 3: Gutschein entfernen → 14,89 €', kind: 'pass' },
    { t: 40, text: 'Leere Eingabe und Reload', kind: 'bug', severity: 'minor', finding: '„ungültig“ statt „Code eingeben“' },
    { t: 62, text: 'Zweiter Artikel: Zitrone für 0,71 €' },
    { t: 70, text: 'Mascara raus, nur Zitrone übrig', kind: 'bug', severity: 'critical', finding: 'Gesamtsumme −1,39 €' },
    { t: 75, text: 'Cookie auf 500 gesetzt', kind: 'bug', severity: 'major', finding: '−493,34 €: Rabatt ungeprüft' },
  ]"
/>

<!--
TIME: 14:10–15:40 (90s)

- Ein **zweiter** Agent, der QA-Agent, prüft den PR. Er hat den Code nicht geschrieben.
- Das sind Standbilder aus dem echten Video des QA-Agenten, von ihm selbst mit `agent-browser record` aufgenommen. Jeder Klick springt ein Kapitel weiter (11 Bilder, 10 Klicks). Rechts die Kapitel-Liste.
- LIVE-OPTION (wenn WLAN stabil): im Repo otto-nuxt-shop auf `feat/gutschein` `claude` starten, Prompt aus Folie „Prompt 2“. Dauert etwa 2,5 Minuten. Sonst diese Bilder.

VOICE-OVER (pro Bild):
- **Bild 1** „Der Agent startet auf der Startseite und legt eine Mascara in den Warenkorb.“
- [click] **Bild 2** „Szenario 1: Er löst SPAR10 ein. 89 Cent Rabatt, Gesamt 14 Euro. Grün.“
- [click] **Bild 3** „Szenario 2: GIBTSNICHT. Die Fehlermeldung kommt. Grün.“
- **HIER STEHEN BLEIBEN.** „Die ersten zwei Szenarien aus dem Ticket: grün. Das hätte auch ein E2E-Test gekonnt. Ab jetzt sucht er dort, wo nichts im Ticket steht. Das dritte Szenario hakt er nebenbei ab.“
- [Ask for hands] **„Ihr seid die Tester: Wo würdet ihr jetzt suchen?“** Zwei, drei Zurufe abwarten (Menge? Leerzeichen? Entfernen?).
- [click] **Bild 4** „Er tippt den Code klein und mit Leerzeichen. Funktioniert.“
- [click] **Bild 5** „Jetzt erhöht er die Menge auf 5. Achtet auf den Rabatt: Er bleibt bei 89 Cent. Das ist der erste Fund.“
- [click] **Bild 6** „Er dreht es um: bei 9 Stück einlösen, dann auf 1 runter. 8,05 Euro Rabatt auf 8,94 Euro. Das sind 90 Prozent.“
- [click] **Bild 7** „Szenario 3 nebenbei: Gutschein entfernen, voller Preis. Grün.“
- [click] **Bild 8** „Leere Eingabe, Reload. Hier sagt der Shop ‚ungültig‘ statt ‚bitte Code eingeben‘. Kleinigkeit.“
- [click] **Bild 9** „Jetzt wird er gemein: Er legt eine Zitrone für 71 Cent dazu …“
- [click] **Bild 10** „… und entfernt die Mascara. Gesamtsumme: minus 1,39 Euro.“
- [click] **Bild 11** „Zum Schluss manipuliert er das Cookie. 500 Euro Rabatt. Das wäre ein echter Preis-Exploit.“

- Kapitel-Zeiten sind aus einzelnen Frames des Videos abgelesen (±1 s). Standbilder: `public/shop42/00–10.webp`, je der Moment, in dem das Ergebnis sichtbar ist. Die Meldung bei leerer Eingabe (Bild 8) ist im Video nicht zu sehen, nur im Report.
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
      <div class="rep__h">Ticket: Szenarien + Regeln</div>
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
  <div class="rep__foot">Pro Fund: Repro-Schritte · Soll vs. Ist · Beleg · Ursache (<code>useCoupon.ts:15</code>)</div>
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
TIME: 15:40–16:10 (30s)

- Das Urteil ist eines von drei festen Werten: HEALTHY, MINOR_ISSUES, CRITICAL_BUGS.
- Links: Alle Ticket-Szenarien grün, dazu die zwei Regeln aus dem Ticket (Reload, höchstens ein Gutschein), die ich auf der Ticket-Folie weggelassen habe.
- Rechts: fünf Funde, zwei davon kritisch.
- F4 ist sogar ein Sicherheitsproblem. Mit einem manipulierten Cookie bekommt man 500 € Rabatt.
- Dazu Belege und die Ursache für den Entwickler: `useCoupon.ts:15`. Er schlägt sogar den Fix vor.
- Ein Dollar für einen QA-Lauf, der mich als Mensch eine halbe Stunde gekostet hätte.
- **Ehrlich sagen:** Einen Bug habe ich absichtlich eingebaut: Der Rabatt wird beim Einlösen als fester Betrag gespeichert. Der QA-Agent wusste das nicht, der Commit heißt neutral „Rabatt beim Einlösen berechnen und speichern“. Aus dem einen Bug hat er vier Funde gemacht.
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

<div v-click class="sofa-shock">
  <HamcrabPose v-if="$clicks >= 1" pose="shock" :size="140" />
  <div class="sofa-shock__tag">Gesamt <b>−493,34 €</b></div>
</div>

<style>
.sofa-shock { position: absolute; left: 60px; bottom: 34px; display: flex; align-items: center; gap: 4px; }
.sofa-shock__tag { margin-left: -24px; transform: rotate(-6deg); padding: 10px 18px; border-radius: 10px; background: #ff6bed; color: #1a1d29; font-size: 22px; font-weight: 700; box-shadow: 0 6px 20px rgba(0,0,0,.4); }
.sofa-shock__tag b { font-size: 30px; color: #1a1d29 !important; }
</style>

<!--
TIME: 16:10–16:40 (30s)

- **Die Pointe.** Kurz Pause lassen.
- Alle drei Szenarien waren grün. Ein klassischer E2E-Test wäre durchgelaufen.
- [click] Hamcrab geschockt mit dem Preisschild: −493,34 €, die Summe aus dem letzten Bild der Demo. Kurz wirken lassen, Lacher abwarten.
- Der Agent hat das gemacht, was gute Tester machen: Er hat Fragen gestellt, die keiner aufgeschrieben hat.
-->

---

# Drei von fünf Funden waren <span class="text-[#ff6bed]">Zustandsübergänge</span>

<div class="text-sm opacity-60 -mt-2 mb-3">Die Funde aus der Demo, einsortiert in eine Testmatrix. Sortiert nach Risiko.</div>

<div class="rub">
  <div class="rub__row rub__head"><span>Risiko</span><span>Technik</span><span>Testfälle für SHOP-42</span><span>Im Lauf</span></div>
  <div class="rub__row"><i class="is-must">Pflicht</i><b>Akzeptanzkriterien</b><span>ein Testfall pro Gherkin-Szenario</span><em class="is-pass">5 × PASS</em></div>
  <div class="rub__row is-hit"><i class="is-high">hoch</i><b>Zustandsübergänge</b><span>einlösen → Menge ändern → Artikel entfernen</span><em>F1 · F2 · F3</em></div>
  <div class="rub__row"><i class="is-high">hoch</i><b>Manipulation</b><span>Cookie von Hand ändern</span><em>F4</em></div>
  <div class="rub__row"><i class="is-high">hoch</i><b>Grenzwerte</b><span>leere Eingabe · Menge 1 · Höchstmenge</span><em>F5</em></div>
  <div class="rub__row is-open"><i class="is-mid">mittel</i><b>Fehlerfall</b><span>Einlösen schlägt im Netzwerk fehl</span><em>nicht geprüft</em></div>
  <div class="rub__row is-open"><i class="is-low">niedrig</i><b>Barrierefreiheit</b><span>Tab-Reihenfolge, Labels, Screenreader</span><em>nicht geprüft</em></div>
</div>

<div v-click class="mt-5 text-lg">Meine Charter war <b>eine Zeile</b>. Eine <span class="text-[#ff6bed]">Testmatrix</span> plant die Fälle vorher und zeigt die Lücken.</div>

<style>
.rub { border: 1px solid rgba(255,255,255,.15); border-radius: 12px; overflow: hidden; background: #1a1d29; }
.rub__row { display: grid; grid-template-columns: 80px 190px 1fr 130px; gap: 16px; align-items: center; padding: 8px 18px; font-size: 16px; border-bottom: 1px solid rgba(255,255,255,.06); }
.rub__row:last-child { border-bottom: 0; }
.rub__row b { color: #f3e6c4; }
.rub__row i { font-style: normal; font-size: 12px; font-weight: 700; }
.rub__row i.is-must { color: #ff6bed; }
.rub__row i.is-high { color: #ff8a8a; }
.rub__row i.is-mid { color: #fdba74; }
.rub__row i.is-low { color: #fde047; }
.rub__row em { font-style: normal; font-size: 13px; font-weight: 800; text-align: center; padding: 3px 0; border-radius: 999px; background: rgba(255,77,77,.18); color: #ff8a8a; }
.rub__row em.is-pass { background: rgba(74,222,128,.15); color: #6ee7a0; }
.rub__row.is-hit { background: rgba(255,107,237,.08); box-shadow: inset 3px 0 0 #ff6bed; }
.rub__row.is-open em { background: none; border: 1px dashed rgba(255,255,255,.35); color: rgba(255,255,255,.6); font-weight: 600; }
.rub__head { background: rgba(255,255,255,.05); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: #ff6bed; }
.rub__head span:last-child { text-align: center; }
</style>

<!--
TIME: 16:40–17:25 (45s)

- „Keiner hat daran gedacht.“ Hätte man daran denken können? Ja. Und zwar mit Techniken, die ihr alle kennt.
- Ich habe die fünf Funde aus der Demo nachträglich in eine Testmatrix einsortiert. **Drei von fünf** sind Zustandsübergänge: einlösen, dann Menge ändern, dann Artikel entfernen. Der Cookie-Fund ist Manipulation, die leere Eingabe ein Grenzwert.
- **Ehrlich sagen:** Diese Matrix hatte der Lauf nicht. Er hatte nur meine Charter, eine Zeile Stichworte. Darum sind zwei Zeilen offen: Fehlerfall und Barrierefreiheit hat er nicht geprüft. Ohne Matrix hätte ich das nicht einmal gemerkt.
- [click] Die Lehre: **Testentwurf vor dem Browser.** Der Agent baut aus dem Ticket zuerst die Testmatrix, sortiert nach Risiko, Preis- und Rabattlogik zuerst. Dann führt er sie aus. Danach kommt die explorative Session nach Charter: die Matrix für das Bekannte, die Charter für den Rest.
- So baue ich das: Testmatrix-Vorlage, Report-Vorlage und **ein fertiger Beispiel-Report** liegen im Skill. Der Prompt sagt nur noch: „Erst Testmatrix nach Vorlage, dann ausführen, dann explorativ nach Charter.“
- Falls gefragt, feste Ergebnisse pro Testfall: PASS nur mit Beleg aus der echten Oberfläche, ein grüner Unit-Test reicht nicht. **Bestandsfehler:** Bei FAIL prüft der Agent denselben Fall auf main. Ist er dort auch rot, wird das ein eigenes Ticket und blockiert diesen PR nicht. BLOCKIERT heißt: nicht ausführbar, mit Begründung.
- Die Einsortierung ist meine, nicht die des Agenten. F5 (leere Eingabe) als Grenzwert ist eine Auslegung.
- SOURCE: Funde aus otto-nuxt-shop `docs/reports/SHOP-42-qa-report.md` (Commit 302bad8). Matrix-Idee: QA-Skill aus einem Kundenprojekt (Idee: Yannick Foelsing), privater Gist alexopotto/2e5b7f09afd15fd3dfdd825515ba9d1d. Kundennamen nicht nennen.
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

<div class="mt-6 text-center text-xl opacity-80">Die Schleife ist dieselbe wie lokal. Nur der <b>Auslöser</b> ist jetzt ein Label.</div>

<!--
TIME: 17:25–17:55 (30s)

- Lokal funktioniert's. Jetzt soll es ohne mich laufen.
- Alle fünf Karten stehen sofort da, kein Klick. Von links nach rechts durchgehen.
- Ich setze am PR das Label `qa-verify`. Bewusst ein Label: Ich entscheide, welcher PR einen Lauf wert ist. Ab dann testet jeder neue Push auf diesen PR automatisch neu.
- GitHub Actions startet den Shop. Mit demselben Skript aus dem Verification-Skill.
- Claude Code findet über den PR das verlinkte GitHub-Issue (`Closes #2`). Das Issue ist das Ticket mit den Gherkin-Szenarien.
- Er prüft im echten Browser, headless in der Cloud.
- Der Report kommt mit Screenshots als Kommentar in den PR. Das Urteil entscheidet, ob der Check grün oder rot wird.
- Gleicher Skill, gleiche Feature Map, gleicher Report wie lokal.
- SOURCE: alexop.dev „Building an AI QA Engineer with Claude Code and Playwright MCP“ (Label-Trigger) und „How to Use Claude Code as an AI QA Tester with Agent Browser“ (--json-schema).
-->

---

# Der Aufruf ist ein <span class="text-[#ff6bed]">Testauftrag</span> mit Leitplanken

<div class="qa-cmd">

```bash {1|2|3|4|5|7}
claude -p "$(envsubst < .github/prompts/qa.md)" \
  --max-budget-usd 10 \
  --allowedTools "Read,Edit(qa-report/**),Bash(agent-browser:*),Bash(gh issue view:*),…" \
  --json-schema "$(cat .github/prompts/qa-verdict.schema.json)" \
  --output-format stream-json --verbose | node claude-live-log.mjs

- uses: actions/upload-artifact@…   # qa-report/ mit Screenshots + Video
```

</div>

<div class="qa-x mt-5">
  <template v-if="$clicks === 0"><span>Testauftrag</span>Der Prompt liegt als Datei im Repo: versioniert und reviewbar. Die PR-Nummer wird eingesetzt.</template>
  <template v-else-if="$clicks === 1"><span>Timebox</span>Bei 10 $ ist Schluss. Wie eine Timebox im explorativen Testen. Echte Läufe: 1 bis 2 $.</template>
  <template v-else-if="$clicks === 2"><span>Rechte</span>Er darf den Browser bedienen, das Ticket lesen und den Report schreiben. Sonst nichts.</template>
  <template v-else-if="$clicks === 3"><span>Testergebnis</span>Das Urteil kommt als festes JSON, nicht als Prosa. Warum das zählt: nächste Folie.</template>
  <template v-else-if="$clicks === 4"><span>Testprotokoll</span>Jeder Schritt erscheint live im Actions-Log. Man sieht dem Agenten beim Testen zu.</template>
  <template v-else><span>Belege</span>Screenshots und Video hängen am Lauf. Fertig für das Defect-Ticket.</template>
</div>

<style>
.qa-cmd .slidev-code { font-size: 15px !important; line-height: 1.6 !important; padding: 18px 20px !important; }
.qa-x { display: flex; align-items: center; gap: 16px; min-height: 64px; padding: 12px 18px; border-left: 4px solid #ff6bed; border-radius: 8px; background: rgba(255,107,237,.08); font-size: 20px; line-height: 1.35; }
.qa-x span { flex: none; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: .05em; color: #ff6bed; width: 120px; }
</style>

<!--
TIME: 17:55–18:30 (35s)

- Bevor wir den ganzen Workflow sehen: die eine Zeile, in der der Agent läuft. Für euch übersetzt.
- **Prompt als Datei:** Das ist der Testauftrag. Er liegt im Repo, wird reviewt wie Code. `envsubst` setzt die PR-Nummer ein.
- [click] **Budget:** 10 $ Deckel. Das ist eure Timebox. Echte Läufe kosten 1 bis gut 2 $, je nachdem, wie weit er explorativ sucht.
- [click] **Erlaubte Tools:** eine Whitelist. Browser, Ticket lesen, Report schreiben. Schreiben darf er nur in den Ordner `qa-report/`. `curl` ist bewusst nicht dabei.
- [click] **JSON-Schema:** Das Urteil kommt in einem festen Format. Nur kurz nennen, die nächste Folie erklärt es.
- [click] **Live-Log:** Jeder Tool-Aufruf steht im Actions-Log. Nachvollziehbar wie ein Testprotokoll.
- [click] **Artefakt:** Screenshots und Video bleiben am Lauf. Das sind die Belege.
- SOURCE: otto-nuxt-shop `.github/workflows/claude-qa.yml` (gekürzt: `--model opus`, `--max-turns 300` und die volle Tool-Liste fehlen), `.github/prompts/qa-verdict.schema.json`
-->

---

# Ein Quality Gate braucht <span class="text-[#ff6bed]">true oder false</span>, keine Prosa

<div class="urteil mt-6">
  <div class="urteil__col">
    <div class="urteil__h">Ohne Schema</div>
    <div class="urteil__prosa">„Die Szenarien sehen größtenteils gut aus. Bei der Rabattberechnung gibt es allerdings ein paar Auffälligkeiten, die man sich ansehen sollte …“</div>
    <div class="urteil__out is-unklar">Rot oder grün?</div>
  </div>
  <div v-click class="urteil__col is-now">
    <div class="urteil__h">Mit <code>--json-schema</code></div>
    <pre class="urteil__json">{ "passed": <b>false</b>,
  "verdict": "CRITICAL_BUGS",
  "summary": "3 Fehler, Ursache useCoupon.ts:15" }</pre>
    <div class="urteil__out is-rot"><code>passed</code> ist nicht <code>true</code> → Check rot</div>
  </div>
</div>

<div v-click class="mt-6 text-center text-xl">Der Weg zum Urteil ist kreativ. Das Urteil nicht: Niemand trägt <b class="text-[#ff6bed]">„fast bestanden“</b> ein.</div>

<style>
.urteil { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.urteil__col { display: flex; flex-direction: column; gap: 14px; border: 1px solid rgba(255,255,255,.15); border-radius: 14px; padding: 16px 20px; background: rgba(255,255,255,.04); }
.urteil__col.is-now { border-color: #ff6bed; background: rgba(255,107,237,.06); }
.urteil__h { font-size: 12px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; opacity: .7; }
.urteil__col.is-now .urteil__h { color: #ff6bed; opacity: 1; }
.urteil__h code { font-size: 12px; text-transform: none; }
.urteil__prosa { flex: 1; font-size: 19px; line-height: 1.45; font-style: italic; color: #eaedf3; opacity: .85; }
.urteil__json { flex: 1; margin: 0; padding: 12px 14px; border-radius: 8px; background: rgba(0,0,0,.35); font-size: 15px; line-height: 1.6; color: #f3e6c4; white-space: pre-wrap; }
.urteil__json b { color: #ff8a8a; }
.urteil__out { padding: 8px 14px; border-radius: 8px; font-size: 17px; font-weight: 700; text-align: center; }
.urteil__out code { font-size: 15px; }
.urteil__out.is-unklar { border: 1px dashed rgba(255,255,255,.35); color: rgba(255,255,255,.7); }
.urteil__out.is-rot { background: rgba(255,77,77,.18); border: 1px solid #ff4d4d; color: #ff8a8a; }
</style>

<!--
TIME: 18:30–18:55 (25s)

- Das ist der Trick, warum ein Agent in einer Pipeline funktioniert.
- Links: Ein LLM antwortet normalerweise in Prosa. „Sieht größtenteils gut aus, ein paar Auffälligkeiten …“ Ist das grün oder rot? Eine Pipeline kann damit nichts anfangen. (Der Text links ist ein Beispiel von mir, kein echter Lauf.)
- [click] Rechts: Mit `--json-schema` muss der Agent genau dieses JSON liefern, und Claude Code prüft das Format. `passed` ist ein Boolean: true oder false, nichts dazwischen. Danach ist es ein ganz normales `if`: `passed` nicht true heißt `exit 1`, Check rot.
- [click] Der Weg dahin ist kreativ, das Urteil ist ein fester Wert. Wie in Xray: passed, failed, blocked. Niemand trägt „fast bestanden“ ein.
- SOURCE: otto-nuxt-shop `.github/prompts/qa-verdict.schema.json` (Commit d650193); JSON aus Run 42622982046
-->

---

<script setup>
import { ref } from 'vue'
import { onSlideEnter, onSlideLeave } from '@slidev/client'

const ghLines = [
  ['13:10:16', '💬', 'Ich suche zuerst das verlinkte Issue, um die Akzeptanzkriterien zu kennen.'],
  ['13:10:18', '🔧', 'gh issue view 2'],
  ['13:10:20', '💬', 'Ich lade den Skill verify-otto-shop, um zu wissen, wie ich den Shop bediene.'],
  ['13:10:47', '🔧', 'agent-browser record start qa-report/video/qa-run.webm http://localhost:3100/p/1'],
  ['13:11:03', '💬', 'Szenario „Gültiger Gutschein“: Ich löse SPAR10 ein und prüfe Rabattzeile und Gesamt.'],
  ['13:11:25', '💬', 'Ich erhöhe die Menge auf 2 und schaue, ob der Rabatt auf 1,79 € mitwächst.'],
  ['13:11:32', '💬', 'Ich lege das Sofa in den Warenkorb, löse SPAR10 ein …'],
  ['13:11:42', '💬', 'Ich entferne jetzt nur das Sofa.'],
  ['13:11:50', '💬', 'Kritischer Fund: Gesamtsumme −191,96 €. Ich lade neu, ob der Zustand bleibt.'],
  ['13:12:30', '💬', 'Alle Belege liegen vor. Jetzt schreibe ich den Report.'],
  ['13:13:00', '⚖️', 'passed: false · Urteil: CRITICAL_BUGS · Alle 3 Gherkin-Szenarien bestehen. Aber …'],
  ['13:13:00', '', '=== success · passed: false · Urteil: CRITICAL_BUGS · 115 Turns · 1.17 $ · 2.8 Min ==='],
]

const isPrint = typeof document !== 'undefined' && document.documentElement.classList.contains('slidev-print')
const shown = ref(isPrint ? ghLines.length : 0)
let timer
onSlideEnter(() => {
  if (isPrint) return
  shown.value = 0
  clearInterval(timer)
  timer = setInterval(() => {
    if (shown.value >= ghLines.length) return clearInterval(timer)
    shown.value++
  }, 900)
})
onSlideLeave(() => clearInterval(timer))
</script>

# Label setzen, dann <span class="text-[#ff6bed]">live zuschauen</span>

<HamcrabPose class="absolute right-10 top-2" :size="130" :pose="shown >= ghLines.length - 1 ? 'popcorn-drop' : 'popcorn'" />

<img src="/pr-label-qa-verify.png" class="gh-label mt-2" alt="PR-Timeline: alexanderop added the qa-verify label, darunter der Kommentar von github-actions mit dem QA-Report" />

<div class="gh-log mt-3">
  <div class="gh-log__step"><span class="gh-log__caret">⌄</span> <span class="gh-log__spin" :class="{ done: shown >= ghLines.length }"></span> Run set -o pipefail <span class="gh-log__job">QA im Browser</span></div>
  <div v-for="(l, i) in ghLines.slice(0, shown)" :key="i" class="gh-log__line" :class="{ end: !l[1] }">
    <span class="gh-log__no">{{ i + 1 }}</span><span class="gh-log__ts">{{ l[0] }}</span><span>{{ l[1] }} {{ l[2] }}</span>
  </div>
</div>

<div class="mt-2 text-center text-sm opacity-60">Echter Lauf · github.com/alexanderop/otto-nuxt-shop/pull/1 · Log gekürzt, Zeitstempel echt</div>

<style>
.gh-label { width: 100%; height: 64px; object-fit: cover; object-position: top left; border-radius: 10px; border: 1px solid rgba(255,255,255,.18); }
.gh-log { height: 280px; overflow: hidden; border-radius: 10px; border: 1px solid #30363d; background: #0d1117; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 13px; line-height: 1.75; color: #e6edf3; display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 6px; }
.gh-log__step { margin-bottom: auto; padding: 8px 14px; border-bottom: 1px solid #30363d; font-family: -apple-system, 'Segoe UI', sans-serif; font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
.gh-log__caret { color: #7d8590; }
.gh-log__job { margin-left: auto; font-weight: 400; color: #7d8590; font-size: 12px; }
.gh-log__spin { width: 12px; height: 12px; border-radius: 50%; border: 2px solid #d29922; border-right-color: transparent; animation: gh-spin .9s linear infinite; }
.gh-log__spin.done { animation: none; border: none; background: #3fb950; }
.gh-log__line { display: grid; grid-template-columns: 34px 78px 1fr; padding: 0 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.gh-log__line.end { color: #ff6bed; font-weight: 700; }
.gh-log__no { color: #6e7681; text-align: right; padding-right: 12px; }
.gh-log__ts { color: #7d8590; }
@keyframes gh-spin { to { transform: rotate(360deg); } }
</style>

<!--
TIME: 18:55–19:25 (30s)

- So sieht das im echten PR aus: Ich setze das Label `qa-verify`. Mehr mache ich nicht.
- Unten das Actions-Log. Die Zeilen laufen live rein, während der Agent testet. Hier im Zeitraffer: knapp 3 Minuten in 11 Sekunden.
- Man sieht ihm beim Denken zu: Issue lesen, Skill laden, Szenarien, dann explorativ. Das Sofa: −191,96 €.
- Am Ende ein Urteil, kein Prosa-Text: `passed: false`, CRITICAL_BUGS. 1,17 $.
- Läuft automatisch los beim Slide-Wechsel, kein Klick nötig. Der Hamcrab schaut mit Popcorn zu und lässt es beim Urteil fallen.
- SOURCE: otto-nuxt-shop PR #1, Actions-Run 42622982046 vom 09.11., Job „QA im Browser“ (Log via `gh run view --log`)
-->

---

# Was passiert, wenn jemand das <span class="text-[#ff6bed]">Label</span> setzt?

<div class="text-sm opacity-60 -mt-2 mb-2">otto-nuxt-shop · .github/workflows/claude-qa.yml, drei Jobs</div>

<MermaidSteps :steps="['dev', 'qa ticket claude e1', 'evidence e2', 'report comment gatejob gate e3 e4', 'green red']" class="mt-2 flex justify-center">

```mermaid {scale: 0.58}
flowchart LR
  dev@{ shape: person, label: "Label qa-verify am PR setzen" }
  subgraph qa["Job 1: QA · nur lesen"]
    direction TB
    ticket@{ shape: doc, label: "Ticket lesen" }
    claude@{ shape: browser, label: "Claude testet im Shop" }
    ticket --> claude
  end
  evidence@{ shape: folder, label: "Urteil passed + Screenshots + Video" }
  subgraph report["Job 2: Report · ohne KI, darf schreiben"]
    comment["💬 Kommentar mit Belegen"]
  end
  subgraph gatejob["Job 3: Merge-Gate · ohne KI"]
    direction TB
    gate{"passed?"}
    green["✅ Merge frei"]
    red["❌ Merge blockiert"]
    gate -->|true| green
    gate -->|false| red
  end
  dev e1@--> qa
  qa e2@--> evidence
  evidence e3@--> report
  report e4@--> gatejob
```

</MermaidSteps>

<!--
TIME: 19:25–20:10 (45s)

- Der echte Workflow aus dem Repo, als Bild. Den YAML-Code gibt es im Backup.
- Jemand setzt am PR das Label `qa-verify`. Erst dann läuft der Agent los. Danach testet jeder neue Push auf diesen PR neu.
- [click] **Job 1:** Claude liest zuerst das Ticket mit den Akzeptanzkriterien, dann testet er im echten Browser. Dieser Job darf **nur lesen**: nichts pushen, nichts kommentieren, nichts mergen.
- [click] Raus kommt ein festes Urteil, `passed` true oder false, plus Screenshots und Video.
- [click] **Job 2 und 3, ohne KI:** Job 2 postet den Kommentar mit den Belegen. Schreibrechte hat nur dieser Job. Job 3 ist das Merge-Gate und prüft `passed`.
- [click] `true` → Check grün, Merge frei. `false` oder kein Urteil → Check rot, Merge blockiert.
- Das Merge-Gate ist Pflicht-Check auf `main` (Branch-Protection). Rot blockiert den Merge, bis ein Lauf für genau diesen Commit besteht.
- SOURCE: otto-nuxt-shop `.github/workflows/claude-qa.yml` (Commits d650193 und 18be32e: Pflicht-Check, Re-Run bei Push, eigener Gate-Job)
-->

---

# Der QA-Agent kommentiert <span class="text-[#ff6bed]">direkt im PR</span>

<div class="prshot mt-3">
  <figure>
    <img class="is-contain" src="/pr-report-kopf.png" alt="Bot-Kommentar von github-actions: Urteil CRITICAL_BUGS, darunter das Video des Laufs als GIF und der Titel QA-Report PR #1, SHOP-42, Issue #2" />
    <figcaption><b>1</b> Urteil zuerst, dann das Video vom Lauf</figcaption>
  </figure>
  <figure>
    <img src="/pr-report-fund.png" alt="Fund F2 im Kommentar: Gesamtsumme wird negativ, Severity Critical. Repro in drei Schritten, Erwartet Gesamt 22,04 €, Ist Gesamt −191,96 €, darunter der Screenshot als Beleg" />
    <figcaption><b>2</b> Jeder Fund: Repro, Soll, Ist, Beleg</figcaption>
  </figure>
</div>

<div class="mt-4 text-center text-lg">Diesmal mit einem Sofa: <b class="text-[#ff6bed]">Gesamt −191,96 €</b>, Quality Gate rot · <span class="opacity-70">115 Turns · 1,17 $ · 2,8 Min</span></div>

<div class="mt-1 text-center text-base">Anderer Lauf, anderer Weg, <b>dieselbe Ursache</b>.</div>

<div class="mt-1 text-center text-sm opacity-60">Echter Kommentar · github.com/alexanderop/otto-nuxt-shop/pull/1</div>

<style>
.prshot { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.prshot figure { margin: 0; }
.prshot img { width: 100%; height: 300px; object-fit: cover; object-position: top left; border-radius: 10px; border: 1px solid rgba(255,255,255,.18); }
.prshot img.is-contain { object-fit: contain; object-position: top; background: #0d1117; }
.prshot figcaption { margin-top: 8px; font-size: 14px; opacity: .8; }
.prshot figcaption b { display: inline-grid; place-items: center; width: 20px; height: 20px; border-radius: 50%; background: #ff6bed; color: #1a1d29; font-size: 12px; margin-right: 6px; }
</style>

<!--
TIME: 20:10–20:40 (30s)

- So sieht das Ergebnis im echten PR aus. Kein Mockup, das ist PR #1 im Otto-Klon.
- Das ist der Kommentar zu dem Lauf, dessen Log ihr gerade gesehen habt.
- Links der Kopf: Erste Zeile ist das Urteil, CRITICAL_BUGS. Direkt darunter läuft das Video des Laufs als GIF. Ein Reviewer weiß nach zehn Sekunden, was los ist.
- Rechts ein Fund, F2: Repro in drei Schritten, Soll und Ist, darunter der Screenshot als Beleg. Soll 22,04 €, Ist −191,96 €. Ich muss nichts nachklicken, um zu glauben, was da steht.
- Gepostet vom Report-Job, nicht vom Agenten. Der Check ist rot. Er ist Pflicht-Check auf `main`, der Merge ist also blockiert.
- **Anderer Lauf, anderer Weg, dieselbe Ursache:** Lokal waren es fünf Funde mit Mascara und Zitrone. Hier sind es drei Funde, mit einem Sofa für 2.139,99 €. Rabatt beim Sofa eingelöst, Sofa raus, Rabatt bleibt. Agenten sind nicht deterministisch. Die Ursache finden beide Läufe: der feste Rabattbetrag im Cookie.
- Gut ein Dollar, knapp drei Minuten. Das Zielbild am Anfang zeigt einen früheren Lauf desselben PRs (Run 42368915488) mit demselben Fund und demselben Betrag.
- SOURCE: github.com/alexanderop/otto-nuxt-shop/pull/1, Bot-Kommentar vom 09.11. (Run 42622982046)
-->

---

# Teaser: Ticket auf „In QA“, und der <span class="text-[#ff6bed]">Agent legt los</span>

<div class="mt-4">

<IconCards flow :items="[
  { icon: '/jira/ticket.webp', title: 'Dev schiebt Ticket', sub: 'auf „In QA“', tag: 'Jira' },
  { icon: '/jira/trigger.webp', title: 'Jira sagt Bescheid', sub: 'Statuswechsel löst aus', tag: 'Jira Automation' },
  { icon: '/jira/workflow.webp', title: 'Workflow startet', sub: 'derselbe wie beim Label', tag: 'GitHub Actions' },
  { icon: '/jira/agent.webp', title: 'Agent liest & testet', sub: 'Ticket aus Jira, dann Browser', tag: 'Claude Code', accent: true },
  { icon: '/jira/funde.webp', title: 'Funde ins Ticket', sub: 'Kommentar + Screenshots', tag: 'Jira' },
]" no-clicks />

</div>

<div class="mt-8 text-center text-xl opacity-80">Derselbe Workflow. Nur der <b>Auslöser</b> ist jetzt der Ticket-Status.</div>

<div class="mt-3 text-center opacity-70">Alle Bausteine sind dokumentiert. Gebaut habe ich es noch nicht.</div>

<!--
TIME: 20:40–21:10 (30s)

- Noch ein Schritt weiter: Kein Label mehr. Der Status im Ticket ist der Auslöser.
- Ein Dev schiebt das Ticket auf „In QA“.
- Jira Automation feuert („Work item transitioned“) und schickt einen Web-Request an GitHub.
- GitHub startet denselben QA-Workflow über `repository_dispatch`. Ticket-Key im `client_payload`.
- Claude liest das Ticket direkt aus Jira, über den Atlassian Rovo MCP Server, und testet im Browser.
- Die Funde mit Screenshots landen als Kommentar und Anhang im Ticket, über die Jira REST API. Bei CRITICAL_BUGS zurück auf „In Arbeit“.
- Falls gefragt, die drei Bausteine: Jira-Automation-Trigger „Work item transitioned“ mit „Send web request“, im Workflow `on: repository_dispatch` statt Label, Rückweg über die Jira REST API.
- **Ehrlich sagen:** Das ist ein Teaser. Alle Teile gibt es und sie sind dokumentiert, aber ich habe die Kette noch nicht gebaut.
- SOURCE: research/wiki/jira-cloud-agent.md
-->

---

# Der Agent prüft. Ob wir es wollen, entscheidet ein <span class="text-[#ff6bed]">Mensch</span>.

<div class="grenze mt-8">
  <div class="grenze__col">
    <div class="grenze__h">Verifikation · der QA-Agent</div>
    <div class="grenze__item"><img src="/icons/szenario-ok.webp" alt="Klemmbrett mit Haken" /><div><b>Funktioniert es so, wie wir es wollten?</b><small>jedes Szenario aus dem Ticket, mit Beleg</small></div></div>
    <div class="grenze__item"><img src="/icons/explorativ.webp" alt="Kompass mit Lupe und Käfer" /><div><b>Was haben wir nicht bedacht?</b><small>explorativ: Fälle, die keiner aufschrieb</small></div></div>
  </div>
  <div class="grenze__col is-human">
    <div class="grenze__h">Validierung + Freigabe · der Mensch</div>
    <div class="grenze__item"><img src="/icons/shippen.webp" alt="Schiff und Hand auf Knopf" /><div><b>Wollen wir das überhaupt shippen?</b><small>Freigabe und Produktentscheidung</small></div></div>
    <div class="grenze__item"><img src="/icons/gefuehl.webp" alt="Herz mit Daumen hoch" /><div><b>Fühlt es sich gut an?</b><small>Geschmack lässt sich nicht als Gherkin schreiben</small></div></div>
    <div class="grenze__item"><img src="/icons/fund-pruefen.webp" alt="Auge in Lupe über Käfer" /><div><b>Stimmt der kritische Fund?</b><small>bei CRITICAL_BUGS schaut jemand nach: False Positive?</small></div></div>
  </div>
</div>

<div class="mt-8 text-center text-lg opacity-70">Meine Vermutung: Später passt sich das Produkt anhand von <b class="text-[#ff6bed]">KPIs</b> aus echter Nutzung an.</div>

<style>
.grenze { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.grenze__col { border: 1px solid rgba(255,255,255,.15); border-radius: 12px; padding: 16px 18px; background: rgba(255,255,255,.04); }
.grenze__col.is-human { border-color: #ff6bed; background: rgba(255,107,237,.08); }
.grenze__h { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: #ff6bed; margin-bottom: 10px; }
.grenze__item { display: flex; gap: 12px; align-items: flex-start; padding: 8px 0; }
.grenze__item > img { flex: none; width: 54px; height: 54px; margin-top: -6px; }
.grenze__item b { display: block; font-size: 17px; color: #eaedf3; }
.grenze__item small { display: block; font-size: 13px; opacity: .65; margin-top: 2px; }
</style>

<!--
TIME: 21:10–22:25 (75s)

- Das eine Problem, das ich sehe. Links **Verifikation**, rechts **Validierung**. Der QA-Agent sagt mir zwei Dinge: Funktioniert das Feature so, wie wir es wollten? Und durch das explorative Testen: Was haben wir nicht bedacht?
- Was er mir nicht sagt: Wollen wir das überhaupt shippen? Fühlt es sich gut an?
- Dafür brauchen wir trotzdem einen Menschen. Ich sage: zum Glück. Der bestätigt am Ende und entscheidet über den Merge.
- Bei CRITICAL_BUGS schaut jemand drauf, bevor es eskaliert. Ein Agent kann sich auch irren: Ein **False Positive** kostet sonst einen Entwickler einen halben Tag. Und wenn die Kriterien unklar sind, soll der Agent nachfragen statt raten.
- **Ausblick, meine Vermutung:** In Zukunft arbeiten wir wahrscheinlich mehr mit KPIs. Das Produkt passt sich automatisch an, je nachdem, wie Endnutzer es benutzen. Dann verbessert es sich selbst. Da sind wir aber noch nicht.
- Falls gefragt, Grenzen aus meinen Läufen: nicht deterministisch (zwei Läufe, zwei Wege), Kosten (3,37 $ Skill, 0,90 $ Feature, 1,00 $ QA-Lauf), Fork-PRs bekommen keine Secrets, 4,2 % Recall im QA-Bench. TODO: QA-Bench-Quelle in research/ ablegen.
-->
---
layout: cover
background: /bild-rolle.jpeg
---

<div class="w-[36%] text-left">

<h1 class="!text-[2.6rem] !leading-tight">„Wenn ein Agent testen kann, braucht es <span class="text-[#ff6bed]">mich</span> dann noch?“</h1>

</div>

<!--
TIME: 22:25–22:55 (30s)

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
TIME: 22:55–23:40 (45s)

- Boris Cherny hat Claude Code bei Anthropic gebaut.
- Übersetzt: Der Titel Software Engineer verschwindet an manchen Stellen. Stattdessen heißt es einfach **Builder**. Bei Anthropic codet laut ihm jeder: PM, Designerin, sogar der Finanzer.
- Cat Wu, Head of Product bei Claude Code, schreibt das auch offiziell (nicht mehr auf der Slide, nur sagen): „Our roles are blending together: designers ship code, engineers make product decisions, product managers build prototypes and evals.“
- **Ehrlich sagen:** Beide nennen Engineering, PM und Design. QA nennen sie nicht ausdrücklich. „Ich sage: Das gilt auch für euch.“
- SOURCE: Lenny's Podcast, 19.02.2026, bei 43:06 und 41:25. Aus dem Volltranskript, Audio nicht selbst gehört. research/raw/rollen-verschmelzen-notiz.md; claude.com/resources/articles/product-management-on-the-ai-exponential
-->


---

# Von <span class="text-[#ff6bed]">T-shaped</span> zu <span class="text-[#ff6bed]">O-shaped</span>

<div class="shapes mt-4">
  <div class="shape">
    <div class="shape__tag">Vor KI</div>
    <img src="/o-shaped/t-shaped.webp" class="shape__img" alt="T-Form: Person auf einem T, oben Code, Design und Produkt, tiefer pinker Stamm Qualität" />
    <div class="shape__name">T-shaped</div>
    <div class="shape__sub">Ein bisschen Breite, viel Tiefe in <b>einem</b> Fach. Dafür wurde man eingestellt.</div>
  </div>
  <div class="shape">
    <div class="shape__tag is-now">Mit KI</div>
    <img src="/o-shaped/o-shaped.webp" class="shape__img" alt="O-Form: Person mit KI-Funken in einem Ring aus Qualität (pink), Code, Design und Produkt" />
    <div class="shape__name">O-shaped</div>
    <div class="shape__sub">Die Stärke wechselt je nach Problem. Eure Basis bleibt <b>Qualität</b>.</div>
  </div>
</div>

<div class="mt-4 text-center text-sm opacity-50">Begriff: Ismail Amla, „O-Shaped People: How AI Is Blowing Up Titles“, LinkedIn, Aug. 2026</div>

<style>
.shapes { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
.shape { border: 1px solid rgba(255,255,255,.15); border-radius: 14px; padding: 12px 18px 14px; background: rgba(255,255,255,.04); text-align: center; position: relative; }
.shape__tag { position: absolute; top: 12px; left: 14px; font-size: 11px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; opacity: .6; }
.shape__tag.is-now { color: #ff6bed; opacity: 1; }
.shape__img { display: block; height: 210px; margin: 14px auto 4px; }
.shape__name { font-size: 22px; font-weight: 700; color: #eaedf3; }
.shape__sub { font-size: 14px; opacity: .75; margin-top: 2px; }
.shape__sub b { color: #ff6bed; }
</style>

<!--
TIME: 23:40–24:25 (45s)

- Links: So haben wir vor KI eingestellt. **T-shaped**: ein bisschen Code, Design, Produkt, und tief in einer Box. Bei euch: Qualität.
- Rechts: Mit KI werden Leute **O-shaped**. Ismail Amla nennt das so: rund und flexibel, die stärkste Stärke wechselt je nach Problem. Mit KI kann man kurz in eine andere Disziplin wechseln und wieder zurück.
- Cherny bei 42:46 sagt Ähnliches: Die Rollen überlappen zu etwa 50 Prozent, manche Leute haben Spezialitäten.
- **Meine Wendung fürs Publikum:** Ihr könnt jetzt überall mit anpacken. Aber eure Basis bleibt Qualität: Risiken einschätzen, gute Kriterien schreiben, wissen, wo es kracht. Amla sagt selbst: Spezialisten werden zu denen, die Arbeit aus anderen Bereichen prüfen und stärker machen.
- SOURCE: research/raw/2026-08-12-o-shaped-people.md; research/wiki/rollen-verschmelzen.md
-->
---
layout: statement
---

# Der Agent hat den Bug gefunden,<br/>weil jemand gute <span class="text-[#ff6bed]">Vorarbeit</span> gemacht hat.

<div class="mt-8 text-2xl opacity-80">Gherkin-Szenarien, Testentwurf, Test-Charter, Feature Map.<br/>Das ist <b>eure</b> Arbeit, nur eine Ebene höher.</div>

<!--
TIME: 24:25–24:55 (30s)

- Die Wendung, die Mut machen soll.
- Erinnert euch an die Demo: Der Agent kannte die Szenarien, weil sie jemand gut aufgeschrieben hat.
- Er hat bei Mengenänderungen gesucht, weil die Test-Charter im Prompt es ihm gesagt hat.
- Er wusste, wie der Warenkorb funktioniert, weil jemand die Feature Map gepflegt hat.
- **Testentwurf:** Den hatte mein Lauf noch nicht. Die zwei offenen Zeilen in der Testmatrix zeigen, was ohne ihn fehlt.
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
TIME: 24:55–25:10 (15s)

- Der Schlusssatz. Langsam sagen, dann kurz stehen lassen.
-->

---

# Drei Dinge für <span class="text-[#ff6bed]">Montag</span>

<div class="mt-10">

<IconCards :columns="3" size="lg" :items="[
  { icon: '/icons/issue.webp', title: 'Akzeptanzkriterien', sub: 'als Gherkin, die ein Agent prüfen kann' },
  { icon: '/icons/feature-map.webp', title: 'Browser + Feature Map', sub: 'ein Befehl, ein Nachmittag' },
  { icon: '/icons/explorativ.webp', title: 'Explorativ suchen', sub: 'mit Charter, z. B. Barrierefreiheit', accent: true },
]" no-clicks />

</div>

<!--
TIME: 25:10–25:40 (30s)

- Kriterien zuerst. Ohne gute Kriterien kein gutes Urteil. Das bringt am meisten.
- Browser und Feature Map: `npm i -g agent-browser` oder Playwright CLI, dann `/create-verification-skill`. Ein Nachmittag Arbeit. Danach pflegt ihr die Map wie Testdoku.
- Bestätigen kann jeder Test. Der Wert kommt aus dem Explorativen. Gebt dem Agenten eine **Charter**, worauf er nebenbei achten soll. Bei uns Barrierefreiheit: Kommt man per Tab überall hin? Hat jedes Feld ein Label?
- TODO vor dem Talk: Branch `feat/gutschein` pushen, sonst sieht das Publikum Ticket und Report nicht.
-->

---
layout: center
class: text-center
---

# Danke! <span class="text-[#ff6bed]">Fragen?</span>

<div class="finale mt-6">
  <DancingHamcrab />
  <div class="finale__qr">
    <img src="/qr-slides.png" alt="QR-Code zu den Slides: alexanderop.github.io/qs-tag-frankfurt-26" />
    <div class="mt-3 text-xl font-bold">Die Slides</div>
    <div class="text-sm opacity-60">alexanderop.github.io/qs-tag-frankfurt-26</div>
    <div class="mt-4 text-base opacity-70">Repo, Blogposts und Quellen sind darin verlinkt.</div>
  </div>
</div>

<style>
.finale { display: grid; grid-template-columns: 1fr 1fr; align-items: center; justify-items: center; gap: 32px; }
.finale__qr { display: flex; flex-direction: column; align-items: center; }
.finale__qr img { width: 260px; height: 260px; border-radius: 8px; }
</style>

<!--
TIME: 25:40 + Q&A (4:20 Puffer bis 30:00)

- Diese Folie bleibt während der Fragen stehen. Der Hamcrab tanzt weiter, rechts der QR-Code zu den Slides. Repo und Quellen sind in den Slides verlinkt.
- Wenn keiner fragt: „Wer von euch hat vorhin am Ende noch gestanden? Was nutzt ihr dafür?“
-->

---
layout: statement
---

# Backup

<!--
Ab hier nur bei Fragen zeigen.
-->

---
zoom: 0.72
---

# Der echte <span class="text-[#ff6bed]">Workflow</span>

<div class="text-sm opacity-60 -mt-2 mb-2">otto-nuxt-shop · .github/workflows/claude-qa.yml (gekürzt)</div>

```yaml
on:
  pull_request:
    types: [opened, reopened, synchronize, labeled]
jobs:
  qa:                      # Claude testet, nur Lesezugriff
    if: contains(github.event.pull_request.labels.*.name, 'qa-verify')
    permissions: { contents: read, pull-requests: read, issues: read }
    steps:
      - run: .claude/skills/verify-otto-shop/scripts/otto-verify.sh launch
      - env:
          CLAUDE_CODE_OAUTH_TOKEN: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
        run: |
          claude -p "$(envsubst < .github/prompts/qa.md)" \
            --max-budget-usd 10 \
            --allowedTools "Skill,Read,Edit(qa-report/**),Bash(agent-browser:*),Bash(gh issue view:*),…" \
            --json-schema "$(cat .github/prompts/qa-verdict.schema.json)" \
            --output-format stream-json --verbose | node claude-live-log.mjs
      - uses: actions/upload-artifact@…   # qa-report/ mit Screenshots + Video
  report:                  # ohne Claude: darf schreiben
    needs: qa
    permissions: { contents: write, pull-requests: write }
    steps:
      - run: |   # Screenshots auf Branch qa-evidence, Bild-Links einbetten
          gh pr comment "$PR_NUMBER" --body-file comment.md
  gate:                    # Merge-Gate, Pflicht-Check auf main
    needs: [qa, report]
    steps:
      - run: if [ "$PASSED" != "true" ]; then exit 1; fi
```

<!--
BACKUP (bei Fragen nach dem Code)

- Das ist der echte Workflow aus dem Repo, gekürzt. Er ist am 07.11. mehrfach echt gelaufen.
- **Trigger:** PR geöffnet, neuer Push oder Label gesetzt. Getestet wird aber nur, wenn der PR das Label `qa-verify` trägt.
- **Job qa:** nur mit dem Label qa-verify, und **nur Lesezugriff**. Der Agent kann nichts pushen und nichts kommentieren.
- **Shop starten** mit dem Skript aus dem Verification-Skill. Kein eigenes CI-Setup.
- **Claude Code über meine Subscription** (`claude setup-token`), kein API-Key. 
- Die Belege gehen als Artefakt raus.
- **Job report, ohne Claude:** Er legt die Screenshots auf einen eigenen Branch, damit sie im Kommentar sichtbar sind, und postet den Report. Schreibrechte bekommt nur dieser Job.
- **Job gate:** das Quality Gate. `passed` muss `true` sein, sonst Check rot. Er ist Pflicht-Check auf `main`: Rot blockiert den Merge.
- Dazu im echten File: Actions per SHA gepinnt, zizmor im Pedantic-Modus ohne Befund.
- SOURCE: otto-nuxt-shop Commits 25d6d59 (live log, budget), e2f5950 (Report-Job, Screenshots) und 18be32e (Gate-Job, Pflicht-Check, Re-Run bei Push); Blogposts „Building an AI QA Engineer…“ und „How to Use Claude Code as an AI QA Tester…“
-->

---

# Agent Browser <span class="text-[#ff6bed]">unter der Haube</span>

```mermaid {scale: 0.65}
flowchart LR
  A@{ shape: rounded, label: "Claude Code" } -->|"Bash"| B@{ shape: console, label: "CLI" }
  B -->|"Socket"| C@{ shape: rounded, label: "Daemon (Rust)" }
  C -->|"CDP"| D@{ shape: browser, label: "Chrome" }
```

<div class="cdp mt-2"><b>CDP</b> = Chrome DevTools Protocol. Die Schnittstelle, über die auch eure DevTools (F12) mit Chrome sprechen. Playwright und Puppeteer nutzen sie auch. Agent Browser spricht sie <b>direkt</b>.</div>

<div class="hood mt-4">
  <div class="hood__step">
    <div class="hood__h"><code>snapshot</code></div>
    <ol>
      <li>Holt den <b>Accessibility-Baum</b> von Chrome</li>
      <li>Nur klickbare Rollen (button, link, textbox …) bekommen eine Ref <code>e1</code>, <code>e2</code></li>
      <li>Jede Ref merkt sich die interne Node-ID im Browser</li>
    </ol>
  </div>
  <div class="hood__step">
    <div class="hood__h"><code>click @e2</code></div>
    <ol>
      <li>Ref zur Node-ID auflösen, Element in den Sichtbereich scrollen</li>
      <li>Box messen, <b>Mitte</b> berechnen, prüfen, dass nichts darüber liegt</li>
      <li>Echte Maus-Events: bewegen, drücken, loslassen</li>
    </ol>
  </div>
</div>

<div class="mt-3 text-center text-sm opacity-60">Kein Playwright, kein Node im Daemon. Kommt 1 Stunde lang kein Befehl, beendet sich der Daemon.</div>

<style>
.cdp { border: 1px solid #ff6bed; background: rgba(255,107,237,.08); border-radius: 10px; padding: 8px 14px; font-size: 14px; }
.cdp b { color: #ff6bed; }
.hood { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.hood__step { border: 1px solid rgba(255,255,255,.15); border-radius: 12px; padding: 12px 16px; background: rgba(255,255,255,.04); }
.hood__h { margin-bottom: 6px; }
.hood ol { margin: 0; padding-left: 18px; font-size: 14px; line-height: 1.55; }
.hood li { margin: 2px 0; }
</style>

<!--
Nur bei Fragen. „Wie funktioniert Agent Browser eigentlich?“

- Drei Teile: Claude Code ruft die CLI per Bash auf. Die CLI redet über einen Unix-Socket mit einem Daemon. Der Daemon steuert Chrome direkt über das Chrome DevTools Protocol (CDP), dasselbe Protokoll, das auch die DevTools nutzen.
- Der Daemon startet beim ersten Befehl und bleibt laufen. Darum ist jeder weitere Befehl schnell, und der Browser behält Cookies und Tabs zwischen den Befehlen. Nach einer Stunde ohne Befehl räumt er sich selbst auf.
- **CDP.** Über das Chrome DevTools Protocol steuern Programme Chrome von außen. Wenn ihr F12 drückt, reden die DevTools über genau dieses Protokoll mit der Seite. Playwright und Puppeteer setzen darauf auf; Agent Browser lässt die Zwischenschicht weg und schickt die CDP-Befehle selbst. Alles auf dieser Folie (Baum holen, Box messen, Maus klicken) sind einzelne CDP-Befehle.
- **snapshot:** CDP-Befehl `Accessibility.getFullAXTree`. Das ist derselbe Baum, den ein Screenreader liest. Interaktive Rollen bekommen Refs `e1`, `e2`; jede Ref zeigt auf die `backendNodeId` des Elements. Darum funktioniert es gut auf barrierearmen Seiten, und schlecht auf Seiten ohne Labels.
- **click @e2:** Er löst die Ref zur `backendNodeId` auf, misst mit `DOM.getBoxModel` die Box und berechnet den Mittelpunkt. Vorher prüft er, ob ein anderes Element darüberliegt (z. B. ein Cookie-Banner). Dann `Input.dispatchMouseEvent`: mouseMoved, mousePressed, mouseReleased. Für die Seite ist das ein echter Klick.
- Playwright ist nicht beteiligt. Chrome kommt aus „Chrome for Testing“, der Rest ist Rust.
- SOURCE: github.com/vercel-labs/agent-browser @4b0e9f0, README „Architecture“; cli/src/native/snapshot.rs (INTERACTIVE_ROLES, getFullAXTree), cli/src/native/element.rs (resolve_element_center, DOM.getBoxModel), cli/src/native/interaction.rs (click, dispatch_click). Installierte Version 0.38.2.
-->

---

# <span class="text-[#ff6bed]">Quellen</span>

<div class="src">
  <div>
    <h3>Zitate &amp; Artikel</h3>
    <ul>
      <li>Boris Cherny bei Lenny's Podcast, 19.02.2026 (41:25, 42:46, 43:06)<br><span>youtube.com/watch?v=We7BZVKbCVw</span></li>
      <li>Cat Wu: „Product management on the AI exponential“<br><span>claude.com/resources/articles/product-management-on-the-ai-exponential</span></li>
      <li>Ismail Amla: „O-Shaped People: How AI Is Blowing Up Titles“, LinkedIn, 12.08.2026</li>
    </ul>
    <h3>Tools</h3>
    <ul>
      <li>Agent Browser (v0.38.2)<br><span>github.com/vercel-labs/agent-browser</span></li>
      <li>pstack, <code>/create-verification-skill</code> (v0.15.36)<br><span>github.com/cursor/plugins/tree/main/pstack · x.com/poteto</span></li>
      <li>Atlassian Remote MCP &amp; Jira Automation<br><span>support.atlassian.com/rovo · support.atlassian.com/cloud-automation</span></li>
    </ul>
  </div>
  <div>
    <h3>Demo</h3>
    <ul>
      <li>Otto-Klon mit Skill, Workflow, QA-Report<br><span>github.com/alexanderop/otto-nuxt-shop</span></li>
      <li>Echter QA-Kommentar im PR<br><span>github.com/alexanderop/otto-nuxt-shop/pull/1</span></li>
    </ul>
    <h3>Mein Blog · alexop.dev</h3>
    <ul>
      <li>The Factory Must Grow<br><span>alexop.dev/posts/the-factory-must-grow-ai-moved-the-bottleneck</span></li>
      <li>Delivery Factory (spielbar)<br><span>alexop.dev/lab/delivery-factory</span></li>
      <li>Building an AI QA Engineer with Claude Code and Playwright MCP<br><span>alexop.dev/posts/building_ai_qa_engineer_claude_code_playwright</span></li>
      <li>How to Use Claude Code as an AI QA Tester with Agent Browser<br><span>alexop.dev/posts/automated-qa-claude-code-agent-browser-cli-github-actions</span></li>
      <li>Playwright CLI vs MCP<br><span>alexop.dev/notes/playwright-cli-vs-mcp</span></li>
    </ul>
  </div>
</div>

<style>
.src { display: grid; grid-template-columns: 1fr 1.15fr; gap: 28px; margin-top: -8px; }
.src h3 { color: #ff6bed; font-size: 13px; margin: 8px 0 2px; text-transform: uppercase; letter-spacing: .05em; }
.src ul { margin: 0; padding-left: 14px; font-size: 12px; line-height: 1.3; }
.src li { margin: 2px 0; }
.src li span { opacity: .55; font-size: 10.5px; white-space: nowrap; }
</style>

<!--
Letzte Folie. Alle Quellen aus dem Talk an einem Ort. Wer den Link zu den Slides hat (QR-Code auf der Danke-Folie), findet sie hier.
- Fehlt noch: Urheber des Trichter-Diagramms (siehe TODO auf der Trichter-Folie).
-->
