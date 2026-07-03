# Phase 6: VPC and Scalability

Goal:
Understand AWS networking basics and scaling concepts.

## What Did I Build?

A beginner networking lab around the default VPC, EC2 security groups, and SSH access control.

The hands-on lab tested:
- Allowing SSH only from my laptop public IP.
- Removing/changing that inbound rule.
- Confirming SSH succeeds when my IP is allowed.
- Confirming SSH fails when my IP is no longer allowed.

## Which AWS Service Did I Use?

- Amazon VPC
- EC2 Security Groups
- EC2 networking

## What Did I Learn?

- A VPC is the private network boundary for AWS resources.
- Subnets divide a VPC into smaller network ranges inside Availability Zones.
- Route tables decide where traffic goes.
- An internet gateway lets public subnets reach the internet.
- Security groups act like instance-level firewalls.
- Security groups are stateful and use allow rules only.
- To "deny" SSH from my laptop, I removed or changed the allow rule so my IP no longer matched.
- Vertical scaling means making one server bigger.
- Horizontal scaling means adding more servers.

## How Do I Run It?

Use:
- `inspect-default-vpc.md`
- `security-group-ssh-lab.md`
- `diagrams.md`
- `notes.md`

## How Do I Delete It?

For this phase, cleanup means:
- Remove temporary SSH rules.
- Restore SSH access to a safe source only if the instance is still needed.
- Stop or terminate temporary EC2 instances.
- Do not delete the default VPC.

Phase work:
- `diagrams.md`
- `inspect-default-vpc.md`
- `security-group-ssh-lab.md`
- `notes.md`
