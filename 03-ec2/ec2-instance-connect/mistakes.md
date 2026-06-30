# Mistakes

## Trying It On A Windows Instance

Problem:
- EC2 Instance Connect is not the right connection method for the Windows EC2 flow.

Fix:
- Use it for supported Linux instances.

## Wrong Username

Problem:
- Connection fails.

Why:
- The username does not match the AMI.

Fix:
- Amazon Linux usually uses `ec2-user`.
- Ubuntu usually uses `ubuntu`.

## Missing IAM Permission

Problem:
- The console shows a permission/access error.

Why:
- The IAM user does not have permission to send the temporary SSH public key.

Fix:
- Use the admin learning user for this beginner lab.
- Later, create least-privilege EC2 Instance Connect permissions.

## Instance Not Running

Problem:
- Connect button is unavailable or connection fails.

Fix:
- Start the instance and wait until it is `running`.

## Forgetting Cleanup

Problem:
- The browser tab is closed, but the EC2 instance is still running.

Fix:
- Always stop or terminate the instance after the connection practice.
