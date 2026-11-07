---
kind: note
title: Echte Agent-Läufe im otto-nuxt-shop (Skill, Feature, QA)
url: https://github.com/alexanderop/otto-nuxt-shop
author: Alexander Opalic
publisher: unknown
published: 2026-11-07
collected: 2026-11-07
status: complete
---

Origin: three `claude -p` runs (Claude Code 2.1.319, model opus, `--permission-mode bypassPermissions`) in `~/Projects/talks/otto-nuxt-shop`. Full stream-json transcripts live in that repo under `.talk-logs/` (git-ignored). Numbers are copied from each run's final `result` event.

## Run 1: /pstack:create-verification-skill (main)

- 56 turns, 3.37 USD, 526 s.
- Output: `.claude/skills/verify-otto-shop/` with `SKILL.md`, `scripts/otto-verify.sh` (launch, doctor, wait-ready, proof, stop) and six German feature files. Commit `01f006e`.
- Found a real, unplanted bug: ArrowDown in the search box never highlights a suggestion (`app/components/SearchBox.vue:39`).

## Run 2: implement SHOP-42 (branch feat/gutschein)

- 16 turns, 0.90 USD, 15 tool calls.
- Sequence: read ticket and skill, read code, write `useCoupon.ts` and `warenkorb.vue`, typecheck, launch via skill, drive the three scenarios, read its own screenshots, CSS fix, extend feature map, commit `b70393e`.
- All three Gherkin scenarios passed.

## Planted bug

- Commit `7ee8d7e` ("useCoupon: Rabatt beim Einlösen berechnen und speichern") was written by Alex, not the agent. It freezes the discount amount at redeem time in the cookie `otto-coupon-amount`.
- A first QA run read an earlier, revealing commit message ("demo(talk): …") and said it knew about the bug. That run was discarded and kept on branch `backup/qa-run-1-wusste-vom-bug`. The commit message was made neutral and QA was rerun.

## Run 3: QA agent (branch feat/gutschein)

- 20 turns, 1.00 USD, about 145 s.
- The agent read the ticket, `git log main..HEAD`, the diff and `useCoupon.ts` (white-box like a PR reviewer), then drove the browser.
- Verdict CRITICAL_BUGS. Scenarios 1–3 and the reload rule passed.
- Findings: F1 Major (discount does not grow with quantity), F2 Critical (discount stays 8,05 € on 8,94 € after reducing 9 → 1), F3 Critical (total −1,39 € after emptying the cart and adding a 0,71 € lemon), F4 Major (discount read unchecked from cookie, 500 € possible), F5 Minor (empty input says "ungültig").
- Report and evidence: `docs/reports/SHOP-42-qa-report.md`, `docs/reports/SHOP-42/` (12 screenshots, 1:20 video). Commit `302bad8`.
