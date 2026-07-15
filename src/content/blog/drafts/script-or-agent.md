---

title: "Script or an Agent? How to Decide"
date: "2026-07-13"
author: Chase Roohms
image: "https://chaseroohms.com/blog-images/clock-vs-money-scale.webp"
description: "A practical framework for deciding whether a workflow needs deterministic automation, an AI agent, or a combination of both."
topics: ["AI", "Automation"]
slug: "script-or-agent"
icon: "FaRobot"
---------------

In [The Criteria for Automation](/blog/criteria-for-automation), I argued that before automating a process, you should ask two questions: How often do I perform it, and how easy is it to get wrong?

Those questions help determine whether a process is worth automating at all. With the explosion of AI tools, there is now a second decision to make: **Should you automate it with a traditional script, or build an AI agent?**

Agents are quickly becoming the default answer to every automation problem. Sometimes that is exactly what the process needs. Other times, you are replacing twenty lines of reliable Python with a slower, more expensive system that occasionally makes up its own instructions.

The goal should be to use the simplest form of automation capable of handling the problem.

## Start With a Script

Traditional automation works best when a process can be described as a predictable sequence of steps.

Take the poster grid script from the aforementioned blog post. It receives a directory of images, resizes them, calculates where each image belongs, and produces a final grid. The inputs are structured, the rules are known, and the expected output is clear.

<figure class="my-6">
  <img src="https://chaseroohms.com/blog-images/tom-jerry-posters-header.webp" alt="Tom & Jerry poster collection" class="rounded-lg w-full" width="1920" height="716" loading="eager" fetchpriority="high" />
  <figcaption class="text-center text-sm text-gray-400 mt-2">My Tom & Jerry poster collection</figcaption>
</figure>

There is no meaningful interpretation required. The script does not need to decide whether a poster *feels* like it belongs in the collection. It only needs to follow the layout rules I gave it.

A script is usually the right choice when:

* The inputs are structured and consistent.
* The rules can be explicitly defined.
* The same input should produce the same output.
* Success and failure are easy to identify.
* The process does not require judgment.

Scripts are easier to test, troubleshoot, and trust. They are also generally faster and cheaper than AI-based systems. When a workflow can be expressed cleanly with normal code, normal code is usually the better solution.

## When a Script Starts Fighting the Problem

Traditional automation becomes harder when the inputs stop being predictable. Imagine you are building a system to route helpdesk tickets. One user writes:

> I need access to the finance dashboard.

Another says:

> The report Sarah sent me keeps saying I don't have permission.

A third says:

> Can't get into the numbers thing. Please help.

All three may be describing the same problem with completely different words.

You could build keyword lists, regular expressions, scoring rules, and exceptions. Eventually, you are trying to manually encode every possible way a person might describe the process.

**This is where an LLM becomes useful.**

In my current role, I helped build a triage system that uses an LLM to understand incoming helpdesk requests and route them to the appropriate teams. It reduced the number of tickets that needed to be manually routed by roughly 70%.

The model was not valuable because it could click buttons or call APIs. A script could already do those things. It was valuable because it could interpret unstructured language.

That is the distinction I use most often: **Scripts execute known rules. Agents navigate ambiguity.**

## What Makes Something an Agent?

For this discussion, an agent is a system where a model evaluates a situation, decides what action to take, uses tools, inspects the result, and continues until it reaches an outcome. A basic LLM call might classify a ticket; an agent could also search documentation, check access, ask for missing information, open a request, and escalate it.

That flexibility introduces uncertainty. Unlike a script, an agent may not follow one predictable path. You therefore need to define:

* Which tools it can access.
* Which actions require approval.
* How its decisions are logged.
* What happens when a tool fails.
* When it should stop and ask a human for help.

Reasoning does not eliminate the need for engineering discipline. It makes it more important.

## Use an Agent for Ambiguity, Not Complexity

A complicated workflow does not automatically require an agent.

A deployment pipeline may build applications, run hundreds of tests, generate security reports, sign artifacts, and deploy into multiple environments. It is complicated, but still governed by explicit rules. A workflow engine is a better fit than an agent deciding what step feels appropriate next.

A simpler task may benefit from AI if it requires interpretation. Categorizing an email involves few steps; the difficulty is understanding the sender's intent.

The important question is not:

> Is this process complicated?

It is:

> Does this process require interpretation?

Complexity can usually be handled with better software design. Ambiguity is where AI provides something traditional automation cannot easily reproduce.

## The Best Solution Is Often Both

Scripts and agents should not be treated as competing approaches. Let the model handle the part that requires interpretation, then hand the result to deterministic code:

1. An LLM reads the ticket and identifies the request type.
2. It returns a structured category and confidence score.
3. A script validates the response against allowed categories.
4. Deterministic logic routes the ticket.
5. Low-confidence or invalid responses go to a human.

<figure class="my-6">
	<img src="https://chaseroohms.com/blog-images/script-or-agent-hybrid-workflow.svg" alt="Workflow diagram showing incoming requests interpreted by an LLM, validated by deterministic code, then either auto-routed or sent for human review" class="rounded-lg w-full" width="1920" height="716" loading="eager" fetchpriority="high" />
	<figcaption class="text-center text-sm text-gray-400 mt-2">A hybrid workflow: the model interprets the request, and deterministic code decides what happens next.</figcaption>
</figure>

The model's responsibility is narrow: interpret the language. It does not need unrestricted access or permission to invent its own actions.

A useful rule is:

> Use AI to make sense of the input. Use code to enforce what happens next.

## A Framework for Choosing

When deciding between a script and an agent, ask five questions.

### Can the rules be clearly written down?

If every condition can be expressed with normal logic, start with a script. If the process depends on urgency, intent, relevance, similarity, or meaning, an LLM may be useful.

### Are the inputs structured?

Databases, API responses, form fields, and configuration files are usually suited to scripts. Emails, documents, chat messages, images, and loosely written requests are more likely to benefit from a model.

### Is there a correct answer?

Validation, permissions, and health checks usually have exact answers. Ticket categories, tone, and document relevance may be open to reasonable interpretation.

### What happens when it is wrong?

The consequences of a mistake should determine how much autonomy the system receives. An agent may assist with high-risk work by gathering information or recommending an action without being allowed to perform the final step.

### Does it need to act, or only recommend?

Many supposed agent use cases only need a model to summarize, produce structured output, prepare a response, or select a deterministic workflow. Permission to act should be deliberate.

## Signs You Are Forcing the Wrong Solution

You may be forcing an agent into the problem when your prompt is mostly rigid rules, you need the same answer every time, or the model mostly moves data between APIs. If you cannot explain what ambiguity the model handles, it probably does not belong there.

You may be forcing a script into the problem when every new example requires another keyword, exception, or regular expression. If people can make the decision but struggle to describe complete rules, an LLM may be a better fit.

## Choosing the Boring Solution

Agents are exciting. A Python script that evaluates a few conditions and calls an API is not. But boring systems are easier to secure, monitor, test, and hand off.

Agents introduce additional cost, latency, variability, and operational responsibility. Those tradeoffs are worthwhile when the model provides a capability the workflow genuinely needs, but not when it is only executing well-defined steps.

---

In my previous post on this topic, the question was whether a process happens frequently enough, or is error-prone enough, to deserve automation.

Once the answer is yes, ask one more question: **Where does this process require judgment?**

If the answer is nowhere, write a script. If it is throughout the workflow, consider an agent with clearly defined tools and boundaries. If it is only at one step, use a model for that step and keep everything else deterministic.

The best automation is not the one using the newest technology but the one that solves the problem reliably without introducing more complexity than the problem requires.
