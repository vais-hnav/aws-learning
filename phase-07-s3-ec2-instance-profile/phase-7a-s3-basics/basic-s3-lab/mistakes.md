# Mistakes

## Using A Non-Unique Bucket Name

S3 bucket names must be globally unique, not just unique inside your account.

Safer rule:

```text
Use a clear prefix plus a timestamp or random suffix.
```

## Turning Off Block Public Access

Most beginner S3 labs should be private.

Safer rule:

```text
Keep Block Public Access enabled unless the lab is specifically about public hosting.
```

## Forgetting That Bucket Region Cannot Be Changed

After a bucket is created, its Region stays fixed.

Safer rule:

```text
Check the Region before creating the bucket.
```

## Trying To Delete A Non-Empty Bucket

S3 will not delete a general purpose bucket while it still contains objects.

Safer rule:

```text
Delete objects first, then delete the bucket.
```
