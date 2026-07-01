# Commands

These commands are safe inspection commands. They do not launch EC2 instances.

## Check Current AWS Identity

```bash
AWS_PROFILE=user1 aws sts get-caller-identity
```

## Check Configured Region

```bash
AWS_PROFILE=user1 aws configure get region
```

## View Instance Type Details

```bash
AWS_PROFILE=user1 aws ec2 describe-instance-types \
  --instance-types t3.micro \
  --query "InstanceTypes[].{Type:InstanceType,VCPU:VCpuInfo.DefaultVCpus,MemoryMiB:MemoryInfo.SizeInMiB}" \
  --output table
```

## List Running Instances

```bash
AWS_PROFILE=user1 aws ec2 describe-instances \
  --filters "Name=instance-state-name,Values=running" \
  --query "Reservations[].Instances[].{Name:Tags[?Key=='Name']|[0].Value,InstanceId:InstanceId,Type:InstanceType,State:State.Name,AZ:Placement.AvailabilityZone}" \
  --output table
```

## Check Available EBS Volumes

```bash
AWS_PROFILE=user1 aws ec2 describe-volumes \
  --filters "Name=status,Values=available" \
  --query "Volumes[].{VolumeId:VolumeId,SizeGiB:Size,State:State,AZ:AvailabilityZone}" \
  --output table
```

## Check Elastic IPs

```bash
AWS_PROFILE=user1 aws ec2 describe-addresses \
  --query "Addresses[].{PublicIp:PublicIp,AllocationId:AllocationId,AssociationId:AssociationId}" \
  --output table
```
