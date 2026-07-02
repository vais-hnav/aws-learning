# Workflow

This workflow covers videos 28-31: EC2 storage options, storage performance, EBS volume creation, and Linux mounting.

## Video 28: EC2 Storage Options

Concept:
- EC2 can use different storage types depending on the workload.
- EBS is block storage attached to an EC2 instance.
- S3 is object storage for files and application objects.
- EFS is shared file storage that multiple Linux instances can mount.
- Instance store is temporary storage tied to the life of the instance hardware.

Decision table:

| Need | Better option | Why |
|---|---|---|
| Extra disk for one EC2 instance | EBS | Works like a block device attached to the instance |
| Store objects, backups, images, PDFs, static files | S3 | Durable object storage accessible over APIs |
| Shared file system for multiple Linux EC2 instances | EFS | Multiple instances can mount the same file system |
| Temporary high-speed scratch space | Instance store | Fast but data is lost when the instance stops/terminates |

Beginner rule:

```text
Use EBS for EC2 disk labs.
Use S3 for object/file upload labs.
Use EFS later when shared file systems are needed.
```

## Video 29: IOPS, Throughput, And Latency

Concept:
- IOPS means how many read/write operations happen per second.
- Throughput means how much data moves per second.
- Latency means how long each operation takes.

Simple memory hook:

```text
IOPS = number of operations
Throughput = size of data moved
Latency = waiting time
```

Examples:

| Workload | More important metric |
|---|---|
| Database with many small reads/writes | IOPS and low latency |
| Video processing or large file scanning | Throughput |
| Interactive application | Low latency |

EBS performance depends on:
- Volume type.
- Volume size.
- Provisioned IOPS or throughput settings.
- EC2 instance EBS bandwidth.
- I/O size and queue depth.

## Video 30: EBS Volumes Hands-On Lab

Console workflow:

1. Open EC2.
2. Confirm the instance Availability Zone.
3. Open Elastic Block Store -> Volumes.
4. Create a small test volume.
5. Choose the same Availability Zone as the EC2 instance.
6. Use a general purpose SSD volume for beginner practice.
7. Add a clear name tag such as `aws-learning-ebs-lab`.
8. Create the volume.
9. Select the volume and choose Attach volume.
10. Select the EC2 instance.
11. Attach using a device name such as `/dev/sdf`.
12. Connect to the EC2 instance.
13. Use Linux commands to find, format, and mount the new disk.

Important:

```text
EBS volume AZ must match EC2 instance AZ.
Attached in AWS does not mean usable in Linux yet.
```

## Video 31: Format And Mount EBS Volumes In Linux

Linux workflow:

1. Run `lsblk` to identify the attached disk.
2. Use `sudo file -s DEVICE` or `sudo lsblk -f` to check if it already has a file system.
3. If the volume is new and empty, create a file system with `mkfs`.
4. Create a mount point such as `/data`.
5. Mount the volume to `/data`.
6. Verify with `df -h` and `lsblk`.
7. Create a test file to confirm writes work.
8. Optionally add an `/etc/fstab` entry using UUID if the mount should survive reboot.
9. For cleanup, unmount before detaching/deleting the volume.

Most important warning:

```text
mkfs formats a device. Formatting the wrong device can delete data.
```

## Extra Hands-On: Detach And Reattach Persistence Test

This was an extra experiment done after the video lab.

Goal:

```text
Prove that EBS data belongs to the volume, not to the EC2 instance.
```

Workflow:

1. Attach the EBS volume to the first EC2 instance.
2. Format and mount the volume if it is a new empty volume.
3. Create a test file inside the mounted folder.
4. Unmount the volume from the first instance.
5. Detach the EBS volume in AWS.
6. Attach the same volume to a second EC2 instance in the same Availability Zone.
7. On the second instance, run `lsblk` to find the disk.
8. Do not format it again.
9. Mount the existing file system.
10. Open the mounted folder and confirm the original file is still there.

What this proved:

- Detaching an EBS volume does not erase the data.
- Attaching an existing EBS volume to another instance lets the second instance read the same file system.
- The second instance must be in the same Availability Zone as the EBS volume.
- Formatting is only for new empty volumes, not for volumes that already contain data.

Important:

```text
If you run mkfs again after reattaching, you can erase the file system and lose the file.
```

## My Hands-On Notes

- Practiced the EBS flow as a small, controlled lab.
- Kept the volume small to reduce cost.
- Treated EBS as a separate disk from the EC2 root volume.
- Used Linux disk inspection before formatting.
- Created a test file on the EBS volume.
- Detached the volume from one instance and attached it to another instance.
- Mounted the existing file system on the second instance and verified the file was still there.
- Documented both AWS CLI and Linux command versions.
- Cleanup is mandatory because unattached EBS volumes can still cost money.

## Official References

- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Storage.html
- https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volumes.html
- https://docs.aws.amazon.com/ebs/latest/userguide/ebs-using-volumes.html
- https://docs.aws.amazon.com/ebs/latest/userguide/ebs-io-characteristics.html
