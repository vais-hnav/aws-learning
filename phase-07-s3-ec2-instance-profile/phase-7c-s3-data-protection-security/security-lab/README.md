# S3 Security Lab

Use this folder to give `user1` read access to the learning bucket and to practice S3 security safely.

Goal for this lab:
- Let `user1` list the bucket `proj1s3-dev`
- Let `user1` read objects from that bucket
- Keep the permission as small as possible

Policy file:
- [`user1-s3-read-only-policy.json`](./user1-s3-read-only-policy.json)

Attach it to `user1` with:
```bash
AWS_PROFILE=<admin-profile> aws iam put-user-policy \
  --user-name user1 \
  --policy-name Proj1S3DevReadOnly \
  --policy-document file://phase-07-s3-ec2-instance-profile/phase-7c-s3-data-protection-security/security-lab/user1-s3-read-only-policy.json
```

Test it with:
```bash
AWS_PROFILE=user1 aws s3 ls s3://proj1s3-dev/
AWS_PROFILE=user1 aws s3 cp s3://proj1s3-dev/A2-Glossary.pdf -
```

If the object is encrypted with KMS, you may also need `kms:Decrypt` permission for the matching key.
Use the same admin-capable profile to remove the policy later.
