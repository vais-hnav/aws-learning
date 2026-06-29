# Commands

Replace placeholders before running commands:

- `KEY_PATH` with your local `.pem` file path
- `PUBLIC_IPV4` with the EC2 public IPv4 address
- `INSTANCE_ID` with your EC2 instance ID

## SSH From macOS/Linux

```bash
chmod 400 KEY_PATH
ssh -i KEY_PATH ec2-user@PUBLIC_IPV4
```

Example shape:

```bash
chmod 400 ~/Downloads/aws-learning-key.pem
ssh -i ~/Downloads/aws-learning-key.pem ec2-user@12.34.56.78
```

## SSH From Windows PowerShell

```powershell
ssh -i "C:\path\to\key.pem" ec2-user@PUBLIC_IPV4
```

## Test The Linux Shell

Run these after SSH connection:

```bash
mkdir test-folder
ls
pwd
exit
```

## Inspect Instances With AWS CLI

```bash
AWS_PROFILE=user1 aws ec2 describe-instances \
  --query 'Reservations[].Instances[].{InstanceId:InstanceId,State:State.Name,Type:InstanceType,PublicIp:PublicIpAddress,Name:Tags[?Key==`Name`]|[0].Value}' \
  --output table
```

## Terminate An Instance

```bash
AWS_PROFILE=user1 aws ec2 terminate-instances --instance-ids INSTANCE_ID
```
