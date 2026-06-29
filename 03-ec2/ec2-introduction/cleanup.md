# Cleanup

This orientation lab should not create any EC2 resources.

## If You Did Not Launch An Instance

No AWS cleanup is needed.

Still check:
```bash
AWS_PROFILE=user1 aws ec2 describe-instances \
  --query 'Reservations[].Instances[].{InstanceId:InstanceId,State:State.Name,Type:InstanceType,Name:Tags[?Key==`Name`]|[0].Value}' \
  --output table
```

If the output is empty, there are no EC2 instances in the current region.

## If You Launched An Instance During The Video

Find the instance:
```bash
AWS_PROFILE=user1 aws ec2 describe-instances \
  --query 'Reservations[].Instances[].{InstanceId:InstanceId,State:State.Name,Type:InstanceType,Name:Tags[?Key==`Name`]|[0].Value}' \
  --output table
```

Terminate it:
```bash
AWS_PROFILE=user1 aws ec2 terminate-instances --instance-ids INSTANCE_ID
```

Verify termination:
```bash
AWS_PROFILE=user1 aws ec2 describe-instances \
  --instance-ids INSTANCE_ID \
  --query 'Reservations[].Instances[].State.Name' \
  --output text
```

Expected final state:
```text
terminated
```

## Storage Check

After terminating beginner lab instances, check for leftover volumes:

```bash
AWS_PROFILE=user1 aws ec2 describe-volumes \
  --filters Name=status,Values=available \
  --query 'Volumes[].{VolumeId:VolumeId,Size:Size,State:State}' \
  --output table
```

If you see available volumes that were created only for the lab, delete them after confirming they are not needed.
