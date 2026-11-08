---
kind: note
title: Lokaler QA-Lauf SHOP-42 (claude-live-log Ausgabe)
url: unknown
author: Alexander Opalic
publisher: unknown
published: 2026-11-08
collected: 2026-11-08
status: complete
---

Echter lokaler Lauf in otto-nuxt-shop auf feat/gutschein, PR_NUMBER=1, gleicher claude-Aufruf wie in .github/workflows/claude-qa.yml. Ausgabe von .github/scripts/claude-live-log.mjs, unverändert.

```text
  1 💬 Zuerst suche ich das verlinkte Issue, weil es die Akzeptanzkriterien enthält.
  2 🔧 gh pr view "1" --json closingIssuesReferences
  3 💬 Jetzt lese ich Issue #2, um die Gherkin-Szenarien zu kennen.
  4 🔧 gh issue view 2
  5 🧩 Lade Skill verify-otto-shop
  6 💬 Ich lese die Feature-Rezepte für den Warenkorb, damit ich die richtigen Handles nutze.
  7 🔧 ls .claude/skills/verify-otto-shop/features/ .claude/skills/verify-otto-shop/scripts/
  8 📖 Lese /Users/alexanderopalic/Projects/talks/otto-nuxt-shop/.claude/skills/verify-otto-shop/features/warenkorb.md
  9 🔧 grep -n -A12 "wait-ready)" .claude/skills/verify-otto-shop/scripts/otto-verify.sh
 10 🔧 grep -n "READY_JS=" .claude/skills/verify-otto-shop/scripts/otto-verify.sh
 11 💬 Ich prüfe, ob der Shop auf Port 3100 antwortet, bevor ich den Browser starte.
 12 🔧 curl -s -o /dev/null -w "%{http_code}" http://localhost:3100/
 13 ⚠️ Fehler: This command requires approval
 14 🔧 mkdir -p qa-report/screenshots qa-report/video
 15 💬 Ich setze Viewport und leere Cookies, damit der Test bei einem leeren Warenkorb startet.
 16 🔧 agent-browser --session otto-verify-3100 set viewport 1440 900
 17 🔧 agent-browser --session otto-verify-3100 cookies clear
 18 💬 Jetzt starte ich die Videoaufnahme, damit der ganze Lauf belegt ist.
 19 🔧 agent-browser --session otto-verify-3100 record --help
 20 🔧 agent-browser --session otto-verify-3100 record start qa-report/video/qa-run.webm http://localhost:3100/p/1 --fps 15 --cursor
 21 💬 Ich warte auf Hydration, damit die Buttons auf der Produktseite funktionieren.
 22 🔧 agent-browser --session otto-verify-3100 wait --fn "!!document.querySelector('#__nuxt')?.__vue_app__ && !!document.querySelector('b2b-icon-100.hydrated')"
 23 💬 Ich lege Produkt 1 über den echten Button in den Warenkorb (Vorbedingung aller Szenarien).
 24 🔧 agent-browser --session otto-verify-3100 find role button click --name "In den Warenkorb"
 25 🔧 agent-browser --session otto-verify-3100 wait --fn "document.querySelector('a[href=\"/warenkorb\"] .action__badge')?.textContent==='1'"
 26 🔧 agent-browser --session otto-verify-3100 find role link click --name "Warenkorb"
 27 🔧 agent-browser --session otto-verify-3100 wait --text "Gutscheincode"
 28 💬 Ich lese die Ausgangssummen ab, um später den Rabatt nachrechnen zu können.
 29 🔧 agent-browser --session otto-verify-3100 get text ".summary"
 30 🔧 agent-browser --session otto-verify-3100 screenshot qa-report/screenshots/01-warenkorb-ausgangszustand.png
 31 💬 Szenario 1: Ich löse SPAR10 ein und prüfe Rabattzeile und Gesamtsumme.
 32 🔧 agent-browser --session otto-verify-3100 find role textbox fill "SPAR10" --name "Gutscheincode"
 33 🔧 agent-browser --session otto-verify-3100 find role button click --name "Einlösen"
 34 🔧 agent-browser --session otto-verify-3100 wait --text "Gutschein (SPAR10)"
 35 🔧 agent-browser --session otto-verify-3100 get text ".summary"
 36 🔧 agent-browser --session otto-verify-3100 cookies get
 37 💬 Szenario 1 passt rechnerisch (8,94 × 10 % = 0,89; 14,89 − 0,89 = 14,00). Auffällig: Der Rabatt liegt als fester Betrag im Cookie `otto-coupon-amount`. Erst Screenshot.
 38 🔧 agent-browser --session otto-verify-3100 screenshot qa-report/screenshots/02-s1-gutschein-gueltig.png
 39 💬 Ich prüfe die Regel „bleibt nach Reload erhalten“, weil sie im Issue steht.
 40 🔧 agent-browser --session otto-verify-3100 reload
 41 🔧 agent-browser --session otto-verify-3100 wait --fn "!!document.querySelector('#__nuxt')?.__vue_app__ && !!document.querySelector('b2b-icon-100.hydrated')"
 42 🔧 agent-browser --session otto-verify-3100 get text ".summary"
 43 🔧 agent-browser --session otto-verify-3100 screenshot qa-report/screenshots/03-regel-reload-persistenz.png
 44 💬 Explorativ: Ich erhöhe die Menge mit eingelöstem Gutschein, weil der Rabatt als fester Betrag gespeichert ist und dann nicht mehr 10 % sein könnte.
 45 🔧 agent-browser --session otto-verify-3100 find role button click --name "+" --exact
 46 🔧 agent-browser --session otto-verify-3100 wait --fn "document.querySelector('.line__qty span').textContent.trim()==='2'"
 47 🔧 agent-browser --session otto-verify-3100 get text ".summary"
 48 💬 Fund F1: Bei Menge 2 bleibt der Rabatt bei −0,89 € statt −1,79 € (10 % von 17,88 €). Ich halte das fest.
 49 🔧 agent-browser --session otto-verify-3100 screenshot qa-report/screenshots/04-f1-nachher-rabatt-veraltet-menge2.png
 50 💬 Ich lade neu, um zu sehen, ob der falsche Rabatt auch serverseitig bestehen bleibt.
 51 🔧 agent-browser --session otto-verify-3100 reload
 52 🔧 agent-browser --session otto-verify-3100 wait --fn "!!document.querySelector('#__nuxt')?.__vue_app__ && !!document.querySelector('b2b-icon-100.hydrated')"
 53 🔧 agent-browser --session otto-verify-3100 get text ".summary__rows"
 54 💬 Der falsche Rabatt überlebt auch den Reload. Ich setze die Menge zurück auf 1, um Szenario 3 sauber zu prüfen.
 55 🔧 agent-browser --session otto-verify-3100 find role button click --name "−" --exact
 56 🔧 agent-browser --session otto-verify-3100 wait --fn "document.querySelector('.line__qty span').textContent.trim()==='1'"
 57 💬 Szenario 3: Ich entferne den Gutschein und prüfe, ob die volle Summe zurückkommt.
 58 🔧 agent-browser --session otto-verify-3100 find role button click --name "Gutschein entfernen"
 59 🔧 agent-browser --session otto-verify-3100 wait --fn "!document.querySelector('.summary__discount')"
 60 🔧 agent-browser --session otto-verify-3100 get text ".summary"
 61 🔧 agent-browser --session otto-verify-3100 cookies get
 62 🔧 agent-browser --session otto-verify-3100 screenshot qa-report/screenshots/05-s3-gutschein-entfernt.png
 63 💬 Szenario 2: Ich löse den ungültigen Code GIBTSNICHT ein.
 64 🔧 agent-browser --session otto-verify-3100 find role textbox fill "GIBTSNICHT" --name "Gutscheincode"
 65 🔧 agent-browser --session otto-verify-3100 find role button click --name "Einlösen"
 66 🔧 agent-browser --session otto-verify-3100 wait --text "Dieser Gutschein ist ungültig"
 67 🔧 agent-browser --session otto-verify-3100 get text ".summary__rows"
 68 🔧 agent-browser --session otto-verify-3100 get count ".summary__discount"
 69 🔧 agent-browser --session otto-verify-3100 screenshot qa-report/screenshots/06-s2-gutschein-ungueltig.png
 70 💬 Explorativ: Ich teste Kleinschreibung und Leerzeichen („ spar10 “), weil Kunden Codes oft so eintippen.
 71 🔧 agent-browser --session otto-verify-3100 find role textbox fill " spar10 " --name "Gutscheincode"
 72 🔧 agent-browser --session otto-verify-3100 find role button click --name "Einlösen"
 73 🔧 agent-browser --session otto-verify-3100 get text ".summary"
 74 💬 Kleinschreibung und Leerzeichen werden korrekt normalisiert. Screenshot als Beleg.
 75 🔧 agent-browser --session otto-verify-3100 screenshot qa-report/screenshots/07-e1-kleinschreibung-ok.png
 76 💬 Explorativ F2: Ich löse den Gutschein bei hoher Menge ein und reduziere dann, weil der feste Betrag dann über 10 % liegen müsste. Zuerst Gutschein entfernen.
 77 🔧 agent-browser --session otto-verify-3100 find role button click --name "Gutschein entfernen"
 78 💬 Ich erhöhe die Menge auf 9 (Zwischensumme 80,46 €).
 79 🔧 agent-browser --session otto-verify-3100 eval "(async()=>{for(let i=0;i<8;i++){const b=[...document.querySelectorAll('b2b-button')].find(x=>x.getAttribute('ari…
 80 🔧 agent-browser --session otto-verify-3100 find role textbox fill "SPAR10" --name "Gutscheincode"
 81 🔧 agent-browser --session otto-verify-3100 find role button click --name "Einlösen"
 82 🔧 agent-browser --session otto-verify-3100 get text ".summary__rows"
 83 🔧 agent-browser --session otto-verify-3100 screenshot qa-report/screenshots/08-f2-vorher-menge9-rabatt-korrekt.png
 84 💬 Jetzt reduziere ich auf Menge 1 und prüfe den Rabatt.
 85 🔧 agent-browser --session otto-verify-3100 eval "(async()=>{for(let i=0;i<8;i++){const b=[...document.querySelectorAll('b2b-button')].find(x=>x.getAttribute('ari…
 86 💬 Fund F2 bestätigt: 8,05 € Rabatt auf 8,94 € Zwischensumme (90 % statt 10 %). Screenshot.
 87 🔧 agent-browser --session otto-verify-3100 screenshot qa-report/screenshots/09-f2-nachher-menge1-rabatt-90-prozent.png
 88 💬 Ich suche ein Produkt unter 8,05 €, um zu prüfen, ob die Gesamtsumme negativ werden kann.
 89 🔧 jq -c "[.[] | {id, title, price}] | sort_by(.price) | .[0:3]" server/data/products.json
 90 💬 Ich entferne die Mascara-Position, damit nur der günstige Artikel übrig bleibt.
 91 🔧 agent-browser --session otto-verify-3100 find role button click --name "Entfernen" --exact
 92 🔧 agent-browser --session otto-verify-3100 wait --text "Dein Warenkorb ist leer"
 93 🔧 agent-browser --session otto-verify-3100 cookies get
 94 💬 Gutschein und 8,05 € Rabatt bleiben im leeren Warenkorb stehen. Jetzt lege ich die Zitrone (0,79 €) über die Produktseite in den Warenkorb.
 95 🔧 agent-browser --session otto-verify-3100 open http://localhost:3100/p/31
 96 🔧 agent-browser --session otto-verify-3100 wait --fn "!!document.querySelector('#__nuxt')?.__vue_app__ && !!document.querySelector('b2b-icon-100.hydrated')"
 97 🔧 agent-browser --session otto-verify-3100 find role button click --name "In den Warenkorb"
 98 🔧 agent-browser --session otto-verify-3100 wait --fn "document.querySelector('a[href=\"/warenkorb\"] .action__badge')?.textContent==='1'"
 99 🔧 agent-browser --session otto-verify-3100 find role link click --name "Warenkorb"
100 🔧 agent-browser --session otto-verify-3100 wait --text "Zusammenfassung"
101 🔧 agent-browser --session otto-verify-3100 get text ".summary__rows"
102 💬 Fund F3: Gesamtsumme ist negativ (−1,39 €), der Rabatt (8,05 €) übersteigt die Zwischensumme (0,71 €). Screenshot.
103 🔧 agent-browser --session otto-verify-3100 screenshot qa-report/screenshots/11-f3-nachher-gesamt-negativ.png
104 💬 Ich prüfe die Regel „höchstens ein Gutschein“: Nach dem Einlösen darf kein zweites Eingabefeld sichtbar sein.
105 🔧 agent-browser --session otto-verify-3100 snapshot -i -c
106 💬 Kein zweites Gutscheinfeld vorhanden, die Regel „ein Gutschein“ hält. Ich stoppe jetzt die Videoaufnahme.
107 🔧 agent-browser --session otto-verify-3100 record stop
108 🔧 mv qa-report/screenshots/11-f3-nachher-gesamt-negativ.png qa-report/screenshots/10-f3-nachher-gesamt-negativ.png
109 ⚠️ Fehler: mv in '/Users/alexanderopalic/Projects/talks/otto-nuxt-shop/qa-report/screenshots/11-f3-nachher-gesamt-negativ.png' needs approval. The path is inside the work…
110 💬 Ich prüfe, dass alle Belege da sind und der Negativ-Screenshot den Fehler zeigt.
111 🔧 ls -la qa-report/screenshots qa-report/video
112 📖 Lese /Users/alexanderopalic/Projects/talks/otto-nuxt-shop/qa-report/screenshots/11-f3-nachher-gesamt-negativ.png
113 💬 Der Screenshot zeigt den Fehler eindeutig. Ich suche kurz die Ursache im Code, damit der Report einen Hinweis für den Fix enthält.
114 🔧 grep -rn "coupon-amount\|couponAmount" app server --include=*.ts --include=*.vue
115 🔧 grep -rn "coupon-amount" app server
116 📖 Lese /Users/alexanderopalic/Projects/talks/otto-nuxt-shop/app/composables/useCoupon.ts
117 💬 Ursache gefunden: `useCoupon.ts:15` speichert den Rabatt beim Einlösen als festen Betrag, statt ihn aus der aktuellen Zwischensumme zu berechnen. Jetzt schreibe ich den Report.
118 📝 Schreibe /Users/alexanderopalic/Projects/talks/otto-nuxt-shop/qa-report/report.md
119 💬 Zum Schluss leere ich die Cookies und schließe meine Browser-Session. Den Server lasse ich laufen, weil ich ihn nicht gestartet habe.
120 🔧 agent-browser --session otto-verify-3100 close
121 ⚖️ Urteil: CRITICAL_BUGS · Alle 3 Gherkin-Szenarien und beide Regeln aus Issue #2 bestehen. Explorative Tests fanden 3 Fehler mit gemeinsamer Ursache: useCoupon.ts:15…

=== success · Urteil: CRITICAL_BUGS · 87 Turns · 2.12 $ · 4.1 Min ===
```
