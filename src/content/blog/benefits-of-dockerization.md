---
title: "Benefits of Dockerization"
date: "2026-01-15"
author: Chase Roohms
image: "https://chaseroohms.com/blog-images/mythicmate-header.webp"
description: "How Docker solved dependency nightmares, security issues, and environment inconsistencies for my Java Discord bot."
topics: ["Docker", "Java"]
slug: "benefits-of-dockerization"
icon: "FaDocker"
---

Back in 2024 I created a Java based Discord bot I called "MythicMate". It's purpose? Provide intuitive dice rolling, comprehensive rules referencing, and AI-powered assistance for all things D&D.

<figure class="my-6">
  <img src="https://chaseroohms.com/blog-images/mythicmate-header.webp" alt="MythicMate branding header, featuring a mythical cat like creature with horns in a robe." class="rounded-lg w-full" width="1920" height="716" loading="eager" fetchpriority="high" />
  <figcaption class="text-center text-sm text-gray-400 mt-2">The "Mythic Mate" himself</figcaption>
</figure>

## Difficulties

I was quite inexperienced at this time, so building a Java application with Maven was a daunting task. After numerous failed attempts I managed to compile a Jar and move it over to my server. 

It came complete with:
- File not found errors
- Hardcoded secrets and API keys
- Missing dependencies

Every user's dream application! The problem? I had built the app to work on my laptop without a thought for how to run this on any other device. I pieced together a solution using `nano` on my server, and promptly abandoned the project.

## Revisiting

With the things I have learned in the last year and a half working as a DevOps engineer, I decided to revisit the project and put my skills to the test. The goal? Dockerize MythicMate, deploy it anywhere, and secure my previously poor designs.

### Building the Dockerfile

I started by creating a multi-stage Dockerfile. This approach separates the build environment from the runtime environment, resulting in a smaller, more secure final image.

```dockerfile
# Use Eclipse Temurin JDK 21 (recommended for production)
FROM eclipse-temurin:21-jdk-alpine AS builder

WORKDIR /app

# Copy Maven configuration and source
COPY pom.xml ./
COPY src ./src

# Install Maven and build the application
RUN apk add --no-cache maven
RUN mvn clean package -DskipTests

# Runtime stage - use smaller JRE image
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Install su-exec for dropping privileges
RUN apk add --no-cache su-exec

# Create database directory for persistent data
RUN mkdir -p /app/database

# Copy the built JAR from builder stage
COPY --from=builder /app/target/MythicMate-1.0-SNAPSHOT.jar /app/mythicmate.jar

# Copy entrypoint script
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Create a non-root user for security
RUN addgroup -g 1000 mythicmate && \
    adduser -D -u 1000 -G mythicmate mythicmate && \
    chown -R mythicmate:mythicmate /app

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD pgrep -f "java.*mythicmate.jar" || exit 1

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
```

The multi-stage build is crucial here. The builder stage uses the full JDK 21 image with Maven to compile the application, while the runtime stage uses a lightweight JRE-only Alpine image. This reduced the final image size significantly while keeping all necessary dependencies bundled.

A few key decisions I made:

- **JDK 21**: Using the latest LTS version for better performance and security
- **Alpine Linux**: The `-alpine` variant keeps the image small
- **su-exec**: Allows the entrypoint to fix permissions before dropping to the non-root user
- **Health check**: Uses `pgrep` to verify the Java process is still running
- **Entrypoint script**: Handles runtime configuration and permission management before starting the application

### Handling Configuration

Next came the configuration challenges. I needed to eliminate those hardcoded secrets and make the application configurable for different environments. This is where the `entrypoint.sh` script came in handy:

```sh
#!/bin/sh
# Fix ownership of the database directory to the mythicmate user
chown -R mythicmate:mythicmate /app/database

# Drop to non-root user and execute the Java application
exec su-exec mythicmate java -jar mythicmate.jar
```

Environment variables for the Discord token and OpenAI API key are now injected at runtime, never stored in the image itself. I created a `.env.example` file to document required variables and added `.env` to `.gitignore`. Secrets stay out of version control and can be injected via Docker Compose, Kubernetes secrets, or environment variables in your deployment platform.

Since MythicMate is a Discord bot, it doesn't need to expose any ports, it connects outbound to Discord's API. The only persistence needed is for the local "database" (text files for a handful of pre-canned responses), which I mounted as a volume.

### Docker Compose for Local Development

To make local development seamless, I created a `docker-compose.yml`:

```yaml
services:
  mythicmate:
    build: .
    container_name: mythicmate-bot
    restart: unless-stopped
    
    # Environment variables for the Authenticate class
    environment:
      - MYTHICMATE_TOKEN=${MYTHICMATE_TOKEN}
      - MYTHICMATE_PASSWORD=${MYTHICMATE_PASSWORD}
      - MYTHICMATE_GPT_KEY=${MYTHICMATE_GPT_KEY}
    
    # Mount database directory as a volume for persistence
    volumes:
      - ./database:/app/database
```

Simple and effective. The database volume persists bot data between restarts, and the `.env` file handles all secrets. No external dependencies required.

### The Results

With everything containerized, deployment became trivial. The same image that ran on my MacBook ran identically on my Ubuntu server. No more dependency mismatches, no more "works on my machine" problems.

- Building the image: `docker build -t mythicmate:latest .`
- Running locally: `docker-compose up -d`

The application now starts consistently every time, with all dependencies bundled and isolated. File paths work the same regardless of the host OS, and I can roll back to any previous version with a simple image tag change.

## Key Takeaways

Dockerization transformed MythicMate from a brittle, environment-dependent application into a portable, production-ready service. The benefits were clear:

1. **Environment Consistency**: Development, testing, and production environments became identical
2. **Dependency Management**: No more manual Java or Maven installation on servers
3. **Security**: Secrets externalized, non-root user, minimal runtime image
4. **Simplified Deployment**: Single command deployment with rollback capability
5. **Portability**: Run anywhere Docker runs: cloud, on-premises, or local

What started as a frustrating experience managing a Java application across different systems became a lesson in the power of containerization. Docker didn't just solve my deployment problems; it fundamentally changed how I approach application development and delivery.

Check out my progress on [MythicMate on Github](https://github.com/chase-roohms/mythicmate)!