---
title: Eval harness
description: An eval harness is the repeatable setup that runs test tasks, captures behavior, and scores whether the system did the right thing.
---

An eval harness is the machinery around an eval.

It runs the same test cases in a repeatable way, captures what happened, and makes the result comparable.

Without a harness, an eval is usually just someone trying a prompt and deciding whether the answer felt good.

That is not enough for agent context systems.

## Simple version

An eval is the test.

An eval harness is the test runner.

For agent memory, the harness should run a task with a defined set of context, then record:

- what the agent saw
- what it retrieved
- what it ignored
- what tools it called
- what sources it cited
- what action it took
- whether the result matched the rubric

The point is repeatability.

If the context layer changes, the harness should make it clear whether behavior improved or regressed.

## What the harness contains

A useful harness usually has:

- test cases
- input prompts or tasks
- fixed source material
- expected behavior
- forbidden behavior
- scoring rules
- trace capture
- model and tool configuration
- output reports

For this guide, the important part is not fancy automation.

The important part is making context behavior inspectable.

## Example

Task:

> Update the deploy docs for this service.

Fixture:

- current repo files
- old README
- current deploy runbook
- recent incident note
- private customer note that must not influence public docs

Expected behavior:

- use the current runbook
- notice that the README is stale
- avoid using the private customer note
- cite the runbook or incident note
- make only the docs change requested

The harness runs the task and records whether the agent did that.

## Score more than the final answer

For agent context, the harness should score the path.

A final answer can look correct while the context path is wrong.

Good scoring checks:

- did retrieval include the right source?
- did ranking prefer authority over similarity?
- did the agent reject stale context?
- did it respect permissions?
- did it cite real sources?
- did it avoid unnecessary tools?
- did it stay inside the requested action boundary?

That turns an anecdote into evidence.

## Manual first

The first harness can be a spreadsheet or a Markdown table.

Start with ten realistic tasks.

For each task, write:

- the task
- the allowed context
- the tempting wrong context
- the expected behavior
- the failure modes
- the actual trace
- the score

Automation is useful after the rubric is clear.

Automating a vague eval only makes vague results faster.

## Why this matters

Agent memory systems change over time.

You may change the retriever, the ranking rules, the permission model, the summarizer, the memory schema, or the model itself.

The harness is how you know whether those changes helped.

Without it, every improvement is a story.

With it, you can compare runs.

## Rule

Do not ask only:

> Did this demo work once?

Ask:

> Can we run the same task again and see exactly what changed?

That is what an eval harness gives you.
