---
title: "The Road to 500 Stars"
date: "2026-04-18"
author: Chase Roohms
image: "https://chaseroohms.com/blog-images/star-history-500.webp"
description: "The story of how I got Transmute from 100 to 500 GitHub stars in just over a month."
topics: ["GitHub", "Open Source", "Self-Hosting"]
slug: "road-to-five-hundred-stars"
icon: "FaStar"
---

My open source self-hosted file converter, [Transmute](https://transmute.sh), is about to break 500 stars on GitHub.

<figure class="my-6" style="text-align: center;">
  <img src="https://chaseroohms.com/blog-images/star-history-500.webp" alt="Chart showing the rising star count of my repository transmute-app/transmute" class="rounded-lg" style="width: 80%; margin: 0 auto;" loading="eager" fetchpriority="high" />
  <figcaption class="text-center text-sm text-gray-400 mt-2">Star history over the last two months</figcaption>
</figure>

A few weeks ago [I wrote about getting to 100](https://chaseroohms.com/blog/road-to-one-hundred-stars/). That version of the story was mostly about getting initial traction when nobody knew the project existed yet, but to continue the growth I have had to change my approach.

Since I last posted, Transmute was featured in [selfh.st’s March 20 newsletter](https://selfh.st/weekly/2026-03-20/), a [post I made in `r/selfhosted`](https://www.reddit.com/r/selfhosted/comments/1s5ly5b/transmute_file_converter/) took off, and the project was later featured again by selfh.st in the [April 17 newsletter](https://selfh.st/weekly/2026-04-17/) and on its [apps directory](https://selfh.st/apps/?search=transmute).

Those things drove immense traffic to both the website and the repository. Directories matter. Reddit matters. Getting picked up by people who already have distribution **matters**.

But honestly, the biggest lessons I've learned this month were not really about promotion, they were about what happens after people arrive.

## 1. Be Ridiculously Kind
*... to folks creating issues, to folks opening PRs, to folks sending you emails, to anyone you interact with in the capacity of your project.*

When a stranger opens an issue on your project, especially a small one, they are doing you a favor. They found your repo, tried your app, cared enough to say something, and spent their own time writing it out for you. Even if the report is rough. Even if they misunderstood something. Even if the request is not quite aligned with your plans. They submitted it to you for free! People pay for beta testers you know?

Some of the most valuable feedback I got came from people who were not long-term contributors, nor close friends, nor power users, just random people who ran into something confusing and took the time to tell me.

If you treat those people well, a few things happen:

1. They come back.
2. They trust you enough to give you more feedback.
3. Other people notice that your project feels welcoming.

Many many times I would respond kindly and promptly to a single issue submitted by a user, and within a day that same user would submit 3 more. These weren't junk issues either they were genuine bugs or good ideas for new features!

Open source is not just code quality, it is maintainer quality. A repo can look polished, but if the issues page feels hostile or dismissive, people pick up on that fast.

That does not mean you have to accept every request or merge every PR. You absolutely should not. But you can still be respectful, clear, and appreciative while saying no.

## 2. Localization, Localization, Localization!

A lot of maintainers treat localization like a “someday” task, or something only huge projects should care about. I did as well untill [one of my users requested support for alternative languages](https://github.com/transmute-app/transmute/issues/107). Taking step 1 into account (Be Ridiculously Kind) I decided to prioritized this request, and in return the user helped me add German as the first alternate language.

<figure class="my-6" style="text-align: center;">
  <div style="display: flex; gap: 1rem; justify-content: center; align-items: flex-start; flex-wrap: wrap;">
    <img src="https://chaseroohms.com/blog-images/german-translations.webp" alt="German translation screenshots from contributors" class="rounded-lg" style="width: 45%;" loading="eager" fetchpriority="high" />
    <img src="https://chaseroohms.com/blog-images/spanish-translations.webp" alt="Spanish translation screenshots from contributors" class="rounded-lg" style="width: 45%;" loading="eager" fetchpriority="high" />
  </div>
  <figcaption class="text-center text-sm text-gray-400 mt-2">German and Spanish contributor provided translations</figcaption>
</figure>

You do **not** need to translate your app into ten languages yourself and honestly you probably should not even try. What you **should** do is make translation possible.

Put an i18n framework in place, keep your strings organized, and make it obvious where translations live. Write a [quick guide on how to add translations](https://transmute.sh/docs/translations/), and maybe link an example PR. Then invite people to contribute.

Localization is not just about language coverage or adding a feature to be "modern" or "cool. It is about making the project feel open to people outside your own default audience, you are acknowledging that people who speak a language other than your own native language can and should want to use your software!

If your whole app quietly assumes one language, one region, one kind of user, people notice that too. But if somebody opens the repo and sees that translations are possible, that immediately makes the project feel more global and more welcoming.

Localization is one of my favorite improvements to Transmute so far: the kind where a relatively small technical decision makes the whole project feel more inviting.

## 3. Directories are not optional

If you are trying to grow an open source project, go find the directories in your niche.

For me, [selfh.st](https://selfh.st/) was my goal from the start. Transmute first appeared in Self-Host Weekly on [March 20, 2026](https://selfh.st/weekly/2026-03-20/), and then showed up again in the [April 17 issue](https://selfh.st/weekly/2026-04-17/) as well as being featured on their browsable apps directory that updates regularly.

<figure class="my-6" style="text-align: center;">
  <img src="https://chaseroohms.com/blog-images/selfh-st-directory.webp" alt="Screenshot of my app Transmute on the selfh.st apps directory" class="rounded-lg" style="width: 80%; margin: 0 auto;" loading="eager" fetchpriority="high" />
  <figcaption class="text-center text-sm text-gray-400 mt-2">selfh.st directory entry</figcaption>
</figure>

Getting placed like that matters because directories solve a discovery problem that most personal promotion does not. Tweet disappear down the feed, Reddit posts cool off, and LinkedIn posts reach mostly people who already know you.

Directories continue to work for you without any added effort.

They give people a place to find you later when they are actively looking for tools like yours. They also adds credibility, if someone has never heard of your project before, seeing it listed somewhere respected makes it feel less random and more trusted.

For self-hosted projects like mine [selfh.st](https://selfh.st/) is an obvious one, but the bigger lesson is just to go where your target users already live.

That might be:

* [`awesome-selfhosted`](https://github.com/awesome-selfhosted/awesome-selfhosted)
* [`awesome-docker`](https://github.com/veggiemonk/awesome-docker)
* [`awesome-sysadmin`](https://github.com/awesome-foss/awesome-sysadmin)
* niche newsletters
* community project roundups
* package registries or app catalogs relevant to your ecosystem

Lots of people treat directories like a nice bonus or a cherry on top, but to me they are building blocks needed to reach your goal.

## 4. The Right Reddit Post

My first post about getting to 100 stars talked about niche subreddits beating giant ones, and to be clear I very much still believe that... but this time the big jump came from [`r/selfhosted`](https://www.reddit.com/r/selfhosted/).

The post that really moved the needle was my [Transmute post there from late March](https://www.reddit.com/r/selfhosted/comments/1s5ly5b/transmute_file_converter/). That post reached exactly the kind of users I wanted: people who care about self-hosting, privacy, and genuinely useful tooling.

Like I said in my last post on this subject though, do not jump straight to the big subreddits.

A bigger community is only helpful if your project page, screenshots, docs, onboarding, and issue responses are good enough to survive the attention. If you post too early, you're just sharing your screw-ups with a bigger audience

By the time I posted to `r/selfhosted`, Transmute was in a much better place. It had more features, more polish, better docs, and some real user feedback already incorporated. Because of this, the attention I garnered was actually useful instead of just stressful.

So yes, promotion matters, but readiness matters more.

## 5. People Show Up, Your Job Changes

The first 100 stars were about proving the project was real and worth trying, the push toward 500 has been about proving the project is worth sticking around for.

That means the job changes a little, no longer are you trying to get attention, you are trying to convert that attention into trust.

For me, that has mostly looked like this:

- responding well to issues
- keeping the project contributor-friendly
- making features discoverable and documented
- inviting translators and contributors in
- being visible in the places where people already discover software
- trying not to waste the attention once it arrives

A lot of maintainers get tripped up looking for one more big promotional trick when what they really need is to make the project easier to join.

## What Actually Got Me Closer To 500

Looking back, I do not think Transmute grew because I found some secret growth hack, it grew because a few "viral" moments lined up with a project that people could actually use, contribute to, and feel welcomed by.

The selfh.st features helped. The `r/selfhosted` post helped. But the reason those things kept compounding is that users showed up and found a repo that felt active, friendly, and open to participation.

If I had to boil the last few hundred stars down to three things, it would be this:

1. Be kind to **all** people who engage.
2. Make localization possible early.
3. Get your project into directories that keep working after the hype fades.
