# Workflow

## Video Flow

The video demonstrates a faster connection path for Linux EC2:

1. Sign in with an IAM user that has enough permissions.
2. Open the EC2 console.
3. Select the Linux EC2 instance.
4. Confirm it is an Amazon Linux instance by checking the AMI details.
5. Click `Connect`.
6. Use the first tab: `EC2 Instance Connect`.
7. Keep the default username if it matches the AMI.
8. Click `Connect`.
9. Use the browser terminal like a normal Linux shell.

## Why It Feels Easier Than SSH

Earlier, SSH required:
- local terminal
- `.pem` private key
- correct key permissions
- public IPv4 or DNS
- username

EC2 Instance Connect reduces local setup:
- no local private-key file is selected
- the connection opens in the browser
- the console fills common defaults like `ec2-user`

## Important Permission Point

The video explains that EC2 Instance Connect works only if the signed-in IAM user has the required permissions. An admin user can usually connect immediately, but a restricted IAM user may need an additional policy.

## My Lab Steps

1. Use the running Linux instance from the EC2 labs, or create a short-lived one.
2. Connect using EC2 Instance Connect.
3. Run simple shell commands.
4. Close the browser terminal.
5. Stop or terminate the EC2 instance after practice.
