import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://guide.hills-lab.hr",
  integrations: [
    starlight({
      title: "Trustworthy Agent Memory",
      description:
        "A guide to memory and context layers for AI agents.",
      editLink: {
        baseUrl:
          "https://github.com/hrvojepavlinovic/trustworthy-agent-memory/edit/main/",
      },
      components: {
        SocialIcons: "./src/components/SocialIcons.astro",
      },
      sidebar: [
        {
          label: "Start Here",
          items: [
            { label: "Overview", slug: "index" },
            {
              label: "Memory is not context",
              slug: "core/memory-is-not-context",
            },
            {
              label: "Which context wins",
              slug: "core/which-context-wins",
            },
            {
              label: "Accountable context",
              slug: "core/accountable-context",
            },
            {
              label: "Provenance before persistence",
              slug: "core/provenance-before-persistence",
            },
            {
              label: "Stale context is a production risk",
              slug: "core/stale-context-is-a-production-risk",
            },
            {
              label: "Permissions are part of memory",
              slug: "core/permissions-are-part-of-memory",
            },
            {
              label: "Evals for agent context",
              slug: "core/evals-for-agent-context",
            },
          ],
        },
        {
          label: "About",
          items: [{ label: "Authorship", slug: "about" }],
        },
        {
          label: "Design",
          items: [
            {
              label: "Memory item schema",
              slug: "design/memory-item-schema",
            },
          ],
        },
        {
          label: "Concepts",
          items: [
            {
              label: "Inference",
              slug: "concepts/inference",
            },
            {
              label: "Eval harness",
              slug: "concepts/eval-harness",
            },
            {
              label: "Embedding",
              slug: "concepts/embedding",
            },
            {
              label: "Retrieval and reranking",
              slug: "concepts/retrieval-and-reranking",
            },
            {
              label: "Context window",
              slug: "concepts/context-window",
            },
            {
              label: "Tool calling",
              slug: "concepts/tool-calling",
            },
            {
              label: "Agent trace",
              slug: "concepts/agent-trace",
            },
            {
              label: "GraphRAG",
              slug: "concepts/graphrag",
            },
            {
              label: "Search vs traversal",
              slug: "concepts/search-vs-traversal",
            },
          ],
        },
        {
          label: "Research",
          items: [
            {
              label: "Provider context map",
              slug: "research/provider-context-map",
            },
            {
              label: "HelixDB initial notes",
              slug: "research/helixdb-initial-notes",
            },
          ],
        },
      ],
    }),
  ],
});
