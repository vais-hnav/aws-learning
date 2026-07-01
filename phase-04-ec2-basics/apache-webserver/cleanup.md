# Cleanup

## Delete The Web Server Lab

For beginner practice, terminate the EC2 instance after testing the website.

Find the instance:

```bash
AWS_PROFILE=user1 aws ec2 describe-instances \
  --query 'Reservations[].Instances[].{InstanceId:InstanceId,State:State.Name,Type:InstanceType,PublicIp:PublicIpAddress,Name:Tags[?Key==`Name`]|[0].Value}' \
  --output table
```

Terminate the instance:

```bash
AWS_PROFILE=user1 aws ec2 terminate-instances --instance-ids INSTANCE_ID
```

Verify:

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

## Check EBS Volumes

```bash
AWS_PROFILE=user1 aws ec2 describe-volumes \
  --filters Name=status,Values=available \
  --query 'Volumes[].{VolumeId:VolumeId,Size:Size,State:State}' \
  --output table
```

Delete only lab volumes that are safe to remove.

## Local Files

Keep:

- `sample-index.html`

Do not keep in git:

- `.pem` private key files
