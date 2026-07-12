# Trustworthy Agent Memory and Context

A guide to memory and context layers for AI agents.

Read the guide at [guide.hills-lab.hr](https://guide.hills-lab.hr).

Written by Hrvoje Pavlinovic. Maintained through [HILLS Lab](https://hills-lab.hr).

The problem: how to make AI agents work with context that is accurate, current, permission-aware, and explainable enough for real software work.

This is not about making a chatbot remember a few personal facts. It is about the operating layer around an agent: GitHub, Slack, Linear, Jira, Sentry, docs, incidents, deployments, decisions, permissions, provenance, and evals.

Models will improve. Tools will change. The hard part is making the surrounding context trustworthy.

## Working Questions

- What should an agent remember, and what should it only retrieve temporarily?
- How does a memory item prove where it came from?
- How does the system know when context is stale?
- What happens when Slack, docs, tickets, and code disagree?
- How are permissions preserved when context crosses tools?
- How should humans correct, approve, or reject durable memory?
- How do we evaluate whether memory improved the agent or only made it more confident?

## Scope

The current focus is AI-assisted software teams.

That includes:

- source control, PRs, reviews, commits, and CI
- tickets, priorities, ownership, and acceptance criteria
- chat decisions and informal team knowledge
- docs, runbooks, ADRs, and onboarding notes
- monitoring, Sentry issues, incidents, and deploy history
- agent instructions such as AGENTS.md, CLAUDE.md, Cursor rules, and Codex skills

## Principles

- Memory without provenance is a liability.
- Stale context is worse than missing context.
- Permissions are part of the memory model, not an integration detail.
- The system should make agents informed before it makes them autonomous.
- Durable memory should be easy for humans to inspect and correct.
- Claims about better agent behavior need evals, not vibes.

## Notes

- [Memory is not context](src/content/docs/core/memory-is-not-context.md)
- [Which context is allowed to win?](src/content/docs/core/which-context-wins.md)
- [Accountable context](src/content/docs/core/accountable-context.md)
- [Memory item schema](src/content/docs/design/memory-item-schema.md)
- [Memory diff format](src/content/docs/design/memory-diff-format.md)
- [Manual context packet](src/content/docs/design/manual-context-packet.md)
- [Context packet comparison](src/content/docs/experiments/context-packet-comparison.md)
- [Provider context map](src/content/docs/research/provider-context-map.md)
- [CocoIndex research notes](src/content/docs/research/cocoindex-notes.md)

## Reuse

No license is published yet. Treat the text as copyrighted unless that changes.
