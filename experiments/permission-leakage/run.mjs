import assert from "node:assert/strict";

const actor = {
  id: "user:john",
  organizations: ["org:acme"],
  teams: ["team:platform"],
  projects: ["project:checkout"],
};

const query = "checkout production incident rollback owner";
const topK = 4;

const records = [
  {
    id: "private-alice",
    text: `${query} CANARY_PRIVATE_ALICE_7Q9`,
    visibility: { level: "private", owner: "user:alice" },
  },
  {
    id: "team-finance",
    text: `${query} CANARY_TEAM_FINANCE_4K2`,
    visibility: { level: "team", scope: "team:finance" },
  },
  {
    id: "project-payroll",
    text: `${query} CANARY_PROJECT_PAYROLL_8M3`,
    visibility: { level: "project", scope: "project:payroll" },
  },
  {
    id: "missing-visibility",
    text: query,
  },
  {
    id: "public-runbook",
    text: "Checkout production rollback runbook and owner rotation.",
    visibility: { level: "public" },
  },
  {
    id: "platform-decision",
    text: "Platform decision for checkout production rollback approval.",
    visibility: { level: "team", scope: "team:platform" },
  },
  {
    id: "checkout-incident",
    text: "Checkout incident rollback owner and timeline.",
    visibility: { level: "project", scope: "project:checkout" },
  },
  {
    id: "acme-policy",
    text: "Acme production incident owner policy.",
    visibility: { level: "organization", scope: "org:acme" },
  },
  {
    id: "john-restricted-note",
    text: "Restricted checkout incident rollback note.",
    visibility: {
      level: "restricted",
      allowedPrincipals: ["user:john"],
    },
  },
];

function canRead(record, principal) {
  const visibility = record.visibility;

  if (!visibility?.level) return false;

  switch (visibility.level) {
    case "public":
      return true;
    case "private":
      return visibility.owner === principal.id;
    case "organization":
      return principal.organizations.includes(visibility.scope);
    case "team":
      return principal.teams.includes(visibility.scope);
    case "project":
      return principal.projects.includes(visibility.scope);
    case "restricted":
      return visibility.allowedPrincipals?.includes(principal.id) ?? false;
    default:
      return false;
  }
}

function lexicalScore(text, input) {
  const terms = new Set(input.toLowerCase().split(/\s+/));
  const words = new Set(text.toLowerCase().split(/\s+/));
  return [...terms].filter((term) => words.has(term)).length;
}

function rank(input, candidates, trace) {
  trace.scorerInputIds.push(...candidates.map((record) => record.id));

  return candidates
    .map((record) => ({
      ...record,
      score: lexicalScore(record.text, input),
    }))
    .sort((left, right) =>
      right.score === left.score
        ? left.id.localeCompare(right.id)
        : right.score - left.score,
    );
}

function summarize(name, trace, output) {
  const scorerRecords = trace.scorerInputIds.map((id) =>
    records.find((record) => record.id === id),
  );
  const forbiddenInScorer = scorerRecords.filter(
    (record) => !canRead(record, actor),
  );
  const forbiddenInOutput = output.filter((record) => !canRead(record, actor));
  const outputCanaries = output.flatMap((record) =>
    record.text.match(/CANARY_[A-Z0-9_]+/g) ?? [],
  );

  return {
    pipeline: name,
    scorerSawForbidden: forbiddenInScorer.length > 0,
    outputContainsForbidden: forbiddenInOutput.length > 0,
    returned: output.length,
    outputCanaries,
  };
}

function run(name) {
  const trace = { scorerInputIds: [] };
  let output;

  if (name === "no-filter") {
    output = rank(query, records, trace).slice(0, topK);
  } else if (name === "rank-then-filter") {
    output = rank(query, records, trace)
      .slice(0, topK)
      .filter((record) => canRead(record, actor));
  } else if (name === "filter-then-rank") {
    const allowed = records.filter((record) => canRead(record, actor));
    output = rank(query, allowed, trace).slice(0, topK);
  } else {
    throw new Error(`Unknown pipeline: ${name}`);
  }

  return summarize(name, trace, output);
}

const results = [
  run("no-filter"),
  run("rank-then-filter"),
  run("filter-then-rank"),
];

const [noFilter, rankThenFilter, filterThenRank] = results;

assert.equal(canRead(records.find((record) => record.id === "missing-visibility"), actor), false);
assert.equal(noFilter.outputContainsForbidden, true);
assert.ok(noFilter.outputCanaries.length > 0);
assert.equal(rankThenFilter.scorerSawForbidden, true);
assert.equal(rankThenFilter.outputContainsForbidden, false);
assert.ok(rankThenFilter.returned < topK);
assert.equal(filterThenRank.scorerSawForbidden, false);
assert.equal(filterThenRank.outputContainsForbidden, false);
assert.equal(filterThenRank.returned, topK);
assert.deepEqual(filterThenRank.outputCanaries, []);

console.table(results);
console.log("\nAll permission leakage assertions passed.");
