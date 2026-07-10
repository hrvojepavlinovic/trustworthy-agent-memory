---
title: Memory item schema
description: A minimal schema for storing agent memory without losing source, scope, freshness, visibility, or review state.
---

A memory item is not just text the model may reuse.

It is a claim with boundaries.

The smallest useful memory item should answer:

- what is being claimed?
- where did it come from?
- who is allowed to use it?
- when was it last checked?
- what can override it?
- who accepted it as durable memory?

If those questions are not stored with the memory, the system has a note, not a trustworthy memory layer.

## Minimal schema

```json
{
  "id": "mem_01JZ_example",
  "claim": "This repository uses pnpm and Astro/Starlight for the guide site.",
  "type": "project_fact",
  "scope": {
    "kind": "repository",
    "id": "github:hrvojepavlinovic/trustworthy-agent-memory"
  },
  "source": {
    "kind": "file",
    "uri": "github:hrvojepavlinovic/trustworthy-agent-memory/blob/main/package.json",
    "observed_at": "2026-07-08T12:00:00Z",
    "evidence": ["packageManager", "dependencies.@astrojs/starlight"]
  },
  "visibility": {
    "level": "public",
    "allowed_principals": ["repo:public"]
  },
  "freshness": {
    "status": "current",
    "last_verified_at": "2026-07-08T12:00:00Z",
    "expires_at": null,
    "verification_method": "read_source_file"
  },
  "confidence": {
    "level": "high",
    "reason": "Directly observed in repository source."
  },
  "review": {
    "status": "accepted",
    "reviewed_by": "human",
    "reviewed_at": "2026-07-08T12:05:00Z"
  },
  "conflicts": [],
  "allowed_uses": ["answer_questions", "plan_changes", "prepare_context"],
  "prohibited_uses": ["skip_verification_before_deploy"],
  "supersedes": [],
  "superseded_by": null
}
```

## Fields

`id`

A stable identifier. Do not use the claim text as the identifier.

`claim`

The smallest statement that may be reused. Keep it narrow. If one sentence contains two facts, split it.

`type`

The kind of memory. Useful starter values:

- `project_fact`
- `team_preference`
- `user_preference`
- `decision`
- `incident_lesson`
- `runbook_step`
- `domain_rule`
- `integration_capability`
- `known_failure_mode`

`scope`

Where the claim is valid. A memory can be true for one repository, one team, one customer, one environment, or one user and false elsewhere.

Examples:

- one repository
- one organization
- one Slack channel
- one Linear team
- one production service
- one user
- one time-bounded incident

`source`

The evidence behind the claim. Store enough to let a human or tool re-check it.

Good sources:

- file path and commit
- PR discussion
- issue or ticket
- runbook section
- incident timeline
- Slack permalink
- Sentry issue
- deployment event
- user correction

Weak sources:

- model summary without citation
- old chat with no permalink
- memory imported from another tool without provenance
- "everyone knows this"

`visibility`

Who may see or use the memory. Visibility is not a UI concern. It is part of the memory item.

Examples:

- public
- user-private
- team-private
- customer-specific
- production-only
- security-sensitive

`freshness`

Whether the memory is current, stale, expired, unknown, or needs revalidation.

The field should distinguish:

- `current`: verified recently enough for its use
- `stale`: probably old, but not proven false
- `expired`: must not be used
- `unknown`: imported or generated without enough recency evidence
- `needs_review`: blocked until checked

`confidence`

How strongly the system should believe the claim. Confidence should come from evidence, not model tone.

`review`

Whether a human or trusted process accepted the memory.

Useful statuses:

- `proposed`
- `accepted`
- `rejected`
- `needs_review`
- `deprecated`

`conflicts`

Known contradictions. Do not hide them.

If Slack says one thing and the repo says another, the memory item should say that, not silently pick a winner.

`allowed_uses`

What the agent may use this memory for.

Examples:

- answer questions
- prepare context
- plan a change
- draft a PR
- choose test commands
- explain historical decisions

`prohibited_uses`

What the agent must not use the memory for without fresh verification.

Examples:

- deploy
- change permissions
- delete data
- modify billing
- skip tests
- claim compliance

`supersedes` and `superseded_by`

Memory should have history. Replacing a memory item should not erase why the old one existed.

## Status model

A simple lifecycle is enough:

1. `proposed`: extracted from a source, not trusted yet.
2. `accepted`: approved for normal use in its scope.
3. `needs_review`: still visible, but blocked for action.
4. `deprecated`: replaced or no longer useful.
5. `rejected`: known wrong and should not be used.

Do not jump straight from generated extraction to durable memory unless the source is strong and the allowed use is low-risk.

## Validation rules

A memory item should fail validation if:

- it has no source
- it has no scope
- it has no visibility
- it has no review status
- it claims broad truth from narrow evidence
- it has an expired freshness state but is still allowed for action
- it has conflicts but no conflict note
- it allows high-risk actions without recent verification

## Example: bad memory

```json
{
  "claim": "Use pnpm here.",
  "source": "previous chat"
}
```

This is not enough.

It has no scope, no review state, no freshness, no visibility, and no source that can be re-checked.

## Example: better memory

```json
{
  "claim": "Use pnpm for this repository.",
  "type": "project_fact",
  "scope": {
    "kind": "repository",
    "id": "github:hrvojepavlinovic/trustworthy-agent-memory"
  },
  "source": {
    "kind": "file",
    "uri": "github:hrvojepavlinovic/trustworthy-agent-memory/blob/main/package.json",
    "observed_at": "2026-07-08T12:00:00Z"
  },
  "visibility": {
    "level": "public"
  },
  "freshness": {
    "status": "current",
    "last_verified_at": "2026-07-08T12:00:00Z"
  },
  "review": {
    "status": "accepted"
  },
  "allowed_uses": ["choose_local_commands", "prepare_context"],
  "prohibited_uses": ["skip_package_manager_verification_forever"]
}
```

This is still small, but it can be audited.

## Design rule

Store memory as a claim plus its operating constraints.

The model can read prose.

The system needs fields.

Changes to accepted memory should arrive as reviewable [memory diffs](/design/memory-diff-format/), not silent overwrites.
