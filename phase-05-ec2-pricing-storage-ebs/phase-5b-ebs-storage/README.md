# Phase 5B: EBS Storage

Goal:
Practice EC2 storage concepts by creating, attaching, formatting, mounting, snapshotting, and deleting EBS resources safely.

Videos:

| Video | Topic | Hands-on mode |
|---:|---|---|
| 28 | EC2 storage options: EBS, S3, EFS | Notes and comparison |
| 29 | IOPS, throughput, and latency | Notes and comparison |
| 30 | EBS volumes hands-on lab | Safe lab |
| 31 | Format and mount EBS volumes in Linux | Safe lab |
| 32 | EBS volume types | Notes and comparison |
| 33 | EBS snapshots | Safe lab with cleanup |

What I will build:
- EBS volume lab.
- Linux format and mount workflow.
- EBS volume type notes.
- EBS snapshot lab.
- EBS cleanup checklist.

## Current Progress

Completed:
- Video 28: EC2 storage options: EBS, S3, EFS
- Video 29: IOPS, throughput, and latency
- Video 30: EBS volumes hands-on lab
- Video 31: Format and mount EBS volumes in Linux

Remaining:
- Video 32: EBS volume types
- Video 33: EBS snapshots

## What Did I Build?

A safe EBS storage lab for attaching an extra disk to an EC2 instance and making it usable from Linux.

The lab covers:
- Choosing between EBS, S3, and EFS.
- Understanding storage performance terms.
- Creating a small EBS volume in the same Availability Zone as an EC2 instance.
- Attaching the volume to the instance.
- Finding the attached disk from Linux.
- Formatting the disk with a file system.
- Mounting the disk to a folder.
- Testing file writes.
- Detaching the volume from one EC2 instance and attaching it to another instance.
- Verifying the file is still present after reattachment.
- Cleaning up the mount, volume, and instance safely.

## Which AWS Service Did I Use?

- Amazon EC2
- Amazon EBS
- Amazon S3, for comparison
- Amazon EFS, for comparison
- Linux file system tools

## What Did I Learn?

- EBS is block storage for EC2, similar to attaching an extra hard disk.
- S3 is object storage for files, backups, static assets, and application data that does not need to behave like a local disk.
- EFS is shared file storage that can be mounted by multiple Linux instances.
- EBS volumes are tied to one Availability Zone, so the volume and EC2 instance must be in the same AZ.
- A newly attached EBS volume is not automatically usable inside Linux.
- Linux must detect the disk, format it if empty, create a mount point, and mount it.
- Formatting the wrong device can destroy data, so disk identification is the most important step.
- EBS data persists after detach and reattach as long as the volume is not deleted or reformatted.
- A detached EBS volume can be attached to another instance in the same Availability Zone.

## How Do I Run It?

Use the workflow files in this folder:

- `workflow.md` for the full lab sequence.
- `aws-cli-commands.md` for AWS-side commands.
- `linux-commands.md` for instance-side commands.

## How Do I Delete It?

Use `cleanup.md`.

At minimum:
- Unmount the volume from Linux.
- Remove any temporary `/etc/fstab` entry if one was added.
- Detach the EBS volume.
- Delete the EBS volume.
- Terminate the EC2 instance if it was only used for this lab.

Safety rules:
- Keep test volumes small.
- Delete unattached volumes after labs.
- Delete snapshots after labs if they are only for practice.
