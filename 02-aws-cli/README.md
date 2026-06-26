# Phase 3: AWS CLI

Goal:
Learn how to check your AWS identity and work safely from the terminal.

Local setup:
- Keep AWS CLI config files in your home directory at `~/.aws/`
- Do not create a real `.aws/` folder inside this repo
- Use named profiles so you can switch between learning and any other AWS accounts safely

Recommended setup:
```bash
aws configure --profile aws-learning
AWS_PROFILE=aws-learning aws sts get-caller-identity
```

Expected lab files when you build this phase:
- `check-aws-account.sh`
- `list-iam-user-arns.py`
- `commands.md`
- `errors.md`
- `cleanup.md`
