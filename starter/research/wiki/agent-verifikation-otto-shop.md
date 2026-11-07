# Agent-Verifikation am Otto-Klon

## Current synthesis

Mit einem generierten Verification-Skill (Feature Map + Helper-Skript) baut ein Agent ein Ticket-Feature, prüft die Gherkin-Szenarien selbst im Browser, und ein zweiter QA-Agent findet beim explorativen Testen Fehler, die kein Szenario abdeckt. Alle drei Läufe zusammen kosteten unter 6 USD.

## Claims and evidence

- Der Skill-Generator hat den Shop in 56 Turns für 3,37 USD kartiert und dabei einen echten Suchfeld-Bug gefunden. [raw](../raw/2026-11-07-otto-shop-agent-runs.md)
- Der Implementierungs-Agent nutzte den Skill zur Selbstprüfung: 16 Turns, 0,90 USD, alle Szenarien grün. [raw](../raw/2026-11-07-otto-shop-agent-runs.md)
- Der QA-Agent fand den eingebauten Mengen-Bug ohne Vorwissen und leitete daraus vier Funde ab, darunter eine negative Gesamtsumme. 20 Turns, 1,00 USD. [raw](../raw/2026-11-07-otto-shop-agent-runs.md)

## Tensions and open questions

- Der Bug wurde absichtlich eingebaut. Der erste QA-Lauf hat ihn über die Commit-Message erkannt und wurde verworfen. Das muss auf der Bühne transparent sein.
- Der QA-Agent liest Diff und Code (White-Box). Ein reiner Black-Box-Lauf ohne Code-Zugriff ist nicht getestet.
- Ein Lauf ist eine Stichprobe. Nicht-Determinismus wurde nicht gemessen.

## Sources

- [Agent-Läufe im otto-nuxt-shop](../raw/2026-11-07-otto-shop-agent-runs.md)
