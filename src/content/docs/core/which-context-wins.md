---
title: Which context is allowed to win?
description: Retrieval is not enough. Agents need precedence rules when code, tickets, docs, incidents, policies, and memory disagree.
---

Most agent failures in software work will not look dramatic.

They will look like a normal task completed from the wrong context.

A repo still contains an old compatibility layer. A ticket says the billing API is supported. A Slack thread from three weeks later says the team removed it after migration. A design document was never updated. An incident note changed the rollout order.

The agent can retrieve all of this.

That is the problem.

Retrieval does not decide which source should control the next action.

## Context has conflicts

Software teams live with conflicting context:

- code says one thing
- tickets say another
- Slack contains the real decision
- docs are half stale
- incidents create temporary exceptions
- access rules differ between teams

Humans resolve this with operational knowledge. They know who owns the service, which document is dead, which Slack thread was the actual decision, and when to ask before touching production.

Agents do not get that judgment for free.

If the context layer only returns similar text, the model has to infer authority from fragments. It may pick the most recent sentence, the most specific sentence, or the sentence that looks easiest to act on.

None of those is a governance rule.

## Memory is not authority

A memory item can say:

> Use billing API v1 for enterprise customers.

That may have been true when it was stored.

It may still be true for one customer segment. It may be false after a migration. It may be true for read paths but false for new writes. It may be something the agent is allowed to mention but not allowed to act on.

The memory is useful only if it carries operational shape:

- source
- owner
- timestamp
- scope
- confidence
- supersession path
- permission to influence action

Without that, memory is remembered authority with no audit trail.

## The missing primitive is precedence

The context layer needs to answer a practical question:

> When sources disagree, which one is allowed to win?

A production incident may override a stale design document. A code owner decision may override a generated summary. A security policy may override a user preference. A current ticket may override a memory from last month. A private HR document may match the query but still be out of scope for the agent.

This is not a prompt-format problem. It is a control-surface problem.

The agent needs context that is:

- source-backed
- time-aware
- permission-aware
- scoped to the task and actor
- able to mark older claims as superseded
- visible in the trace after the agent acts

## Bigger context windows make this more important

Large context windows help the model see more.

They do not tell it what should matter.

As agents get access to more repositories, tickets, docs, Slack history, deployment records, incidents, and observability data, the central problem shifts from retrieval to governance.

The useful layer is not memory as a pile of notes.

It is context as a governed operational layer.
