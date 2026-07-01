# Workflow

1. Save the inline policy in `user1-s3-read-only-policy.json`
2. Attach it to IAM user `user1` from an admin-capable profile
3. Test bucket listing with `aws s3 ls s3://proj1s3-dev/`
4. Test object read with `aws s3 cp s3://proj1s3-dev/A2-Glossary.pdf -`
5. If you no longer need access, remove the inline policy from `user1`
