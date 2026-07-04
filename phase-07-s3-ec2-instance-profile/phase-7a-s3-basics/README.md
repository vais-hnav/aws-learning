# Phase 7A: S3 Basics

Goal:
Learn the S3 foundation: buckets, objects, and basic CLI workflows.

Videos:
- 34. S3 cloud storage hands-on lab - complete
- 39. S3 buckets - complete
- 40. S3 CLI upload, copy, and manage buckets - complete
- 41. S3 objects - complete

Labs:
- `basic-s3-lab/`

What I learned from video 34:
- S3 stores data as objects inside buckets.
- Bucket names must be globally unique.
- A bucket is created in a specific AWS Region.
- Objects can be uploaded, opened/downloaded, copied, and deleted.
- S3 is not block storage like EBS; it is object storage accessed through the console, CLI, SDKs, or API.
- Cleanup means deleting objects first, then deleting the bucket.

What I learned from videos 39 and 40:
- Buckets are the top-level containers in S3.
- S3 does not use real folders like a local file system; folder-like paths are object key prefixes.
- `aws s3` commands are high-level convenience commands.
- `aws s3api` commands map more closely to the underlying S3 API.
- `list-objects-v2` can filter objects by prefix and return selected fields with `--query`.
- `cp --recursive` copies a folder/prefix recursively.
- `sync` compares source and destination and is better when making two locations match.

What I learned from video 41:
- An S3 object is the actual data stored in a bucket plus metadata about that data.
- The object key is the full name used to find the object, including any prefix such as `lost/file-one.txt`.
- Prefixes make S3 look folder-like, but S3 still stores objects in a flat object namespace.
- Object properties include size, storage class, encryption details, timestamps, ETag/checksum-related information, tags, and metadata.
- User-defined metadata can be added when uploading an object, but changing it later usually means copying/replacing the object metadata.
- Object tags and metadata are useful for organization, automation, lifecycle rules, and cost-management workflows.

Safety:
- Keep S3 Block Public Access enabled unless a lab explicitly teaches public access.
- Delete test objects and buckets after practice.
