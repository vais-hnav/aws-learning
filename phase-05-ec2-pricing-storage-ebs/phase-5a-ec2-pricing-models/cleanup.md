# Cleanup

Phase 5A should not create AWS resources. It is a theory and decision-making phase.

Still, run these checks if you opened the console and explored pricing pages.

## 1. Check EC2 Instances

```bash
aws ec2 describe-instances \
  --query "Reservations[].Instances[].{InstanceId:InstanceId,State:State.Name,Type:InstanceType,Tenancy:Placement.Tenancy}" \
  --output table
```

Expected result:

```text
No unexpected running instances.
```

## 2. Check Spot Requests

```bash
aws ec2 describe-spot-instance-requests \
  --query "SpotInstanceRequests[].{RequestId:SpotInstanceRequestId,State:State,InstanceId:InstanceId}" \
  --output table
```

Expected result:

```text
No active Spot requests.
```

If a Spot request was accidentally created, cancel it:

```bash
aws ec2 cancel-spot-instance-requests \
  --spot-instance-request-ids sir-example123
```

## 3. Check Dedicated Hosts

```bash
aws ec2 describe-hosts \
  --query "Hosts[].{HostId:HostId,State:State,InstanceType:HostProperties.InstanceType}" \
  --output table
```

Expected result:

```text
No allocated Dedicated Hosts.
```

If a Dedicated Host was accidentally allocated, release it only after confirming no required instance is using it:

```bash
aws ec2 release-hosts \
  --host-ids h-example123
```

## 4. Check Billing

In the AWS Console:

```text
Billing and Cost Management -> Bills
Billing and Cost Management -> Budgets
```

Confirm:
- Budget is still active.
- No unexpected EC2 charge appeared.
- No Savings Plan purchase exists.
- No Dedicated Host or Dedicated Instance charge exists.

## Phase 5A Completion Safety

Mark this phase complete only when:

- Videos 24-27 are watched.
- No Savings Plan was purchased.
- No Dedicated Host was allocated.
- No Dedicated Instance was launched.
- No Spot request is active unless intentionally created for a future lab.
