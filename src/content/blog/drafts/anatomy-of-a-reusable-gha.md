---
title: "Anatomy of a Reusable GitHub Action"
date: "2026-02-28"
author: Chase Roohms
image: "https://chaseroohms.com/blog-images/tag-and-release-header.webp"
description: "Decoupling GitHub workflow logic into standalone, version-controlled actions for the global Marketplace."
topics: ["CI/CD", "GitHub Actions"]
slug: "anatomy-of-a-reusable-gha"
icon: "FaGithub"
---

“Don’t Repeat Yourself” (DRY) is one of the earliest principles drilled into every developer’s head. From the moment you write your first class, you’re taught to centralize logic, extract common functionality, and avoid writing the same code twice.

At its core, DRY gives you two major advantages:

1. **Maintainability** — Fix a bug in one place, benefit everywhere.
2. **Development Speed** — Reusable functions, classes, and modules let you build faster and with fewer mistakes.

Developers apply DRY instinctively in code. But here’s my question:

**Why don’t we apply DRY with the same intensity in DevOps?**

Most of us write infrastructure automation in YAML: GitHub Actions, GitLab CI, Jenkins pipelines, Helm charts, Terraform modules, you name it. And while DRY shows up in some tools (Terraform modules, for example), GitHub Actions workflows tend to become cluttered with copy-pasted steps, hardcoded logic, and long blocks of Bash.

I used to write GitHub workflow files the same way: repetitive, handwritten chunks of logic in `.github/workflows`. Every repo had its own version of the same steps. Every fix meant updating each workflow manually. Every improvement meant diffing YAML in five different repos.

Eventually, I realized something important:

> **If I’m repeating the same logic across repositories, I should treat it like code and package it for reuse.**

That shift completely changed the way I think about automation.

---

## From Hardcoded Workflows to Reusable Actions

Over the past few months, I published two GitHub Actions to the GitHub Marketplace:

- [Tag and Release Semantic Version](https://github.com/marketplace/actions/tag-and-release-semantic-version)
- [Discord Webhook Notifier](https://github.com/marketplace/actions/discord-webhook-notifier)

Both of these started as local workflow steps that were simple, repetitive scripts copy-pasted between projects.

At some point I stopped and asked myself:
**Why am I rewriting this? Why isn’t this an action?**

Instead of continuing to hardcode logic inside each project’s workflow YAML, I extracted the logic, documented the inputs, created version tags, and published them as standalone, version-controlled GitHub Actions.

Suddenly:

- My other projects could import the logic with a single line
- Fixes and improvements automatically propagated across every repo
- I could control versions, write tests, and follow real software release patterns
- Other developers outside my ecosystem could use them too

That last part is the one that really stuck with me.

This wasn’t just DevOps anymore. This was **open-source contribution**.

---

## Example: Automating Semantic Versioning for All Your Projects

My [Tag and Release](https://github.com/marketplace/actions/tag-and-release-semantic-version) action is a great example.

<figure class="my-6">
  <img src="https://chaseroohms.com/blog-images/tag-and-release-header.webp" alt="Tag and Release Logo" class="rounded-lg w-full" width="100%" loading="eager" fetchpriority="high" />
</figure>

Originally, this was a step of a workflow living inside one project. Then two. Then three. Every project I worked on ([MythicMate](https://github.com/chase-roohms/mythicmate), [Dumpsterr](https://github.com/chase-roohms/dumpsterr), and anything else I built) needed the same versioning logic.

The workflow:

- Determines the new version based on the release type (major/minor/patch)
- Creates a tag for the new release
- Updates child tags (i.e. update `v1` and `v1.1` when releasing from `v1.1.1` → `v1.1.2`)
- Generates release notes from the commit messages
- Creates a GitHub release

Useful? Absolutely. Reusable? Definitely. DRY? Not at all, when duplicated across repos.

Turning it into a standalone GitHub Action meant:

- [MythicMate](https://github.com/chase-roohms/mythicmate) and [Dumpsterr](https://github.com/chase-roohms/dumpsterr) now share one consistent semantic-versioning workflow
- If I fix a bug in tag generation, every project benefits instantly
- I can publish formal versions (`v1`, `v1.1`, `v1.2`, etc.)
- Anyone else on GitHub can now automate their versioning too

Now the workflow logic boils down to 3 lines of yaml:

```yaml
- uses: chase-roohms/tag-and-release@v1
  with:
    version_bump: patch
```

This is the DevOps equivalent of extracting repeated code into a single shared library.

---

## DevOps for One vs. DevOps for Everyone

This experience taught me something subtle but important.

Working as a DevOps Engineer means building automation for my team. Working as an open-source contributor means building automation for the world.

The mindset shift is powerful:

- You stop thinking about solving a single problem
- You start thinking about how *others* will consume your solution
- You design inputs, outputs, documentation, and versioning
- You adopt testing and release practices instead of “just enough to work” hacks
- You begin treating DevOps scripts like real software artifacts

It creates better code, better tooling, and it makes you a better engineer.

---

## Why DevOps Engineers Should Embrace DRY Like Devs

The same benefits developers get from DRY apply (sometimes even more strongly) in DevOps:

### 1. Centralized Logic → Global Fixes

One fix in an action updates automation across your entire ecosystem.

### 2. Faster Development → Less Boilerplate

No more writing 20 lines of workflow logic for something you could call with one line.

### 3. Versioning → Predictability

Actions follow real release cycles, not ad-hoc YAML edits.

### 4. Open Source → Community Improvement

Publishing your automation lets others improve it. You get feature requests, bug reports, ideas, and contributions.

### 5. Portfolio → Real-World Impact

Reusable DevOps tools are some of the most valuable open-source assets a young engineer can build.

---

## TLDR: If It’s Repeated DevOps Logic, Make It a Reusable Action

If you find yourself copy-pasting the same lines of YAML, the same Bash scripts, or the same notification logic across repos, that’s your signal.

Treat automation the same way you treat code:

- Abstract it
- Reuse it
- Version it
- Document it
- Publish it