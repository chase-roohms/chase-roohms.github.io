---
title: "The Criteria for Automation"
date: "2025-12-14"
author: Chase Roohms
image: "https://chaseroohms.com/blog-images/clock-vs-money-scale.webp"
description: "Is something really worth automating, or will you spend more time on it than it's worth?"
topics: ["Automation"]
slug: "criteria-for-automation"
icon: "FaBalanceScale"
---

One of my favorite quotes is from Twitter user [@zhuowei](https://x.com/zhuowei) - "Never spend 6 minutes doing something by hand when you can spend 6 hours failing to automate it." Automation has become such a pervasive buzzword in the IT industry that people no longer ask whether something *should* be automated—only whether it *can* be.

Let me walk you through two instances where I automated a process. One delivered real value, and the other missed the mark.

## Missing the Mark
In my homelab, I run three servers and I’m fairly particular about my terminal setup. I use a custom message of the day (MOTD) to keep things interesting, a concise and colorful prompt that shows the machine hostname and current directory, and a simple Docker configuration to make `docker ps` more readable.

<figure class="my-6">
  <img src="https://chaseroohms.com/blog-images/home-server-1-terminal.webp" alt="Terminal on my server" class="rounded-lg w-full" width="1920" height="716" loading="eager" fetchpriority="high" />
  <figcaption class="text-center text-sm text-gray-400 mt-2">The MOTD on one of my servers</figcaption>
</figure>

After setting up my first server I put a decent chunk of time into setting up [this repository](https://github.com/chase-roohms/ServerConfig/tree/main), which would house the default and tailored customizations for each server I added. A new server could now be configured with just two commands.

```shell
git clone "https://github.com/chase-roohms/ServerConfig.git" "./.ServerConfig"
bash "./.ServerConfig/configure"
```

The problem? I only ever got to three servers. I realized quickly that I did not need to scale past that, and it would've taken far less time to just copy the MOTDs and `.bashrc` files across those three servers manually.

## Delivering Value
As a hobby, I create poster collections for movie and TV franchises, it's a refreshing break from technical work that lets me exercise my creative side. You can see some of my work on [TPDb](https://theposterdb.com/user/NeonVariant).

Once a collection is finished, I share it on Reddit in a clean grid layout that makes it easy for both myself and others to view the entire set at a glance. I've made over 900 posters this year, and plenty of them were manually edited into a grid using Photoshop.

<figure class="my-6">
  <img src="https://chaseroohms.com/blog-images/tom-jerry-posters-header.webp" alt="Tom & Jerry poster collection" class="rounded-lg w-full" width="1920" height="716" loading="eager" fetchpriority="high" />
  <figcaption class="text-center text-sm text-gray-400 mt-2">My Tom & Jerry poster collection</figcaption>
</figure>

Last month I spent about 20 minutes writing a Python script using the image processing library [Pillow (PIL)](https://pypi.org/project/pillow/) that would generate the grids for me, and I have used it daily since. Putting together the grids in Photoshop used to take me 20 minutes or sometimes even longer, now it takes around 10 seconds.

## What's the Difference?
**Frequency and Complexity.** There are two kinds of processes that *should* be automated: those you perform frequently, and those that are easy to get wrong.

My server customization fell into neither category. It wasn’t something I did often, in fact, it only happened three times. It also wasn’t particularly error-prone, as it amounted to copying and pasting five to ten files.

My poster grids, on the other hand, are created often and are surprisingly easy to mess up. I used to spend around half an hour on each one, carefully aligning every poster so the edges were pixel-perfect.

## Conclusion
Next time you consider automating a process, ask yourself two simple questions: How often am I really doing this, and how easy is it to do incorrectly? The answer may lead you to realize that its more efficient to keep doing it manually.