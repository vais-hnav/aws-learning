# Cleanup

This is a theory lab, so no new AWS resource should be created.

## EC2 Billing Safety Check

After watching and taking notes:

```bash
AWS_PROFILE=user1 aws ec2 describe-instances \
  --filters "Name=instance-state-name,Values=running" \
  --query "Reservations[].Instances[].{Name:Tags[?Key=='Name']|[0].Value,InstanceId:InstanceId,Type:InstanceType,State:State.Name}" \
  --output table
```

If an old practice instance is still running:
- stop it only if you will use it soon
- terminate it if the lab is finished

## Check Leftover Storage

```bash
AWS_PROFILE=user1 aws ec2 describe-volumes \
  --filters "Name=status,Values=available" \
  --output table
```

Delete unused volumes only after confirming they are not needed.

## Final Checklist

- No unused EC2 instance is running.
- No unused EBS volume is available.
- No unattached Elastic IP exists.
- AWS Budget is still active.
- Notes are updated.
