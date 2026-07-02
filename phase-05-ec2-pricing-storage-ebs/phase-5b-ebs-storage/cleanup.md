# Cleanup

Use this checklist after the EBS hands-on lab.

EBS cleanup matters because an unattached EBS volume can still create storage charges.

## 1. Confirm What Is Mounted

Run this inside the EC2 instance:

```bash
df -h
lsblk
```

Find the mount point used in the lab, usually:

```text
/data
```

## 2. Remove Temporary Test Files

```bash
rm -f /data/ebs-test.txt
rm -f /data/ebs-persistence-test.txt
```

Use `sudo` if needed:

```bash
sudo rm -f /data/ebs-test.txt
sudo rm -f /data/ebs-persistence-test.txt
```

## 3. Remove fstab Entry If Added

If you added a persistent mount entry, edit `/etc/fstab` and remove the lab volume line.

Back up first:

```bash
sudo cp /etc/fstab /etc/fstab.cleanup-backup
```

Open the file:

```bash
sudo nano /etc/fstab
```

Remove the line for `/data`.

Test:

```bash
sudo mount -a
```

## 4. Unmount The Volume

```bash
cd ~
sudo umount /data
```

Verify:

```bash
df -h
lsblk
```

The disk may still show in `lsblk`, but `/data` should no longer be mounted.

## 5. Detach The EBS Volume

From your local terminal:

```bash
aws ec2 detach-volume \
  --region "$AWS_REGION" \
  --volume-id "$VOLUME_ID"
```

Wait until it becomes available:

```bash
aws ec2 wait volume-available \
  --region "$AWS_REGION" \
  --volume-ids "$VOLUME_ID"
```

## 6. Delete The EBS Volume

```bash
aws ec2 delete-volume \
  --region "$AWS_REGION" \
  --volume-id "$VOLUME_ID"
```

## 7. Verify No Practice Volumes Are Left

```bash
aws ec2 describe-volumes \
  --region "$AWS_REGION" \
  --filters "Name=status,Values=available" \
  --query "Volumes[].{VolumeId:VolumeId,Size:Size,Type:VolumeType,Name:Tags[?Key=='Name']|[0].Value}" \
  --output table
```

Expected result:

```text
No unused practice EBS volumes.
```

## 8. Terminate The EC2 Instance If It Was Only For This Lab

```bash
aws ec2 terminate-instances \
  --region "$AWS_REGION" \
  --instance-ids "$INSTANCE_ID"
```

## Completion Checklist

- Test file removed.
- Persistence test file removed.
- `/data` unmounted.
- `/etc/fstab` lab entry removed if it was added.
- EBS volume detached.
- EBS volume deleted.
- Both EC2 instances terminated if they were only used for this lab.
- Billing dashboard checked later for unexpected EC2/EBS cost.
