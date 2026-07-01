# AWS CLI Cleanup

This phase does not create AWS resources.

Cleanup is local only:
- unset any temporary `AWS_PROFILE` value if you exported one
  ```bash
  unset AWS_PROFILE
  ```
- delete any temporary test credentials from `~/.aws/` only if they were created for a lab
- close the terminal session if you no longer need it
- keep the repository free of real secrets
