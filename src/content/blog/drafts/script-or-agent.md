---
title: "Script or an Agent? How to Decide"
date: "2026-07-13"
author: Chase Roohms
image: "https://chaseroohms.com/blog-images/xxx.webp"
description: "A practical framework for deciding whether a workflow needs deterministic automation, an AI agent, or a combination of both."
topics: ["AI", "Automation"]
slug: "script-or-ai-agent"
icon: "FaRobot"
---

In [The Criteria for Automation](/blog/criteria-for-automation), I argued that before automating a process, you should ask two questions: How often do I perform it, and how easy is it to get wrong?

Those questions help determine whether a process is worth automating at all. But with the recent explosion of AI tools, there is now a second decision to make:

**Should you automate it with a traditional script, or should you build an AI agent?**

Agents are quickly becoming the default answer to every automation problem. Take a manual process, connect an LLM to a few tools, and let it figure everything out.

Sometimes that is exactly what the process needs. Other times, you are replacing twenty lines of reliable Python with a slower, more expensive system that occasionally makes up its own instructions.

The goal should not be to use an agent wherever possible. The goal should be to use the simplest form of automation capable of handling the problem.

## Start With a Script

Traditional automation works best when a process can be described as a predictable sequence of steps.

Take the poster grid script from my previous post. It receives a directory of images, resizes them, calculates where each image belongs, and produces a final grid.

The inputs are structured. The rules are known. The expected output is clear.

There is no meaningful interpretation required. The script does not need to look at a poster and decide whether it *feels* like it belongs in the collection. It only needs to follow the layout rules I gave it.

A script is usually the right choice when:

- The inputs are structured and consistent.
- The rules can be explicitly defined.
- The same input should always produce the same output.
- Success and failure are easy to identify.
- The process does not require judgment or interpretation.

Scripts are deterministic. Assuming nothing external changes, the same inputs should follow the same path and produce the same result every time.

That predictability is valuable.

It makes scripts easier to test, easier to troubleshoot, and easier to trust. You can inspect the logic, reproduce failures, and know exactly which conditions caused the program to take a particular action.

They are also generally faster and cheaper than AI-based systems. A script does not need to send data to a model, wait for a response, interpret that response, and account for the possibility that the response is incorrect.

When a workflow can be expressed cleanly with normal code, normal code is usually the better solution.

## When a Script Starts Fighting the Problem

The limitations of traditional automation become apparent when the inputs stop being predictable.

Imagine you are building a system to route helpdesk tickets.

Some tickets might say:

> I need access to the finance dashboard.

Others might say:

> The report Sarah sent me keeps saying I don't have permission.

A third might simply say:

> Can't get into the numbers thing. Please help.

All three users may be describing the same problem, but they are using completely different words.

You could try solving this with traditional code. You might build a list of keywords such as `finance`, `dashboard`, `report`, `access`, and `permission`. You could add regular expressions, scoring rules, exceptions, and increasingly complicated routing logic.

Eventually, however, you are no longer automating the process itself. You are attempting to manually encode every possible way a person might describe the process.

This is where an LLM becomes useful.

At work, I helped build a triage system that uses an LLM to understand incoming helpdesk requests and route them to the appropriate teams. The system reduced the number of tickets that needed to be manually routed by roughly 70%.

The value of the model was not that it could click buttons or call APIs. A script could already do those things.

The model was valuable because it could interpret unstructured language.

It could recognize that “the numbers thing” might refer to a reporting platform, that a permissions error was probably an access-management issue, and that two very differently worded requests could share the same underlying intent.

That is the distinction I use most often:

**Scripts execute known rules. Agents navigate ambiguity.**

## What Makes Something an Agent?

The word *agent* has become broad enough to describe almost any application involving an LLM.

For this discussion, I consider an agent to be a system where a model can evaluate the current situation, decide what action to take, use one or more tools, inspect the result, and continue until it reaches an outcome.

A basic LLM call might classify a helpdesk ticket and return a team name.

An agent could go further:

1. Read the ticket.
2. Determine the likely issue.
3. Search internal documentation.
4. Check the user's current access.
5. Ask for missing information.
6. Open or update a service request.
7. Escalate the ticket if it cannot resolve it.

That flexibility is powerful, but it introduces uncertainty.

Unlike a normal script, an agent's behavior cannot always be represented as a single predictable path. The model is making decisions based on natural language, context, tool responses, and its interpretation of the goal.

That means agents require controls that simple scripts may not.

You need to think about:

- Which tools the agent can access
- Which actions require approval
- How its decisions are logged
- What happens when a tool fails
- How long the agent is allowed to continue
- When it should stop and ask a human for help
- How you evaluate whether its decisions are correct

The ability to reason does not eliminate the need for engineering discipline. It makes that discipline more important.

## Use an Agent for Ambiguity, Not Complexity

A common mistake is assuming that a complicated workflow automatically requires an agent.

Complexity alone is not a good reason to introduce AI.

A deployment pipeline can be enormously complicated. It may build several applications, run hundreds of tests, generate security reports, sign artifacts, and deploy into multiple environments.

Despite that complexity, it is still governed by explicit rules. Each stage has defined inputs, conditions, and expected outputs.

A traditional workflow engine is a much better fit than an agent deciding what deployment step feels appropriate next.

On the other hand, a relatively simple task may benefit from an agent if it contains ambiguity.

Reading an email and determining whether it is a sales request, support issue, security report, or partnership inquiry does not require many steps. The difficulty comes from understanding the sender's intent.

The important question is therefore not:

> Is this process complicated?

It is:

> Does this process require interpretation?

Complexity can usually be handled with better software design. Ambiguity is where AI begins to provide something traditional automation cannot easily reproduce.

## The Best Solution Is Often Both

Scripts and agents should not be treated as competing approaches.

In practice, the most reliable AI systems combine them.

Let the model handle the part of the workflow that requires interpretation. Once the intent is understood, hand the work to deterministic code.

For example, a helpdesk workflow might look like this:

1. An LLM reads the ticket and identifies the request type.
2. The model returns a structured category and confidence score.
3. A script validates the response against a list of allowed categories.
4. Deterministic routing logic assigns the ticket.
5. Low-confidence or invalid responses are sent to a human.

The model does not need unrestricted access to the ticketing platform. It does not need to invent a destination or decide which administrative actions it should perform.

Its responsibility is narrow: interpret the language.

The rest of the workflow remains predictable.

This pattern gives you the flexibility of an LLM without asking it to control parts of the process that ordinary software can handle more safely.

A useful rule is:

> Use AI to make sense of the input. Use code to enforce what happens next.

This will not apply to every agent, but it is a strong starting point.

## A Framework for Choosing

When deciding between a script and an agent, I work through five questions.

### 1. Can the rules be clearly written down?

If you can describe every condition with normal logic, start with a script.

For example:

- If the file is larger than 100 MB, reject it.
- If the user belongs to this group, grant access.
- If the build fails, send a notification.
- If the certificate expires within 30 days, open a ticket.

There is no need for a model to interpret those conditions.

If the process instead depends on concepts such as urgency, intent, relevance, similarity, or meaning, an LLM may be useful.

### 2. Are the inputs structured?

Databases, API responses, form fields, and configuration files are usually well suited to scripts.

Emails, documents, chat messages, images, and loosely written requests are more likely to benefit from a model.

The less consistent the input is, the more difficult it becomes to handle with hand-written rules.

### 3. Is there a correct answer?

Some tasks have a clearly correct output.

A file either passed validation or it did not. A user either has a permission or does not. A server is either responding or it is not.

Other tasks are interpretive. Two people may reasonably disagree about the category of a ticket, the tone of a message, or which document is most relevant.

Agents are better suited to the second category, especially when the goal is to make a reasonable decision rather than calculate an exact answer.

### 4. What happens when it is wrong?

The consequences of a mistake should determine how much autonomy the system receives.

Misclassifying a low-priority internal question may only create a minor inconvenience. Deleting data, changing production infrastructure, approving a financial transaction, or modifying permissions carries much greater risk.

An agent can still assist with high-risk workflows, but its role should be limited.

It might gather information, recommend an action, or prepare a change for approval. That does not mean it should be allowed to perform the final action by itself.

### 5. Does the agent need to act, or only recommend?

Many supposed agent use cases do not actually require an autonomous agent.

Sometimes the best system is one that:

- Summarizes the situation
- Suggests the next step
- Produces structured output
- Prepares a response
- Identifies which deterministic workflow should run

Giving a model permission to act should be a deliberate decision, not the default conclusion of connecting it to a tool.

## Signs You Are Forcing an Agent Into the Problem

There are a few warning signs that an agent may be unnecessary.

The first is that your prompt is mostly a long list of rigid rules.

If you find yourself writing instructions such as:

> Always do A unless B is present, except when C is greater than D, but never do E when F is false...

You may be describing logic that belongs in code.

The second is that you need the model to return exactly the same answer every time. Models can be constrained, but a deterministic requirement is a strong signal that the underlying decision should not be left to a model.

The third is that the agent spends most of its time moving data between systems. Calling an API, transforming a response, and sending it somewhere else is traditional integration work. Adding a model does not make the integration more intelligent.

Finally, an agent may be the wrong choice when you cannot explain why the model is necessary.

“Because we want to use AI” is not a technical requirement.

You should be able to identify the specific ambiguity, interpretation, or decision-making capability that the model contributes.

## Signs You Are Forcing a Script Into the Problem

The reverse also happens.

A script may be the wrong approach when every new example requires another keyword, exception, or regular expression.

If users can describe the same request in hundreds of different ways, manually maintaining all of those variations becomes expensive and fragile.

Another warning sign is that the process works well only when people follow an exact template. Structured forms can sometimes solve this, but forcing users to translate natural requests into machine-friendly language creates friction.

Finally, consider an LLM when human reviewers can easily make the decision but struggle to explain it as a complete set of rules.

That often means the process relies on context or pattern recognition rather than strict logic.

## Choosing the Boring Solution

Agents are exciting. A Python script that evaluates a few conditions and calls an API is not.

But boring systems are often easier to operate.

They are easier to secure, easier to monitor, easier to test, and easier for the next engineer to understand. Introducing an agent means accepting additional cost, latency, variability, and operational responsibility.

Those tradeoffs can be worthwhile when the model provides a capability the workflow genuinely needs.

They are harder to justify when the agent is only being used to execute steps that were already well defined.

In my previous post, the question was whether a process happens frequently enough, or is error-prone enough, to deserve automation.

Once the answer is yes, ask one more question:

**Where does this process require judgment?**

If the answer is nowhere, write a script.

If the answer is throughout the workflow, consider an agent with clearly defined tools and boundaries.

If the answer is only at one particular step, use a model for that step and keep everything else deterministic.

The best automation is not the one using the newest technology. It is the one that solves the problem reliably without introducing more complexity than the problem requires.
