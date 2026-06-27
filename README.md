# Trustworthy Agent Memory

A public research notebook by Hrvoje Pavlinovic.

I am studying one problem: how to make AI agents work with context that is accurate, current, permission-aware, and explainable enough for real software work.

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

## Status

Early research notebook. Notes here will be curated manually as I learn, test, and build small experiments.

No license yet. Please do not treat this as reusable material without asking.
