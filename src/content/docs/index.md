---
title: Trustworthy Agent Memory and Context
description: A guide to memory and context layers for AI agents.
---

AI agents do not only need bigger context windows or more remembered text.

They need context that can be trusted.

This guide is about the operating layer around an agent: GitHub, Slack, Linear, Jira, Sentry, docs, incidents, deployments, decisions, permissions, provenance, traces, and evals.

The problem is simple to state and hard to solve:

> How does an agent know what is true, current, relevant, allowed, and safe to act on?

## Start here

- [Memory is not context](./core/memory-is-not-context.md)
- [Which context is allowed to win?](./core/which-context-wins.md)
- [Accountable context](./core/accountable-context.md)
- [Provenance before persistence](./core/provenance-before-persistence.md)
- [Stale context is a production risk](./core/stale-context-is-a-production-risk.md)
- [Permissions are part of memory](./core/permissions-are-part-of-memory.md)
- [Evals for agent context](./core/evals-for-agent-context.md)

## Source

This guide is maintained in public:

- [View source on GitHub](https://github.com/hrvojepavlinovic/trustworthy-agent-memory)

## Concepts

- [Inference](./concepts/inference.md)

## Principles

- Memory without provenance is a liability.
- Stale context is worse than missing context.
- Permissions are part of the memory model, not an integration detail.
- The system should make agents informed before it makes them autonomous.
- Durable memory should be easy for humans to inspect and correct.
- Claims about better agent behavior need evals, not vibes.

## Scope

The current focus is software teams using AI agents and coding assistants.

That includes:

- source control, PRs, reviews, commits, and CI
- tickets, priorities, ownership, and acceptance criteria
- chat decisions and informal team knowledge
- docs, runbooks, ADRs, and onboarding notes
- monitoring, Sentry issues, incidents, and deploy history
- agent instructions such as AGENTS.md, CLAUDE.md, Cursor rules, and Codex skills

## Authorship

Written by Hrvoje Pavlinovic. Maintained through [HILLS Lab](https://hills-lab.hr).
