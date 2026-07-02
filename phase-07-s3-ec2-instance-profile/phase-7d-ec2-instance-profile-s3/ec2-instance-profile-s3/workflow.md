# Workflow

## Video 35: EC2 Instance Profile Hands-On

Concept:
- EC2 should not store long-term AWS access keys.
- IAM roles provide temporary credentials to AWS services.
- An instance profile is how an IAM role is attached to an EC2 instance.
- Once attached, applications and CLI commands on the EC2 instance can call AWS APIs using the role.

Console workflow:

1. Create or reuse a private S3 bucket.
2. Upload a small test object.
3. Open IAM.
4. Create a role.
5. Choose EC2 as the trusted service.
6. Attach or create a least-privilege S3 read policy.
7. Name the role clearly.
8. Open EC2.
9. Select the target instance.
10. Attach or replace the IAM role.
11. Connect to the EC2 instance.
12. Run `aws sts get-caller-identity`.
13. Run `aws s3 ls s3://BUCKET_NAME/`.
14. Download a test object from S3.
15. Confirm no access keys were configured on the instance.

Important:

```text
Role = permissions.
Instance profile = role wrapper for EC2.
EC2 receives temporary credentials automatically.
```

Why this is safer:
- No long-term access key is copied to the server.
- Credentials rotate automatically.
- Permissions can be changed centrally in IAM.
- Removing the role removes the instance's AWS access.

Beginner safety:
- Start with read-only S3 access.
- Limit access to one practice bucket.
- Remove the role/profile after the lab if it was only created for practice.

Official references:
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
- https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html
