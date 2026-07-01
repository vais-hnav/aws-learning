# EC2 Instance Selection

Video covered:
- 22. How to Choose the Right AWS EC2 Instance

## What did I build?

A beginner-safe EC2 instance selection guide for choosing instance families and sizes based on workload needs.

No EC2 instance is required for this lab.

## Which AWS service did I use?

- Amazon EC2
- AWS CLI read-only EC2 inspection

## What did I learn?

- EC2 instance types are grouped into families.
- General purpose balances CPU, memory, and networking.
- Compute optimized is for CPU-heavy workloads.
- Memory optimized is for memory-heavy workloads.
- Storage optimized is for storage I/O-heavy workloads.
- Accelerated computing is for GPU or specialized hardware workloads.
- Right-sizing means choosing enough capacity without paying for unused capacity.

## How do I run it?

Read:
- [`explanation.md`](./explanation.md)
- [`commands.md`](./commands.md)
- [`mistakes.md`](./mistakes.md)

Optional safe command:

```bash
AWS_PROFILE=user1 aws ec2 describe-instance-types \
  --filters "Name=instance-type,Values=t3.*" \
  --query "InstanceTypes[0:10].{Type:InstanceType,VCPU:VCpuInfo.DefaultVCpus,MemoryMiB:MemoryInfo.SizeInMiB}" \
  --output table
```

## How do I delete it?

No AWS resource is created.

If you tested an instance separately, terminate it after practice and check EBS volumes.

## References

- https://aws.amazon.com/ec2/instance-types/
