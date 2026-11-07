# Jira → Cloud-Agent → Funde im Ticket (Teaser)

## Current synthesis

Die Kette ist mit dokumentierten Bausteinen machbar: Jira Automation („Work item transitioned“ → „Send web request“) startet per GitHub `repository_dispatch` denselben QA-Workflow. Claude liest das Ticket (Rovo MCP oder REST) und schreibt Kommentar plus Screenshots als Anhang zurück. Nicht gebaut, nicht getestet.

## Claims and evidence

- Ein Statuswechsel kann eine Automation auslösen, filterbar auf einen Status. [raw](../raw/2026-11-07-jira-cloud-agent-bausteine.md)
- Automation kann einen Web-Request mit eigenem Body und Smart Values senden. [raw](../raw/2026-11-07-jira-cloud-agent-bausteine.md)
- GitHub nimmt `repository_dispatch` mit `client_payload` an (204). [raw](../raw/2026-11-07-jira-cloud-agent-bausteine.md)
- Screenshots lassen sich per REST als Anhang ans Ticket hängen. [raw](../raw/2026-11-07-jira-cloud-agent-bausteine.md)

## Tensions and open questions

- Der Rovo MCP Server nutzt OAuth mit interaktivem Login. Ob das headless in CI geht, ist offen. Die REST API mit API-Token ist der sichere Weg.
- Header-Konfiguration der Web-Request-Aktion ist auf der Doku-Seite nicht beschrieben, nur in Community-Beispielen.
- Ein Jira-Token im Agenten-Job widerspricht der Trennung „Agent liest, Report-Job schreibt“. Besser: Report-Job schreibt nach Jira.

## Sources

- [Bausteine Jira → Cloud-Agent](../raw/2026-11-07-jira-cloud-agent-bausteine.md)
