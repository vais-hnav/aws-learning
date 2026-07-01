# EC2 Instance Connect

Video covered:
- 20. EC2 Instance Connect

## What did I build?

A browser-based connection lab for connecting to a Linux EC2 instance without using a local SSH client or manually passing a `.pem` private key.

## Which AWS service did I use?

- Amazon EC2
- EC2 Instance Connect
- IAM permissions

## What did I learn?

- EC2 Instance Connect is a simpler way to connect to Linux EC2 instances from the AWS console.
- It is still SSH-based, but AWS opens the session through the browser.
- For Amazon Linux, the default username is usually `ec2-user`.
- It is useful when local SSH/private-key setup is confusing.
- The IAM user must have permission to use EC2 Instance Connect.
- An admin user may work immediately, but a least-privilege user needs specific EC2 Instance Connect permissions.

## How do I run it?

1. Open the EC2 console.
2. Select a running Linux EC2 instance.
3. Click `Connect`.
4. Choose `EC2 Instance Connect`.
5. Keep the username as `ec2-user` for Amazon Linux.
6. Click `Connect`.
7. A browser terminal opens.
8. Run a simple command:

```bash
whoami
pwd
ls
```

## How do I delete it?

There is no separate EC2 Instance Connect resource to delete.

Cleanup means:
- close the browser terminal
- stop or terminate the EC2 instance if the lab is finished
- check EBS volumes and Elastic IPs
- check Billing and Budgets after EC2 practice

## Files

- [`commands.md`](./commands.md)
- [`workflow.md`](./workflow.md)
- [`cleanup.md`](./cleanup.md)
- [`mistakes.md`](./mistakes.md)
