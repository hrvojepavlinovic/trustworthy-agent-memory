---
title: Provenance before persistence
description: Do not store agent memory until the system knows where the claim came from, what it applies to, and how it can be replaced.
---

Do not persist a memory item before provenance is clear.

If the system stores a claim without a source, it has created a future bug.

The model may repeat it. Another agent may retrieve it. A human may assume it came from somewhere real. Later, when the claim is wrong, there is no clean way to inspect, correct, or supersede it.

That is not memory. It is folklore with an API.

## What provenance means

Provenance is the path from a stored claim back to the evidence that created it.

For agent memory, a useful memory item should answer:

- which source created this claim?
- when was it observed?
- who or what owns it?
- which repo, team, customer, environment, or workflow does it apply to?
- is it a direct fact, a summary, or an inference?
- what newer source can override it?

Without those answers, the system should be careful about making the claim durable.

## Example

Bad memory:

> Billing API v1 is still used for enterprise customers.

Better memory:

> Billing API v1 is still used for enterprise customer read paths.

Attached provenance:

- source: Linear ticket `BILL-1842`
- supporting source: PR `#912`
- observed at: `2026-07-03`
- scope: `billing-service`, enterprise customers, read paths
- owner: billing team
- status: active
- supersession rule: any billing migration decision after `2026-07-03` wins
- action permission: mention in analysis, do not create new write-path code from this memory alone

The second version is longer, but it is safer.

It tells the agent what the memory can and cannot do.

## Summaries are not sources

A summary can be useful, but it should not become the source of truth.

If an agent summarizes a Slack thread, the memory should still point to the thread. If it summarizes an incident, it should point to the incident record. If it summarizes a PR, it should point to the PR and commit range.

The summary is a compression layer.

The source is the thing that can be checked.

## Inference needs a different status

Some memory is not directly observed.

Example:

> The team prefers small PRs.

That may be true, but it is usually inferred from review comments, merged PR size, or explicit team feedback.

Inferred memory should be marked as inferred. It should carry lower confidence than a direct source. It should be easier to correct.

Do not let inferred preferences look like policy.

## Persistence rule

Before a claim becomes durable memory, ask:

- can the source be opened?
- is the scope narrow enough?
- is the claim still current?
- is the permission clear?
- can a newer source supersede it?
- can a human correct it later?

If the answer is no, keep it as temporary context.

## The useful default

Persist less.

Persist better.

Memory should not be a place where agents throw useful-sounding text.

It should be a small set of claims with source, scope, status, and a path to correction.
