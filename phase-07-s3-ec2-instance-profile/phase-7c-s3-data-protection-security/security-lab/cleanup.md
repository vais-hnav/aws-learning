# Cleanup

## Versioning Lab Cleanup

Versioned buckets can contain current versions, old versions, and delete markers.

List versions and delete markers:

```bash
aws s3api list-object-versions \
  --bucket "$S3_BUCKET" \
  --prefix "versioning-demo/"
```

Delete a specific object version:

```bash
aws s3api delete-object \
  --bucket "$S3_BUCKET" \
  --key "versioning-demo/file.txt" \
  --version-id "$VERSION_ID"
```

Delete a delete marker:

```bash
aws s3api delete-object \
  --bucket "$S3_BUCKET" \
  --key "versioning-demo/file.txt" \
  --version-id "$DELETE_MARKER_VERSION_ID"
```

Suspend versioning after practice if the bucket will stay around:

```bash
aws s3api put-bucket-versioning \
  --bucket "$S3_BUCKET" \
  --versioning-configuration Status=Suspended
```

Important:

```text
Suspending versioning does not delete old versions.
Delete old versions and delete markers if the bucket is only for learning.
```

## Replication Lab Cleanup

Delete the replication rule from the source bucket:

```bash
aws s3api delete-bucket-replication \
  --bucket "$SOURCE_BUCKET"
```

Delete test objects from source and destination buckets:

```bash
aws s3 rm "s3://$SOURCE_BUCKET/replication-demo/" --recursive
aws s3 rm "s3://$DESTINATION_BUCKET/replication-demo/" --recursive
```

Delete temporary buckets only after confirming they contain no important data:

```bash
aws s3 rb "s3://$SOURCE_BUCKET" --force
aws s3 rb "s3://$DESTINATION_BUCKET" --force
```

Delete temporary IAM replication roles only if you created them only for this lab.

## Object Lock Cleanup Warning

Object Lock is intentionally hard to remove.

Before creating an Object Lock bucket, remember:
- Object Lock cannot be disabled after it is enabled on a bucket.
- Versioning cannot be suspended after Object Lock is enabled.
- Compliance-mode retention can prevent deletion until retention expires.

If you created Object Lock resources for a lab, check retention and legal hold status before attempting cleanup.

## IAM Read-Only Policy Cleanup

Remove the inline policy from `user1` when you finish the lab:

```bash
AWS_PROFILE=<admin-profile> aws iam delete-user-policy \
  --user-name user1 \
  --policy-name Proj1S3DevReadOnly
```

After cleanup, `user1` should no longer be able to read from `proj1s3-dev` unless another policy still grants access.

## Bucket Policy Cleanup

Delete a temporary bucket policy after practice:

```bash
aws s3api delete-bucket-policy \
  --bucket "$S3_BUCKET"
```

Check whether a bucket policy remains:

```bash
aws s3api get-bucket-policy \
  --bucket "$S3_BUCKET"
```

If AWS returns `NoSuchBucketPolicy`, the bucket policy is removed.

## Encryption Lab Cleanup

Delete encryption demo objects:

```bash
aws s3 rm "s3://$S3_BUCKET/encryption-demo/" --recursive
```

If you created a customer managed KMS key only for learning, schedule key deletion carefully from KMS after confirming nothing important uses it.

Important:

```text
Do not delete or disable a KMS key that still protects objects you need.
```

## S3 Access Point Cleanup

Delete a test access point after practice:

```bash
aws s3control delete-access-point \
  --account-id "$AWS_ACCOUNT_ID" \
  --name "$S3_ACCESS_POINT" \
  --region "$AWS_REGION"
```

Check that the access point is gone:

```bash
aws s3control list-access-points \
  --account-id "$AWS_ACCOUNT_ID" \
  --bucket "$S3_BUCKET" \
  --region "$AWS_REGION"
```

## Final Safety Checklist

- Confirm test buckets are empty.
- Confirm versioned object versions and delete markers are removed.
- Confirm replication rules are deleted.
- Confirm destination bucket test copies are removed.
- Confirm temporary IAM policies or roles are removed.
- Confirm temporary S3 Access Points are removed.
- Confirm temporary bucket policies are removed.
- Confirm test encryption objects are deleted.
- Keep Block Public Access enabled unless you intentionally changed it for a specific lab.
