# Cleanup

## EC2 instance

Terminate the Phase 11 instance when the lab is finished.

```bash
aws ec2 terminate-instances --instance-ids i-01d426e30586a1625
```

Replace the instance ID if a different instance is used.

## Verify instance is terminated

```bash
aws ec2 describe-instances \
  --instance-ids i-01d426e30586a1625 \
  --query "Reservations[].Instances[].{Id:InstanceId,State:State.Name}" \
  --output table
```

## Check for unattached EBS volumes

```bash
aws ec2 describe-volumes \
  --filters "Name=status,Values=available" \
  --query "Volumes[].{Id:VolumeId,Size:Size,Type:VolumeType,State:State,AZ:AvailabilityZone}" \
  --output table
```

Delete only volumes you are sure are lab leftovers.

## Check for Elastic IPs

```bash
aws ec2 describe-addresses \
  --query "Addresses[].{AllocationId:AllocationId,PublicIP:PublicIp,InstanceId:InstanceId}" \
  --output table
```

Release only Elastic IPs you created for the lab and no longer need.

In this lab, the leftover EBS volume and Elastic IP checks returned empty output, which means no paid leftovers were found from those resource types.

## Safety checklist

- EC2 instance terminated
- No unused EBS volumes left from the lab
- No unused Elastic IPs left from the lab
- Security group removed if it is no longer attached
- Budget and billing alerts remain enabled
