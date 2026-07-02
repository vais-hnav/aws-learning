# Workflow

## Video 34: S3 Cloud Storage Hands-On Lab

Concept:
- Amazon S3 is object storage.
- A bucket is the container.
- An object is the uploaded file plus metadata.
- S3 is designed for durable storage of files, backups, logs, static assets, and application objects.

Console workflow:

1. Open Amazon S3.
2. Create a bucket.
3. Choose a globally unique bucket name.
4. Choose the intended AWS Region.
5. Keep Object Ownership defaults unless the lab specifically changes them.
6. Keep Block Public Access enabled.
7. Keep default encryption enabled.
8. Create the bucket.
9. Open the bucket.
10. Upload a small test file.
11. Open or download the object to verify it exists.
12. Optionally copy the object into a prefix/folder.
13. Delete test objects.
14. Empty and delete the bucket.

Important:

```text
S3 bucket names are globally unique.
S3 is object storage, not a mounted disk.
Keep beginner buckets private.
```

What this lab proves:
- S3 is useful for storing files independent of EC2.
- Objects remain in S3 until deleted.
- Access is controlled separately from storage.
- Cleanup requires deleting objects before deleting the bucket.

Official references:
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html
