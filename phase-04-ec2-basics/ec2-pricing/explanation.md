# Explanation

## Main Idea From The Video

The video explains that when moving from traditional software development to cloud development, cost becomes an extra responsibility. In AWS, resources are billed based on how they are used, so an EC2 instance is not just a server; it is also a running cost item.

## What Affects EC2 Price?

EC2 cost is mainly affected by:
- instance type
- Region
- operating system / AMI
- running time
- purchasing option
- storage attached to the instance
- data transfer and other related services

## Simple Formula

Beginner mental model:

```text
EC2 compute cost = hourly or per-second rate x running time
```

But the full bill can include more than compute:

```text
Total EC2-related cost =
compute
+ EBS volume storage
+ snapshots
+ Elastic IP charges
+ data transfer
+ load balancer or NAT Gateway if used
```

## Running vs Stopped vs Terminated

`running`
- compute charges can apply
- EBS storage charges can apply

`stopped`
- compute charges generally stop
- EBS storage can still cost money

`terminated`
- instance is deleted
- attached EBS root volume is usually deleted if delete-on-termination is enabled
- always verify volumes after termination

## Why Budgets Matter

AWS Budgets can warn when cost approaches or exceeds a threshold. Budgets do not automatically guarantee that cost stops, and budget alerts can be delayed. Cleanup is still required.

## My Beginner Rule

Before launching EC2:
1. Confirm the Region.
2. Confirm the instance type.
3. Confirm whether it is Free Tier eligible for my account.
4. Confirm whether the lab needs the instance running.
5. Write down how I will terminate it.
