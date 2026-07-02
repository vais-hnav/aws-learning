# Explanation

Phase 5A is about choosing the right EC2 purchasing model. The hands-on part is intentionally limited to safe reading and comparison, because the wrong click in this section can create real cost.

## Video 24: EC2 Savings Plans

The video focuses on how AWS Savings Plans reduce compute cost when your usage is predictable.

Savings Plans are not a new EC2 instance type. They are a pricing commitment. You agree to spend a specific amount per hour for one year or three years, and AWS applies discounted pricing to eligible compute usage.

Important idea:

```text
On-Demand = pay for what you use, no commitment.
Savings Plan = commit to steady usage, get discounted rates.
```

Two important Savings Plan types:

| Type | Flexibility | Beginner meaning |
|---|---|---|
| Compute Savings Plan | More flexible across EC2, Fargate, Lambda, instance family, size, OS, tenancy, and Region | Better when workloads may change |
| EC2 Instance Savings Plan | More specific to an EC2 instance family in a Region | Higher discount, but less flexible |

The key learning is that Savings Plans are good only after you understand your steady usage. They are not for experiments, random labs, or learning accounts.

For this repo:

```text
Decision: do not purchase a Savings Plan.
Reason: beginner labs are temporary and unpredictable.
```

## Video 25: EC2 Spot Instances

The video focuses on Spot Instances as a cost optimization option.

Spot Instances use spare EC2 capacity. They can be much cheaper than On-Demand instances, but AWS can interrupt them when the capacity is needed again.

Important idea:

```text
Spot = cheaper compute, but not guaranteed compute.
```

Good use cases:

- Batch jobs
- Data processing
- CI/CD workers
- Test workloads
- Stateless or retryable workloads
- Jobs that can save progress and continue later

Bad beginner use cases:

- Primary database
- Important production server
- Anything with unsaved local data
- A web app that must stay available without interruption handling

Spot is connected to future topics like Auto Scaling Groups, launch templates, and mixed instance policies. We will treat those as important missed topics after the playlist if they are not covered deeply.

For this repo:

```text
Decision: observe Spot pricing only.
Reason: running Spot safely requires interruption-aware design.
```

## Video 26: Dedicated Host

The video explains Dedicated Hosts as physical EC2 servers dedicated for your use.

A Dedicated Host gives more control than a normal EC2 instance. You can see host-level details like sockets, cores, and host ID, and you can control instance placement on the physical server.

Important idea:

```text
Dedicated Host = an entire physical server allocated for your account.
```

Dedicated Hosts are mainly useful for:

- Bring Your Own License scenarios
- Enterprise compliance requirements
- Software licensed by socket, core, or physical host
- Workloads that need host affinity or placement control

This is not a beginner Free Tier topic. The important safety note is that a Dedicated Host can cost money while it is allocated, even if you are not thinking of it like a normal EC2 instance.

For this repo:

```text
Decision: do not allocate a Dedicated Host.
Reason: not needed for beginner labs and not Free Tier practice.
```

## Video 27: Dedicated Instance

The video explains Dedicated Instances and how they differ from Dedicated Hosts.

A Dedicated Instance runs on hardware dedicated to a single AWS account. However, unlike a Dedicated Host, you do not control the exact physical server and you do not get host-level visibility.

Important idea:

```text
Dedicated Instance = dedicated hardware isolation without host placement control.
```

Dedicated Instance vs Dedicated Host:

| Feature | Dedicated Instance | Dedicated Host |
|---|---|---|
| Hardware shared with other AWS customers? | No | No |
| Dedicated to account? | Yes | Yes |
| Physical host visibility? | No | Yes |
| Control exact host placement? | No | Yes |
| Host affinity? | No | Yes |
| Main use case | Compliance-style isolation | BYOL, licensing, strict placement control |

The beginner takeaway is simple: both are advanced options. If you are just learning EC2, use normal shared-tenancy On-Demand instances and clean them up.

For this repo:

```text
Decision: do not launch Dedicated Instances.
Reason: normal EC2 is enough for learning, and dedicated tenancy can add cost.
```

## Pricing Model Summary

| Model | What it means | Best for | Beginner action |
|---|---|---|---|
| On-Demand | Pay for compute as you use it | Learning, testing, unpredictable workloads | Use small instances, then terminate |
| Savings Plans | Commit to steady spend for discount | Predictable long-running usage | Learn only, do not buy |
| Spot Instances | Spare capacity at lower price | Flexible, interruptible workloads | Observe only for now |
| Dedicated Host | Entire physical server dedicated to you | BYOL and compliance-heavy workloads | Do not create |
| Dedicated Instance | Instance on hardware dedicated to your account | Account-level hardware isolation | Do not create |

## Sources Used

- Video 24: https://www.youtube.com/watch?v=jEXSUR6-Gjw
- Video 25: https://www.youtube.com/watch?v=8Bkl3ujqtVA
- Video 26: https://www.youtube.com/watch?v=b2k7uiyuHQ0
- Video 27: https://www.youtube.com/watch?v=0-Q9E-cKiaY
- AWS Savings Plans docs: https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html
- AWS Spot Instances docs: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html
- AWS Dedicated Hosts docs: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/dedicated-hosts-overview.html
- AWS Dedicated Instances docs: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/dedicated-instance.html
