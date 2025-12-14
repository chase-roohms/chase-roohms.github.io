---
title: "Start Self-Hosting on a Budget"
date: "2025-12-14"
author: Chase Roohms
image: "https://chaseroohms.com/blog-images/homelab-header.webp"
description: "How I built a functional home lab for learning and experimentation without breaking the bank."
topics: ["Linux", "Docker"]
slug: "home-lab-setup"
icon: "FaDollarSign"
---

<figure class="my-6">
  <img src="http://chaseroohms.com/blog-images/homelab-header.webp" alt="My homelab today" class="rounded-lg w-full" />
  <figcaption class="text-center text-sm text-gray-400 mt-2">My homelab today</figcaption>
</figure>

Running a home lab has been one of the best investments in my technical education. Here's how I started affordably.

## Hardware Choices

You don't need enterprise-grade equipment. I started with:

- An old desktop PC with 16GB RAM
- A Raspberry Pi 4 for low-power services
- A cheap 6 port managed switch for ethernet connections
- External hard drives for storage (hand-me-downs from a cousin)

Total cost: Under $300 (reusing what I had)

*I've obviously upgraded since then, but you get the point*

## Software Stack

- Each `docker-compose.yml` defines related / dependent services. Mine are tracked in [git](https://github.com/chase-roohms/docker-compose)
- Tailscale facilities secure remote access via meshnet

## Services I Run

### Essential Services
- **Pihole**: Network-wide ad blocking
- **Nginx Proxy Manager**: Reverse proxy for all services
- **Home Assistant**: Smart home management for lighting automation and others

### Media & Files
- **Plex**: Media server for old movies
- **Paperless-NGX**: Searchable document / PDF management

### Monitoring
- **Beszel**: Ultra light-weight monitoring and metrics
- **Uptime Kuma**: Service availability monitoring

## Lessons Learned

1. **Start small**: Add services gradually
2. **Document everything**: Future you will thank present you (Confluence is free for individual users)
3. **Security first**: Use VPNs and proper authentication

## Conclusion

A home lab doesn't have to be expensive or complicated. Start with what you have, and grow as you learn.
