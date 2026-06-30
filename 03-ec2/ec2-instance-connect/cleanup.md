# Cleanup

## What To Delete

EC2 Instance Connect does not create a separate server to delete.

The real cleanup target is the EC2 instance used for the connection.

## Steps

1. Close the browser terminal.
2. Go back to the EC2 console.
3. Stop the instance if you will use it again soon.
4. Terminate the instance if the lab is complete.
5. Check EBS volumes.
6. Check Elastic IPs.
7. Check Billing and Budgets.

## CLI Cleanup Check

```bash
AWS_PROFILE=user1 aws ec2 describe-instances \
  --query "Reservations[].Instances[].{Name:Tags[?Key=='Name']|[0].Value,InstanceId:InstanceId,State:State.Name}" \
  --output table
```

## Cost Reminder

Stopping is not the same as deleting.

For completed beginner labs, prefer termination after you have captured notes and screenshots.
