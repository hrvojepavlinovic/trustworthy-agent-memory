# TODO

## Notes

- [x] Write `memory-is-not-context`.
- [x] Write `which-context-wins`.
- [x] Write `accountable-context`.
- [x] Write `provenance-before-persistence`.
- [ ] Write `stale-context-is-a-production-risk`.
- [ ] Write `permissions-are-part-of-memory`.
- [ ] Write `evals-for-agent-context`.
- [ ] Answer `what is inference?` in simple terms.

## Research

- [ ] Map how Claude, ChatGPT, Cursor, Codex, and Copilot expose memory, project context, connectors, and instructions.
- [ ] Research how popular AI providers implement context and memory systems.
- [ ] Research popular external memory systems, including newer database types.
- [ ] Evaluate AI-native databases and memory stores such as HelixDB.
- [x] Collect initial references on agent memory, retrieval, provenance, permissions, tool use, evals, and observability.
- [ ] Add deeper papers and technical references.
- [ ] Track failure modes from real software workflows.

## Experiments

- [ ] Define a small memory item schema with source, scope, status, freshness, and visibility.
- [ ] Create a manual context packet for one real repo task.
- [ ] Compare the same agent task with and without a curated context packet.
- [ ] Draft a memory diff format for PRs, tickets, incidents, and decisions.
- [ ] Design a permission leakage test for mixed private/team/project context.

## Open Questions

- [ ] What is the smallest useful context layer for a software team?
- [ ] Which memory should be append-only, and which should be editable?
- [ ] How should contradictions be represented instead of hidden?
- [ ] What belongs in repo-local instructions versus external memory?
- [ ] What does a trustworthy agent answer cite by default?
