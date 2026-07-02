# Mistakes

## Creating The EBS Volume In The Wrong Availability Zone

An EBS volume can attach only to an EC2 instance in the same Availability Zone.

Safer rule:

```text
Check the instance AZ first, then create the volume in that same AZ.
```

## Thinking Attached Means Mounted

AWS can show the volume as attached, but Linux still needs to detect, format, and mount it.

Safer rule:

```text
After attaching, always run lsblk inside the instance.
```

## Formatting The Wrong Disk

`mkfs` creates a new file system. If you run it on the wrong disk, you can destroy data.

Safer rule:

```text
Use lsblk and file -s before mkfs.
Never format the root disk.
```

## Confusing Device Names

The name chosen during attach, such as `/dev/sdf`, may appear differently inside Linux, especially on Nitro instances.

Safer rule:

```text
Trust lsblk inside Linux more than the console device label.
```

## Forgetting fstab Cleanup

If `/etc/fstab` points to a deleted or missing device, boot can become slower or fail depending on options.

Safer rule:

```text
Use UUID entries with nofail, and remove temporary lab entries during cleanup.
```

## Leaving Unattached EBS Volumes

An unattached EBS volume still stores data and can still cost money.

Safer rule:

```text
Detach is not enough. Delete test volumes after the lab.
```

## Formatting A Reattached Volume

When you detach an EBS volume from one instance and attach it to another, the existing file system and files can still be there.

Safer rule:

```text
Format only a new empty volume. Mount an existing volume without running mkfs.
```

## Attaching The Volume To An Instance In Another Availability Zone

EBS volumes are Availability Zone scoped. A volume created in one AZ cannot attach to an instance in a different AZ.

Safer rule:

```text
Use the same AZ for both instances when doing a detach/reattach test.
```
