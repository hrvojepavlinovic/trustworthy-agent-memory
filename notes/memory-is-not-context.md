# Memory is not context

Memory is something an agent keeps.

Context is everything it needs to understand the current situation.

Those are not the same thing.

## Memory

Memory is durable. It survives between sessions.

Examples:

- this repo deploys through GitHub Actions
- production runs on Hetzner
- this team prefers small PRs
- this feature flag controls checkout
- this service has a known timeout issue

Memory is useful when it is stable, sourced, scoped, and still true.

It is dangerous when it is vague, old, private in the wrong scope, or impossible to trace back to a source.

## Context

Context is the working set for a specific task.

Examples:

- the ticket being worked on
- the current diff
- recent commits
- the failing CI run
- the Sentry issue
- the Slack thread where the decision happened
- the relevant docs and runbooks
- the production environment being touched

Context can include memory, but it also includes live state and task-specific evidence.

## The failure mode

Bad agent systems treat memory as a magic bucket.

They save facts, retrieve similar text, and hope the model sorts it out.

That is not enough for software work.

Software context changes constantly. Tickets get rewritten. Docs rot. Incidents supersede assumptions. Deploy rules change. Teams make decisions in Slack and never update the README.

If the agent cannot tell what is current, what is sourced, what is allowed, and what is relevant to this task, memory can make it more confident and less correct.

## The useful distinction

Memory answers:

- what do we believe is worth keeping?
- who or what does it apply to?
- where did it come from?
- is it still active?

Context answers:

- what is happening now?
- what sources matter for this task?
- what changed recently?
- what is safe to use?
- what does the agent need before acting?

## My current rule

Do not persist something just because it was useful once.

Persist it when it is likely to matter again, has a source, has a scope, and can be corrected later.

Everything else should stay as task context.

## Open question

The hard part is not storage.

The hard part is deciding what becomes memory, what stays temporary context, and how the system proves the difference.
