# AWS CLI Errors

Common beginner errors in this phase:

- `NoCredentials`
  - The CLI or script cannot find any AWS access keys.
  - Fix: run `aws configure --profile <name>` or set `AWS_PROFILE`.

- `ProfileNotFound`
  - The profile name does not exist in `~/.aws/credentials` or `~/.aws/config`.
  - Fix: check `aws configure list-profiles`.

- `AccessDenied`
  - Your identity exists, but it does not have permission for the action.
  - Fix: update IAM permissions or use the right profile.

- `InvalidClientTokenId`
  - The access key is wrong, inactive, or copied incorrectly.
  - Fix: re-check the access key and secret key.

- Wrong region
  - The command works for the account, but not in the region you expected.
  - Fix: check `aws configure get region` and `AWS_PROFILE`.

- `pwsh: command not found`
  - PowerShell is not installed or not in `PATH`.
  - Fix: install PowerShell or use another terminal.

- `Get-IAMUserList is not recognized`
  - The AWS PowerShell module is missing or not imported.
  - Fix: install/import `AWS.Tools.IdentityManagement`.
