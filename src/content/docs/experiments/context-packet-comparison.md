---
title: Context packet comparison
description: One coding task run with and without a curated context packet.
---

Does a context packet make a coding agent more effective?

For this task, no.

Both runs made the same correct one-line change and passed the production build. The run with the packet used more commands, more time, and more tokens.

## Setup

Date: 2026-07-10

Task: fix the broken Inference link on the guide homepage.

Both runs used:

- Codex CLI `0.144.0-alpha.4`
- model `gpt-5.6-sol`
- separate isolated worktrees at the same commit, [`03d8d0e`](https://github.com/hrvojepavlinovic/trustworthy-agent-memory/commit/03d8d0e9e50d544eb989605aef5f26a7cb591c48)
- the same dependencies
- no user configuration or repository instruction files
- the same task prompt
- permission to edit the worktree, but not commit or push

The second run also received the [manual context packet as published in `c1259a6`](https://github.com/hrvojepavlinovic/trustworthy-agent-memory/blob/c1259a64ed6150b75a3938cf33ad3fac4561e511/src/content/docs/design/manual-context-packet.md).

Each run started from a fresh worktree. The first attempt was discarded because shared dependencies prevented the build from writing its cache. The reported runs used separate local dependency copies and both builds passed.

## Task prompt

```text
The deployed guide homepage's Inference link resolves to
https://guide.hills-lab.hr/concepts/inference.md and returns 404.
Fix only this bug in the repository. Do not commit or push.
Verify the change locally if possible.
```

## Results

| Measure                | Without packet             | With packet               |
| ---------------------- | -------------------------- | ------------------------- |
| Result                 | Correct                    | Correct                   |
| Files changed          | 1                          | 1                         |
| Final link             | `/concepts/inference/`     | `/concepts/inference/`    |
| Production build       | Passed                     | Passed                    |
| Shell command batches  | 4                          | 9                         |
| Failed command batches | 0                          | 3                         |
| Observed wall time     | about 30 seconds           | about 59 seconds          |
| Uncached input tokens  | 11,846                     | 18,850                    |
| Output tokens          | 887                        | 1,920                     |
| Initial discovery      | Repo search and route read | Homepage and package read |

Token counts come from the Codex CLI trace. "Uncached input tokens" is total input minus cached input. A command batch is one shell tool call and may contain several commands.

## What happened

Without the packet, the agent searched the repository, read the homepage and Starlight route configuration, changed one line, used the available npm script, and verified the generated link.

With the packet, the agent did fewer discovery reads. It also followed three errors encoded in the packet:

1. The packet prescribed `pnpm` commands, but the isolated shell had no `pnpm` shim. The agent tried direct pnpm, Corepack, and finally the installed project binaries.
2. The packet listed `dist/concepts/inference/index.html` as evidence, but `dist` did not exist before the build. It was an expected artifact, not an observed source.
3. The packet asked for every `.md` homepage route to be removed even though the task allowed changing only the Inference link.

Those retries and broad checks explain most of the extra commands and time.

## Finding

The packet was unnecessary for this task. The relevant evidence was local, authoritative, and cheap to inspect.

The packet also mixed durable context with execution details. Package-manager availability belonged to environment discovery. Generated output belonged to verification. Encoding either as a fact made the agent do more work.

A useful context packet should carry information that is expensive or risky to reconstruct:

- task boundaries
- decisions from outside the repository
- source precedence
- permission constraints
- known contradictions
- acceptance criteria

It should leave cheap, current environment facts to direct inspection.

## Limit

This is one task, one model, and one run per condition. It shows that a packet can hurt a simple task. It does not measure how packets perform when the required context is spread across tickets, chat, incidents, and private systems.
