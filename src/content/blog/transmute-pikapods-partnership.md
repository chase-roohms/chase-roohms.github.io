---

title: "Transmute Partners With PikaPods"
date: "2026-06-21"
author: Chase Roohms
image: "https://chaseroohms.com/blog-images/pikapods-transmute-partnership.webp"
description: "Why I chose PikaPods as the recommended hosted deployment option for Transmute, and what that means for self-hosted users."
topics: ["Open Source", "Self-Hosting", "Transmute"]
slug: "transmute-pikapods"
icon: "FaCloud"
---------------

[Transmute](https://transmute.sh), my self-hosted file converter, is partnering with PikaPods as its recommended hosted deployment option.

That sentence feels a little strange to write, because Transmute is very intentionally a self-hosted project. The whole point is to give people a privacy-focused alternative to cloud file converters. No uploading sensitive documents to some random website. No artificial file size limits. No watermarks. No paid conversion credits. Just your files, your infrastructure, and a tool that does the job.

So why partner with a hosting platform?

Because “self-hosted” and “easy to access” should not be opposites.

<figure class="my-6" style="text-align: center;">
  <img src="https://chaseroohms.com/blog-images/pikapods-transmute-partnership.webp" alt="Transmute and PikaPods partnership graphic" class="rounded-lg" style="width: 80%; margin: 0 auto;" loading="eager" fetchpriority="high" />
  <figcaption class="text-center text-sm text-gray-400 mt-2">Transmute is now available as a one-click hosted app on PikaPods</figcaption>
</figure>

## The problem with “just self-host it”

I love self-hosting. I run a home lab, I use Docker constantly, and I think owning your tools and your data is worth caring about... But I also think people in the self-hosted space sometimes forget how much background knowledge we are assuming.

For a technical user, running Transmute with Docker is pretty straightforward. Pull the image, mount the data directory, expose the port, configure any environment variables you care about, and you are off to the races.

For everyone else, that sentence is already too much.

A lot of people want the benefits of self-hosted software, but they do not want to become their own systems administrator just to convert a file. They do not want to think about Docker Compose, reverse proxies, DNS, TLS, backups, updates, persistent volumes, authentication secrets, or whether they accidentally exposed something to the public internet that should have stayed private.

Not everyone wants a home lab. Not everyone wants a VPS. Not everyone wants to spend their Saturday debugging a container permission issue. Some people just want useful open-source software that respects them.

## Why PikaPods made sense

PikaPods occupies an interesting middle ground: 

- It's not a traditional SaaS where the application is a closed product and users pay whatever pricing the company invents.
- It's also not pure self-hosting, where users are responsible for every piece of infrastructure themselves.

Instead, PikaPods gives people a simpler way to run open-source apps without needing to manage the entire stack manually. You choose an app, configure the resources, and get a hosted instance without having to maintain a server from scratch.

Transmute is useful to homelab users, but file conversion is not only a homelab problem. Designers, students, developers, office workers, media collectors, and small teams all run into file conversion problems. Plenty of those people care about privacy, but they may not have the time or technical background to deploy and maintain the app themselves. With PikaPods, those users have another path.

- If you want full control, run Transmute yourself with Docker.
- If you want the same open-source app but with a simpler hosted setup, use PikaPods.

<figure class="my-6" style="text-align: center;">
  <img src="https://chaseroohms.com/blog-images/transmute-on-pikapods.webp" alt="Transmute listed as a hosted open-source app." class="rounded-lg" style="width: 80%; margin: 0 auto;" loading="eager" fetchpriority="high" />
<figcaption class="text-center text-sm text-gray-400 mt-2">PikaPods' pod creation UI</figcaption>
</figure>

## The open-source funding part matters too

The other reason I chose PikaPods is their approach to open-source sustainability. A lot of companies build businesses around open-source software. Sometimes that is great. Sometimes it feels a little more like open-source maintainers are providing free inventory for someone else’s platform.

PikaPods’ model feels more aligned with what I've wanted for Transmute.

They offer revenue sharing with the developers of the apps they host, which means that if users choose to run Transmute through PikaPods, some of that revenue comes back to the project.

It won't magically make open-source maintenance effortless. I don't think any maintainer should pretend revenue share from hosted deployments is some perfect solution to open-source funding, but it is a step in the right direction.

It acknowledges that open-source projects are not just free content to package and sell around. They are maintained by real people who spend real time writing code, answering issues, fixing bugs, improving docs, reviewing pull requests, and trying to make the thing better. **tldr; PikaPods respects developers.**

## This does not change what Transmute is

To be very clear: Transmute is not becoming a hosted-only product.

The app will remain free, open-source, and self-hostable. Docker will continue to be the default deployment path for users who want full control. The source code will remain public. The project will still be built around local-first file conversion, privacy, and automation.

PikaPods is an *alternative* option for deployment, it's not a replacement. It adds an easier on-ramp for people who want Transmute but do not want to manage the infrastructure themselves.

I do not want Transmute to become another cloud converter with a friendlier coat of paint. The reason I built it in the first place was because I wanted the convenience of tools like CloudConvert or Convertio **without** handing files to a third party for processing.

The PikaPods option does not change that philosophy. It just gives users a managed way to run their own instance.

## What this means for users

Now that the listing is live, Transmute users will have two main deployment paths:

### Run it yourself

This is still the best option if you already have Docker, a home lab, a VPS, or an existing self-hosted setup.

You get full control over the environment, storage, networking, updates, reverse proxy, authentication, and everything else.

### Run it on PikaPods

This is the better option if you want Transmute available online without managing the underlying server yourself.

You still get the open-source app, but with a much simpler "one-click" deployment experience.

<figure class="my-6" style="text-align: center;">
  <img src="https://chaseroohms.com/blog-images/new-pikapods-cta.webp" alt="Homepage of our website showing the ability to run on PikaPods." class="rounded-lg" style="width: 80%; margin: 0 auto;" loading="eager" fetchpriority="high" />
</figure>

## Why I am excited about this

This partnership feels like a healthy kind of growth for Transmute.

- It gives less technical users a path to use the app.
- It gives the project another distribution channel.
- It creates a small sustainability loop where hosted usage can support ongoing development.

And it does all of that without closing the source, adding artificial limits, or turning Transmute into something it was never meant to be.

Transmute is still early, still evolving, and still very much open-source first. But this is a meaningful step toward making it easier for more people to use.

More soon.

---

Want to spin up your own instance of Transmute on PikaPods? Click the button below!

[![Run on PikaPods](https://www.pikapods.com/static/run-button.svg)](https://www.pikapods.com/pods?run=transmute)
