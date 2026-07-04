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

## Video 39: S3 Buckets

Concept:
- A bucket is the top-level S3 container.
- Bucket names must be globally unique.
- A bucket belongs to one AWS Region.
- Bucket settings control versioning, encryption, public access, policies, logging, and other behavior.

Important:

```text
Bucket = container.
Object = file/data stored inside the bucket.
Prefix = folder-like part of an object key.
```

Beginner bucket settings:
- Keep Block Public Access enabled.
- Keep default encryption enabled.
- Use clear temporary names for learning buckets.
- Delete test buckets after practice.

## Video 40: S3 CLI Upload, Copy, And Manage Buckets

Concept:
- `aws s3` gives high-level commands such as `cp`, `ls`, `rm`, `mb`, `rb`, and `sync`.
- `aws s3api` gives lower-level API-style commands such as `list-objects-v2`.
- `--recursive` makes supported commands work through a whole folder/prefix tree.
- `sync` compares source and destination before copying.

My extra hands-on:
- Used `list-objects-v2` with `--prefix "lost/"` to inspect only objects under a prefix.
- Used `--fetch-owner` to include object owner information.
- Used `--query 'Contents[].{Key: Key, OwnerID: Owner.ID}'` to display only object key and owner ID.
- Practiced `cp --recursive`.
- Compared `cp --recursive` with `sync`.

Practical difference:

| Command | Behavior | Common use |
|---|---|---|
| `aws s3 cp file s3://bucket/key` | Copies one file/object | Simple upload/download |
| `aws s3 cp folder/ s3://bucket/prefix/ --recursive` | Copies a folder/prefix tree | Bulk copy |
| `aws s3 sync folder/ s3://bucket/prefix/` | Compares and copies missing/changed files | Keeping two locations aligned |
| `aws s3 sync --delete` | Also removes destination-only files | Mirroring with cleanup |

Safety:
- Use `--dryrun` before risky sync commands.
- Be careful with `sync --delete`.
- Do not assume S3 prefixes are real folders.
- Delete test prefixes after practice.

Official references:
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-folders.html
- https://docs.aws.amazon.com/cli/latest/reference/s3api/list-objects-v2.html
- https://docs.aws.amazon.com/cli/latest/reference/s3/cp.html
- https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html

## Video 41: S3 Objects

Concept:
- An S3 object is the stored data plus metadata.
- The object key is the unique name of the object inside the bucket.
- A key can include prefixes such as `lost/file-one.txt`.
- S3 prefixes make organization easier, but they are not real folders.
- Object properties show useful details such as size, storage class, encryption, tags, timestamps, and metadata.

Object anatomy:

| Part | Simple meaning |
|---|---|
| Bucket | Container that holds objects |
| Key | Full object name/path-like identifier |
| Value | The actual file/data bytes |
| Metadata | Extra information about the object |
| Tags | Key-value labels used for organization and automation |
| Storage class | Cost/performance tier used for that object |
| Version ID | Identifier for a specific object version when versioning is enabled |

Hands-on workflow:

1. Upload a small test object.
2. Open the object in the S3 console.
3. Review the object properties page.
4. Check the object key and prefix.
5. Check size, storage class, encryption, tags, and metadata sections.
6. Run `head-object` from the CLI to inspect properties without downloading the file.
7. Upload a second object with user-defined metadata.
8. List object keys with `list-objects-v2`.
9. Delete the test objects when finished.

Command examples:

```bash
aws s3api head-object \
  --bucket "$S3_BUCKET" \
  --key "s3-lab-test.txt"
```

```bash
aws s3api put-object \
  --bucket "$S3_BUCKET" \
  --key "metadata-demo.txt" \
  --body s3-lab-test.txt \
  --metadata purpose=aws-learning,phase=phase-7a
```

What this lab proves:
- The file name shown in S3 is really the object key.
- Prefixes are just part of the key name.
- Object metadata can be inspected separately from the file content.
- Storage class is selected at the object level, not just at the bucket level.

Safety:
- Do not store secrets in object keys, metadata, tags, or file names.
- Keep objects private unless a later security lab intentionally changes access.
- Delete object experiments after practice.

Official references:
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingObjects.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingMetadata.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/view-object-properties.html
