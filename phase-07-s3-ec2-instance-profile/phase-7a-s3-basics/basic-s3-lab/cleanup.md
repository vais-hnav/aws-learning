# Cleanup

Use this checklist after the S3 hands-on lab.

## 1. Delete Local Test Files

```bash
rm -f s3-lab-test.txt
rm -f downloaded-s3-lab-test.txt
rm -rf local-s3-demo
```

## 2. List Bucket Contents

```bash
aws s3 ls "s3://$S3_BUCKET/" --recursive
```

## 3. Delete Objects

```bash
aws s3 rm "s3://$S3_BUCKET/" --recursive
```

If you want to delete only a test prefix first:

```bash
aws s3 rm "s3://$S3_BUCKET/lost/" --recursive
aws s3 rm "s3://$S3_BUCKET/recursive-copy/" --recursive
aws s3 rm "s3://$S3_BUCKET/sync-demo/" --recursive
```

## 4. Delete Bucket

```bash
aws s3 rb "s3://$S3_BUCKET"
```

## 5. Verify

```bash
aws s3 ls
```

Expected result:

```text
The practice bucket is not listed.
```

## Completion Checklist

- Test file deleted locally.
- Downloaded test file deleted locally.
- Local recursive test folder deleted.
- Objects deleted from the bucket.
- Bucket deleted.
- No public bucket was created.
