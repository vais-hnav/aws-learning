# Phase 7D: EC2 Instance Profile With S3

Goal:
Use IAM roles and EC2 instance profiles so EC2 can access S3 without storing access keys on the instance.

Video:
- 35. EC2 Instance Profile hands-on - complete

Labs:
- `ec2-instance-profile-s3/`

What I learned from video 35:
- EC2 should use IAM roles/instance profiles instead of access keys stored on the instance.
- An IAM role contains the permissions.
- An instance profile is the wrapper that lets EC2 receive that role.
- Applications and CLI commands on EC2 can use temporary credentials from the instance metadata service.
- This is safer than copying `aws_access_key_id` and `aws_secret_access_key` onto a server.

Safety:
- Prefer roles over long-term access keys on EC2.
- Remove test roles, instance profiles, policies, EC2 instances, and S3 buckets after practice.
