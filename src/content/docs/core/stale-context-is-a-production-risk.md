---
title: Stale context is a production risk
description: Old tickets, docs, memories, and decisions can make an agent confidently act on a system that no longer exists.
---

Stale context is not just messy documentation.

For an agent, stale context is operational risk.

An old ticket can look specific. A deprecated README can look authoritative. A memory from last month can match the task perfectly. A Slack decision can be newer than all of them but invisible to the retrieval system.

The agent may still produce a clean answer.

That is the dangerous part.

## Why stale context is worse for agents

Humans often notice when context smells old.

They remember the migration. They know the owner changed. They can ask in the team channel. They can see that a doc uses names, services, or constraints that no longer match the current system.

Agents do not get that judgment for free.

If the retrieval layer returns old context with no freshness metadata, the model has to guess. It may trust the most detailed source, the most similar source, or the source that makes the task easiest.

None of those means the source is current.

## Common stale context sources

Stale context usually comes from normal software work:

- tickets changed after the first implementation plan
- docs were not updated after a migration
- a workaround became permanent but was never written down
- an incident changed rollout order
- a feature flag changed meaning
- a code owner decision superseded a design document
- an old memory was never marked deprecated
- a generated summary outlived the source it summarized

None of this is unusual.

That is why the context layer has to treat freshness as a first-class property.

## Freshness is not only timestamp

A timestamp helps, but it is not enough.

Newer is not always better.

A new Slack message may be speculation. An older security policy may still override a current preference. A recent generated summary may be less authoritative than the original incident record.

Freshness needs operational meaning:

- when was this source created?
- when was it last confirmed?
- what system state does it describe?
- what source can supersede it?
- is this claim active, deprecated, or needs review?
- does it apply to this repo, environment, customer, or workflow?

The goal is not to sort sources by date.

The goal is to know whether a claim is safe to use now.

## The failure pattern

The common failure looks like this:

1. The agent receives a task.
2. Retrieval returns a similar old source.
3. The model uses it as if it is still true.
4. The output looks reasonable.
5. The PR, answer, or action is wrong because the system changed.

This is how stale context turns into production risk.

It does not need the model to be weak.

It needs the context layer to be careless.

## What the context layer should do

A reliable context layer should make staleness visible before the agent acts.

Useful signals:

- source age
- last confirmed date
- active/deprecated/needs-review status
- superseded-by links
- owner or source authority
- affected repo, service, customer, or environment
- related incidents, migrations, or rollout notes
- contradiction markers when two sources disagree

The agent should be able to say:

> I found an older source that matches this task, but it may be stale because a newer incident note changed the rollout order.

That is better than a confident answer built on old truth.

## Memory needs expiry pressure

Durable memory should not be assumed true forever.

Some memory is stable:

- team naming conventions
- repo ownership
- preferred review style
- architectural constraints that rarely change

Some memory decays quickly:

- rollout plans
- incident workarounds
- feature flag behavior
- migration state
- customer-specific exceptions
- current priorities

The system should treat these differently.

Fast-decaying memory needs review dates, expiration rules, or a lower default confidence over time.

## Rule

Do not ask only:

> Is this context relevant?

Ask:

> Is this context still safe to use?

Relevance finds matching information.

Freshness decides whether the match should influence the next action.
