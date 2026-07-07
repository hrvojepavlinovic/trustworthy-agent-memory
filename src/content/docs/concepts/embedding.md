---
title: Embedding
description: An embedding is a numeric representation that lets a system compare pieces of text by meaning.
---

An embedding is a way to turn text into numbers.

Those numbers are useful because they let a system compare meaning.

If two pieces of text are about similar things, their embeddings should usually be close to each other.

That is why embeddings are often used for retrieval.

## Simple version

Take a sentence:

> Production deploys require two approvals.

An embedding model converts it into a vector: a long list of numbers.

The numbers are not meant for humans to read.

They are coordinates the system can use to ask:

> Which other pieces of text are close to this?

Close usually means semantically similar.

## What embeddings are good for

Embeddings are useful when exact keyword search is not enough.

Example query:

> How do we release this service safely?

Relevant sources may not use the exact word "release". They may say:

- deploy
- rollout
- production change
- shipping process
- approval flow

Embeddings can find related sources even when the words are different.

That makes them useful for:

- semantic search
- finding related docs
- retrieving examples
- grouping similar tickets
- detecting duplicate issues
- building a first pass context set for an agent

## What embeddings do not prove

Embedding similarity does not mean a source is true.

It does not mean the source is current.

It does not mean the agent has permission to use it.

It does not mean the source is authoritative.

It only means the source is similar in the embedding space.

That is a candidate signal, not a final decision.

## Common failure

The common failure is treating the nearest result as the best context.

Example:

1. The agent asks about deploy rules.
2. Vector search returns an old deploy README because it is semantically close.
3. A newer incident note changed the actual deploy process.
4. The agent uses the old README because it ranked higher by similarity.

The embedding search worked.

The context system failed.

## Embeddings need metadata

For trustworthy memory, an embedded chunk should not be just text plus vector.

It also needs metadata:

- source
- created date
- last confirmed date
- owner
- scope
- permissions
- status
- source type
- supersession links

The vector helps find candidates.

The metadata helps decide whether a candidate should be used.

## Embeddings and chunking

Systems usually embed chunks, not whole repositories or whole companies.

A chunk might be a paragraph, a ticket comment, a code symbol, a doc section, or a summarized claim.

Chunking matters.

If the chunk is too small, it may lose the caveat.

If the chunk is too large, it may match for the wrong reason.

The embedding is only as useful as the text unit being embedded.

## Rule

Do not ask only:

> Which result is closest?

Ask:

> Is the closest result allowed, current, scoped, and authoritative enough to use?

Embeddings find candidates.

They do not decide trust.
