---
title: Manual context packet
description: A minimal context packet for fixing a real broken link in this guide.
---

A context packet is the working set prepared for one task.

It should contain enough evidence to act correctly, but not every available file, conversation, or remembered fact.

This example comes from a real bug in this guide: the homepage linked to the Markdown source path for the inference page, so the deployed site returned a 404.

## The packet

```yaml
task:
  id: guide-fix-inference-link
  request: Fix the inference link on the guide homepage.
  observed_url: https://guide.hills-lab.hr/concepts/inference.md
  observed_result: 404
  expected_url: https://guide.hills-lab.hr/concepts/inference/

scope:
  repository: github:hrvojepavlinovic/trustworthy-agent-memory
  allowed_changes:
    - src/content/docs/index.md
  out_of_scope:
    - rewriting the inference article
    - changing route configuration
    - changing unrelated links or copy

evidence:
  - source: src/content/docs/index.md
    claim: The homepage link points to ./concepts/inference.md.
    authority: current repository source
  - source: src/content/docs/concepts/inference.md
    claim: The inference page exists as a Starlight content page.
    authority: current repository source
  - source: dist/concepts/inference/index.html
    claim: The production build emits the page at /concepts/inference/.
    authority: current build output

decision:
  replace: ./concepts/inference.md
  with: /concepts/inference/
  reason: Public links must use the generated site route, not the Markdown source path.

verification:
  - pnpm format:check
  - pnpm check
  - pnpm build
  - confirm dist/concepts/inference/index.html exists
  - confirm homepage links contain no .md routes
  - after deployment, request /concepts/inference/ and expect HTTP 200
```

## Why each part is present

`task` records the failure and the expected behavior. "Fix the link" alone would force the agent to infer both.

`scope` limits the change. The agent does not need permission to rewrite the article or reorganize routing.

`evidence` separates observed facts from instructions. Each claim points to something that can be checked again.

`decision` makes the intended route explicit. This is useful when source file paths and public URLs follow different conventions.

`verification` covers both the repository and the deployed result. A passing Markdown edit is not proof that the public route works.

## What is deliberately missing

This packet does not include the full repository tree, article text, git history, brand notes, provider research, server configuration, or unrelated user preferences.

None of those change the correct action.

The packet is useful because it removes retrieval work without hiding the evidence needed to verify its claims.

## Result

The real fix changed the guide links from Markdown source paths to generated site routes. The relevant change is public in commit [`baffd67`](https://github.com/hrvojepavlinovic/trustworthy-agent-memory/commit/baffd677b6c1174b60f3cd0a0b9a6d2e5ffc3004).

This proves only that the packet is sufficient for this task. It does not yet prove that the packet improves agent performance. That requires running the same task with and without the packet and comparing the traces and outputs.
