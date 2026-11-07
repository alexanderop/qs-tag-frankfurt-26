---
kind: note
title: Bausteine für Jira → Cloud-Agent → Funde im Ticket
url: https://support.atlassian.com/cloud-automation/docs/jira-automation-triggers/
author: unknown
publisher: unknown
published: unknown
collected: 2026-11-07
status: complete
---

Origin: Doc lookups on 2026-11-07 (WebFetch/WebSearch). Quotes are from the fetched pages; nothing here was built or tested.

## Jira Automation trigger

https://support.atlassian.com/cloud-automation/docs/jira-automation-triggers/

- Trigger "Work item transitioned": "will run when a work item transitions from one status to another."
- "configure this trigger so it listens to the status of your choice, or simply any transition in your workflow."

## Jira Automation action "Send web request"

https://support.atlassian.com/cloud-automation/docs/jira-automation-actions/

- "Sends an outgoing web request to notify another system when a flow is run."
- Body: "Custom format" allowed, smart values allowed. Values can be hidden (asterisks after saving).
- Allowed ports include 443. Headers and method are not described on this page; community posts use Authorization headers for GitHub.

## GitHub repository dispatch

https://docs.github.com/en/rest/repos/repos#create-a-repository-dispatch-event

- `POST /repos/{owner}/{repo}/dispatches`, required `event_type` (≤ 100 chars), optional `client_payload` (≤ 10 top-level properties, < 64 KB). Response 204.
- Classic PATs need the `repo` scope.

Related pattern: OpenAI Codex cookbook uses a Jira automation rule that posts to GitHub `workflow_dispatch` (https://developers.openai.com/cookbook/examples/codex/jira-github).

## Atlassian Rovo MCP Server

https://support.atlassian.com/rovo/docs/getting-started-with-the-atlassian-remote-mcp-server/

- Remote MCP server for Jira, Confluence, JSM, Bitbucket. Claude Code: `claude mcp add --transport http atlassian https://mcp.atlassian.com/v1/mcp/authv2`, then `/mcp` to sign in. Some sources list a v2 endpoint.
- Available to all Atlassian Cloud customers, with site-level rate limits.
- An add-comment tool was not confirmed from docs. Interactive OAuth sign-in may not suit headless CI; the REST API with an API token is the safer path there.

## Jira REST: attachments

https://support.atlassian.com/jira/kb/how-to-add-an-attachment-to-a-jira-cloud-issue-using-rest-api/

- `POST /rest/api/3/issue/{issueIdOrKey}/attachments`, multipart field `file`, header `X-Atlassian-Token: no-check`, basic auth with email + API token.
