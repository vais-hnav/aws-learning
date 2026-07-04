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
mkdir -p local-s3-demo/lost
echo "lost prefix test" > local-s3-demo/lost/file-one.txt
echo "second test file" > local-s3-demo/lost/file-two.txt
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

## Inspect Object Properties

Use `head-object` when you want object details without downloading the file content.

```bash
aws s3api head-object \
  --bucket "$S3_BUCKET" \
  --key "s3-lab-test.txt"
```

Useful fields to notice:

| Field | Meaning |
|---|---|
| `ContentLength` | Object size in bytes |
| `ContentType` | File/content type stored with the object |
| `LastModified` | Last object modification timestamp |
| `ETag` | Object identifier/checksum-related value for many upload patterns |
| `ServerSideEncryption` | Encryption applied to the object |
| `Metadata` | User-defined metadata added during upload |

Download the same object with the lower-level S3 API:

```bash
aws s3api get-object \
  --bucket "$S3_BUCKET" \
  --key "s3-lab-test.txt" \
  downloaded-with-s3api.txt
```

## Upload An Object With Metadata

```bash
aws s3api put-object \
  --bucket "$S3_BUCKET" \
  --key "metadata-demo.txt" \
  --body s3-lab-test.txt \
  --metadata purpose=aws-learning,phase=phase-7a
```

Check the metadata:

```bash
aws s3api head-object \
  --bucket "$S3_BUCKET" \
  --key "metadata-demo.txt" \
  --query 'Metadata'
```

## Copy The Object Inside S3

```bash
aws s3 cp "s3://$S3_BUCKET/s3-lab-test.txt" "s3://$S3_BUCKET/copies/s3-lab-test-copy.txt"
```

## Upload A Folder Recursively

```bash
aws s3 cp local-s3-demo/ "s3://$S3_BUCKET/" --recursive
```

This uploads the files under `local-s3-demo/` and preserves the relative paths as S3 object keys.

Example uploaded keys:

```text
lost/file-one.txt
lost/file-two.txt
```

## View Bucket Contents Recursively

```bash
aws s3 ls "s3://$S3_BUCKET/" --recursive
```

## List Objects With s3api And Prefix

This mirrors the experiment with `list-objects-v2`, `--prefix`, `--fetch-owner`, and `--query`.

```bash
aws s3api list-objects-v2 \
  --bucket "$S3_BUCKET" \
  --prefix "lost/" \
  --fetch-owner \
  --query 'Contents[].{Key: Key, OwnerID: Owner.ID}'
```

Explanation:

| Part | Meaning |
|---|---|
| `s3api` | Lower-level AWS CLI namespace that maps closely to S3 API operations |
| `list-objects-v2` | Lists object keys in a bucket |
| `--bucket` | Chooses the bucket to inspect |
| `--prefix "lost/"` | Returns only object keys that start with `lost/` |
| `--fetch-owner` | Includes owner information in the response |
| `--query` | Uses JMESPath to display only selected fields |

List object keys with size, storage class, and modification time:

```bash
aws s3api list-objects-v2 \
  --bucket "$S3_BUCKET" \
  --query 'Contents[].{Key: Key, Size: Size, StorageClass: StorageClass, LastModified: LastModified}'
```

## Upload With A Storage Class

For beginner labs, use `STANDARD` unless the video or lab specifically asks you to test another class.

```bash
aws s3 cp s3-lab-test.txt "s3://$S3_BUCKET/storage-class-demo/standard.txt" --storage-class STANDARD
```

Verify it:

```bash
aws s3api head-object \
  --bucket "$S3_BUCKET" \
  --key "storage-class-demo/standard.txt" \
  --query '{StorageClass: StorageClass, Size: ContentLength, Encryption: ServerSideEncryption}'
```

Note:

```text
S3 Standard is the default storage class for general purpose buckets.
S3 Express One Zone uses directory buckets and a different workflow, so do not test it casually in this beginner lab.
```

## Copy Recursively vs Sync

Copy a local directory to S3 recursively:

```bash
aws s3 cp local-s3-demo/ "s3://$S3_BUCKET/recursive-copy/" --recursive
```

Sync a local directory to S3:

```bash
aws s3 sync local-s3-demo/ "s3://$S3_BUCKET/sync-demo/"
```

Preview a sync before running it:

```bash
aws s3 sync local-s3-demo/ "s3://$S3_BUCKET/sync-demo/" --dryrun
```

Key difference:

```text
cp --recursive = copy this folder tree.
sync = compare source and destination, then copy only missing or changed files.
```

Use `--delete` with `sync` only when you intentionally want destination-only files removed:

```bash
aws s3 sync local-s3-demo/ "s3://$S3_BUCKET/sync-demo/" --delete --dryrun
```

## Delete Test Objects

```bash
aws s3 rm "s3://$S3_BUCKET/s3-lab-test.txt"
aws s3 rm "s3://$S3_BUCKET/metadata-demo.txt"
aws s3 rm "s3://$S3_BUCKET/copies/s3-lab-test-copy.txt"
aws s3 rm "s3://$S3_BUCKET/lost/" --recursive
aws s3 rm "s3://$S3_BUCKET/recursive-copy/" --recursive
aws s3 rm "s3://$S3_BUCKET/sync-demo/" --recursive
aws s3 rm "s3://$S3_BUCKET/storage-class-demo/" --recursive
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
