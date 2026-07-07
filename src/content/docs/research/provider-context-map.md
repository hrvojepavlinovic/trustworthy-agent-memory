---
title: Provider context map
description: A public-surface map of how major AI tools expose memory, project context, connectors, and instructions.
---

This maps the public product surface.

It is not a claim about private internal implementation.

Evaluation question:

> Where does each tool keep context, who can inspect it, what can override it, and what proves it is still true?

Last checked: 2026-07-07.

## Short read

Most tools now expose the same rough layers:

- long-lived personal memory
- project or repository context
- static instructions
- codebase search or uploaded knowledge
- connectors into external systems
- some form of action approval

The weak point is still accountability.

Some systems cite retrieved docs or chats. Some validate stored facts against current code. Some let users view and delete memories. But none of the public surfaces fully solve provenance, freshness, permissions, contradiction handling, and evals as one coherent memory layer.

## ChatGPT

Public surface:

- saved memories
- reference chat history
- projects with chats, files, project instructions, shared access, and project memory
- apps/connectors, including custom apps built with MCP-backed tools

Memory shape:

ChatGPT has saved memories and chat-history-based personalization. Saved memories are managed separately from chat history and can be viewed, deleted, or disabled by the user. Project instructions apply inside a project and override global custom instructions.

Project context:

Projects can contain files, instructions, chats, saved responses, and app-linked sources such as Google Drive files or Slack channels where supported. Working inside a project gives ChatGPT a bounded context space for that work.

Connectors:

Apps can read information and, depending on app configuration, take actions in connected services. App permissions control when ChatGPT asks before using an app. Changing app permission does not expand the underlying service access.

Useful properties:

- clear user controls for saved memories
- project-scoped context
- admin controls for app permissions in workspaces
- action approval model for connected services

Open questions:

- how project memory chooses among conflicting project sources
- how stale project sources are detected
- how much provenance survives when a memory is synthesized

Sources:

- [Memory FAQ](https://help.openai.com/en/articles/8590148-memory-faq)
- [Projects in ChatGPT](https://help.openai.com/en/articles/10169521-projects-in-chatgpt)
- [Apps in ChatGPT](https://help.openai.com/en/articles/11487775-connectors-in-chatgpt)

## Claude

Public surface:

- chat search
- memory summary from chat history
- project memory and project summary
- project knowledge and project instructions
- RAG for larger project knowledge
- connectors through Claude, Claude Desktop, Claude Code, and the API via MCP
- Claude Code memory through `CLAUDE.md` and auto memory

Memory shape:

Claude can search past chats using RAG and can generate memory from chat history. Standalone memory summaries exclude chats inside projects. Each project has its own memory space and project summary.

Project context:

Projects are self-contained workspaces with chat history, uploaded knowledge, project instructions, and sharing controls. When project knowledge approaches context limits, Claude can switch to RAG and retrieve relevant information instead of loading all project content into context.

Connectors:

Connectors let Claude access apps, retrieve data, and take actions in connected services. Claude inherits the user's permissions from the source service. Team and Enterprise owners can restrict connector actions.

Claude Code:

Claude Code has `CLAUDE.md` and auto memory. Its docs explicitly say these are loaded as context, not enforced configuration. If an action must be blocked, it needs a hook or another enforcement layer.

Useful properties:

- explicit split between standalone memory and project memory
- project RAG is documented as retrieval from uploaded project knowledge
- connector permissions inherit from source systems
- Claude Code is clear that memory is context, not enforcement

Open questions:

- how project memory handles contradictions inside project knowledge
- how connector results are ranked against uploaded project files
- how much of the generated memory summary is traceable to source chats

Sources:

- [Claude chat search and memory](https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context)
- [Claude projects](https://support.claude.com/en/articles/9517075-what-are-projects)
- [RAG for Claude projects](https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects)
- [Claude connectors](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities)
- [Claude Code memory](https://code.claude.com/docs/en/memory)

## Cursor

Public surface:

- user rules
- project rules in `.cursor/rules`
- team rules
- `AGENTS.md`
- codebase search
- MCP servers

Memory shape:

Cursor's documented context surface is mostly instruction and retrieval oriented: rules, project rules, team rules, `AGENTS.md`, codebase search, and MCP. The public docs expose where persistent guidance lives more clearly than they expose an auditable memory ledger.

Project context:

Project rules live in the repository and can be scoped by file patterns. `AGENTS.md` is also supported as an agent instruction file. Codebase search gives the agent a retrieval layer over the repo instead of relying only on manually supplied files.

Connectors:

MCP connects Cursor to external tools and data sources.

Useful properties:

- project rules are repo-local and reviewable
- `AGENTS.md` support helps avoid one-tool-only instructions
- codebase search and MCP are separate from static rules

Open questions:

- how generated or learned memories are represented, edited, exported, and cited
- how team rules, project rules, user rules, and retrieved code resolve conflicts
- how stale indexed code or docs are surfaced to the user

Sources:

- [Cursor rules](https://cursor.com/docs/rules)
- [Cursor semantic and agentic search](https://cursor.com/docs/agent/tools/search)
- [Cursor MCP](https://cursor.com/docs/mcp)

## Codex

Public surface:

- `AGENTS.md`
- generated memories
- per-thread memory controls
- local memory files under `~/.codex/memories/`
- integrations such as GitHub, Slack, and Linear
- MCP, skills, hooks, and config

Memory shape:

Codex separates required team guidance from generated recall. `AGENTS.md` is the checked-in or user-level instruction layer. Memories are generated local state that can carry stable preferences, recurring workflows, tech stacks, project conventions, and known pitfalls across threads.

Instruction hierarchy:

Codex reads `AGENTS.md` once per run. It starts at global scope, then walks from the project root down to the working directory. More specific files appear later in the combined prompt and can override earlier guidance.

Generated memory:

Codex memories are off by default in some regions and can be enabled in settings or config. After enablement, Codex can turn eligible prior threads into local memory files. It skips active or short-lived sessions, redacts secrets from generated memory fields, and updates memories in the background.

Useful properties:

- clear split between checked-in guidance and generated memory
- local files can be inspected
- config exposes memory use and memory generation controls
- docs warn not to treat generated memory as the only source for required rules

Open questions:

- how teams should share durable learned context without relying on one user's local memories
- how generated memories should be reviewed before becoming project guidance
- how memory interacts with external-context sources such as MCP and web search

Sources:

- [Codex AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- [Codex memories](https://developers.openai.com/codex/memories)

## GitHub Copilot

Public surface:

- Copilot Memory
- repository custom instructions
- `AGENTS.md`, `CLAUDE.md`, and `GEMINI.md` support for agent instructions
- Copilot cloud agent
- Copilot code review
- Copilot CLI
- agent skills
- MCP across major Copilot surfaces

Memory shape:

Copilot Memory stores repository-level facts and user-level preferences. Repository facts can include conventions, architectural decisions, build commands, and project-specific rules. User preferences apply only to that user's Copilot interactions across repositories.

The notable design choice is validation: repository-level facts are stored with citations to supporting code, and Copilot checks those citations against the current branch before using a fact.

Project context:

Copilot cloud agent can research a repository, plan, make branch changes, run checks in an ephemeral GitHub Actions-powered development environment, and prepare a PR. Repository custom instructions can live in `.github/copilot-instructions.md`, path-specific `.github/instructions/*.instructions.md`, or agent instruction files such as `AGENTS.md`.

Connectors:

MCP is supported across Copilot IDE usage, Copilot CLI, the Copilot app, Copilot cloud agent, and Copilot code review. Repository-level MCP configuration applies to cloud agent and code review on GitHub.com.

Useful properties:

- repository memory is separated from user preference memory
- repository facts are scoped to the repository
- stored repository facts have citations and current-branch validation
- custom instructions have documented repository-wide and path-specific forms

Open questions:

- how memory facts are proposed, accepted, and corrected in larger teams
- how conflicts are handled between custom instructions, AGENTS.md, and repository memory
- how much memory behavior is visible in PR review artifacts

Sources:

- [Copilot Memory](https://docs.github.com/en/copilot/concepts/agents/copilot-memory)
- [Managing Copilot Memory](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/copilot-memory/manage-for-yourself)
- [Repository custom instructions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions)
- [Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent)
- [Copilot MCP](https://docs.github.com/en/copilot/concepts/context/mcp)

## Pattern

The tools are converging on the same shape:

1. Static instructions for stable rules.
2. Retrieval for large or changing knowledge.
3. Generated memory for recurring preferences and facts.
4. Connectors for external state.
5. Approval controls for side effects.

That is not yet a trustworthy memory layer.

A trustworthy layer still needs explicit records for:

- source
- scope
- owner
- permissions
- freshness
- confidence
- contradiction state
- last validation
- allowed use
- review status

Without those fields, memory remains useful but hard to audit.

## Practical takeaways

For real software teams:

- Put required rules in repo-local files, not only in generated memory.
- Keep generated memory inspectable and correctable.
- Treat connector output as live context, not durable truth.
- Store citations for durable facts.
- Revalidate facts against current code, tickets, docs, or incidents before use.
- Keep permissions attached to the memory item, not only to the connector.
- Evaluate whether memory improved task outcomes, not whether answers sound more confident.
