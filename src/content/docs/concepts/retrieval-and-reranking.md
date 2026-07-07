---
title: Retrieval and reranking
description: Retrieval finds candidate context. Reranking decides which candidates are worth showing to the model.
---

Retrieval is how an agent finds possible context for a task.

Reranking is how the system decides which retrieved items should matter most.

They are related, but they are not the same thing.

## Simple version

Retrieval asks:

> What might be relevant?

Reranking asks:

> Of those candidates, what should the agent actually use first?

Retrieval is usually broad.

Reranking should be stricter.

## Why retrieval exists

The model cannot read everything every time.

A software team may have:

- repos
- tickets
- docs
- Slack threads
- incident notes
- runbooks
- PRs
- deploy logs
- monitoring issues

Retrieval selects a smaller working set from that larger world.

The goal is not to retrieve everything.

The goal is to retrieve enough of the right context for the task.

## Common retrieval methods

Retrieval can use different signals:

- keyword search
- vector search
- graph traversal
- metadata filters
- recent activity
- repo ownership
- ticket links
- file references
- explicit user-provided context

Most real systems need more than one signal.

Vector search may find similar text. Keyword search may find exact names. Graph traversal may find related owners, incidents, or tickets. Metadata filters may remove sources the agent is not allowed to use.

## What reranking does

Retrieval often returns too many candidates.

Some are similar but stale. Some are related but not authoritative. Some are private. Some are true for a different repo, customer, or environment.

Reranking should reorder or filter candidates using stronger criteria:

- source authority
- freshness
- scope match
- permission match
- directness of evidence
- relation to the current task
- contradiction with newer sources
- whether the source can be cited

The best semantic match is not always the safest context.

## Example

Task:

> Update the production deploy instructions.

Retrieved candidates:

- old README section about deploys
- current deploy runbook
- recent incident note about rollback order
- Slack thread guessing about future deploy changes
- private customer escalation note

Reranking should prefer:

1. current deploy runbook
2. recent incident note
3. old README only as stale context to inspect

It should not treat the Slack guess as policy.

It should not use the private customer note for public docs.

## Retrieval can fail quietly

A bad retrieval system may return context that looks useful.

That is dangerous because the model may produce a confident answer from the wrong working set.

Common failures:

- missing the current source
- retrieving only similar sources
- ignoring exact identifiers
- returning stale docs
- mixing customer-specific context into general work
- retrieving private sources for public output
- losing the source behind a summary
- packing too much context and hiding the important item

The final answer may still sound reasonable.

The context path is wrong.

## Reranking is not magic

Reranking can improve candidate order, but it cannot fix missing evidence.

If retrieval never finds the current runbook, reranking cannot select it.

If metadata is missing, reranking cannot know what is stale, private, scoped, or authoritative.

Good reranking depends on good source metadata.

## Context packing

After retrieval and reranking, the system still has to decide what enters the model context window.

That step is context packing.

A good pack should include:

- the strongest sources
- source labels
- freshness/status signals
- permission notes
- contradictions or caveats
- enough surrounding text to avoid misreading the chunk

Packing is where many systems lose important warnings.

## Rule

Do not ask only:

> Did retrieval find something similar?

Ask:

> Did the system choose the right context, in the right order, with the right warnings?

Retrieval finds candidates.

Reranking decides what deserves attention.
