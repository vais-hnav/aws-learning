# Mistakes

## Using The Wrong Region

Problem:
- The instance is created, but you cannot see it in the console.

Why:
- The CLI used a different Region than the console.

Fix:
- Check `AWS_REGION`.
- Check `aws configure get region`.
- Use `--region` explicitly while learning.

## Using An AMI From Another Region

Problem:
- `run-instances` fails with an AMI error.

Why:
- AMI IDs are Region-specific.

Fix:
- Look up the AMI in the same Region where you launch.

## Confusing Key Name And `.pem` File

Problem:
- You pass the local file path to `--key-name`.

Why:
- `--key-name` expects the AWS key-pair name, not the private-key file path.

Fix:
- Use the key-pair name from the EC2 console.
- Keep the `.pem` private key outside GitHub.

## Forgetting The Instance ID

Problem:
- Stop/start commands fail.

Why:
- EC2 stop/start uses instance IDs, not display names.

Fix:
- Copy the value starting with `i-`.
- Use `describe-instances` to find it again.

## Creating More Than One Instance

Problem:
- More instances launch than expected.

Why:
- `--count` can create multiple instances.

Fix:
- Do not use `--count` while practicing unless the lab asks for it.
- Check the EC2 console and terminate accidental instances.
