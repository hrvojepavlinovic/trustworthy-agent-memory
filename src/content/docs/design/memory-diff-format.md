---
title: Memory diff format
description: A reviewable format for proposing memory changes from PRs, tickets, incidents, and decisions.
---

A source event should not write directly to durable memory.

It should produce a memory diff: a reviewable proposal that shows what would be added, replaced, deprecated, revalidated, or marked as conflicting.

The event is evidence. The diff is a proposal. Accepted memory is the resulting state.

## Format

```yaml
version: "0.1"
id: mdiff_01K_example
created_at: 2026-07-10T12:00:00Z

scope:
  kind: repository
  id: github:example/docs

trigger:
  kind: pull_request
  uri: github:example/docs/pull/42
  state: merged
  observed_at: 2026-07-10T11:55:00Z

basis:
  - uri: github:example/docs/pull/42
    role: primary
  - uri: github:example/docs/commit/abc123
    role: supporting

summary: Public guide links now use generated site routes instead of Markdown source paths.

changes:
  - id: change_01
    operation: add
    reason: The merged change establishes a repository-wide routing rule.
    item:
      id: mem_pending_route_rule
      claim: Public guide links use generated site routes, not Markdown source paths.
      type: project_fact
      scope:
        kind: repository
        id: github:example/docs
      source:
        kind: pull_request
        uri: github:example/docs/pull/42
        observed_at: 2026-07-10T11:55:00Z
      visibility:
        level: public
      freshness:
        status: current
        last_verified_at: 2026-07-10T11:55:00Z
      review:
        status: proposed

ignored_candidates:
  - claim: The changed link is on line 34.
    reason: Line numbers are implementation details and will drift.

review:
  status: pending
  decisions:
    change_01: pending
  reviewed_by: null
  reviewed_at: null

application:
  status: not_applied
  applied_at: null
```

The `item` follows the [memory item schema](/design/memory-item-schema/). A diff should include the complete proposed item for `add` and `supersede`, not an unexplained text patch.

## Operations

Every change has an `id`, `operation`, and `reason`.

| Operation       | Required fields                          | Effect                                                        |
| --------------- | ---------------------------------------- | ------------------------------------------------------------- |
| `add`           | `item`                                   | Creates a proposed memory item                                |
| `supersede`     | `target_id`, replacement `item`          | Replaces a claim without erasing its history                  |
| `deprecate`     | `target_id`, `source`                    | Marks an item as no longer valid or useful                    |
| `revalidate`    | `target_id`, `source`, `freshness`       | Confirms a claim is still current without changing the claim  |
| `flag_conflict` | `target_ids`, `source`, `conflict_notes` | Preserves disagreement until precedence or review resolves it |

There is no generic `update` operation. It would hide whether a claim changed, expired, or was replaced.

There is also no `delete` operation. Privacy deletion and retention enforcement are separate workflows and should leave an audit record appropriate to their policy.

## Source events

| Trigger  | Minimum primary source                   | Typical durable change                         |
| -------- | ---------------------------------------- | ---------------------------------------------- |
| PR       | Merged PR and resulting commit           | Architecture, workflow, or repository rule     |
| Ticket   | Accepted ticket revision or transition   | Requirement, ownership, or acceptance criteria |
| Incident | Resolved timeline or reviewed postmortem | Failure mode, warning, or recovery procedure   |
| Decision | Approved ADR or attributable record      | Chosen option, scope, and constraints          |

A chat message saying "we should" is not an accepted decision. An open PR is not proof that its implementation reached the default branch. An incident hypothesis is not a confirmed failure mode.

The trigger state matters.

## Review and application

Memory diffs are pending by default.

Review happens per change, not only per diff. A reviewer may accept one proposal and reject another.

Before application:

- re-read the primary source
- confirm that the trigger reached the required state
- check that scope did not broaden
- preserve or narrow source visibility
- check for existing items about the same claim
- use `supersede` or `flag_conflict` instead of overwriting history
- reject implementation details that are unlikely to remain useful

Applying a diff should record the reviewer, time, accepted change IDs, and resulting memory item IDs.

## Empty diffs are valid

Most source events should not change durable memory.

```yaml
version: "0.1"
id: mdiff_01K_empty
trigger:
  kind: pull_request
  uri: github:example/service/pull/91
changes: []
ignored_candidates:
  - claim: A local variable was renamed.
    reason: No durable behavior, decision, or operating rule changed.
review:
  status: not_required
application:
  status: no_changes
```

An empty diff records that the event was considered without polluting memory.

## Validation rules

Reject a memory diff if:

- it has no trigger or primary source
- the trigger state is too weak for the proposed claim
- an `add` or `supersede` operation has no complete memory item
- a `supersede`, `deprecate`, or `revalidate` operation has no target
- visibility is broader than the source
- a conflict is resolved without evidence or review
- the diff is already applied but has no application record
- generated summaries are cited without the underlying source

## Rule

A memory diff should make three things obvious:

1. What changed in the world?
2. What memory state is being proposed because of it?
3. Who or what is allowed to approve that transition?

If the diff cannot answer all three, it is not ready to apply.
