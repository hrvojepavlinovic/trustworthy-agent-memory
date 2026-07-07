---
title: Context window
description: The context window is the amount of input a model can consider during one run.
---

The context window is what the model can see at once.

It includes the user request, system instructions, developer instructions, retrieved docs, tool outputs, chat history, code snippets, and any other text packed into the current model call.

If something is outside the context window, the model cannot use it directly in that run.

## Simple version

The context window is the model's working desk.

You can put documents on the desk.

The model can work with what is on the desk.

But the desk has limited space, and putting more paper on it does not guarantee better work.

## Bigger is not automatically better

A larger context window helps because the system can include more material.

But more context can also make the agent worse.

Common problems:

- important sources are buried under weak sources
- stale docs sit next to current docs with no warning
- private context is packed into a public task
- summaries lose caveats from the original source
- the model sees conflicting claims but no precedence rule
- too many examples distract from the specific task
- tool output crowds out the actual user request

The issue is not only how much context fits.

The issue is what deserves to be there.

## Context packing

Context packing is the step where the system decides what enters the context window.

A good pack should include:

- the task
- relevant instructions
- selected sources
- source labels
- timestamps or freshness markers
- permission notes
- contradictions
- tool outputs
- enough surrounding text to preserve meaning

A bad pack is just a pile of text.

The model may still answer confidently, but the evidence path is weak.

## Context window vs memory

Memory is stored outside the current run.

The context window is what gets loaded into the current run.

A memory item only helps if it is retrieved, allowed, packed, and understood.

That means memory quality is not enough.

The system also needs good retrieval, reranking, packing, and source labels.

## What can go wrong

The context window can fail in several ways:

- missing context: the right source was not included
- crowded context: the right source was included but buried
- unsafe context: restricted information was included
- stale context: old information was included without status
- ungrounded context: summaries were included without sources
- conflicting context: disagreement was included without a rule for which source wins

These are system failures, not only model failures.

## The model does not know what was omitted

If the system gives the model three documents, the model may reason as if those are the relevant documents.

It usually does not know that a newer runbook, incident note, or ticket comment was left out.

This is why agents need to expose context gaps.

For high-risk tasks, the agent should be able to say:

> I only have the old README and one ticket. I do not have the current deploy runbook.

That is better than pretending the packed context is complete.

## Rule

Do not ask only:

> Can it fit in the context window?

Ask:

> Should it be in the context window, and what warning should travel with it?

A large context window gives space.

A trustworthy context layer decides what belongs there.
