# Notes

This phase covers VPC networking, security groups, and the basic idea of vertical vs horizontal scaling.

Note source:
- Based on playlist video order/titles, AWS documentation, and hands-on work documented in this repo.
- Paraphrased explanatory notes, not verbatim transcripts.

## 37. VPC And Security Groups

Concept:
- A VPC is an isolated virtual network inside AWS.
- EC2 instances are launched inside a VPC and subnet.
- A subnet belongs to one Availability Zone.
- A route table controls where subnet traffic goes.
- An internet gateway allows internet access for resources in public subnets.
- A security group controls allowed inbound and outbound traffic for attached resources.

Security group behavior:
- Security groups are stateful.
- Inbound rules allow traffic into the resource.
- Outbound rules allow traffic out of the resource.
- Return traffic is automatically allowed for established connections.
- Security groups do not have explicit deny rules.
- If no rule allows traffic, the traffic is denied by default.

My hands-on:
- Used an EC2 instance with SSH.
- Checked my laptop public IP.
- Added an inbound SSH rule using my public IP with `/32`.
- Verified SSH worked when my IP was allowed.
- Changed or removed the inbound rule so my laptop IP was not allowed.
- Verified SSH failed when my IP no longer matched the security group rule.
- Learned that the "deny" behavior came from no matching allow rule, not from an explicit deny rule.

Important rule:

```text
SSH from my laptop = allow TCP 22 from MY_PUBLIC_IP/32.
SSH from everywhere = 0.0.0.0/0, unsafe for beginner labs.
```

## 38. Vertical And Horizontal Scalability

Concept:
- Scalability means the system can handle more work.
- Vertical scaling means increasing the power of one machine.
- Horizontal scaling means adding more machines.

Vertical scaling:
- Example: change from `t3.micro` to a larger instance type.
- Simple to understand.
- Limited by maximum instance size.
- Usually needs a restart or replacement.

Horizontal scaling:
- Example: run two or more EC2 instances.
- Better for availability and larger traffic.
- Usually needs a load balancer.
- Often paired with Auto Scaling Groups.

Beginner comparison:

| Scaling type | Meaning | Example | Tradeoff |
|---|---|---|---|
| Vertical | Bigger server | `t3.micro` to `t3.small` | Simple, but has an upper limit |
| Horizontal | More servers | Two EC2 instances behind a load balancer | More resilient, but needs more architecture |

My learning decision:
- The playlist covers scaling concepts here.
- Application Load Balancer and Auto Scaling Groups are important missed practical topics.
- We will revisit them after the playlist in the missed-important-topics phase.

## Official References

- https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html
- https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security-groups.html
