# EC2 Automation With AWS CLI

Video covered:
- 18. Create EC2 Instances using AWS CLI

## What did I build?

A beginner-safe EC2 automation lab that launches, stops, starts, and cleans up an EC2 instance using AWS CLI commands.

The video shows the basic CLI path first:
- choose the correct AWS Region
- copy an Amazon Linux AMI ID from the console
- use a small instance type such as `t2.micro`
- keep the launch count at `1`
- provide a key-pair name
- run `aws ec2 run-instances`
- verify the created instance in the EC2 console
- use the instance ID to stop and start the instance

## Which AWS service did I use?

- Amazon EC2
- AWS CLI
- Optional: EC2 key pairs and security groups

## What did I learn?

- Console is useful for learning visually, but CLI is important for repeatable work.
- EC2 CLI commands need exact IDs and codes, not friendly console names.
- Region codes like `us-east-1` are used in automation.
- CLI output is usually JSON, and many AWS CLI commands can return arrays because they can work with multiple resources.
- `run-instances` creates instances.
- `stop-instances` stops running instances.
- `start-instances` starts stopped instances.
- Instance ID is the safe unique identifier to use for stop/start actions.

## How do I run it?

Use dry-run first:

```bash
AWS_PROFILE=user1 \
AWS_REGION=us-east-1 \
AMI_ID=ami-xxxxxxxxxxxxxxxxx \
KEY_NAME=your-key-pair-name \
INSTANCE_COUNT=1 \
./launch-ec2.sh
```

Launch only when you are ready:

```bash
CONFIRM_LAUNCH=yes \
AWS_PROFILE=user1 \
AWS_REGION=us-east-1 \
AMI_ID=ami-xxxxxxxxxxxxxxxxx \
KEY_NAME=your-key-pair-name \
INSTANCE_COUNT=1 \
./launch-ec2.sh
```

Stop or start the instance:

```bash
ACTION=stop INSTANCE_ID=i-xxxxxxxxxxxxxxxxx ./cleanup-ec2.sh
ACTION=start INSTANCE_ID=i-xxxxxxxxxxxxxxxxx ./cleanup-ec2.sh
```

Terminate only after you are done:

```bash
ACTION=terminate CONFIRM_TERMINATE=yes INSTANCE_ID=i-xxxxxxxxxxxxxxxxx ./cleanup-ec2.sh
```

## How do I delete it?

Terminate the EC2 instance, then check for leftovers:
- EC2 instance state is `terminated`
- no unused EBS volume is left behind
- no Elastic IP was created or left unattached
- no private key file was committed to GitHub

## Files

- [`commands.md`](./commands.md)
- [`workflow.md`](./workflow.md)
- [`explanation.md`](./explanation.md)
- [`cleanup.md`](./cleanup.md)
- [`mistakes.md`](./mistakes.md)
- [`troubleshooting.md`](./troubleshooting.md)
- [`launch-ec2.sh`](./launch-ec2.sh)
- [`cleanup-ec2.sh`](./cleanup-ec2.sh)
