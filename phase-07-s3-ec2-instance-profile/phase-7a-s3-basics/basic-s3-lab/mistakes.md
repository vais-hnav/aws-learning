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

## Thinking S3 Folders Are Real Folders

The S3 console shows folder-like views, but S3 uses object key prefixes.

Safer rule:

```text
Think of lost/file.txt as one object key with the prefix lost/.
```

## Confusing Object Key With File Name Only

In S3, the full key matters. `lost/file-one.txt` is not just `file-one.txt`; the prefix is part of the key.

Safer rule:

```text
Always copy the full object key before running CLI commands.
```

## Putting Secrets In Metadata Or Tags

Object metadata and tags are not the right place for passwords, secret keys, tokens, or private notes.

Safer rule:

```text
Treat object keys, metadata, and tags as operational labels, not secret storage.
```

## Assuming Objects Can Be Renamed Directly

S3 does not rename objects like a local file system. A rename is usually a copy to a new key followed by deleting the old key.

Safer rule:

```text
Copy first, verify the new object, then delete the old object.
```

## Assuming ETag Is Always A Simple File Hash

ETag can be useful, but multipart uploads and encryption can make it different from a simple local MD5 hash.

Safer rule:

```text
Use explicit checksums when a lab requires strong file integrity verification.
```

## Using cp --recursive When sync Is The Better Fit

`cp --recursive` copies a folder tree. It does not make the destination an exact managed mirror by default.

Safer rule:

```text
Use cp --recursive for bulk copy.
Use sync when you want source and destination compared.
```

## Running sync --delete Without Previewing

`sync --delete` can remove files from the destination that do not exist in the source.

Safer rule:

```text
Run sync with --dryrun before using --delete.
```
