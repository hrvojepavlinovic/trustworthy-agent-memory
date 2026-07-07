---
title: Evals for agent context
description: Context systems need tests that measure what the agent used, ignored, cited, and acted on.
---

A context layer should not be judged by vibes.

It should be tested.

The question is not only whether the final answer looks good. The question is whether the agent used the right context, ignored the wrong context, respected permissions, noticed stale claims, and acted within the task boundary.

That is what context evals are for.

## This is not a model benchmark

General model benchmarks ask whether a model can solve a task.

Context evals ask a different question:

> Did this memory and context system make the agent safer and more correct for this workflow?

The model matters, but it is not the whole system.

In software work, the answer depends on:

- what was retrieved
- what was excluded
- which source won when sources disagreed
- whether the source was current
- whether the agent had permission to use it
- whether the output cited or traced the right evidence
- whether the action matched the ticket, repo, environment, and deploy rules

If the eval only scores the final prose, it misses the actual risk.

## What a context eval should catch

Useful evals should expose failures like:

- the agent used an old README instead of a newer incident note
- the agent treated a Slack guess as policy
- the agent generalized a customer exception into a product rule
- the agent used private context in a public answer
- the agent ignored the repo-local instruction file
- the agent cited a summary but not the source behind it
- the agent changed code based on memory when the current code disagreed
- the agent called a tool that the task did not require
- the agent sounded certain when the context was contradictory

These are context failures.

They can happen even when the model is strong.

## A useful test case

A context eval needs more than a prompt and expected answer.

It should define the working set:

- user request
- repo state
- ticket or task
- relevant docs
- irrelevant but tempting docs
- stale sources
- private or restricted sources
- tool outputs
- expected action boundary
- required citations or trace
- forbidden assumptions

Then score behavior against a rubric.

The test should make it possible to say:

> The agent found the right source, noticed the stale source, respected the permission boundary, and made the smallest correct change.

Or:

> The final answer was plausible, but the context path was wrong.

## Score the path, not only the answer

For agent work, the path matters.

A good eval should inspect:

- retrieval: which sources were selected?
- ranking: did authoritative sources beat similar but weak sources?
- exclusion: were restricted or irrelevant sources kept out?
- freshness: did the agent notice old or superseded claims?
- precedence: did policy, code, ticket, and chat decisions resolve correctly?
- trace: can a human see why the agent believed the claim?
- action: did the final code, ticket update, message, or tool call match the allowed scope?

The trace is not decoration.

It is how the system proves the answer came from the right evidence.

## Start with small harnesses

The first harness does not need to be complex.

A useful starting point:

1. Create ten realistic software tasks.
2. For each task, include one correct source, one stale source, one tempting irrelevant source, and one permission-sensitive source.
3. Run the same task with the same model and different context strategies.
4. Record what context was retrieved, quoted, summarized, ignored, and used for action.
5. Score the result manually before automating the rubric.

This is enough to find real failures.

Automation can come later.

## Example scenarios

Good context eval scenarios are boring and realistic:

- a deprecated setup doc conflicts with current CI
- a ticket changed acceptance criteria after the first implementation plan
- an incident note changed deploy order for one service
- a security policy overrides a convenience preference
- a customer exception applies only to one account
- a generated summary dropped the caveat from the original thread
- the current code contradicts a remembered architecture note
- the agent has access to private context but the output is public
- the right answer is to ask for clarification instead of acting

These scenarios test whether the memory layer is operationally useful.

They are better than abstract prompts.

## What to measure

Useful metrics:

- source coverage
- citation validity
- stale source rejection
- permission compliance
- precedence correctness
- contradiction handling
- unnecessary tool use
- action correctness
- uncertainty calibration
- human correction rate

Do not optimize only for retrieving more context.

More context can make the agent worse if the ranking, permissions, and freshness rules are weak.

## Rule

Do not ask only:

> Was the final answer correct?

Ask:

> Did the agent use the right context for the right reason, and act only as far as that context allowed?

That is the eval that matters for trustworthy agent memory.
