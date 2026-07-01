# AWS CLI Commands

This phase teaches three things:
- how to trust the identity your terminal is using
- how to switch AWS profiles safely
- how to translate console actions into CLI or script form

Core AWS CLI commands:
```bash
aws --version
aws configure list
aws sts get-caller-identity
aws s3 ls
aws ec2 describe-regions
aws ec2 describe-instances
```

What each one is for:
- `aws --version` checks that the CLI is installed
- `aws configure list` shows where credentials and region are coming from
- `aws sts get-caller-identity` proves which account and identity you are using
- `aws s3 ls` lists buckets in the account
- `aws ec2 describe-regions` shows AWS regions
- `aws ec2 describe-instances` shows EC2 instances in the current region

Example Bash script:
```bash
bash phase-03-aws-cli-automation/check-aws-account.sh
```

Example Python script for IAM user ARNs:
```bash
python3 phase-03-aws-cli-automation/list-iam-user-arns.py --profile user1
```

Or use the current profile:
```bash
AWS_PROFILE=user1 python3 phase-03-aws-cli-automation/list-iam-user-arns.py
```

Before running the script, make sure `boto3` is installed:
```bash
python3 -m pip install boto3
```

PowerShell version:
```powershell
pwsh ./phase-03-aws-cli-automation/list-iam-user-arns.ps1 -ProfileName user1
```

Or use the current `AWS_PROFILE` value:
```powershell
$env:AWS_PROFILE = "user1"
pwsh ./phase-03-aws-cli-automation/list-iam-user-arns.ps1
```
