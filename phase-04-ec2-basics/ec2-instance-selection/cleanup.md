# Cleanup

This lab does not require creating an instance.

Cleanup is only needed if you separately launched an instance while experimenting.

## If You Launched An Instance

1. Confirm whether it is still needed.
2. Stop it only if you will continue soon.
3. Terminate it if the lab is complete.
4. Check EBS volumes.
5. Check Elastic IPs.

## Safe Check

```bash
AWS_PROFILE=user1 aws ec2 describe-instances \
  --filters "Name=instance-state-name,Values=running,stopped" \
  --query "Reservations[].Instances[].{Name:Tags[?Key=='Name']|[0].Value,InstanceId:InstanceId,Type:InstanceType,State:State.Name}" \
  --output table
```
