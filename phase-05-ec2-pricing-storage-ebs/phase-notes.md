# Phase 5 Notes

This phase covers EC2 pricing models and EC2 storage with EBS.

Note source:
- Based on playlist video order/titles, video descriptions, AWS documentation, and hands-on work documented in this repo.
- Paraphrased explanatory notes, not verbatim transcripts.

## 24. EC2 Savings Plans

Concept:
- Savings Plans reduce compute cost when usage is predictable.
- They are commitments, not beginner lab resources.
- Compute Savings Plans are more flexible.
- EC2 Instance Savings Plans are more specific and less flexible.

My decision:
- Do not purchase Savings Plans in this learning account.
- Use small On-Demand instances for practice and delete them quickly.

Files:
- `phase-5a-ec2-pricing-models/README.md`
- `phase-5a-ec2-pricing-models/explanation.md`

## 25. EC2 Spot Instances

Concept:
- Spot Instances use spare EC2 capacity at a lower price.
- AWS can interrupt Spot Instances.
- Spot is useful for flexible, retryable, stateless, or batch workloads.
- Spot is risky for important stateful workloads unless the architecture handles interruption.

My decision:
- Observe and understand Spot, but do not rely on it for beginner labs yet.
- Save deeper Spot plus Auto Scaling practice for later if needed.

Files:
- `phase-5a-ec2-pricing-models/explanation.md`
- `phase-5a-ec2-pricing-models/commands.md`

## 26. Dedicated Host

Concept:
- A Dedicated Host gives physical server capacity dedicated to an AWS account.
- It gives host-level visibility and placement control.
- It is mainly useful for licensing, compliance, and enterprise control requirements.

My decision:
- Do not allocate Dedicated Hosts during beginner practice.

Files:
- `phase-5a-ec2-pricing-models/explanation.md`
- `phase-5a-ec2-pricing-models/cleanup.md`

## 27. Dedicated Instance

Concept:
- Dedicated Instances run on hardware dedicated to one AWS account.
- They do not provide the same physical host visibility/control as Dedicated Hosts.
- They are advanced isolation options, not normal beginner EC2 practice.

My decision:
- Do not launch Dedicated Instances during beginner practice.

Files:
- `phase-5a-ec2-pricing-models/explanation.md`

## 28. EC2 Storage Options: EBS, S3, EFS

Concept:
- EBS is block storage for EC2. Think: extra disk.
- S3 is object storage. Think: files/objects stored through APIs.
- EFS is shared file storage for Linux instances. Think: network file system.
- Instance store is temporary storage tied to the instance hardware.

Video learning:
- Compares different EC2 storage choices.
- Builds the mental model that storage choice depends on access pattern, durability, sharing, and performance.
- Explains why EBS is the right service for attaching a disk to one EC2 instance.

My hands-on:
- Prepared the EBS lab folder.
- Documented the storage comparison before creating the EBS volume.

Files:
- `phase-5b-ebs-storage/README.md`
- `phase-5b-ebs-storage/workflow.md`

## 29. IOPS, Throughput, And Latency

Concept:
- IOPS is the number of read/write operations per second.
- Throughput is the amount of data transferred per second.
- Latency is the wait time for each operation.

Memory hook:

```text
IOPS = how many operations
Throughput = how much data
Latency = how long it waits
```

Video learning:
- Shows why storage performance is not one single number.
- Connects performance needs to workload type.
- Small random database reads care about IOPS and latency.
- Large sequential processing cares more about throughput.

My hands-on:
- Added performance notes to the EBS workflow.
- Kept the beginner lab small and simple instead of tuning performance yet.

Files:
- `phase-5b-ebs-storage/workflow.md`

## 30. EBS Volumes Hands-On Lab

Concept:
- An EBS volume is a durable block device that can be attached to an EC2 instance.
- The volume and instance must be in the same Availability Zone.
- An EBS volume can exist independently from an EC2 instance.
- Detaching is not the same as deleting.

Video hands-on:
- Opens EC2 storage/EBS volume area.
- Creates a new EBS volume.
- Selects the correct Availability Zone.
- Attaches the volume to an existing EC2 instance.
- Shows that AWS-side attachment is only the first half of the lab.

My hands-on:
- Documented both console-style workflow and AWS CLI commands.
- Used a small `gp3` practice volume.
- Added tags to keep the lab resource identifiable.
- Added cleanup commands to prevent leftover EBS cost.
- Created a file inside the mounted EBS volume, detached the volume, attached it to another instance in the same Availability Zone, mounted it there, and verified the file was still visible.

Files:
- `phase-5b-ebs-storage/aws-cli-commands.md`
- `phase-5b-ebs-storage/workflow.md`
- `phase-5b-ebs-storage/cleanup.md`

## 31. Format And Mount EBS Volumes In Linux

Concept:
- A newly attached EBS volume is a raw block device.
- Linux needs a file system before the disk can be used like a normal folder.
- A mount point connects the disk to the Linux directory tree.
- `/etc/fstab` can make the mount persist after reboot.

Video hands-on:
- Connects to the Linux EC2 instance.
- Uses Linux commands to identify the attached volume.
- Checks whether the disk already has a file system.
- Formats the new empty volume.
- Creates a mount folder.
- Mounts the volume.
- Verifies with disk/mount commands.

My hands-on:
- Documented `lsblk`, `file -s`, `mkfs`, `mkdir`, `mount`, `df -h`, and cleanup.
- Added warnings for Nitro NVMe device names.
- Added `/etc/fstab` safety notes using UUID and `nofail`.
- Added the reattach workflow warning: do not run `mkfs` on a volume that already contains a file system and files.

Files:
- `phase-5b-ebs-storage/linux-commands.md`
- `phase-5b-ebs-storage/mistakes.md`
- `phase-5b-ebs-storage/cleanup.md`

## 32. EBS Volume Types

Concept:
- EBS volume types are different cost/performance profiles for block storage.
- SSD-backed volumes are best for transactional workloads with many small reads and writes.
- HDD-backed volumes are best for large sequential throughput workloads.
- `gp3` is the best beginner default because it is general purpose and gives predictable baseline behavior.

Video learning:
- Compares SSD and HDD based EBS volume types.
- Connects volume type choice to workload needs.
- Reinforces the earlier IOPS, throughput, and latency concepts.
- Shows that choosing storage type is a cost and performance decision.

My hands-on:
- Reviewed volume type options from the EBS create-volume flow.
- Kept `gp3` as the practice default.
- Documented why `io1`/`io2`, `st1`, and `sc1` are not beginner defaults.

Files:
- `phase-5b-ebs-storage/README.md`
- `phase-5b-ebs-storage/workflow.md`
- `phase-5b-ebs-storage/mistakes.md`

## 33. EBS Snapshots

Concept:
- An EBS snapshot is a point-in-time backup of an EBS volume.
- Snapshots are incremental after the first snapshot.
- A snapshot can be used to create a new EBS volume.
- Snapshots are separate from the original volume, so they must be cleaned up separately.

Video learning:
- Explains snapshots as the backup/recovery path for EBS.
- Shows snapshot creation from an EBS volume.
- Connects snapshots to restoring data if a volume is damaged or deleted.
- Reinforces that backup is different from attach/detach.

My hands-on:
- Reviewed the snapshot creation and restore flow.
- Added AWS CLI commands for create snapshot, wait for completion, create volume from snapshot, and delete snapshot.
- Looked into basic Amazon Data Lifecycle Manager features in the console, including policies, schedules, retention, and tag-based targeting.
- Documented that Lifecycle Manager can automate snapshot creation and deletion, but snapshots created by policies can still create cost.

Files:
- `phase-5b-ebs-storage/aws-cli-commands.md`
- `phase-5b-ebs-storage/workflow.md`
- `phase-5b-ebs-storage/cleanup.md`
- `phase-5b-ebs-storage/mistakes.md`

## Official References

- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Storage.html
- https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volumes.html
- https://docs.aws.amazon.com/ebs/latest/userguide/ebs-using-volumes.html
- https://docs.aws.amazon.com/ebs/latest/userguide/ebs-io-characteristics.html
- https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html
- https://docs.aws.amazon.com/ebs/latest/userguide/ebs-snapshots.html
- https://docs.aws.amazon.com/ebs/latest/userguide/ebs-create-snapshot.html
- https://docs.aws.amazon.com/ebs/latest/userguide/snapshot-lifecycle.html
