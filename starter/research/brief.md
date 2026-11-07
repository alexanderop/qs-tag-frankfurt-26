# Talk brief

## Working title

Vom Ticket zum Beweis: Agents, die ihre Arbeit selbst prüfen (QS-Tag Frankfurt 2026, 30 Minuten, Deutsch, letzter Talk des Tages, direkt nach Robert Fey)

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
- 2026-11-07: Folien „ohne KI“ und „mit KI“ zeigen jetzt die Delivery Factory aus alexop.dev/lab (era 2022 / 2026) statt Mermaid. Code liegt in `features/`, Wrapper in `components/DeliveryFactory.vue`.
- 2026-11-07: Kapitel 3–5 auf echte Daten aus otto-nuxt-shop umgebaut: echte Feature Map, neue Folien „So hilft der Skill“, „Echter Bug beim Erstellen“, „So baut der Agent das Feature“, zwei Fund-Folien, echter Report (CRITICAL_BUGS). 38 Folien, Inhalt bis 29:45. Siehe [Agent-Verifikation am Otto-Klon](wiki/agent-verifikation-otto-shop.md).
- 2026-11-07: CI-Kapitel zeigt jetzt den echten Workflow aus otto-nuxt-shop (`.github/workflows/claude-qa.yml`, Commit ae7d693): Label `qa-verify` → Shop per Skill starten → claude-code-action liest das Ticket aus der PR-Beschreibung → Report als PR-Kommentar → Merge-Gate über `--json-schema`. Basis: Blogposts „Building an AI QA Engineer…“ und „How to Use Claude Code as an AI QA Tester with Agent Browser“. Noch nicht in GitHub gelaufen.
