# EC2 Instance Pricing

Video covered:
- 21. How EC2 instance pricing is calculated

## What did I build?

A beginner-safe pricing notes lab for understanding how EC2 cost is calculated before launching more instances.

No EC2 instance is required for this lab.

## Which AWS service did I use?

- Amazon EC2
- AWS Billing and Cost Management
- AWS Budgets
- AWS Pricing Calculator

## What did I learn?

- Cloud cost is usage-based, so developers must think about billing while building.
- EC2 cost depends on instance type, operating system, Region, running time, and purchasing option.
- EC2 compute can be billed by the second for many instance/OS combinations, with a minimum usage duration.
- Stopped instances do not keep compute running, but related resources such as EBS volumes can still cost money.
- Pricing should be estimated before launching non-Free-Tier or long-running instances.

## How do I run it?

Read:
- [`explanation.md`](./explanation.md)
- [`commands.md`](./commands.md)
- [`mistakes.md`](./mistakes.md)

Optional safe checks:

```bash
AWS_PROFILE=user1 aws ec2 describe-instance-types \
  --instance-types t3.micro \
  --query "InstanceTypes[].{Type:InstanceType,VCPU:VCpuInfo.DefaultVCpus,MemoryMiB:MemoryInfo.SizeInMiB}" \
  --output table
```

## How do I delete it?

There is no AWS resource to delete for this lab.

Still do the EC2 safety check:
- no practice EC2 instance is running
- no unused EBS volume exists
- no unattached Elastic IP exists
- AWS Budget is still active

## References

- https://aws.amazon.com/ec2/pricing/
- https://calculator.aws/
- https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html
