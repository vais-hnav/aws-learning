# Cleanup

Use this checklist after storage-class and lifecycle practice.

## Delete Storage-Class Demo Objects

```bash
aws s3 rm "s3://$S3_BUCKET/storage-class-demo/" --recursive
```

## Delete Lifecycle Demo Objects

```bash
aws s3 rm "s3://$S3_BUCKET/lifecycle-demo/" --recursive
```

## Check For Remaining Objects

```bash
aws s3 ls "s3://$S3_BUCKET/" --recursive
```

## Remove Lifecycle Rules

Use this only after the lifecycle policy lab is completed.

```bash
aws s3api delete-bucket-lifecycle \
  --bucket "$S3_BUCKET"
```

Verify:

```bash
aws s3api get-bucket-lifecycle-configuration \
  --bucket "$S3_BUCKET"
```

If the lifecycle configuration was deleted, AWS returns an error saying no lifecycle configuration exists.

## Empty And Delete A Temporary Bucket

Only run this if the bucket is just for learning and no important files are inside it.

```bash
aws s3 rm "s3://$S3_BUCKET" --recursive
aws s3 rb "s3://$S3_BUCKET"
```

## Safety Checklist

- Confirm the bucket name before deleting.
- Do not delete a shared or important bucket.
- Do not keep directory buckets or Express One Zone test resources unless you intentionally need them.
- Disable or delete lifecycle rules after practice.
- Watch for lifecycle rules that target the whole bucket instead of a test prefix.
- Check the AWS console after cleanup to confirm no test buckets, objects, or lifecycle rules remain.
