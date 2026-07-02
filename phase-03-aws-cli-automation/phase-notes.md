# Phase 3 Notes

This phase covered AWS CLI, PowerShell automation, profile switching, identity checks, and converting console actions into commands/scripts.

Note source:
- Based on playlist video order/titles, available auto-generated transcript context from YouTube, and CLI/PowerShell/Python lab work in this repo.
- Paraphrased explanatory notes, not verbatim transcripts.

## 12. How to Use AWS CLI

Concept:
- AWS CLI is the terminal way to call AWS APIs.
- It uses local credentials and region settings from profiles.
- The CLI succeeds or fails based on IAM permissions.

Video hands-on:
- Introduces AWS CLI after IAM.
- Shows why CLI needs configured credentials.
- Demonstrates using terminal commands instead of console clicks.
- Emphasizes checking identity before managing AWS resources.

My hands-on:
- Configured named AWS profiles.
- Used `aws sts get-caller-identity` to confirm the active identity.
- Created `check-aws-account.sh`.

Commands / files:
- `aws --version`
- `aws configure list`
- `aws configure list-profiles`
- `AWS_PROFILE=user1 aws sts get-caller-identity`
- `AWS_PROFILE=user1 aws s3 ls`
- `phase-03-aws-cli-automation/check-aws-account.sh`

Warnings / cleanup:
- No AWS resources created.
- Do not store real credentials in the repo.
- Always check profile and region before running commands.

## 13. Simplify AWS Management with the CLI and PowerShell

Concept:
- Scripts make repeated AWS tasks faster and more reliable.
- Bash, PowerShell, Python, and the AWS Console all reach AWS APIs.
- IAM permissions still control what each tool can do.

Video hands-on:
- Shows AWS management through CLI/PowerShell style automation.
- Demonstrates that AWS tasks can be repeated from scripts instead of console clicks.

My hands-on:
- Installed/loaded AWS PowerShell modules locally.
- Created `list-iam-user-arns.ps1`.
- Created `list-iam-user-arns.py` using `boto3`.
- Ran the scripts to list IAM user ARNs.

Commands / files:
- `pwsh ./phase-03-aws-cli-automation/list-iam-user-arns.ps1 -ProfileName user1`
- `python3 phase-03-aws-cli-automation/list-iam-user-arns.py --profile user1`
- `phase-03-aws-cli-automation/list-iam-user-arns.ps1`
- `phase-03-aws-cli-automation/list-iam-user-arns.py`

Warnings / cleanup:
- `Get-IAMUserList` requires the AWS PowerShell IAM module.
- `NoCredentials` means the profile/credentials are missing, not that the script syntax is wrong.
- No AWS resource cleanup needed because these were read/list operations.

## 36. Convert AWS Console Actions to CLI Code with AI

Concept:
- Console actions map to AWS API calls.
- CLI commands are repeatable versions of those actions.
- AI can help generate commands, but commands must still be reviewed for permissions, region, cost, and cleanup.

Video hands-on:
- Demonstrates converting a console workflow into CLI-style commands using AI assistance.
- Shows the value of understanding the command before running it.

My hands-on:
- Converted the IAM user ARN task into Python and PowerShell scripts.
- Debugged real issues: missing credentials, missing PowerShell module, and incorrect file paths.
- Updated command/error docs for the CLI phase.

Commands / files:
- `phase-03-aws-cli-automation/commands.md`
- `phase-03-aws-cli-automation/errors.md`
- `phase-03-aws-cli-automation/cleanup.md`

Warnings / cleanup:
- Do not blindly run AI-generated commands.
- Prefer read-only commands first.
- If a command creates resources, write cleanup commands before running it.

## Phase 3 Recap

Built:
- Account checker Bash script.
- IAM user ARN Python script.
- IAM user ARN PowerShell script.
- CLI command notes.
- CLI error notes.
- Local cleanup checklist.

Must remember:
- `AWS_PROFILE` controls which identity a command uses.
- `aws sts get-caller-identity` is the first safety check.
- Region matters for regional services.
- Missing credentials and missing permissions are different problems.
