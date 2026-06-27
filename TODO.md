# TODO

## First Notes

- [ ] Write `memory-is-not-context`.
- [ ] Write `provenance-before-persistence`.
- [ ] Write `stale-context-is-a-production-risk`.
- [ ] Write `permissions-are-part-of-memory`.
- [ ] Write `evals-for-agent-context`.
- [ ] Answer `what is inference?` in simple terms.

## Reading List

- [ ] Map existing AI memory approaches in Claude, ChatGPT, Cursor, Codex, and Copilot.
- [ ] Research how popular providers implement context and memory systems.
- [ ] Research popular external memory systems, including newer database types.
- [ ] Collect papers and posts on agent memory, retrieval, provenance, and tool use.
- [ ] Compare how current tools handle project instructions and long-lived context.
- [ ] Track failure modes from real software workflows.

## Experiments

- [ ] Define a small memory item schema with source, scope, status, freshness, and visibility.
- [ ] Create a manual context packet for one real repo task.
- [ ] Compare the same agent task with and without a curated context packet.
- [ ] Draft a memory diff format for PRs, tickets, incidents, and decisions.
- [ ] Design a permission leakage test for mixed private/team/project context.

## Public Output

- [ ] Publish a short X thread announcing the research notebook.
- [ ] Turn the first note into a post on hrvoje.pavlinovic.com.
- [ ] Add a link from the personal site once the repo has enough substance.
- [ ] Decide whether HILLS Lab should publish applied versions of these artifacts.

## Open Questions

- [ ] What is the smallest useful context layer for a software team?
- [ ] Which memory should be append-only, and which should be editable?
- [ ] How should contradictions be represented instead of hidden?
- [ ] What belongs in repo-local instructions versus external memory?
- [ ] What does a trustworthy agent answer cite by default?
