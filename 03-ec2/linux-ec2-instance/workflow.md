# Workflow

## Video Flow

1. Open the EC2 console.
2. Choose `Launch instance`.
3. Enter a clear instance name.
4. Choose `Amazon Linux`.
5. Keep the default Amazon Linux 2023 AMI if it is marked Free Tier eligible.
6. Choose a Free Tier eligible instance type such as `t2.micro` when available.
7. Create a new key pair.
8. Download the `.pem` file and keep it safe.
9. Leave SSH allowed so you can connect to the instance.
10. Allow HTTP traffic because the next video uses the same instance for a website.
11. Keep the default 8 GiB Linux EBS volume.
12. Launch the instance.
13. Wait until the instance state is `running`.
14. Copy the public IPv4 address.
15. Connect with SSH using the private key and `ec2-user`.

## My Hands-On Flow

This lab follows the same beginner path:

- Launch one Amazon Linux EC2 instance.
- Use one key pair for SSH.
- Connect using the public IPv4 address.
- Test the Linux shell with simple commands such as `mkdir` and `ls`.
- Keep the instance only if immediately continuing to the Apache website lab.

## Important Concept

Stopping and terminating are different:

- `Stop` shuts down the instance but keeps the EBS volume.
- `Terminate` deletes the instance and usually deletes the root EBS volume.

The video warns that multiple running instances can consume Free Tier hours faster.
