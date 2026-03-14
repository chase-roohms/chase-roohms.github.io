---
title: "Building a Self-Hosted File Converter"
date: "2026-03-14"
author: Chase Roohms
image: "https://chaseroohms.com/blog-images/transmute-converter.webp"
description: "Why I built Transmute, a self-hosted file converter focused on polish, automation, and extensibility"
topics: ["Python", "FastAPI", "Docker", "React"]
slug: "building-transmute"
icon: "FaExchangeAlt"
---

For the past four weeks, I’ve been building [Transmute](https://transmute.sh), an open-source, self-hosted file converter, because I felt like there was still room for another option in this space.

<figure class="my-6">
  <img src="https://chaseroohms.com/blog-images/transmute-converter.webp" alt="Home screen of my new app Transmute" class="rounded-lg w-full" width="80%" loading="eager" fetchpriority="high" />
  <figcaption class="text-center text-sm text-gray-400 mt-2">The converter homescreen</figcaption>
</figure>

Projects like [ConvertX](https://github.com/C4illin/ConvertX) and [Vert.sh](https://github.com/VERT-sh/VERT) already exist, and both are solid, more mature tools. If one of those already fits your needs, that is genuinely great. This post is not about pretending otherwise.

For me, though, those tools still felt a little rough around the edges. I wanted something I could self-host with a more polished web UI, closer to the cloud converters I was used to, while also exposing an API for automation and integration with my existing workflows.

And yes, I did consider just contributing upstream. But if part of the goal is a built-in API, that becomes a lot harder when one of the projects is fundamentally centered around a WASM-based approach.

## A bit of background

For context, I’m not coming at this as someone randomly shipping a weekend prototype.

- **Job:** DevOps Engineer, focused on DevSecOps, pipeline security, and automation
- **Degree:** Bachelor’s in Computer Science
- **Other projects:**
  - [Dumpsterr](https://github.com/chase-roohms/dumpsterr): a Docker/Python companion app to safely empty Plex Trash
  - [MythicMate](https://github.com/chase-roohms/mythicmate): a personal Docker/Java Discord bot for my D&D games

## On AI usage

In the interest of transparency, I also want to be clear about how AI has and has not been used in this project.

I do use AI tooling in my day-to-day workflow, mostly IDE autocomplete, plus some boilerplate generation early in the project. But Transmute is not a vibe-coded app. This project is human-led, reviewed, and understood.

That distinction matters to me.

I’ve already had to shut down a few pull requests that showed obvious signs of low-effort AI generation: Claude commit metadata, OpenClaw commits, massive PRs with no issues attached, and changes that clearly were not meaningfully reviewed by the contributor.

AI-assisted development is one thing. Blindly generated, unowned code is another.

## What Transmute does

Transmute can convert images, video, audio, documents, presentations, spreadsheets, subtitles, fonts, emails, and more.

A full list of supported conversions is available here: [transmute.sh/conversions](https://transmute.sh/conversions/)

It also includes a built-in **REST API**, which makes it easy to integrate with tools like **n8n**, **Node-RED**, or an existing **arr-stack** workflow.

A few real examples:

- converting `ASS` subtitles to `SRT`
- extracting audio from videos downloaded with MeTube
- plugging conversions into a larger automation workflow without touching the UI

If you want to inspect the API, the OpenAPI spec is available [here](https://github.com/transmute-app/openapi-specifications/blob/main/openapi.json), and the full ReDoc documentation is available at `/api/docs` once the app is running.

## Features I care about

A few things make Transmute stand out to me beyond basic file conversion.

### Retention, history, and re-downloads

Transmute supports configurable file and conversion retention, lets you view conversion history, re-download old outputs, view upload history, and reconvert previously uploaded files.

This is probably my favorite part of the project so far. There is nothing worse than waiting several minutes for a conversion to finish, refreshing the page by accident, and losing access to the result.

### Proper API key support

Instead of one all-powerful API key, Transmute supports proper API key creation and management.

This is a small thing, but it matters. The single-key model a lot of tools use has always bothered me.

### Built-in theming

Transmute currently ships with **8 built-in themes**: 4 light and 4 dark.

Want another color scheme? Open an issue. Themes are intentionally easy for me to add.

<figure class="my-6">
  <img src="https://chaseroohms.com/blog-images/transmute-viriditas.webp" alt="Screenshot of the green theme" class="rounded-lg w-full" width="80%" loading="eager" fetchpriority="high" />
  <figcaption class="text-center text-sm text-gray-400 mt-2">The "viriditas" theme</figcaption>
</figure>

## What’s next

One area I’m currently investigating is **CAD support**.

Right now, the most promising path looks like [aspose-cad](https://pypi.org/project/aspose-cad/), but they do not yet support Python 3.13. I opened a ticket with them, and they are looking into what it would take to roll that out.

## Closing thoughts

Transmute is still early, but I’m excited about where it is heading.

I wanted a self-hosted file converter that felt more polished, fit better into automation workflows, and was pleasant to use day to day. That is the project I’m trying to build.

I’d genuinely love feedback, positive or negative.

**GitHub:** https://github.com/transmute-app/transmute