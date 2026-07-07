---
title: Permissions are part of memory
description: A memory item is not safe unless the system knows who can use it, where it can go, and what action it is allowed to influence.
---

Memory is not just stored text.

Memory carries permission.

If an agent remembers something it is not allowed to use for this actor, task, tool, or action, the memory system becomes a leak. It may not look like one. The agent may never quote the sensitive source directly. It may only let the memory influence a recommendation, a code change, a customer answer, or a tool call.

That is still use.

## Memory can leak without looking like a leak

A context leak is not always a pasted secret.

Common failures are quieter:

- a private customer note influences a generic product answer
- an internal incident detail shapes a public status update
- a team preference is treated like company policy
- a security exception for one environment is applied to another
- a support conversation becomes training context for unrelated work
- a personal preference is reused in a team workflow

The agent may produce a polished answer with no obvious sensitive text.

The failure is that restricted context changed the output.

## Permission has dimensions

Permission is not one boolean.

A useful memory item should separate:

- who can read it
- who can act on it
- which workspace, repo, team, customer, or environment it applies to
- which tools can receive it
- whether it can be quoted, summarized, or only used as hidden context
- whether it can influence code, deploys, tickets, emails, or public answers
- whether it expires, needs review, or is blocked from long-term persistence

Without those dimensions, the agent only knows that context exists.

It does not know what it is allowed to do because of that context.

## Retrieval permission is not enough

Checking access at retrieval time helps, but it is not sufficient.

Memory moves.

It gets summarized. It gets merged into task packets. It gets copied into durable notes. It gets used to choose tools. It gets turned into "what the agent knows" for a future task.

If permission does not travel with the memory item, the system can accidentally launder restricted context into a less restricted layer.

Example:

1. A user has access to a private incident note.
2. The agent summarizes it into a general project memory.
3. Another user retrieves that project memory later.
4. The original restriction is gone, but the sensitive claim still influences the answer.

The leak happened during compression.

Not during retrieval.

## Permission should travel with the claim

A memory item should carry enough permission shape to survive movement through the system.

Useful fields:

- source visibility
- actor scope
- task scope
- tool scope
- action scope
- allowed output forms
- persistence status
- expiry or review date
- audit trail
- supersession rule

This does not need to be heavy for every note.

But the system needs a way to say:

> This claim can help private analysis for this repo, but it cannot be used in public docs, customer email, or deploy automation without a confirming source.

That is the difference between useful memory and uncontrolled context.

## Permissions affect ranking

Permission should influence retrieval and ranking.

The best semantic match is not always the best context to use.

A weaker but allowed source may be safer than a perfect restricted source. A public runbook may be better than a private Slack message. A current policy may override a remembered exception.

The retrieval layer should prefer context that is:

- allowed for the actor
- allowed for the task
- allowed for the target tool or output
- scoped to the right environment
- current enough to act on
- backed by a source that can be cited or checked

Similarity is not authority.

Permission is part of authority.

## Rule

Do not ask only:

> Can the agent read this?

Ask:

> What is the agent allowed to do because it knows this?

Read access decides whether context can enter the system.

Permission-aware memory decides whether that context can safely influence action.
