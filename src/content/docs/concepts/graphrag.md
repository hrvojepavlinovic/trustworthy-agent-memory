---
title: GraphRAG
description: GraphRAG combines retrieval with a graph of entities and relationships so an agent can follow connections, not only similarity.
---

GraphRAG means retrieval augmented generation with a graph.

Regular RAG usually retrieves chunks of text that look relevant to a query.

GraphRAG adds a graph of entities and relationships.

That lets the system follow connections between people, services, tickets, incidents, documents, code areas, customers, decisions, and events.

## Simple version

Vector search asks:

> What text is similar to this question?

Graph traversal asks:

> What is connected to this thing?

GraphRAG uses both.

It can find similar text, then walk relationships to find related context that may not use the same words.

## Example

Question:

> Why did this service change its deploy process?

Vector search may find docs that mention "deploy process".

GraphRAG can also follow relationships:

- service -> incident
- incident -> rollback decision
- rollback decision -> deploy runbook update
- deploy runbook -> owning team
- owning team -> related PR

The answer can include the actual chain of evidence, not only the nearest text chunk.

## What the graph contains

A graph is made of nodes and edges.

Nodes are things:

- repo
- service
- file
- ticket
- PR
- incident
- person
- team
- customer
- decision
- document

Edges are relationships:

- owns
- mentions
- changed by
- supersedes
- caused by
- blocked by
- approved by
- applies to
- depends on
- belongs to

Those relationships are often the missing part of context retrieval.

## Why it matters for agent memory

Agent memory is not only a pile of notes.

Software work is relational.

A bug belongs to a service. A service has owners. A deploy rule changed because of an incident. A ticket superseded an old plan. A customer exception applies only to one account. A PR changed a file that changed a runbook.

GraphRAG can help the agent move through those relationships.

That is useful when the right context is connected, but not textually similar.

## GraphRAG can still be wrong

A graph does not make context automatically trustworthy.

The graph can be stale.

Edges can be inferred incorrectly.

The system may connect things that only look related.

Permissions can leak through relationships.

Example:

> This customer note is connected to the incident, and the incident is connected to the public runbook.

That does not mean the customer note can be used in public docs.

Graph traversal needs the same provenance, freshness, and permission rules as any other memory layer.

## Direct edges vs inferred edges

Some edges are direct:

- PR `#912` modified `deploy.md`
- incident `INC-48` links to ticket `PLAT-221`
- team `Platform` owns service `api-gateway`

Some edges are inferred:

- this team seems responsible
- this ticket looks related
- this doc probably supersedes that note

Those should not have the same authority.

The graph should mark whether an edge is direct, extracted, inferred, or human-confirmed.

## Useful GraphRAG questions

GraphRAG is useful for questions like:

- what decisions led to this current behavior?
- which incidents changed this runbook?
- who owns the services touched by this PR?
- what tickets and docs are connected to this error?
- which old assumptions are superseded by newer sources?
- what context is connected to this customer, but not allowed in public output?

These are relationship questions.

Pure similarity search is often weak at them.

## Rule

Do not ask only:

> What text is similar?

Ask:

> What sources, entities, and decisions are connected, and are those connections trustworthy?

GraphRAG is useful when relationships matter.

The graph still needs provenance, freshness, permissions, and review.
