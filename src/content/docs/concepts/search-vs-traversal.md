---
title: Vector search vs full-text search vs graph traversal
description: Vector search finds similar meaning, full-text search finds exact words, and graph traversal follows relationships.
---

Vector search, full-text search, and graph traversal answer different questions.

They are often grouped together as "retrieval", but they are not interchangeable.

A trustworthy context layer should know what each one is good at.

## Simple version

Full-text search asks:

> Which sources contain these exact words?

Vector search asks:

> Which sources are similar in meaning?

Graph traversal asks:

> Which sources are connected to this thing?

Good agent context systems usually combine all three.

## Full-text search

Full-text search is best when exact words matter.

Useful for:

- file names
- function names
- ticket IDs
- PR numbers
- error codes
- customer names
- exact policy phrases
- config keys
- log messages

Example:

> Find every mention of `DEPLOY_FREEZE`.

Full-text search is the right starting point.

It should not be replaced by vector search.

## Vector search

Vector search is best when meaning matters more than exact wording.

Useful for:

- finding related docs
- finding similar incidents
- matching a natural-language question to source material
- finding examples that use different words
- grouping similar tickets or issues

Example:

> How do we release this service safely?

Relevant sources may say "deploy", "rollout", "production change", or "approval flow".

Vector search can find those even when the query uses different words.

## Graph traversal

Graph traversal is best when relationships matter.

Useful for:

- finding owners
- walking from service to incident to decision
- finding which PR changed a runbook
- finding tickets connected to a customer
- finding dependencies between services
- finding what superseded an old plan

Example:

> Which decisions led to the current deploy process?

The answer may require following links between incidents, tickets, PRs, docs, and teams.

That is graph work.

## Side by side

Same question:

> Why did this deploy rule change?

Full-text search can find sources containing "deploy rule".

Vector search can find semantically similar sources about release process, approvals, or rollout policy.

Graph traversal can follow:

- deploy rule -> runbook
- runbook -> incident
- incident -> decision
- decision -> PR
- PR -> owning team

Each method sees a different part of the truth.

## Common mistake

The common mistake is using one retrieval method for every job.

Vector search alone may miss exact identifiers.

Full-text search alone may miss related sources with different wording.

Graph traversal alone may follow stale or wrong relationships.

The issue is not which method is best.

The issue is whether the system knows which signal should dominate for this task.

## Metadata still matters

None of these methods decide trust by themselves.

A result can be:

- similar but stale
- exact but deprecated
- connected but private
- recent but speculative
- authoritative but scoped to a different environment

Retrieval should be followed by filtering and reranking using metadata:

- source
- owner
- freshness
- status
- scope
- permissions
- source type
- supersession links

Search finds candidates.

Metadata decides whether candidates are safe to use.

## A useful pattern

For many agent tasks:

1. Use full-text search for exact identifiers.
2. Use vector search for related meaning.
3. Use graph traversal for connected entities and decisions.
4. Filter by permission, scope, freshness, and source authority.
5. Pack the final context with labels and warnings.

This is slower than a single search call.

It is also much more likely to produce context that can be trusted.

## Rule

Do not ask only:

> Which retrieval method should we use?

Ask:

> What kind of evidence does this task need: exact words, similar meaning, relationships, or all three?

Reliable agent context is usually hybrid.
