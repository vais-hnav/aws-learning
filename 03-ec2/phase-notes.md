# Phase 4 Notes

This phase covers EC2 virtual servers, launching instances, connecting to instances, hosting a website, and EC2 cost control.

Note source:
- Based on playlist video order/titles, available auto-generated Malayalam transcript context from YouTube, and EC2 lab work in this repo.
- Paraphrased explanatory notes, not verbatim transcripts.

## 15. Introduction to AWS EC2 Service

Concept:
- EC2 lets you create virtual computers inside AWS.
- Each virtual computer is an EC2 instance.
- Instance type is the CPU/RAM size.
- AMI is the operating system/template.
- Security group is the network firewall.
- Key pair/private key is used for secure login.
- Instance states include `running`, `stopped`, and `terminated`.

Video hands-on:
- Opens the EC2 service after IAM.
- Explains EC2 using the physical-computer analogy: CPU, RAM, storage, and network.
- Walks through the Launch Instance screen.
- Shows naming an instance, choosing an AMI, choosing an instance type, key pair/security settings, storage, and launch.
- Shows instance state changing to `running`.
- Demonstrates stopping and starting an instance.
- Warns that running EC2 instances can create charges.

My hands-on:
- Prepared the `ec2-introduction` lab.
- Added read-only EC2 commands for identity, regions, existing instances, and instance type information.
- Did not require launching a new instance for this repo lab yet.

Commands / files:
- `AWS_PROFILE=user1 aws sts get-caller-identity`
- `AWS_PROFILE=user1 aws ec2 describe-regions --output table`
- `AWS_PROFILE=user1 aws ec2 describe-instances --output table`
- `03-ec2/ec2-introduction/`

Warnings / cleanup:
- EC2 can create charges.
- Stopped is not the same as terminated.
- Attached EBS storage can remain.
- Private key files must never be committed.
- For short labs, terminate the instance and check leftover EBS volumes.

Official references:
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-lifecycle.html
- https://aws.amazon.com/ec2/pricing/on-demand/
- https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html
