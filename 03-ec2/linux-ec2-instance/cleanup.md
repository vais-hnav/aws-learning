# Cleanup

## If Continuing To Video 17 Immediately

You may keep the Linux instance running only while you continue to the Apache website lab.

After video 17, terminate the instance unless you have a reason to keep it.

## Terminate The Instance

Find the instance:

```bash
AWS_PROFILE=user1 aws ec2 describe-instances \
  --query 'Reservations[].Instances[].{InstanceId:InstanceId,State:State.Name,Type:InstanceType,PublicIp:PublicIpAddress,Name:Tags[?Key==`Name`]|[0].Value}' \
  --output table
```

Terminate it:

```bash
AWS_PROFILE=user1 aws ec2 terminate-instances --instance-ids INSTANCE_ID
```

Verify final state:

```bash
AWS_PROFILE=user1 aws ec2 describe-instances \
  --instance-ids INSTANCE_ID \
  --query 'Reservations[].Instances[].State.Name' \
  --output text
```

Expected:

```text
terminated
```

## Check Leftover EBS Volumes

```bash
AWS_PROFILE=user1 aws ec2 describe-volumes \
  --filters Name=status,Values=available \
  --query 'Volumes[].{VolumeId:VolumeId,Size:Size,State:State}' \
  --output table
```

Delete only lab volumes that you are sure are no longer needed.
