# How Alex builds talks

Read this before drafting, restructuring, or reviewing a deck. It describes how Alex (Alexander Opalic) plans, writes, and delivers talks. It is based on Alex's recorded talks (MadVue "Clean Code is Sexy Again", Vue.js Nation 2025 "Local-First", Frontend Nation 2025 semantic-search workshop) and the decks in `~/Projects/slides/` (`pstack-talk`, `vitest-browser-mode-tacon`, `quality-night-hamburg-26`, `local-first-vue-amsterdam-2026`, `copilot-workshop`, `pstack-starfall`). When you are unsure how to build a slide, find a similar slide in one of those decks and copy its approach.

## Deck skeleton

Use this order unless `research/brief.md` says otherwise:

1. **Event cover.** A full-bleed conference poster with `hideFooter`. It stays up while the room settles and is not timed.
2. **Title slide.**
3. **About me.** It takes about 10 seconds and lists the name, "Developer from Germany", alexop.dev, and a photo. It goes either right after the title or right after the problem slide.
4. **Hook.** Ask the audience a show-of-hands question ("Who has had an agent say 'done' and it wasn't?"), or state the thesis outright. Content starts within 1–2 minutes.
5. **Status quo → problem → new approach.** First show how people build this today and where it hurts. Then introduce the idea, often backed by a canonical source (a paper, a definition, a well-known author).
6. **Sections.** Usually 3–5. Each opens with a question or claim that leads into it. Open each section with a divider or chapter component, or a running map such as `PstackWorkflowMap`.
7. **"When not to use it" / "where this is heading".** Always cover trade-offs and fit, without being asked.
8. **One takeaway slide.** Either "the one idea to take home", or 3 numbered takeaways, or one concrete action ("Pick one feature. Give your agent a way to prove its work.").
9. **Thank you + QR codes.** One QR for the slides URL (`*.vercel.app`) and one for the alexop.dev post that expands on the talk. Leave this slide up during Q&A.
10. **Optional "One more thing…" bonus,** then **backup slides** placed after the thank-you, behind a `Backup` statement slide.

## Slide writing rules

- **One idea per slide.** Talk slides average 5–30 visible words and stay under 40.
- **Make the headline a claim, not a topic label.** Write "The agent can close the loop", not "Feedback loops". Use questions for transitions ("What is this green test supposed to prove?").
- **Use bullets mostly in workshops.** In talks, prefer a `layout: statement` slide, an image, a diagram, or code.
- **Highlight the key word** of a statement in the pink accent.
- **Show code one file at a time.** Use the `code-editor` layout for walkthroughs, one stop per file and in project order (structure → data → composable → component), with a one-line purpose and any gotcha. Use Magic Move for before/after changes.
- **Carry the whole talk with one running example**: a todo app, a workout tracker, a plush shop, a small game. Introduce it early and keep coming back to it.
- **Explain with analogies** from pop culture or from Vue itself, e.g. Memento for context loss, or Vue lifecycle hooks for agent hooks.
- **Prove things with real artifacts**: terminal recordings, short `<video>` clips of real runs, screenshots. A live demo is rare. Mark it on the slide and put its prep steps in the notes.
- **Make full-bleed images carry the argument.** Use generated illustrations or memes (Gandalf, Steve Jobs, the Hamcrab mascot) with an `sr-only` heading and real alt text. Save image prompts as `research/*-prompt.md`.
- **Point to deeper material.** Add "Want to go deeper?" slides with a QR code that links to Alex's blog posts, talks, or books.
- **Write in Alex's voice:** first person, opinionated ("I think", "I'm a fan of", "my main take"), beginner-level wording, honest caveats ("I'm not an expert in…"), light self-deprecating disclaimers.
- **Interact with the room.** Ask 1–3 show-of-hands questions per talk, often one per chapter, using `AudienceQuestion` or 🙋. Online talks need none.

## Diagrams

Mermaid is the only diagram tool. Don't use the `Rough*` components. The theme draws every diagram hand-drawn (Excalidraw style) in brand colors. The demo slides in this starter's "Diagram & UI Components" section show every feature; copy from them. Full guide: `agent_docs/mermaid.md` in the stack repo (`~/Projects/slides/alexop-slidev-stack`).

- Pick by question: how parts connect → `flowchart`; order of a request → flowchart edge `step`s; who calls whom → `sequenceDiagram`; who owns a step → `swimlane-beta`; big system then one part → `group@{ view: collapsed }`.
- Make nodes look real: `id@{ shape: browser | console | person | datastore | bucket | folder, label: "…" }`.
- Step animation: `a e1@--> b` plus `e1@{ step: 1 }`. Add `config: { flowchart: { stepNumbers: true } }` so exports still show the order.
- Never add colors, `style` or `classDef`. Use `config: { look: classic }` only when exact details matter more than the sketch feel.
- Size with `{scale: …}` (start at 0.8; sequence and swimlane need 0.4–0.5). Open the slide in the browser: oversized diagrams run off the slide without any error.
- To reveal a flowchart click by click, wrap it in `<MermaidSteps :steps="['a', 'b', 'c d']">` (one entry per click; edges follow their nodes). Other diagram types: build up across consecutive slides.

## Timing

- Put the duration in the headmatter. Each slide's note starts with `TIME: mm:ss–mm:ss (Ns)`.
- **Pace:** about 1 slide per minute in short talks, up to about 2 per minute in long ones. For a 45-minute slot, plan about 36 minutes of content, 5 minutes of Q&A and 4 minutes of reserve.
- Keep a running log of slide-count and timing changes in `research/brief.md`.

## Speaker notes

- Default to timed bullet notes: the `TIME:` line, then 3–5 bullets with `[click]` / `[Ask for hands]` cues, then a `SOURCE:` line pointing to the research file.
- Keep Alex's own framing separate from sourced claims in the notes.
- Follow the format the brief names if it differs: terse cues, a full script, or notes in a separate `presenter.md`.

## Talk vs workshop

Workshops differ from talks:
- They open with a numbered outline.
- They use `layout: section` dividers.
- Bullets and real code are fine.
- Exercises get harder step by step, each on a solution branch.
- They include a "Live Demo" section with prerequisites.
- They end with Key Takeaways → "Thank You! Questions?" → a resources list with the solution repo.

## Language

Decks are in English or German, matching the event. Write all slide text and notes in the deck's language.

# Talk research workflow

This presentation includes a Karpathy-style LLM wiki. Use it whenever the user adds a source, asks an evidence question, explores the talk's argument, or edits slides that make factual claims.

## Research structure

- `research/raw/` contains source captures. Treat a capture as immutable after ingestion.
- `research/wiki/` contains topic pages maintained by the agent.
- `research/brief.md` contains the audience, thesis, intended outcome, and open questions for the talk.
- `research/wiki/index.md` catalogs the topic pages.
- `research/wiki/log.md` records ingests and maintenance work in chronological order.

The raw source is the evidence. The wiki is the current synthesis. The slides are an output derived from both.

## Ingest a resource

Run this workflow when the user says "add this resource," "ingest this," "use this article," "use this video," or provides material for the talk.

1. Fetch the source with the tools available in the current agent.
2. Save the source in `research/raw/` as Markdown.
3. Search `research/wiki/` for related topics and claims.
4. Create or update the relevant topic pages.
5. Update `research/wiki/index.md` and append to `research/wiki/log.md`.
6. Run `pnpm research:check`.
7. Tell the user what the source added, what it challenged, which slides it could affect, and which question is still open.

For a blog post, preserve the title, author, publication, publication date, canonical URL, and article body. Remove navigation, advertisements, and unrelated page furniture. Do not rewrite the author's claims in the raw capture.

For a YouTube video, preserve the title, channel, publication date, canonical URL, description when useful, and the complete available transcript. Record whether the transcript came from creator captions or automatic captions. If no transcript is available, set `status: metadata-only`. Do not infer a transcript from the title or description.

For a local file or pasted note, preserve the supplied content and describe its origin in the metadata.

Use this frontmatter for every raw source:

```yaml
---
kind: article
title: Example title
url: https://example.com/article
author: Example Author
publisher: Example Publication
published: 2026-09-11
collected: 2026-09-11
status: complete
---
```

Allowed `kind` values are `article`, `youtube`, `paper`, `note`, and `file`. Allowed `status` values are `complete` and `metadata-only`. Use `unknown` when the author, publisher, or publication date cannot be established.

Use the publication date in the filename when known. Use `YYYY-MM-DD-descriptive-slug.md`. Omit the date prefix when the publication date is unknown.

## Compile the wiki

Organize wiki pages around concepts and arguments, not individual sources. Merge new knowledge into an existing page when the subject already exists. Create a new page only when the source introduces a distinct concept that the talk may use.

Every topic page must contain these sections:

```md
# Topic title

## Current synthesis

## Claims and evidence

## Tensions and open questions

## Sources
```

Link every factual claim to the raw file that supports it. Keep the original URL in the raw file. If two sources disagree, retain both claims and describe the disagreement. Do not silently replace the older claim.

If a source adds no material knowledge, keep the raw capture and record `no material` in the log. Do not create a thin wiki page to make the ingest look productive.

## Discuss the talk

Before answering a research question, read `research/brief.md` and `research/wiki/index.md`. Search the full wiki for the question's terms and close synonyms. Read the matching topic pages and their linked raw sources before making a precise factual claim.

Base the answer on the local research when it exists. Cite the relevant wiki page and raw source. Separate sourced facts from your interpretation. Say when the research does not support a conclusion.

Treat useful discussion as durable work. When the user reaches a new conclusion, asks to preserve an analysis, or changes the talk's thesis, update the relevant wiki page or `research/brief.md`.

## Build slides from the research

Read the relevant wiki pages before drafting or revising a content slide. Keep the slide focused on one audience-facing idea. Put detailed citations in presenter notes unless the audience needs the source on screen.

Do not copy a source summary directly into the deck. Use the source to sharpen the talk's argument, choose evidence, find counterarguments, and identify useful examples.

Run `pnpm research:check` before declaring research-backed slide work complete.
