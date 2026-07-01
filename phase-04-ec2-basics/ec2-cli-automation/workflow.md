# Workflow

## Video Flow

The video moves from console learning to CLI automation:

1. Start with the EC2 launch experience you already learned in the console.
2. Choose the Region where the instance should be created.
3. Open the AMI catalog and copy the Amazon Linux AMI ID.
4. Use a Free Tier eligible instance type such as `t2.micro` where available.
5. Create or reuse a key pair, then pass its key-pair name to the CLI.
6. Keep the count at `1` for beginner practice.
7. Run `aws ec2 run-instances` with the minimum required inputs.
8. Read the JSON response and verify the instance in the EC2 console.
9. Copy the instance ID.
10. Use `aws ec2 stop-instances` to stop the instance.
11. Use `aws ec2 start-instances` to start it again.

## Lab Workflow

1. Confirm the AWS profile and Region.

```bash
AWS_PROFILE=user1 aws sts get-caller-identity
AWS_PROFILE=user1 aws configure get region
```

2. Pick the AMI ID from the same Region where you will launch.

```bash
AWS_PROFILE=user1 aws ec2 describe-images \
  --owners amazon \
  --filters "Name=name,Values=al2023-ami-2023*-x86_64" \
  --query "Images | sort_by(@, &CreationDate)[-1].{ImageId:ImageId,Name:Name}" \
  --output table
```

3. Run the safe dry-run.

```bash
AWS_PROFILE=user1 \
AWS_REGION=us-east-1 \
AMI_ID=ami-xxxxxxxxxxxxxxxxx \
KEY_NAME=your-key-pair-name \
INSTANCE_COUNT=1 \
./launch-ec2.sh
```

4. Launch only after checking the Region, AMI, key pair, and budget.

```bash
CONFIRM_LAUNCH=yes \
AWS_PROFILE=user1 \
AWS_REGION=us-east-1 \
AMI_ID=ami-xxxxxxxxxxxxxxxxx \
KEY_NAME=your-key-pair-name \
INSTANCE_COUNT=1 \
./launch-ec2.sh
```

5. Save the instance ID from the output.

6. Stop the instance.

```bash
ACTION=stop INSTANCE_ID=i-xxxxxxxxxxxxxxxxx ./cleanup-ec2.sh
```

7. Start it again if you are practicing the video command.

```bash
ACTION=start INSTANCE_ID=i-xxxxxxxxxxxxxxxxx ./cleanup-ec2.sh
```

8. Terminate it after the lab.

```bash
ACTION=terminate CONFIRM_TERMINATE=yes INSTANCE_ID=i-xxxxxxxxxxxxxxxxx ./cleanup-ec2.sh
```

## What To Observe

- `run-instances` returns JSON.
- The response contains an `Instances` array.
- The instance ID starts with `i-`.
- Instance state changes are not instant; wait for `pending`, `running`, `stopping`, or `stopped`.
- If you do not pass `--region`, AWS CLI uses the Region configured for the selected profile.
