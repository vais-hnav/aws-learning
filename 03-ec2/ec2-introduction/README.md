# EC2 Introduction Lab

Video:
- 15. Introduction to AWS EC2 Service

## What Did I Build?

This is a beginner-safe EC2 orientation lab.

The goal is to understand the EC2 launch screen, important EC2 terms, and current EC2 state in the account before creating a real Linux server in the next lab.

This lab does not require creating an instance.

## Which AWS Service Did I Use?

- Amazon EC2
- IAM indirectly, because CLI/API access still depends on permissions

## What Did I Learn?

- EC2 means virtual computers in AWS.
- An EC2 instance is one virtual computer.
- An instance type is the CPU/RAM size choice.
- An AMI is the operating system/template choice.
- A security group controls network access like a firewall.
- A key pair is used for secure login.
- Running EC2 instances can create charges.
- Stopped instances can still leave storage behind.
- Termination is the normal cleanup choice for short practice labs.

## How Do I Run It?

Use the commands in [`commands.md`](./commands.md) to inspect EC2 safely.

These commands are read-only:
```bash
AWS_PROFILE=user1 aws sts get-caller-identity
AWS_PROFILE=user1 aws ec2 describe-regions --output table
AWS_PROFILE=user1 aws ec2 describe-instances \
  --query 'Reservations[].Instances[].{InstanceId:InstanceId,State:State.Name,Type:InstanceType,Name:Tags[?Key==`Name`]|[0].Value}' \
  --output table
```

## How Do I Delete It?

This orientation lab should not create resources.

If you created an EC2 instance while following the video, use [`cleanup.md`](./cleanup.md) before moving on.
