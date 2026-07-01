# Commands

These are safe inspection commands for cost hygiene.

## List Running Instances

```bash
AWS_PROFILE=user1 aws ec2 describe-instances \
  --filters "Name=instance-state-name,Values=running" \
  --query "Reservations[].Instances[].{Name:Tags[?Key=='Name']|[0].Value,InstanceId:InstanceId,Type:InstanceType,State:State.Name}" \
  --output table
```

## List Stopped Instances

```bash
AWS_PROFILE=user1 aws ec2 describe-instances \
  --filters "Name=instance-state-name,Values=stopped" \
  --query "Reservations[].Instances[].{Name:Tags[?Key=='Name']|[0].Value,InstanceId:InstanceId,Type:InstanceType,State:State.Name}" \
  --output table
```

## List Unattached EBS Volumes

```bash
AWS_PROFILE=user1 aws ec2 describe-volumes \
  --filters "Name=status,Values=available" \
  --query "Volumes[].{VolumeId:VolumeId,SizeGiB:Size,State:State,AZ:AvailabilityZone}" \
  --output table
```

## List Elastic IPs

```bash
AWS_PROFILE=user1 aws ec2 describe-addresses \
  --query "Addresses[].{PublicIp:PublicIp,AllocationId:AllocationId,AssociationId:AssociationId}" \
  --output table
```
