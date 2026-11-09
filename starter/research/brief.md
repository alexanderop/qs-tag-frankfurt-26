# Talk brief

## Working title

KI-Agenten als QA-Engineer: Automatisierte Qualitätssicherung mit Claude Code & GitHub Actions (QS-Tag Frankfurt 2026, 30 Minuten, Deutsch, letzter Talk des Tages, direkt nach Robert Fey)

## Audience

QA-Engineers und Tester. Viele nutzen KI im Alltag, wenige haben automatische Verifikationsschleifen.

## Intended outcome

Das Publikum weiß, wie ein Agent ein Ticket im Browser gegen Gherkin-Szenarien prüft, explorativ weitertestet und einen belegten Report liefert. Und es sieht die eigene Rolle als Chance: Builder mit Qualitäts-Spezialität.

## Current thesis

Coding ist weitgehend gelöst. Wer PRs mergen will, ohne jede Zeile zu lesen, braucht bessere automatische Verifikation. QA-Leute bauen die Systeme dafür.

## Supporting ideas

- Der Engpass wandert vom Schreiben zum Prüfen.
- Akzeptanzkriterien sind das Testorakel.
- Feature Map als Gedächtnis des Agenten (pstack `create-verification-skill`).
- Der Agent findet beim explorativen Testen einen Bug, den kein Szenario abdeckt.
- Rollen verschmelzen, siehe [Rollen verschmelzen](wiki/rollen-verschmelzen.md).

## Open questions

- Quelle für „4,2 % Recall aus QA-Bench“ fehlt noch in `research/raw/`.
- Echte Gherkin-Szenarien aus Linear übernehmen (Folie „Das Ticket“ hat Platzhalter).
- Repo-URL für den QR-Code.

## Scope boundaries

- Keine Einführung in LLM-Grundlagen.
- Kein Vergleich verschiedener Agents.

## Timing log

- 2026-11-07: 32 Folien, 30:00. Kapitel 8 (QA-Rolle, 4 Min.) neu, Kapitel 7 auf 2 Min. gekürzt. Streichkandidaten: Brücke zu Robert Fey, CLI vs MCP, Testorakel, Gegenstimme. Folienplan: [plan.md](plan.md).
- 2026-11-07: Brücke zu Robert Fey gestrichen (−15s). Die 15s gehen an die Vorstellungsfolie (TACON-Foto, jetzt 30s). Inhalt endet weiter bei 29:45. Neu: Event-Cover, Trichter-Folie (30s, aus der These-Folie genommen).
- 2026-11-07: Neue Folie „Ein Befehl baut die Einarbeitungsmappe“ (pstack /create-verification-skill, 30s) vor der Mappe. Mappe und „Skill bei jedem Lauf“ je 60s → 45s. Inhalt endet weiter bei 29:45.
- 2026-11-07: „CLI schlägt MCP“ gestrichen (−15s). Die Zahl (114k vs 27k) steht jetzt in den Notizen von „Augen und Hände“, die Folie hat 60s statt 45s. Inhalt endet weiter bei 29:45.
- 2026-11-07: Beispiel-Block (Otto-Klon, Ticket SHOP-42, Testorakel) vor die pstack-Folie gezogen. Otto-Folie jetzt zweispaltig mit „Unser Auftrag: Gutscheincode im Warenkorb“. Zeiten unverändert, Inhalt endet bei 29:45.
- 2026-11-07: Zwei Editor-Folien (code-editor-Layout) nach der Mappe: SKILL.md (35s) und features/warenkorb.md (35s). Mappe 45→20s, „Skill bei jedem Lauf“ 45→30s, Ticket 45→30s, „Der echte Workflow“ 75→60s. Inhalt endet bei 29:45.
- 2026-11-07: Umbau nach Struktur-Review (Subagent, Matt-Pocock-Abgleich): Rollenfrage als Versprechen auf der These-Folie (+15s), Demo 1 gestrichen (Video-Folie 90s, Pause bei 0:15 mit Saalfrage „Wo würdet ihr suchen?“), F2 + F3 zu „Zwei kritische Funde“ (45s), PR-Folie auf Lauf 5 (Sofa, −191,96 €, 14 Screenshots, 110 Turns · 1,33 $ · 3,1 Min) wie das Zielbild, Cherny-Zitate zu einer Folie (45s). Inhalt endet bei 28:15, 1:45 Puffer. Offen aus dem Review: Quelle für „4,2 % Recall“, QR auf der Danke-Folie, Problem-vor-Lösung vor pstack, Dev-Agent-Folien zusammenlegen.
- 2026-11-07: Folien „ohne KI“ und „mit KI“ zeigen jetzt die Delivery Factory aus alexop.dev/lab (era 2022 / 2026) statt Mermaid. Code liegt in `features/`, Wrapper in `components/DeliveryFactory.vue`.
- 2026-11-07: Kapitel 3–5 auf echte Daten aus otto-nuxt-shop umgebaut: echte Feature Map, neue Folien „So hilft der Skill“, „Echter Bug beim Erstellen“, „So baut der Agent das Feature“, zwei Fund-Folien, echter Report (CRITICAL_BUGS). 38 Folien, Inhalt bis 29:45. Siehe [Agent-Verifikation am Otto-Klon](wiki/agent-verifikation-otto-shop.md).
- 2026-11-07: CI-Kapitel zeigt jetzt den echten Workflow aus otto-nuxt-shop (`.github/workflows/claude-qa.yml`, Commit ae7d693): Label `qa-verify` → Shop per Skill starten → claude-code-action liest das Ticket aus der PR-Beschreibung → Report als PR-Kommentar → Merge-Gate über `--json-schema`. Basis: Blogposts „Building an AI QA Engineer…“ und „How to Use Claude Code as an AI QA Tester with Agent Browser“. Noch nicht in GitHub gelaufen.
- 2026-11-07: QA-Workflow läuft echt in GitHub (PR alexanderop/otto-nuxt-shop#1, Ticket als Issue #2, Label qa-verify, Claude-Code-Subscription). Lauf 4 (Run 42368126398): CRITICAL_BUGS, 109 Turns, 1,19 $, 2,9 Min, 13 eingebettete Screenshots, Gesamt −1.512,20 € mit Rolex. Neue Folie „So sieht das im PR aus“, Workflow-Folie auf zwei Jobs (qa liest, report schreibt) aktualisiert.
- 2026-11-07: Lauf 5 (Run 42368915488): Video als GIF direkt im PR-Kommentar (1,36 MB), 14 Screenshots, CRITICAL_BUGS, 110 Turns, 1,33 $, 3,1 Min, Gesamt −191,96 €. Zielbild-Folie zeigt jetzt diesen echten Kommentar statt PR #136.
- 2026-11-08: Dopplungen gekürzt, 10 Folien raus: Testorakel, Mappen-Analogie (in Notes von „Ein Befehl…“), „Skill bei jedem Lauf“, „Verifikationsschleife“ (in „So baut der Agent“), „Zwei kritische Funde“, „So baut ihr das nach“ (in „Montag“), zweite PR-Folie (Sofa-Zeile in „direkt im PR“), „Alles zum Nachbauen“, „Wann der Mensch eingreift“ (dritter Punkt auf der Mensch-Folie); „Claude Code kann mehr…“ mit der Tool-Folie zusammengelegt. Inhalt endet bei 23:40, 6:20 Puffer.
- 2026-11-08: Brückenfolie nach dem Ticket (statement, 10s): „Der Agent soll das im echten Shop prüfen. Aber er kennt den Shop nicht.“ Ticket 30→25s, pstack 30→25s. Endzeit unverändert.
- 2026-11-08: Feature-Map-Folie suche.md (10s, ein Klick auf die Gotchas) nach warenkorb.md. Warenkorb 35→25s. Endzeit unverändert.
- 2026-11-08: Brückenfolie vor Prompt 2 (statement, 10s): „Derselbe Skill macht danach QA.“ Feature-bauen-Folie 75→65s, Stats-Zeile (15 Tool-Aufrufe · 0,90 $) entfernt. Endzeit unverändert.
- 2026-11-08: Neue Folie „Der Aufruf ist ein Testauftrag mit Leitplanken“ vor dem Workflow (45s, 5 Klicks): claude -p Zeile für Zeile für QA übersetzt. „Label setzen“ 45→30s, Workflow 60→30s. Endzeit unverändert.
- 2026-11-08: Neue Folie „So sieht der Lauf im Terminal aus“ (30s) nach der claude-Aufruf-Folie: echte Ausgabe eines lokalen Laufs als Text (CRITICAL_BUGS, 2,12 $, 4,1 Min). Alle Folien danach +30s, Inhalt endet bei 24:10, 5:50 Puffer.
- 2026-11-08: Zusammenfassungsfolie „Vom Ticket zum roten oder grünen PR“ (30s, nummerierte Liste, keine Klicks) nach der Mensch-Folie. Alles danach +30s, Inhalt endet bei 24:40, 5:20 Puffer.
- 2026-11-09: Neue Folie „Testmatrix für das Bekannte, Charter für den Rest“ (45s, 2 Klicks) nach Prompt 2: Testentwurf nach Risiko mit QA-Techniken (Zustandsübergänge, Grenzwerte), feste Ergebnisse inkl. Bestandsfehler und BLOCKIERT, PASS nur im Browser. Basis: QA-Skill aus einem Kundenprojekt (privater Gist). Alles danach +45s, Inhalt endet bei 25:25, 4:35 Puffer.
- 2026-11-09: QA-Sprache im ganzen Deck: Trichter-Frage auf „Wie fangen wir Fehler ab…“, Soll/Ist statt Erwartet/Ist, Quality Gate (PR- und Zusammenfassungsfolie), Verifikation/Validierung als Spalten auf der Mensch-Folie, False Positive, Testentwurf auf der Vorarbeit-Folie, Montag-Folie Charter statt Rubrik. Zeiten unverändert.
- 2026-11-09: Neue Folie „Label setzen, dann live zuschauen“ (30s, keine Klicks) nach der claude-Aufruf-Folie: Screenshot des Label-Events aus PR #1 plus echtes Actions-Log (Run 42368915488), das beim Slide-Wechsel live Zeile für Zeile einläuft. Alles danach +30s, Inhalt endet bei 25:55, 4:05 Puffer.
- 2026-11-09: otto-nuxt-shop: QA-Schema hat jetzt Boolean `passed`, Merge-Gate prüft `passed` (Commit d650193). Log-Folie zeigt den neuen echten Lauf 42622982046 (passed: false, CRITICAL_BUGS, 1,17 $, 2,8 Min). Zeiten unverändert.

- 2026-11-09: Folie „So sieht der Lauf im Terminal aus“ entfernt (−30 s, doppelt zum Live-Log aus GitHub Actions). Alle TIME-Zeilen danach −30 s, Ende 25:25, 4:35 Puffer. Demo-Folie nutzt jetzt 11 Standbilder pro Klick statt Video (AnnotatedStills).
- 2026-11-09: Läufe entwirrt, Zeiten unverändert. Lokaler Teil (Demo, Report, Pointe) = lokaler Mascara-Lauf (Commit 302bad8, 5 Funde): Pointe-Preisschild −493,34 € statt −191,96 €. Cloud-Teil (Log, JSON-Beispiel, PR-Folie) = Run 42622982046 (3 Funde, 115 Turns · 1,17 $ · 2,8 Min): PR-Folie mit neuen Screenshots (`pr-report-kopf.png`, `pr-report-fund.png` statt `pr-report-szenarien.png`), Zeile „Anderer Lauf, anderer Weg, dieselbe Ursache“, „Merge blockiert“ gestrichen. Zielbild bleibt Run 42368915488.
- 2026-11-09: Testmatrix-Folie von vor der Demo hinter die Pointe verschoben und zur Auswertung umgebaut: „Drei von fünf Funden waren Zustandsübergänge“ (45s, 1 Klick), Spalte „Im Lauf“ mit F1–F5 und zwei Zeilen „nicht geprüft“. Ergebnis-Pills raus (jetzt in den Notizen). Demo, Report und Pointe je −45s, Endzeit unverändert 25:40.
- 2026-11-09: Skill-Block (8:50–10:55, weiter 125s, 5 Folien) umgedreht: erst was, dann wie, dann Dateien, dann Installation. Neu: Analogie-Folie „Ein Agent ist ein neuer Kollege, der jeden Abend alles vergisst“ (25s) und Ablauf-Folie „So nutzt der Agent die Mappe in jedem Lauf“ (25s). SKILL.md 35→25s mit 3 statt 6 Klicks, warenkorb.md 25s, „Ein Befehl“ 30→25s ans Ende. Raus: eigene poteto-Folie (jetzt Quellenzeile + Notiz) und suche.md (Gotchas in der Notiz von warenkorb.md). Endzeit unverändert.
- 2026-11-09: Vier Erklär-Verbesserungen. (1) Neue Folie „Ein Agent arbeitet in einer Schleife“ (25s) vor der Tool-Folie, Tool-Folie 75→50s, zeitneutral. (2) Neue Folie „Ein Quality Gate braucht true oder false, keine Prosa“ (25s, 2 Klicks) nach dem Testauftrag; Testauftrag 45→35s, JSON-Klick nur noch als Verweis. Alles danach +15s, Inhalt endet bei 25:55, 4:05 Puffer. (3) Brückenfolie vor Prompt 2 nennt den zweiten Agenten (Unabhängigkeit des Testens). (4) Jira-Teaser ohne die drei Baustein-Kästen, Fachbegriffe in die Notiz.
- 2026-11-09: Zusammenfassungsfolie „Vom Ticket zum roten oder grünen PR“ entfernt (−30s). Alles danach −30s, Inhalt endet bei 25:25, 4:35 Puffer.
- 2026-11-09: Agent-Browser-Folie in drei Klicks aufgebaut (hinschauen → handeln → prüfen), 45→60s. Befehle wörtlich aus dem lokalen Lauf (`find role … --name`, `wait --text`, `get text`), Marken zeigen Rolle statt Ref-Nummer, Befehls-Chips raus, Schlusszeile „Rolle und Name“ / getByRole. Alles danach +15s, Inhalt endet bei 25:40, 4:20 Puffer.
- 2026-11-09: YAML-Folie „Der echte Workflow“ ersetzt durch Diagramm „Was passiert, wenn jemand das Label setzt?“ (45s, 4 Klicks, MermaidSteps mit Subgraphen). YAML (Gate jetzt `passed`) ins Backup. Alles danach +15s, Inhalt endet bei 25:40, 4:20 Puffer.
