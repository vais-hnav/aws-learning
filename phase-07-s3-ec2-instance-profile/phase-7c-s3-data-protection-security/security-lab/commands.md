# Commands

These commands support the S3 data protection and security videos `50-57`.

Use temporary learning buckets only. Versioning, replication, and Object Lock can create cleanup surprises if used on important buckets.

## Set Variables

```bash
export AWS_REGION=ap-south-1
export AWS_ACCOUNT_ID=111122223333
export S3_BUCKET=aws-learning-s3-protection-$(date +%Y%m%d%H%M%S)
```

## Create A Temporary Bucket

For Regions other than `us-east-1`:

```bash
aws s3api create-bucket \
  --bucket "$S3_BUCKET" \
  --region "$AWS_REGION" \
  --create-bucket-configuration LocationConstraint="$AWS_REGION"
```

Keep public access blocked:

```bash
aws s3api put-public-access-block \
  --bucket "$S3_BUCKET" \
  --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
```

## Enable Versioning

```bash
aws s3api put-bucket-versioning \
  --bucket "$S3_BUCKET" \
  --versioning-configuration Status=Enabled
```

Check it:

```bash
aws s3api get-bucket-versioning \
  --bucket "$S3_BUCKET"
```

## Create Multiple Versions Of One Object

```bash
echo "version 1" > versioning-demo.txt
aws s3 cp versioning-demo.txt "s3://$S3_BUCKET/versioning-demo/file.txt"
```

```bash
echo "version 2" > versioning-demo.txt
aws s3 cp versioning-demo.txt "s3://$S3_BUCKET/versioning-demo/file.txt"
```

List versions:

```bash
aws s3api list-object-versions \
  --bucket "$S3_BUCKET" \
  --prefix "versioning-demo/file.txt"
```

## Delete And Recover With Delete Marker

Delete the object normally:

```bash
aws s3 rm "s3://$S3_BUCKET/versioning-demo/file.txt"
```

List delete markers:

```bash
aws s3api list-object-versions \
  --bucket "$S3_BUCKET" \
  --prefix "versioning-demo/file.txt" \
  --query 'DeleteMarkers[].{Key: Key, VersionId: VersionId, IsLatest: IsLatest}'
```

Recover by deleting the latest delete marker:

```bash
aws s3api delete-object \
  --bucket "$S3_BUCKET" \
  --key "versioning-demo/file.txt" \
  --version-id "$DELETE_MARKER_VERSION_ID"
```

## Replication Inspection Commands

Replication needs two buckets, versioning on both buckets, and an IAM role that S3 can assume.

Check replication:

```bash
aws s3api get-bucket-replication \
  --bucket "$SOURCE_BUCKET"
```

Delete replication after practice:

```bash
aws s3api delete-bucket-replication \
  --bucket "$SOURCE_BUCKET"
```

## Object Lock Inspection Commands

Do not enable Object Lock casually.

Check whether a bucket has Object Lock configuration:

```bash
aws s3api get-object-lock-configuration \
  --bucket "$S3_BUCKET"
```

Check legal hold for a specific object version:

```bash
aws s3api get-object-legal-hold \
  --bucket "$S3_BUCKET" \
  --key "protected-object.txt" \
  --version-id "$VERSION_ID"
```

Check retention for a specific object version:

```bash
aws s3api get-object-retention \
  --bucket "$S3_BUCKET" \
  --key "protected-object.txt" \
  --version-id "$VERSION_ID"
```

## View Public Access Block

```bash
aws s3api get-public-access-block \
  --bucket "$S3_BUCKET"
```

## IAM vs Bucket Policies

Apply a bucket policy from a JSON file:

```bash
aws s3api put-bucket-policy \
  --bucket "$S3_BUCKET" \
  --policy file://deny-insecure-transport-policy.json
```

Note:

```text
bucket-policy-examples.json stores multiple examples in one reference file.
Copy the single policy example you want into its own JSON file before applying it.
```

View the current bucket policy:

```bash
aws s3api get-bucket-policy \
  --bucket "$S3_BUCKET" \
  --query Policy \
  --output text
```

Delete a temporary bucket policy after practice:

```bash
aws s3api delete-bucket-policy \
  --bucket "$S3_BUCKET"
```

Attach the existing IAM read-only policy to a test user:

```bash
AWS_PROFILE=<admin-profile> aws iam put-user-policy \
  --user-name user1 \
  --policy-name Proj1S3DevReadOnly \
  --policy-document file://phase-07-s3-ec2-instance-profile/phase-7c-s3-data-protection-security/security-lab/user1-s3-read-only-policy.json
```

## S3 Encryption

Check bucket default encryption:

```bash
aws s3api get-bucket-encryption \
  --bucket "$S3_BUCKET"
```

Set default bucket encryption to SSE-S3:

```bash
aws s3api put-bucket-encryption \
  --bucket "$S3_BUCKET" \
  --server-side-encryption-configuration '{
    "Rules": [
      {
        "ApplyServerSideEncryptionByDefault": {
          "SSEAlgorithm": "AES256"
        }
      }
    ]
  }'
```

Upload an object with SSE-S3:

```bash
aws s3 cp versioning-demo.txt "s3://$S3_BUCKET/encryption-demo/sse-s3.txt" \
  --sse AES256
```

Set default bucket encryption to SSE-KMS with an S3 Bucket Key:

```bash
aws s3api put-bucket-encryption \
  --bucket "$S3_BUCKET" \
  --server-side-encryption-configuration '{
    "Rules": [
      {
        "ApplyServerSideEncryptionByDefault": {
          "SSEAlgorithm": "aws:kms",
          "KMSMasterKeyID": "arn:aws:kms:ap-south-1:111122223333:key/example-key-id"
        },
        "BucketKeyEnabled": true
      }
    ]
  }'
```

Verify object encryption:

```bash
aws s3api head-object \
  --bucket "$S3_BUCKET" \
  --key "encryption-demo/sse-s3.txt" \
  --query '{Encryption: ServerSideEncryption, KMSKeyId: SSEKMSKeyId, BucketKeyEnabled: BucketKeyEnabled}'
```

Important:

```text
SSE-KMS can require kms:Decrypt, kms:GenerateDataKey, and key policy permissions.
Use SSE-S3 for beginner labs unless a KMS lab specifically requires SSE-KMS.
```

## S3 Block Public Access

Keep all four Block Public Access settings enabled:

```bash
aws s3api put-public-access-block \
  --bucket "$S3_BUCKET" \
  --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
```

Check bucket-level Block Public Access:

```bash
aws s3api get-public-access-block \
  --bucket "$S3_BUCKET"
```

Check account-level Block Public Access:

```bash
aws s3control get-public-access-block \
  --account-id "$AWS_ACCOUNT_ID"
```

## Cleanup

Use `cleanup.md`.

At minimum:
- Remove delete markers and old versions.
- Delete replication rules.
- Remove test objects from source and destination buckets.
- Delete temporary buckets.
