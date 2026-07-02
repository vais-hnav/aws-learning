# Cleanup

Use this checklist after the S3 hands-on lab.

## 1. Delete Local Test Files

```bash
rm -f s3-lab-test.txt
rm -f downloaded-s3-lab-test.txt
```

## 2. List Bucket Contents

```bash
aws s3 ls "s3://$S3_BUCKET/" --recursive
```

## 3. Delete Objects

```bash
aws s3 rm "s3://$S3_BUCKET/" --recursive
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
- Objects deleted from the bucket.
- Bucket deleted.
- No public bucket was created.
