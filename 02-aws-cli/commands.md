# AWS CLI Commands

This file will explain the AWS CLI commands used in the lab.

Example Python script for IAM user ARNs:
```bash
python3 02-aws-cli/list-iam-user-arns.py --profile user1
```

Or use the current profile:
```bash
AWS_PROFILE=user1 python3 02-aws-cli/list-iam-user-arns.py
```

Before running the script, make sure `boto3` is installed:
```bash
python3 -m pip install boto3
```
