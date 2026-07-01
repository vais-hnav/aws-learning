# Cleanup

Remove the inline policy from `user1` when you finish the lab:

```bash
AWS_PROFILE=<admin-profile> aws iam delete-user-policy \
  --user-name user1 \
  --policy-name Proj1S3DevReadOnly
```

After cleanup, `user1` should no longer be able to read from `proj1s3-dev` unless another policy still grants access.
