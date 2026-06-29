# Linux EC2 Instance Lab

Video:
- 16. How to create Linux EC2 instance

## What Did I Build?

A beginner Linux EC2 instance using Amazon Linux 2023.

The lab focuses on launching a Linux server, creating/downloading a key pair, allowing SSH, connecting with `ssh`, and understanding why old practice instances should be stopped or terminated.

## Which AWS Service Did I Use?

- Amazon EC2
- Amazon EBS
- Security Groups
- Key Pairs

## What Did I Learn?

- Linux EC2 launch is similar to Windows EC2 launch, but connection uses SSH instead of RDP.
- Amazon Linux 2023 is a beginner-friendly AMI and can be Free Tier eligible when the console shows it.
- `t2.micro` or another console-confirmed Free Tier eligible type should be used for beginner practice.
- A `.pem` private key proves identity during SSH login.
- Amazon Linux uses `ec2-user` as the default SSH username.
- Public IPv4 is used to connect from your laptop over the internet.
- Private IPv4 is for internal network communication and will not work directly from your laptop.
- Opening HTTP during launch prepares the instance for the next web server lab.

## How Do I Run It?

Use the console workflow in [`workflow.md`](./workflow.md), then use the SSH commands in [`commands.md`](./commands.md).

Minimal SSH example:

```bash
chmod 400 /path/to/key.pem
ssh -i /path/to/key.pem ec2-user@PUBLIC_IPV4
```

## How Do I Delete It?

Use [`cleanup.md`](./cleanup.md).

For short practice labs, terminate instances you no longer need and check for leftover EBS volumes.
