# Cleanup

## Beginner Cleanup Rule

For this lab, stopping proves the video command works, but termination is the real cleanup step after you are finished.

## Stop The Instance

```bash
ACTION=stop INSTANCE_ID=i-xxxxxxxxxxxxxxxxx ./cleanup-ec2.sh
```

Stopped instances do not keep running CPU charges, but storage can still remain.

## Start The Instance

Only start it again if you are practicing the video workflow:

```bash
ACTION=start INSTANCE_ID=i-xxxxxxxxxxxxxxxxx ./cleanup-ec2.sh
```

## Terminate The Instance

```bash
ACTION=terminate CONFIRM_TERMINATE=yes INSTANCE_ID=i-xxxxxxxxxxxxxxxxx ./cleanup-ec2.sh
```

## Verify Cleanup

```bash
AWS_PROFILE=user1 aws ec2 describe-instances \
  --region us-east-1 \
  --filters "Name=tag:Project,Values=aws-learning" \
  --query "Reservations[].Instances[].{InstanceId:InstanceId,State:State.Name,Name:Tags[?Key=='Name']|[0].Value}" \
  --output table
```

Also check:
- EBS volumes
- Elastic IPs
- snapshots
- security groups created only for this lab

## Cost Safety

- Do not create multiple instances with `--count` unless a future lab explicitly asks for it.
- Do not leave instances running overnight.
- Check Billing and Budgets after the lab.
