# EC2 Cost Optimization

Video covered:
- 23. Save 90% on AWS EC2 Bills

## What did I build?

A beginner-safe EC2 cost optimization guide that explains good savings versus risky savings and summarizes EC2 purchasing options.

No EC2 instance is required for this lab.

## Which AWS service did I use?

- Amazon EC2
- AWS Cost Management
- AWS Budgets

## What did I learn?

- Cost optimization is foundational cloud knowledge.
- Not every saving is good; savings should not damage customer experience or block future innovation.
- EC2 purchasing options include On-Demand, Savings Plans, Reserved Instances, Spot Instances, Dedicated Hosts, Dedicated Instances, and Capacity Reservations.
- Spot can provide large discounts, but it is for interruption-tolerant workloads.
- Beginners should not purchase commitments like Savings Plans or Reserved Instances during practice.

## How do I run it?

Read:
- [`explanation.md`](./explanation.md)
- [`commands.md`](./commands.md)
- [`mistakes.md`](./mistakes.md)

Optional safe check:

```bash
AWS_PROFILE=user1 aws ec2 describe-instances \
  --filters "Name=instance-state-name,Values=running" \
  --output table
```

## How do I delete it?

No AWS resource is created.

Cleanup means:
- terminate practice EC2 instances
- remove unused EBS volumes
- release unused Elastic IPs
- keep AWS Budgets active

## References

- https://aws.amazon.com/ec2/pricing/
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-purchasing-options.html
- https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html
