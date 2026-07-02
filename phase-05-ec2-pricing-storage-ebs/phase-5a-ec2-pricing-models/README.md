# Phase 5A: EC2 Pricing Models

Goal:
Understand EC2 purchasing options without buying any long-term or expensive commitment.

Videos:

| Video | Topic | Hands-on mode |
|---:|---|---|
| 24 | EC2 Savings Plans | Theory only |
| 25 | EC2 Spot Instances | Theory or safe observation |
| 26 | Dedicated Host | Theory only |
| 27 | Dedicated Instance | Theory only |

## What Did I Build?

A beginner-safe EC2 pricing decision lab. No paid pricing commitment was purchased and no dedicated hardware was created.

The lab documents:
- When to use On-Demand as the default beginner choice.
- How Savings Plans reduce cost when usage is predictable.
- Why Spot Instances are cheaper but interruptible.
- Why Dedicated Hosts and Dedicated Instances are advanced, usually enterprise-focused options.

## Which AWS Service Did I Use?

- Amazon EC2 pricing and purchasing options
- AWS Cost Explorer concepts
- EC2 Spot Instances
- EC2 Dedicated Hosts
- EC2 Dedicated Instances

## What Did I Learn?

- Pricing choices are architecture decisions, not just billing settings.
- Savings Plans can save money, but they are commitments for stable workloads.
- Spot Instances are useful for flexible workloads that can survive interruption.
- Dedicated Hosts give physical-server visibility and placement control.
- Dedicated Instances give account-level dedicated hardware, but not host-level control.
- For beginner learning, the safest default is still small On-Demand instances plus immediate cleanup.

## How Do I Run It?

Read the notes in this section and optionally run only the read-only commands in `commands.md`.

Do not purchase, allocate, or launch anything from this section unless a future lab explicitly says so.

## How Do I Delete It?

No AWS resources should exist from this theory section.

Still verify:
- No unexpected EC2 instances are running.
- No Spot requests are active.
- No Dedicated Hosts are allocated.
- No Savings Plan was purchased.

Safety rules:
- Do not buy Savings Plans.
- Do not create Dedicated Hosts.
- Do not create Dedicated Instances.
- Use this section mainly for understanding, not paid experiments.
