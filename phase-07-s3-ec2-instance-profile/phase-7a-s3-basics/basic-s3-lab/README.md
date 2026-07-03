# Basic S3 Lab

## What Did I Build?

A private S3 bucket lab for beginner object storage practice.

The lab covers:
- Creating a bucket.
- Uploading a file as an object.
- Opening or downloading the object.
- Listing bucket contents.
- Listing objects with a prefix.
- Using `s3api list-objects-v2` with `--fetch-owner` and `--query`.
- Copying an object inside S3.
- Copying folders/prefixes recursively.
- Understanding when to use `cp --recursive` versus `sync`.
- Deleting objects.
- Deleting the bucket.

## Which AWS Service Did I Use?

- Amazon S3
- AWS CLI for optional repeatable commands

## What Did I Learn?

- S3 stores objects, not traditional folders and disks.
- A bucket is the top-level container for S3 objects.
- An object is the uploaded file plus metadata.
- Bucket names are globally unique.
- Bucket Region matters and cannot be changed after creation.
- Block Public Access should stay enabled for beginner private labs.
- You must empty a bucket before deleting it.
- S3 "folders" are prefixes in object keys, not real folders.
- `aws s3 cp --recursive` copies a tree of files/objects.
- `aws s3 sync` compares source and destination and copies only what is needed to make them match.

## How Do I Run It?

Use either the AWS Console or the commands in `commands.md`.

Recommended beginner flow:

1. Create a private S3 bucket.
2. Upload a small test file.
3. Open or download the object.
4. Copy the object into a test prefix/folder.
5. List objects under a prefix using `s3api list-objects-v2`.
6. Try `cp --recursive` and compare it with `sync`.
7. Delete the copied object and original object.
8. Delete the bucket.

## How Do I Delete It?

Use `cleanup.md`.

At minimum:
- Delete all test objects.
- Empty the bucket.
- Delete the bucket.
