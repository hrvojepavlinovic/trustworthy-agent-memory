---
title: Agent trace
description: An agent trace is the record of what the agent saw, decided, called, and changed.
---

An agent trace is the record of an agent run.

It shows what context the agent received, which tools it called, what results came back, and what action it took.

For trustworthy agent memory, the trace is not decoration.

It is how humans inspect why the agent believed something.

## Simple version

An answer tells you what the agent produced.

A trace tells you how it got there.

Useful traces answer:

- what did the agent see?
- which sources were retrieved?
- which source was treated as authoritative?
- which tool calls happened?
- what did the tools return?
- what was ignored?
- what action was taken?
- what permission checks applied?

Without that record, debugging an agent becomes guesswork.

## Why traces matter

Agents can fail in ways that look correct from the outside.

The final answer may be clean, but the path may be wrong:

- it used stale context
- it ignored the current runbook
- it treated a Slack guess as policy
- it used private context in a public answer
- it changed code from memory instead of current source
- it called a write tool without enough evidence

The trace is how those failures become visible.

## What a trace should include

A useful trace should capture:

- user request
- instructions that affected the run
- retrieved context
- source metadata
- ranking or selection decisions
- tool calls and arguments
- tool results
- permission decisions
- human approvals
- final output or action
- links to changed artifacts

The trace does not need to expose every token.

It needs to expose the operational path.

## Trace vs log

A log is usually a stream of events.

A trace should explain a run.

Logs may say:

> Called search tool. Returned 12 results.

A better trace says:

> Retrieved 12 deploy-related sources. Selected the current deploy runbook because it was active, owned by platform, and newer than the README. Excluded one private customer note from public docs output.

That is the level humans need to audit context behavior.

## Traces and memory

When an agent writes durable memory, the trace should link the memory back to the run that created it.

That matters because memory can be wrong.

If a stored claim later causes a bad answer, the system should be able to show:

- which task created the claim
- which sources supported it
- whether it was direct or inferred
- who approved it
- what scope and permissions it had
- what can supersede it

Memory without a trace becomes hard to correct.

## Traces and evals

Agent evals need traces.

If an eval only sees the final answer, it cannot tell whether the context system worked.

The trace lets the eval score:

- source coverage
- stale source rejection
- permission compliance
- tool use
- contradiction handling
- citation validity
- action boundaries

This is how evals move from subjective review to system evidence.

## What not to store

A trace should not become an uncontrolled dump of secrets.

It should preserve enough evidence to audit the run while respecting data boundaries.

That may mean storing:

- source identifiers instead of full private text
- hashes or summaries for sensitive payloads
- redacted tool outputs
- permission labels
- links to systems of record

The trace itself needs permissions.

## Rule

Do not ask only:

> What did the agent answer?

Ask:

> Can we inspect why it answered that way?

An agent trace turns behavior into something reviewable.
