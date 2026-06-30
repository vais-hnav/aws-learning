# Commands

EC2 Instance Connect is mostly console-based, but these commands help verify the instance before and after the connection.

## Check Identity

```bash
AWS_PROFILE=user1 aws sts get-caller-identity
```

## List Running Instances

```bash
AWS_PROFILE=user1 aws ec2 describe-instances \
  --query "Reservations[].Instances[].{Name:Tags[?Key=='Name']|[0].Value,InstanceId:InstanceId,State:State.Name,Platform:PlatformDetails,PublicIp:PublicIpAddress}" \
  --output table
```

## Commands To Run Inside Browser Terminal

```bash
whoami
pwd
ls
cat /etc/os-release
```

Expected idea:
- `whoami` should show the Linux user, often `ec2-user` for Amazon Linux.
- `/etc/os-release` confirms the operating system.

## Optional IAM Permission Reference

Least-privilege users may need permissions related to:

```text
ec2-instance-connect:SendSSHPublicKey
ec2:DescribeInstances
```

For now, do not add broad permissions unless a lab asks for it.
