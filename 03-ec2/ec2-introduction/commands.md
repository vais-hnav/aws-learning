# Commands

Use these commands after watching video 15.

## Confirm Identity

```bash
AWS_PROFILE=user1 aws sts get-caller-identity
```

Why:
- Confirms which AWS account and IAM identity your terminal is using.
- Always do this before running EC2 commands.

## Show Regions

```bash
AWS_PROFILE=user1 aws ec2 describe-regions --output table
```

Why:
- EC2 is regional.
- Instances created in one region will not appear in another region's EC2 dashboard.

## List Existing EC2 Instances

```bash
AWS_PROFILE=user1 aws ec2 describe-instances \
  --query 'Reservations[].Instances[].{InstanceId:InstanceId,State:State.Name,Type:InstanceType,Name:Tags[?Key==`Name`]|[0].Value}' \
  --output table
```

Why:
- Shows whether there are already EC2 instances in the current region.
- Helps catch forgotten running instances.

## List Instances Across One Specific Region

Replace `ap-south-1` with your learning region if needed.

```bash
AWS_PROFILE=user1 aws ec2 describe-instances \
  --region ap-south-1 \
  --query 'Reservations[].Instances[].{InstanceId:InstanceId,State:State.Name,Type:InstanceType,Name:Tags[?Key==`Name`]|[0].Value}' \
  --output table
```

## Show Instance Type Information

```bash
AWS_PROFILE=user1 aws ec2 describe-instance-types \
  --instance-types t3.micro \
  --query 'InstanceTypes[].{Type:InstanceType,vCPU:VCpuInfo.DefaultVCpus,MemoryMiB:MemoryInfo.SizeInMiB}' \
  --output table
```

Why:
- Connects the video's CPU/RAM explanation to an actual AWS CLI lookup.
- Helps you understand what an instance type means.
