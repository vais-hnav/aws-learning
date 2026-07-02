# Commands

These commands repeat the S3 hands-on lab from the terminal.

Set variables:

```bash
export AWS_REGION=ap-south-1
export S3_BUCKET=aws-learning-s3-lab-$(date +%Y%m%d%H%M%S)
```

If your learning Region is different, replace `ap-south-1`.

## Confirm Identity

```bash
aws sts get-caller-identity
```

## Create A Private Bucket

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

## Create A Test File

```bash
echo "hello from the AWS learning S3 lab" > s3-lab-test.txt
```

## Upload The File

```bash
aws s3 cp s3-lab-test.txt "s3://$S3_BUCKET/"
```

## List Objects

```bash
aws s3 ls "s3://$S3_BUCKET/"
```

## Download The Object

```bash
aws s3 cp "s3://$S3_BUCKET/s3-lab-test.txt" downloaded-s3-lab-test.txt
```

## Copy The Object Inside S3

```bash
aws s3 cp "s3://$S3_BUCKET/s3-lab-test.txt" "s3://$S3_BUCKET/copies/s3-lab-test-copy.txt"
```

## View Bucket Contents Recursively

```bash
aws s3 ls "s3://$S3_BUCKET/" --recursive
```

## Delete Test Objects

```bash
aws s3 rm "s3://$S3_BUCKET/s3-lab-test.txt"
aws s3 rm "s3://$S3_BUCKET/copies/s3-lab-test-copy.txt"
```

## Delete The Bucket

```bash
aws s3 rb "s3://$S3_BUCKET"
```

If the bucket is not empty:

```bash
aws s3 rm "s3://$S3_BUCKET" --recursive
aws s3 rb "s3://$S3_BUCKET"
```
