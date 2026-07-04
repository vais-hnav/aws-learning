# Commands

These commands support the S3 storage-class and lifecycle videos.

Use them carefully. Storage classes such as IA and Glacier can include retrieval charges, transition charges, minimum storage duration, or restore steps.

## Set Variables

```bash
export AWS_REGION=ap-south-1
export S3_BUCKET=your-existing-learning-bucket
```

## Confirm Identity

```bash
aws sts get-caller-identity
```

## Create Demo Files

```bash
mkdir -p lifecycle-demo
echo "storage class demo" > lifecycle-demo/storage-class-demo.txt
echo "lifecycle demo" > lifecycle-demo/lifecycle-demo.txt
```

## Upload With S3 Standard

```bash
aws s3 cp lifecycle-demo/storage-class-demo.txt "s3://$S3_BUCKET/storage-class-demo/standard.txt" --storage-class STANDARD
```

## Upload With Intelligent-Tiering

```bash
aws s3 cp lifecycle-demo/storage-class-demo.txt "s3://$S3_BUCKET/storage-class-demo/intelligent-tiering.txt" --storage-class INTELLIGENT_TIERING
```

## Optional IA Upload Examples

Run these only if you understand that IA classes can have retrieval charges and minimum-duration charges.

```bash
aws s3 cp lifecycle-demo/storage-class-demo.txt "s3://$S3_BUCKET/storage-class-demo/standard-ia.txt" --storage-class STANDARD_IA
```

```bash
aws s3 cp lifecycle-demo/storage-class-demo.txt "s3://$S3_BUCKET/storage-class-demo/one-zone-ia.txt" --storage-class ONEZONE_IA
```

## Inspect Object Storage Class

```bash
aws s3api head-object \
  --bucket "$S3_BUCKET" \
  --key "storage-class-demo/intelligent-tiering.txt" \
  --query '{StorageClass: StorageClass, Size: ContentLength, LastModified: LastModified}'
```

## Upload Lifecycle Demo Object

```bash
aws s3 cp lifecycle-demo/lifecycle-demo.txt "s3://$S3_BUCKET/lifecycle-demo/lifecycle-demo.txt"
```

## Review The Lifecycle Policy JSON

The included policy is disabled by default.

```bash
cat phase-07-s3-ec2-instance-profile/phase-7b-s3-storage-lifecycle/lifecycle-lab/lifecycle-policy.json
```

## Apply Disabled Lifecycle Policy

Run from the repo root:

```bash
aws s3api put-bucket-lifecycle-configuration \
  --bucket "$S3_BUCKET" \
  --lifecycle-configuration file://phase-07-s3-ec2-instance-profile/phase-7b-s3-storage-lifecycle/lifecycle-lab/lifecycle-policy.json
```

Because the rule has `Status: "Disabled"`, it documents the rule shape without transitioning or deleting objects.

## View Lifecycle Configuration

```bash
aws s3api get-bucket-lifecycle-configuration \
  --bucket "$S3_BUCKET"
```

## Delete Lifecycle Configuration

```bash
aws s3api delete-bucket-lifecycle \
  --bucket "$S3_BUCKET"
```

## Cleanup Demo Objects

```bash
aws s3 rm "s3://$S3_BUCKET/storage-class-demo/" --recursive
aws s3 rm "s3://$S3_BUCKET/lifecycle-demo/" --recursive
```

