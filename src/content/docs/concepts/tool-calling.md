---
title: Tool calling
description: Tool calling is how a model asks the surrounding system to run an external action or lookup.
---

Tool calling is how a model uses the outside world.

The model does not directly open GitHub, read a database, send an email, or deploy code.

It proposes a tool call.

The surrounding system decides whether to run it.

## Simple version

A tool is a capability exposed to the model.

Examples:

- search files
- read a ticket
- query logs
- create a branch
- post a comment
- send an email
- run a test
- deploy a service

The model chooses a tool name and arguments.

The runtime executes the tool and returns the result back into the context window.

## Tool calls are actions

Tool calls are not just text.

Some tools only read.

Some tools change state.

That difference matters.

Reading a Sentry issue is not the same as resolving it. Reading a PR is not the same as merging it. Drafting an email is not the same as sending it.

A trustworthy agent system should treat those as different permission levels.

## The model should not be the only guardrail

The model can decide that a tool call seems useful.

But the runtime should enforce:

- which tools are available
- which actor is making the request
- which workspace or repo the tool can access
- whether the tool is read-only or write-capable
- whether the action needs confirmation
- whether the action should be logged
- whether the output can be shown or reused

Do not rely only on the model to remember these rules.

The system boundary should enforce them.

## Tool output becomes context

A tool result is not just a side effect.

It becomes new context for the model.

That means tool output needs the same discipline as retrieved memory:

- source
- timestamp
- scope
- permissions
- freshness
- whether it is partial
- whether it can be persisted

If a tool returns a private customer note, the next model step must still know that it is private.

Permission must travel with the result.

## Common failure

A common failure looks like this:

1. The agent has a vague task.
2. It calls a broad search tool.
3. The tool returns mixed public, private, stale, and current results.
4. The model uses the most convenient result.
5. The final answer looks reasonable, but the context boundary was wrong.

The failure is not only the tool call.

The failure is that the system did not classify, filter, or label the result.

## Read tools and write tools

Tool calling should distinguish read and write.

Read tools answer questions:

- search docs
- inspect code
- fetch logs
- read a ticket

Write tools change the world:

- create a PR
- update a ticket
- send a message
- resolve an incident
- deploy code

Write tools need stronger rules.

For many workflows, the useful default is:

> read freely, draft changes, require explicit confirmation before external writes.

## Tool traces

Every important tool call should leave a trace.

A useful trace records:

- tool name
- arguments
- actor
- time
- result summary
- permission decision
- whether the action was read-only or write-capable
- whether a human approved it

Without a trace, the system cannot explain why the agent believed or changed something.

## Rule

Do not ask only:

> Can the model call tools?

Ask:

> Which tools can it call, under which permissions, and what trace does each call leave?

Tool calling makes agents useful.

It also turns context mistakes into real actions.
