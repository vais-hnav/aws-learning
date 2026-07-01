# Cleanup

This is a theory/safety lab, so no new resource is required.

## Cost Cleanup Checklist

- Terminate completed practice EC2 instances.
- Delete unused EBS volumes.
- Delete unused snapshots only if you are sure they are not needed.
- Release unused Elastic IPs.
- Remove security groups only if they were created for the lab and are unused.
- Check AWS Billing and Budgets after EC2 practice.

## Never Do For Beginner Practice

- Do not purchase Savings Plans.
- Do not purchase Reserved Instances.
- Do not create Dedicated Hosts.
- Do not create Dedicated Instances.
- Do not reserve capacity unless a future lab specifically requires it.
