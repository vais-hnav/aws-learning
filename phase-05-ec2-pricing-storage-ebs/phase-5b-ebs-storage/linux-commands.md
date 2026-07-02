# Linux Commands

Run these commands inside the Linux EC2 instance after the EBS volume is attached.

Important:
- Do not format the root disk.
- Do not run `mkfs` on a disk that already contains data you need.
- Device names can differ. Check carefully with `lsblk`.

## Find Block Devices

```bash
lsblk
```

Common examples:

```text
/dev/xvda      root disk
/dev/xvdf      attached EBS volume on some instance types
/dev/nvme0n1   root disk on Nitro instances
/dev/nvme1n1   attached EBS volume on Nitro instances
```

## Check Whether The New Disk Has A File System

Replace the device path with your actual attached disk.

```bash
sudo file -s /dev/xvdf
```

or, on Nitro instances:

```bash
sudo file -s /dev/nvme1n1
```

If the output says `data`, the volume is empty and has no file system yet.

You can also check with:

```bash
sudo lsblk -f
```

## Create A File System

Only do this for a new empty lab volume.

```bash
sudo mkfs -t xfs /dev/xvdf
```

or:

```bash
sudo mkfs -t xfs /dev/nvme1n1
```

If `mkfs.xfs` is missing on Amazon Linux:

```bash
sudo yum install -y xfsprogs
```

## Create A Mount Point

```bash
sudo mkdir -p /data
```

## Mount The Volume

```bash
sudo mount /dev/xvdf /data
```

or:

```bash
sudo mount /dev/nvme1n1 /data
```

## Verify The Mount

```bash
df -h
```

```bash
lsblk
```

## Test Writing A File

```bash
echo "EBS lab test" | sudo tee /data/ebs-test.txt
cat /data/ebs-test.txt
```

## Persistence Test: Read The File After Reattaching To Another Instance

On the first instance, create a file:

```bash
echo "This file survived EBS detach and reattach" | sudo tee /data/ebs-persistence-test.txt
sync
```

Unmount the volume before detaching it:

```bash
cd ~
sudo umount /data
```

After attaching the same EBS volume to another EC2 instance, identify the disk:

```bash
lsblk
sudo lsblk -f
```

Do not run `mkfs` on the reattached volume. It already has a file system.

Create a mount point:

```bash
sudo mkdir -p /data
```

Mount the existing file system:

```bash
sudo mount /dev/xvdf /data
```

or, on Nitro instances:

```bash
sudo mount /dev/nvme1n1 /data
```

Verify the file:

```bash
ls -la /data
cat /data/ebs-persistence-test.txt
```

## Optional: Let ec2-user Write To The Folder

```bash
sudo chown -R ec2-user:ec2-user /data
```

## Optional: Persist Mount After Reboot

Find the UUID:

```bash
sudo blkid
```

Back up `/etc/fstab`:

```bash
sudo cp /etc/fstab /etc/fstab.orig
```

Add a line like this to `/etc/fstab`, replacing the UUID:

```text
UUID=your-volume-uuid /data xfs defaults,nofail 0 2
```

Test before rebooting:

```bash
sudo umount /data
sudo mount -a
df -h
```

## Unmount During Cleanup

```bash
sudo umount /data
```

If the device is busy:

```bash
cd ~
sudo umount /data
```
