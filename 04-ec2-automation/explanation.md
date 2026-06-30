# Explanation

## Why CLI After Console?

The video explains that the console is best for first-time learning because you can see each option visually. In real work, teams often use CLI, scripts, SDKs, or infrastructure-as-code tools because repeated manual console clicks are hard to track and easy to do differently each time.

## Important Inputs

`--image-id`

The AMI ID selects the operating system template. In this lab, it should be an Amazon Linux AMI from the same Region where you launch the instance.

`--instance-type`

The instance type controls CPU and memory size. For beginner practice, use a small Free Tier eligible type when the console confirms it is eligible.

`--key-name`

The key-pair name tells EC2 which public key to place on the instance. The matching `.pem` private key stays on your laptop and must never be committed.

`--count`

The count says how many instances to create. Keep this as `1` for beginner practice.

`--region`

Automation uses Region codes such as `us-east-1`, not friendly names like "North Virginia". If `--region` is not passed, AWS CLI uses the Region configured for the selected profile.

`--instance-ids`

Start and stop commands use the instance ID, not the display name. The instance ID is unique and starts with `i-`.

## JSON Output

AWS CLI commonly returns JSON. The `run-instances` response contains an `Instances` array because the command can create more than one instance. You can reduce the output with `--query` and make it easier to read with `--output table`.

## Count And Multiple Resources

The video points out that `run-instances` supports creating multiple instances. For learning, create only one instance unless a lab explicitly asks for more. Multiple instances can use Free Tier hours faster and can create surprise charges.

## Explanation Of My Command

Command:

```bash
aws ec2 run-instances \
  --image-id ami-0ffa797f35095b9f7 \
  --region ap-south-2 \
  --instance-type t3.micro \
  --key-name kp \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=aws-learning-server}]'
```

What it does:
- It asks AWS EC2 to launch a new virtual server.
- It launches the server in the `ap-south-2` Region.
- It uses the AMI `ami-0ffa797f35095b9f7` as the operating system/template.
- It uses `t3.micro` as the server size.
- It attaches the EC2 key pair named `kp` so the matching private key can be used for SSH.
- It adds a Name tag so the instance appears as `aws-learning-server` in the EC2 console.

Line-by-line:

`aws ec2 run-instances`

This is the EC2 create/launch command. It creates an instance from an AMI.

`--image-id ami-0ffa797f35095b9f7`

This tells AWS which AMI to boot from. AMI IDs are Region-specific, so this AMI must exist in `ap-south-2`.

`--region ap-south-2`

This overrides the default CLI Region and launches the instance in Asia Pacific Hyderabad. If you open the EC2 console in another Region, you will not see this instance.

`--instance-type t3.micro`

This chooses the CPU/RAM size. `t3.micro` is a small burstable instance type, but still verify Free Tier eligibility in your account before running it.

`--key-name kp`

This uses the EC2 key pair named `kp`. This is the AWS key-pair name, not the local `.pem` file path. The key pair must exist in `ap-south-2`.

`--tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=aws-learning-server}]'`

This adds a tag to the instance. The `Name` tag is what the EC2 console shows as the instance name.

Hidden defaults:
- No `--count` is provided, so the CLI launches one instance by default.
- No `--subnet-id` is provided, so AWS uses a default subnet if the default VPC exists.
- No `--security-group-ids` is provided, so AWS uses the default security group for the VPC.
- No `--query` or `--output` is provided, so AWS returns the full JSON response.

Beginner safety:
- Add `--dry-run` first to test permissions and parameters without creating the instance.
- Save the returned `InstanceId`; you need it for stop, start, and terminate commands.
- Terminate the instance when the lab is complete.
