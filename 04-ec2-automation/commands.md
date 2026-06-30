# Commands

## Identity And Region

```bash
AWS_PROFILE=user1 aws sts get-caller-identity
AWS_PROFILE=user1 aws configure get region
AWS_PROFILE=user1 aws ec2 describe-regions --output table
```

## Find An Amazon Linux AMI

AMI IDs are Region-specific. Use the same Region for AMI lookup and launch.

```bash
AWS_PROFILE=user1 AWS_REGION=us-east-1 aws ec2 describe-images \
  --region us-east-1 \
  --owners amazon \
  --filters "Name=name,Values=al2023-ami-2023*-x86_64" \
  --query "Images | sort_by(@, &CreationDate)[-1].{ImageId:ImageId,Name:Name}" \
  --output table
```

## Minimal Launch Command From The Video

```bash
AWS_PROFILE=user1 aws ec2 run-instances \
  --region us-east-1 \
  --image-id ami-xxxxxxxxxxxxxxxxx \
  --instance-type t2.micro \
  --count 1 \
  --key-name your-key-pair-name
```

## My Hyderabad Region Launch Command

This is the command I practiced for launching one EC2 instance in `ap-south-2`.

Important:
- This creates a real EC2 instance if the AMI, key pair, VPC, and permissions are valid.
- Check your budget before running it.
- `t3.micro` may not be Free Tier eligible for every account or Region, so confirm in the console first.
- Because no subnet or security group is specified, AWS uses the default VPC/default subnet/default security group if available.

```bash
aws ec2 run-instances \
  --image-id ami-0ffa797f35095b9f7 \
  --region ap-south-2 \
  --instance-type t3.micro \
  --key-name kp \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=aws-learning-server}]'
```

Safer dry-run version:

```bash
aws ec2 run-instances \
  --image-id ami-0ffa797f35095b9f7 \
  --region ap-south-2 \
  --instance-type t3.micro \
  --key-name kp \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=aws-learning-server}]' \
  --dry-run
```

## Safer Scripted Launch

Dry-run first:

```bash
AWS_PROFILE=user1 \
AWS_REGION=us-east-1 \
AMI_ID=ami-xxxxxxxxxxxxxxxxx \
KEY_NAME=your-key-pair-name \
INSTANCE_COUNT=1 \
./launch-ec2.sh
```

Launch:

```bash
CONFIRM_LAUNCH=yes \
AWS_PROFILE=user1 \
AWS_REGION=us-east-1 \
AMI_ID=ami-xxxxxxxxxxxxxxxxx \
KEY_NAME=your-key-pair-name \
INSTANCE_COUNT=1 \
./launch-ec2.sh
```

## Stop And Start

```bash
AWS_PROFILE=user1 aws ec2 stop-instances \
  --region us-east-1 \
  --instance-ids i-xxxxxxxxxxxxxxxxx

AWS_PROFILE=user1 aws ec2 start-instances \
  --region us-east-1 \
  --instance-ids i-xxxxxxxxxxxxxxxxx
```

## Multiple Instance IDs

The video explains that `--instance-ids` can accept more than one ID separated by spaces.

```bash
AWS_PROFILE=user1 aws ec2 stop-instances \
  --region us-east-1 \
  --instance-ids i-aaaaaaaaaaaaaaaaa i-bbbbbbbbbbbbbbbbb
```

## Inspect Instances

```bash
AWS_PROFILE=user1 aws ec2 describe-instances \
  --region us-east-1 \
  --query "Reservations[].Instances[].{Name:Tags[?Key=='Name']|[0].Value,InstanceId:InstanceId,State:State.Name,Type:InstanceType,PublicIp:PublicIpAddress}" \
  --output table
```
