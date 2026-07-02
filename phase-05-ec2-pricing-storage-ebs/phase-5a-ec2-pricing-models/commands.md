# Commands

These commands are optional and read-only. They help inspect pricing-related EC2 concepts without creating resources.

Set a region first:

```bash
export AWS_REGION=ap-south-1
```

Check who the AWS CLI is using:

```bash
aws sts get-caller-identity
```

List current running or stopped EC2 instances:

```bash
aws ec2 describe-instances \
  --region "$AWS_REGION" \
  --query "Reservations[].Instances[].{InstanceId:InstanceId,State:State.Name,Type:InstanceType,Tenancy:Placement.Tenancy,AZ:Placement.AvailabilityZone}" \
  --output table
```

Check whether any Spot requests exist:

```bash
aws ec2 describe-spot-instance-requests \
  --region "$AWS_REGION" \
  --query "SpotInstanceRequests[].{RequestId:SpotInstanceRequestId,State:State,Status:Status.Code,InstanceId:InstanceId}" \
  --output table
```

View a small sample of Spot price history:

```bash
aws ec2 describe-spot-price-history \
  --region "$AWS_REGION" \
  --instance-types t3.micro \
  --product-descriptions "Linux/UNIX" \
  --max-results 5 \
  --query "SpotPriceHistory[].{AZ:AvailabilityZone,InstanceType:InstanceType,Price:SpotPrice,Time:Timestamp}" \
  --output table
```

Check whether any Dedicated Hosts are allocated:

```bash
aws ec2 describe-hosts \
  --region "$AWS_REGION" \
  --query "Hosts[].{HostId:HostId,State:State,InstanceType:HostProperties.InstanceType,AZ:AvailabilityZone}" \
  --output table
```

Check for instances using dedicated tenancy:

```bash
aws ec2 describe-instances \
  --region "$AWS_REGION" \
  --filters "Name=tenancy,Values=dedicated,host" \
  --query "Reservations[].Instances[].{InstanceId:InstanceId,State:State.Name,Type:InstanceType,Tenancy:Placement.Tenancy}" \
  --output table
```

## Commands To Avoid In This Phase

Do not run these during beginner practice:

```bash
aws savingsplans create-savings-plan
aws ec2 allocate-hosts
aws ec2 purchase-host-reservation
aws ec2 run-instances --placement Tenancy=dedicated
aws ec2 request-spot-instances
```

Those commands can create commitments, dedicated hardware, or interruptible EC2 capacity.
