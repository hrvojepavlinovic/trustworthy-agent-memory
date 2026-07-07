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
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/hrvojepavlinovic/trustworthy-agent-memory",
        },
      ],
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
          ],
        },
        {
          label: "About",
          items: [{ label: "Authorship", slug: "about" }],
        },
      ],
    }),
  ],
});
