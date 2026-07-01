# Commands

These are read-only commands for learning about instance types.

## Inspect A Specific Instance Type

```bash
AWS_PROFILE=user1 aws ec2 describe-instance-types \
  --instance-types t3.micro \
  --query "InstanceTypes[].{Type:InstanceType,VCPU:VCpuInfo.DefaultVCpus,MemoryMiB:MemoryInfo.SizeInMiB,Network:NetworkInfo.NetworkPerformance}" \
  --output table
```

## Compare A Few General Purpose Instances

```bash
AWS_PROFILE=user1 aws ec2 describe-instance-types \
  --filters "Name=instance-type,Values=t3.micro,t3.small,t3.medium" \
  --query "InstanceTypes[].{Type:InstanceType,VCPU:VCpuInfo.DefaultVCpus,MemoryMiB:MemoryInfo.SizeInMiB}" \
  --output table
```

## List Instance Types In A Family

```bash
AWS_PROFILE=user1 aws ec2 describe-instance-types \
  --filters "Name=instance-type,Values=t3.*" \
  --query "InstanceTypes[].InstanceType" \
  --output table
```

## Check Current Running Instance Types

```bash
AWS_PROFILE=user1 aws ec2 describe-instances \
  --filters "Name=instance-state-name,Values=running" \
  --query "Reservations[].Instances[].{Name:Tags[?Key=='Name']|[0].Value,InstanceId:InstanceId,Type:InstanceType,State:State.Name}" \
  --output table
```
