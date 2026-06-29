# Phase 3 Notes

This phase covered AWS CLI, PowerShell automation, profile switching, identity checks, and turning console actions into repeatable commands.

Note source:
- These notes are based on the completed playlist video order/titles, the auto-generated Malayalam transcript context available from YouTube, and the CLI/PowerShell/Python lab work in this repo.
- They are paraphrased explanatory notes, not verbatim transcripts.

## 12. How to Use AWS CLI

Video focus:
- The video introduces AWS CLI as a terminal tool for controlling AWS.
- It connects the previous IAM lessons to practical terminal work, because the CLI needs credentials and permissions.

What the instructor is explaining:
- The AWS Console is graphical, but the AWS CLI lets you do the same kind of work from commands.
- The CLI talks to AWS APIs using credentials stored on your machine.
- Before running real commands, you should know which account, user, and region your terminal is using.

Important CLI setup ideas:
- Install AWS CLI.
- Configure credentials with `aws configure --profile <profile-name>`.
- Store real credentials in the default AWS location: `~/.aws/`.
- Use named profiles instead of mixing all credentials into one default identity.
- Keep access keys out of GitHub.

Commands explained:
- `aws --version` checks whether the CLI is installed.
- `aws configure list` shows where credentials and region are coming from.
- `aws configure list-profiles` lists saved profile names.
- `aws sts get-caller-identity` confirms the AWS account and identity being used.
- `aws s3 ls` lists S3 buckets visible to the current identity.
- `aws ec2 describe-instances` asks EC2 for instance details in the selected region.

Mental model:
- The CLI is not a separate AWS account.
- It is just another way to call AWS using an IAM identity.
- If the identity lacks permission, the CLI fails with `AccessDenied`.

Hands-on connection:
- We used profiles like `user1` and `vaishnav`.
- We used `aws sts get-caller-identity` as the first safety check.
- We created `check-aws-account.sh` to print the CLI version, identity, region, S3 buckets, and EC2 instances.

## 13. Simplify AWS Management with the CLI and PowerShell

Video focus:
- The video shows that AWS management can be automated from shells such as Bash and PowerShell.
- The key lesson is not the shell itself; it is repeatability.

What the instructor is explaining:
- Console clicks are useful for learning, but scripts are better when a task must be repeated.
- PowerShell can use AWS Tools modules with cmdlets such as `Get-IAMUserList`.
- Bash can run AWS CLI commands directly.
- The same AWS permissions still apply no matter which shell is used.

Important PowerShell ideas:
- `pwsh` starts PowerShell on macOS if installed.
- AWS PowerShell tools come as modules such as `AWS.Tools.Common` and `AWS.Tools.IdentityManagement`.
- A cmdlet is a PowerShell command, usually named with a verb-noun pattern.
- `Get-IAMUserList` calls IAM and returns IAM user objects.
- `-ProfileName user1` tells the AWS PowerShell cmdlet which local AWS profile to use.

Mental model:
- Bash, PowerShell, Python, and the AWS Console are different front doors.
- Behind the scenes, they still reach AWS APIs.
- IAM permissions decide what succeeds.

Hands-on connection:
- We installed the required AWS PowerShell modules from the downloaded AWS Tools bundle.
- We wrote `list-iam-user-arns.ps1` to list IAM users and print their ARNs.
- We also wrote a Python version using `boto3`.

What this taught:
- A script can turn a repeated AWS lookup into one command.
- If a PowerShell cmdlet is not recognized, the module is missing or not imported.
- If credentials are missing, the shell is fine; the AWS profile setup is the problem.

## 36. Convert AWS Console Actions to CLI Code with AI

Video focus:
- The video explains how to convert a console workflow into CLI commands, with AI helping translate the steps.
- This connects directly to the Codex workflow: watch the video, understand the console action, then turn it into a lab or script.

What the instructor is explaining:
- AWS Console actions map to AWS API calls.
- CLI commands are a text form of those API calls.
- AI can help generate the command, but you must still understand it before running it.
- Every generated command should be checked for permissions, region, cost, and cleanup impact.

Important workflow:
- Identify what the console action created or changed.
- Ask for the equivalent CLI command.
- Ask what each part of the command means.
- Test with read-only commands first when possible.
- Verify the result.
- Write cleanup commands if anything was created.

Mental model:
- Console learning teaches the shape of the service.
- CLI learning teaches repeatability.
- AI helps bridge the two, but understanding protects the AWS account.

Hands-on connection:
- We turned the IAM user ARN task into scripts.
- We compared three ways of doing the same kind of work: AWS CLI, Python `boto3`, and PowerShell.
- We debugged real errors such as `NoCredentials`, missing PowerShell modules, and file path problems.

## Hands-on recap

What we built:
- `check-aws-account.sh` for quick CLI account checks.
- `list-iam-user-arns.py` using Python and `boto3`.
- `list-iam-user-arns.ps1` using PowerShell and AWS Tools for PowerShell.
- `commands.md` with the commands used in the phase.
- `errors.md` with common CLI and PowerShell problems.
- `cleanup.md` explaining why this phase has local cleanup only.

What I should be able to explain now:
- What AWS CLI does.
- How the CLI talks to AWS.
- What credentials, profiles, and regions mean.
- Why `aws sts get-caller-identity` is the first command to run.
- How to switch profiles safely.
- Why missing credentials and missing permissions are different problems.
- Why scripts are useful after learning a console workflow.

Important cost note:
- This phase did not create AWS resources.
- Listing users, checking identity, listing buckets, and describing instances are read operations.
- Read-only commands are still permission-controlled, but they normally do not create charges.

Common mistakes to avoid:
- Running commands without checking the active profile.
- Assuming `default` is the profile you intended.
- Putting AWS keys inside the repo.
- Confusing macOS/Linux shell syntax with PowerShell syntax.
- Forgetting to import PowerShell AWS modules.
- Treating AI-generated CLI commands as safe without understanding them.
