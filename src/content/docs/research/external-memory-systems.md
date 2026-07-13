---
title: External memory systems
description: A practical map of Mem0, Letta, LangGraph, Graphiti, Zep, and Cognee, based on the responsibilities they actually own.
---

Last checked: 2026-07-13.

"Agent memory" is not one product category.

The same label is used for persisted runtime state, editable prompt blocks, extracted user facts, vector retrieval, temporal knowledge graphs, and ingestion pipelines. Comparing tools without separating those responsibilities produces a misleading feature checklist.

This note maps six representative systems by what they actually own. It is not a ranking.

## Short map

| System    | Primary abstraction                           | What it owns                                                                   | Main boundary                                                            |
| --------- | --------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| LangGraph | checkpoints and namespaced stores             | thread state and application-defined long-term records                         | the application defines memory semantics                                 |
| Letta     | memory blocks, files, archival memory         | agent-managed in-context and retrieved memory                                  | external organizational truth and policy remain outside                  |
| Mem0      | extracted memory records and search           | fact extraction, storage, retrieval, and record lifecycle                      | source truth and authorization must be supplied by the application       |
| Graphiti  | temporal context graph                        | episodes, entities, facts, validity windows, and hybrid retrieval              | user management, governance, and production operations are separate      |
| Zep       | managed context graph infrastructure          | ingestion, temporal graph maintenance, context assembly, and hosted governance | it is a managed context service, not the canonical business system       |
| Cognee    | relational, vector, and graph memory pipeline | document processing, graph construction, semantic and graph retrieval          | application workflow, acceptance policy, and source ACLs remain separate |

These systems can overlap, but they start from different problems.

## LangGraph: memory as application state

LangGraph separates two scopes:

- short-term state is persisted per thread through checkpoints
- long-term records live in a store under custom namespaces

Long-term items are JSON documents addressed by a namespace and key. Stores can add semantic indexing, and persistent implementations include Postgres, Redis, and MongoDB.

LangGraph also distinguishes semantic, episodic, and procedural memory, and documents both hot-path and background writes. These are design patterns, not an imposed memory policy.

This makes LangGraph a useful control plane when the application should decide:

- what becomes memory
- which schema it uses
- when it is written
- how it is corrected
- which retrieval method runs

The tradeoff is that contradiction handling, provenance, approval, and source permission propagation are application work. A namespace is a useful scope key. It is not automatically an authorization model.

## Letta: memory inside the agent loop

Letta's central abstraction is the memory block: a labeled, size-limited value inserted directly into the model context. Blocks persist across interactions and can be edited by the agent through memory tools.

The current hierarchy also includes:

- files that can be opened and searched
- archival memory retrieved through tools
- external databases exposed through custom tools or MCP

This gives the system an explicit answer to context placement. Important compact state stays visible; larger or lower-priority material is retrieved.

Blocks can be shared across agents and marked read-only. Read-only protects a block from agent writes, but it does not prove that every agent attached to the block should see every source fact inside it. Concurrent block changes also use last-write-wins replacement, so shared writable blocks need application-level coordination.

Letta is strongest when memory itself should be an agent capability. It is less opinionated about synchronizing facts from GitHub, Slack, tickets, monitoring, and other canonical systems.

## Mem0: extracted facts and retrieval

Mem0 accepts conversations or facts, extracts memories with an LLM by default, stores them, and exposes search and record-management APIs. Memories can be scoped with identifiers such as user, agent, app, and run, plus custom metadata.

Its current public surface has two write semantics that should not be confused:

- the V3 additive pipeline uses single-pass `ADD`-only extraction and does not automatically update or delete existing records
- explicit APIs still support update, delete, filters, and history for individual memory records

Older or generic documentation also describes an inference path that checks duplicates and contradictions. The exact behavior therefore depends on the API generation and deployment being used. Pin the version and test the write path instead of relying on the general product description.

The current retrieval direction combines semantic, keyword, and entity signals. Mem0 also offers optional graph memory, timestamps, metadata filters, and retrieval-time decay.

This is a practical fit for user and agent personalization. For software-team context, an identifier or metadata filter is not enough by itself. Source URL, observed time, tenant, project, visibility, and permission evidence still need to enter the memory record and be enforced before retrieval.

## Graphiti and Zep: temporal facts

Graphiti models memory as a temporal context graph:

- episodes preserve ingested source material
- entities represent people, systems, documents, and other objects
- relationship edges hold extracted facts
- validity windows record when a fact was true and when it was invalidated

Retrieval can combine semantic similarity, keyword search, and graph traversal. New episodes are integrated incrementally, and old facts can remain available as history instead of being overwritten.

This is the clearest fit in this group for questions where relationships and changing truth both matter. It also has the strongest explicit provenance primitive: derived facts trace back to episodes.

Graphiti is the open-source engine. The application still owns users, conversations, authorization, operations, and context assembly. Zep packages the temporal graph model as managed infrastructure with users, threads, retrieval, and hosted governance.

Temporal validity is not the same as source authorization. A graph can correctly know when a fact was true and still leak it to the wrong user if visibility is not carried into nodes, edges, episodes, and queries.

## Cognee: a multi-store memory pipeline

Cognee uses three storage roles:

- a relational store for documents, chunks, and provenance
- a vector store for semantic similarity
- a graph store for entities and relationships

Its current high-level operations are `remember`, `recall`, `improve`, and `forget`. Underneath them, tasks and pipelines transform input into structured data points and graph state.

Cognee is closer to a configurable data-to-memory pipeline than a simple memory CRUD API. It is useful when document ingestion, graph construction, and multiple retrieval methods should arrive together.

The operational consequence is more moving parts. The relational, vector, and graph states must remain consistent, and any application using source-system data still needs explicit rules for authorization, accepted truth, corrections, and deletion.

## Storage type is not memory policy

The underlying database changes which queries are easy. It does not decide what should be believed.

Common substrate choices:

- relational plus vector, usually Postgres with a vector extension, for canonical records, metadata filters, transactions, and semantic search
- dedicated vector stores for high-volume nearest-neighbor retrieval
- graph databases for relationship traversal and ontology-aware queries
- temporal graphs for current and historical facts with validity windows
- hybrid graph, vector, and full-text databases such as HelixDB for multiple retrieval modes in one engine
- incremental transformation engines such as CocoIndex for keeping derived stores synchronized

A trustworthy system can use more than one. The clean boundary is usually:

```txt
source systems and canonical data
              |
       ingest and reconciliation
              |
 proposed memory + provenance + visibility
              |
      human or policy acceptance
              |
 relational / vector / graph read models
              |
 permission filter + retrieval + reranking
              |
         agent context packet
```

No database removes the need for the acceptance and permission steps.

## What the comparison exposes

### Scope is not authorization

User IDs, thread IDs, namespaces, group IDs, and datasets help partition data. They become security boundaries only when every write and read is authorized against a trusted identity and the original source restrictions are preserved.

### History is not provenance

A record history can show that memory text changed. Provenance answers a different question: which source event supports each claim, who could see it, when it was observed, and which transformation produced it.

### Contradiction handling is a product decision

The systems use different models:

- overwrite mutable state
- append a new memory
- update or delete a record
- invalidate an old temporal fact
- leave resolution to application code

None is universally correct. A changed coffee preference can replace old state. An incident conclusion, legal record, or architecture decision may need the old claim, new claim, source evidence, and explicit supersession relation.

### Retrieval quality is only one eval dimension

LoCoMo and LongMemEval-style benchmarks are useful for recall and question answering. A software-team context layer also needs tests for:

- cross-project and cross-user leakage
- stale facts after source edits and deletions
- conflicting Slack, ticket, documentation, and code claims
- unsupported answers without source evidence
- malicious or accidental memory writes
- incorrect tool actions caused by retrieved memory
- recovery after a bad extraction or index rebuild

## Practical starting point

For a software team, start with the source and policy model before choosing a memory product.

1. Keep GitHub, Linear or Jira, Slack, Sentry, and primary databases canonical.
2. Normalize source events into records with stable IDs, timestamps, content hashes, project scope, visibility, and source links.
3. Store extracted claims as proposed memory rather than accepted truth.
4. Preserve corrections, conflicts, and supersession instead of silently rewriting history.
5. Build one or more read models for keyword, vector, and graph retrieval.
6. Filter by authorization before semantic ranking and context assembly.
7. Evaluate the agent task, not only retrieval recall.

Then choose the component that removes the most real work:

- LangGraph for explicit orchestration and state primitives
- Letta for agent-managed in-context memory
- Mem0 for a packaged extraction and personalization layer
- Graphiti for self-hosted temporal graph construction
- Zep for managed temporal context infrastructure
- Cognee for a configurable multi-store memory pipeline
- CocoIndex for incremental synchronization underneath these read models
- HelixDB when hybrid graph, vector, and full-text queries justify a newer database

## Current position

There is no complete trustworthy memory layer in this set.

Each system solves a real section of the stack. The missing integration work is consistent across them: canonical truth, source-aware permissions, reviewable writes, contradiction policy, claim-level provenance, and task-level evals.

For the current guide, the most useful reference architecture is still a mature canonical store plus explicit policy and provenance, with specialized memory, graph, vector, and incremental-processing components added where measured tasks justify them.

## Primary sources

- [LangGraph memory overview](https://docs.langchain.com/oss/python/concepts/memory)
- [LangGraph long-term memory](https://docs.langchain.com/oss/python/langchain/long-term-memory)
- [Letta memory blocks](https://docs.letta.com/guides/core-concepts/memory/memory-blocks)
- [Letta context hierarchy](https://docs.letta.com/guides/core-concepts/memory/context-hierarchy)
- [Mem0 repository](https://github.com/mem0ai/mem0)
- [Mem0 add memory](https://docs.mem0.ai/core-concepts/memory-operations/add)
- [Mem0 V3 add API](https://docs.mem0.ai/api-reference/memory/add-memories)
- [Mem0 update memory](https://docs.mem0.ai/core-concepts/memory-operations/update)
- [Graphiti repository](https://github.com/getzep/graphiti)
- [Zep concepts](https://help.getzep.com/concepts)
- [Zep temporal graph paper](https://arxiv.org/abs/2501.13956)
- [Cognee concepts](https://docs.cognee.ai/core-concepts/overview)
