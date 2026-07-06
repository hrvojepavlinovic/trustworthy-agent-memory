---
title: Accountable context
description: The useful layer is not memory, RAG, or MCP alone. It is source-backed, permission-aware, traceable context.
---

The useful direction in agent infrastructure is not bigger memory.

It is accountable context.

Agents are getting easier to connect to tools, but harder to trust unless the context layer is explicit.

The same pattern shows up in memory, permissions, evals, and observability.

## 1. Memory is becoming structured state

The old shape was simple:

1. store chunks
2. search chunks
3. paste the best chunks into the prompt

That is not enough for agents that act over time.

Memory needs source, scope, time, status, and replacement rules. A memory item should not pretend to be the source of truth. It should point back to the source and carry enough metadata for the system to decide whether it is still usable.

The practical shape is closer to structured state than remembered text.

## 2. Permission is part of context

Agents do not only read context.

They use it to decide which tools to call.

That makes permissions part of the context system. Least privilege, audit logs, error handling, rate limits, and authorization are not deployment details. They decide what context the agent is allowed to use and what actions it is allowed to take.

A context item should carry permission semantics with it.

If the agent is not allowed to use a fact, call a tool, or combine two sources, that needs to be represented before the model reasons over it.

## 3. Evals need traces

Static eval sets still matter, but agents fail inside trajectories.

The failure can be:

- a stale memory read
- a wrong tool argument
- an unnecessary handoff
- a loop
- a final answer that looks fine while the path was unsafe

For software work, the eval target should not only be:

> Did the answer look right?

It should also ask:

- which source did the agent rely on?
- was the source allowed?
- was it fresh?
- did another source supersede it?
- can the path be replayed?

## 4. Teams keep reconstructing context by hand

The user complaint is simple:

- context is scattered across repos, tickets, docs, Slack, incidents, and decisions
- every AI tool asks the user to rebuild it manually
- memory helps only if the agent knows what is current and allowed
- enforcement cannot be delegated to a remembered sentence

This is why "just add memory" is not enough.

The system has to know what the memory means operationally.

## 5. The real layer is not memory, RAG, or MCP alone

Each part is useful. None is sufficient by itself.

Memory without provenance becomes folklore.

RAG without permissions leaks context.

MCP without authorization turns integration into an attack surface.

Evals without traces miss the actual failure.

Observability without source freshness records a wrong path in detail.

The useful layer is accountable context:

- source-backed
- time-aware
- permission-aware
- scoped to the task, user, team, and repo
- visible through the agent trace
- testable through evals
- able to replace old decisions with newer ones

That is the infrastructure needed before agents get more autonomy in daily work.

## References

- [OpenAI Cookbook: Context Engineering for Personalization](https://developers.openai.com/cookbook/examples/agents_sdk/context_personalization)
- [OpenAI Chronicle](https://developers.openai.com/codex/memories/chronicle)
- [Zep: Agent memory at enterprise scale](https://zep.ai/)
- [AWS: Security best practices for tool integration](https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-frameworks/security-best-practices-for-tool-integration.html)
- [AWS Agentic AI Lens: Tool integration strategies](https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentops04-bp02.html)
- [MCP Security Best Practices](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices)
- [MLflow: What is agent observability?](https://mlflow.org/articles/what-is-agent-observability-a-2026-developer-guide/)
- [Datadog: Evaluation frameworks with agent observability](https://www.datadoghq.com/blog/using-evaluation-frameworks-with-agent-observability/)
- [Braintrust: Agent observability and memory tracing](https://www.braintrust.dev/articles/agent-observability-tracing-tool-calls-memory)
