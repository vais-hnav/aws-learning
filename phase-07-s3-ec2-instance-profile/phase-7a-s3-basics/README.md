# Phase 7A: S3 Basics

Goal:
Learn the S3 foundation: buckets, objects, and basic CLI workflows.

Videos:
- 34. S3 cloud storage hands-on lab - complete
- 39. S3 buckets
- 40. S3 CLI upload, copy, and manage buckets
- 41. S3 objects

Labs:
- `basic-s3-lab/`

What I learned from video 34:
- S3 stores data as objects inside buckets.
- Bucket names must be globally unique.
- A bucket is created in a specific AWS Region.
- Objects can be uploaded, opened/downloaded, copied, and deleted.
- S3 is not block storage like EBS; it is object storage accessed through the console, CLI, SDKs, or API.
- Cleanup means deleting objects first, then deleting the bucket.

Safety:
- Keep S3 Block Public Access enabled unless a lab explicitly teaches public access.
- Delete test objects and buckets after practice.
