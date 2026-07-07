---
title: Inference
description: Inference is when a model uses its learned patterns and the current context to produce an output.
---

Inference is the moment a model is used.

You give the model input. The model produces output.

That output can be an answer, a summary, a tool call, a code edit, a classification, or a next step.

The important part:

> During inference, the model is not learning new weights. It is using what it already learned, plus the context you gave it now.

## Simple version

Training is how the model gets its general ability.

Inference is when you ask the trained model to do something.

Memory and context are what you give the model during inference so it can answer for this specific task.

Example:

- training: the model learned general programming patterns
- context: the current repo, ticket, docs, and error logs
- inference: the model uses that context to suggest the next code change

## Inference is not memory

Inference can use memory, but it is not the same thing as memory.

Memory is stored information.

Inference is computation over input.

If the model says:

> This team seems to prefer small PRs.

That may be an inference from review comments, merged PRs, or written guidelines.

It is not automatically a fact.

The memory layer should not store it as policy unless there is supporting evidence.

## Direct facts vs inferred claims

Direct fact:

> The deploy runbook says production deploys require two approvals.

Inferred claim:

> This team is cautious about production deploys.

Both can be useful.

They should not have the same status.

The direct fact can point to the runbook. The inferred claim should point to the signals that caused the inference, carry lower confidence, and be easy to correct.

## Why this matters for agent memory

Agents often turn context into new claims.

That can be useful:

- extracting decisions from a meeting
- summarizing a long incident
- noticing repeated review feedback
- detecting that two docs disagree
- guessing which owner is likely responsible

But inferred memory is risky if it looks like observed truth.

The system should mark whether a memory item is:

- directly observed
- summarized from sources
- inferred from patterns
- guessed because evidence was incomplete

Those are different levels of authority.

## Rule

Do not ask only:

> What did the model say?

Ask:

> Was this directly observed, or did the model infer it?

Inference is useful.

Trustworthy memory keeps inferred claims visibly separate from facts.
