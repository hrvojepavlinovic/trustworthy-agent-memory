---
title: Permission leakage test
description: A deterministic test of no filtering, filtering after ranking, and filtering before ranking on mixed-scope context.
---

Date: 2026-07-13.

Permission filtering should happen before retrieval scoring, reranking, summarization, or model input.

This experiment tests that claim with a small mixed-context dataset and visible canary values.

## Question

What changes when the same query runs through three pipelines?

1. No permission filter.
2. Rank all records, keep `top_k`, then filter.
3. Filter first, then rank allowed records.

The second pipeline may look safe because restricted records do not reach the final result. It is still unsafe if the scorer or reranker has already processed them.

## Dataset

The actor belongs to:

- `org:acme`
- `team:platform`
- `project:checkout`

The dataset contains nine records:

- public runbook
- Acme organization policy
- Platform team decision
- Checkout project incident
- restricted note explicitly shared with the actor
- another user's private note
- Finance team note
- Payroll project note
- one malformed record with no visibility metadata

The three unauthorized but well-formed records contain unique markers:

```txt
CANARY_PRIVATE_ALICE_7Q9
CANARY_TEAM_FINANCE_4K2
CANARY_PROJECT_PAYROLL_8M3
```

Their text is deliberately a perfect lexical match for the query. The allowed records are useful but slightly weaker matches. This forces the permission boundary to compete with relevance ranking.

The malformed record must fail closed.

## Harness

The test uses a deterministic lexical scorer rather than an embedding model or LLM. That keeps the experiment about ordering and data exposure, not model quality.

The harness records every item passed to the scorer as well as the final `top_k` output. It asserts:

- missing visibility is denied
- the unfiltered pipeline leaks restricted records and canaries
- filtering after `top_k` prevents direct output leakage but still exposes records to the scorer
- forbidden high-ranking records consume result capacity in the post-filter pipeline
- filtering before ranking keeps forbidden records out of both scorer input and output
- the secure pipeline still returns the requested number of allowed records

Run it with:

```sh
node experiments/permission-leakage/run.mjs
```

## Result

| Pipeline                    | Scorer saw forbidden records | Output contains forbidden records | Records returned | Output canaries |
| --------------------------- | ---------------------------- | --------------------------------- | ---------------- | --------------- |
| No filter                   | Yes                          | Yes                               | 4                | 3               |
| Rank, truncate, then filter | Yes                          | No                                | 0                | 0               |
| Filter, then rank           | No                           | No                                | 4                | 0               |

All assertions passed.

`rank then filter` avoided direct output leakage in this fixture, but all forbidden records entered the scorer. Because the four best lexical matches were forbidden, truncation happened before authorization and the pipeline returned no context at all.

`filter then rank` kept forbidden records outside the scorer and filled the result set with four allowed records.

## What this proves

Authorization is a candidate-generation constraint, not a final formatting step.

Filtering after a vector search, cross-encoder, hosted reranker, or LLM summarizer is already too late if that component is not authorized to receive the source data.

Filtering after `top_k` also creates an availability failure: forbidden results can crowd out weaker but valid context.

## What this does not prove

This is a deterministic unit-level test. It does not test:

- source-system ACL synchronization
- nested groups or role inheritance
- changes to access after indexing
- permission-aware caches
- summaries derived from mixed-visibility inputs
- side channels in scores, logs, traces, or embeddings
- whether allowed context can still cause an unsafe action

Those require integration tests with a real identity provider, retrieval backend, and source connector.

## Production rule

A production retrieval path should be shaped like this:

```txt
trusted actor identity
        |
candidate query constrained by authorized scopes
        |
permission check on source-derived records
        |
scoring and reranking
        |
context assembly
        |
output and action policy
```

Unknown visibility should fail closed. Permission changes should invalidate cached and derived context. Every trace should show which policy admitted each source without copying restricted content into less restricted logs.

## Source

The executable harness is in [`experiments/permission-leakage/run.mjs`](https://github.com/hrvojepavlinovic/trustworthy-agent-memory/blob/main/experiments/permission-leakage/run.mjs).
