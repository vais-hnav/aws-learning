# Mistakes

## Buying A Savings Plan Too Early

Savings Plans are useful only when usage is predictable. A beginner learning account has unpredictable, short-lived usage, so buying a plan can lock in unnecessary spend.

Safer rule:

```text
Use On-Demand for labs. Clean up immediately.
```

## Thinking Spot Instances Are Just Cheap Normal Instances

Spot is cheaper because it uses spare AWS capacity. That capacity can disappear, and the instance can be interrupted.

Safer rule:

```text
Use Spot only for workloads that can retry, restart, or lose an instance safely.
```

## Running Stateful Workloads On Spot

A database, important file server, or single production web server should not be placed on Spot without a proper recovery design.

Safer rule:

```text
Do not store important state only on a Spot instance.
```

## Allocating A Dedicated Host Out Of Curiosity

A Dedicated Host is not like launching a tiny Free Tier instance. It represents dedicated physical server capacity and can create meaningful cost.

Safer rule:

```text
Never allocate Dedicated Hosts in a beginner account.
```

## Confusing Dedicated Host And Dedicated Instance

Both use dedicated hardware, but they are not the same.

Quick memory hook:

```text
Dedicated Host = I control the physical host.
Dedicated Instance = AWS gives isolated hardware, but I do not control the exact host.
```

## Forgetting That Pricing Is Regional

EC2 pricing, Spot pricing, and available capacity can vary by Region and Availability Zone.

Safer rule:

```text
Always check the Region before comparing EC2 prices.
```
