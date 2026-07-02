# AWS CLI Commands

These commands mirror the EBS volume hands-on flow. Use them only if you intentionally want to repeat the lab with the AWS CLI.

For console practice, follow the same ideas:
- Find the EC2 instance Availability Zone.
- Create the EBS volume in that same Availability Zone.
- Attach the volume.
- Format and mount from inside Linux.
- Detach and delete the volume after practice.

## Variables

Set these first:

```bash
export AWS_REGION=ap-south-1
export INSTANCE_ID=i-xxxxxxxxxxxxxxxxx
export VOLUME_SIZE_GIB=1
```

If your learning region is different, replace `ap-south-1` with your chosen region.

## Confirm Identity

```bash
aws sts get-caller-identity
```

## Find The Instance Availability Zone

EBS volumes must be created in the same Availability Zone as the EC2 instance they attach to.

```bash
aws ec2 describe-instances \
  --region "$AWS_REGION" \
  --instance-ids "$INSTANCE_ID" \
  --query "Reservations[0].Instances[0].Placement.AvailabilityZone" \
  --output text
```

Save the output:

```bash
export AVAILABILITY_ZONE=ap-south-1a
```

## Create A Small EBS Volume

Use a tiny `gp3` volume for practice.

```bash
aws ec2 create-volume \
  --region "$AWS_REGION" \
  --availability-zone "$AVAILABILITY_ZONE" \
  --size "$VOLUME_SIZE_GIB" \
  --volume-type gp3 \
  --tag-specifications "ResourceType=volume,Tags=[{Key=Name,Value=aws-learning-ebs-lab}]" \
  --query "VolumeId" \
  --output text
```

Save the volume ID:

```bash
export VOLUME_ID=vol-xxxxxxxxxxxxxxxxx
```

## Wait Until The Volume Is Available

```bash
aws ec2 wait volume-available \
  --region "$AWS_REGION" \
  --volume-ids "$VOLUME_ID"
```

## Attach The Volume To The Instance

```bash
aws ec2 attach-volume \
  --region "$AWS_REGION" \
  --volume-id "$VOLUME_ID" \
  --instance-id "$INSTANCE_ID" \
  --device /dev/sdf
```

On Nitro-based instances, Linux may show this as an NVMe device like `/dev/nvme1n1` instead of `/dev/sdf`.

## Check Attachment State

```bash
aws ec2 describe-volumes \
  --region "$AWS_REGION" \
  --volume-ids "$VOLUME_ID" \
  --query "Volumes[0].Attachments[0].{State:State,InstanceId:InstanceId,Device:Device}" \
  --output table
```

## Detach The Volume During Cleanup

Unmount it inside Linux first, then detach:

```bash
aws ec2 detach-volume \
  --region "$AWS_REGION" \
  --volume-id "$VOLUME_ID"
```

Wait until it is available again:

```bash
aws ec2 wait volume-available \
  --region "$AWS_REGION" \
  --volume-ids "$VOLUME_ID"
```

## Delete The Volume During Cleanup

```bash
aws ec2 delete-volume \
  --region "$AWS_REGION" \
  --volume-id "$VOLUME_ID"
```

## Verify No Unattached Practice Volumes Remain

```bash
aws ec2 describe-volumes \
  --region "$AWS_REGION" \
  --filters "Name=status,Values=available" \
  --query "Volumes[].{VolumeId:VolumeId,Size:Size,Type:VolumeType,Name:Tags[?Key=='Name']|[0].Value}" \
  --output table
```

## Compare Existing Volume Types

This shows the volume type used by existing EBS volumes.

```bash
aws ec2 describe-volumes \
  --region "$AWS_REGION" \
  --query "Volumes[].{VolumeId:VolumeId,Size:Size,Type:VolumeType,State:State,AZ:AvailabilityZone,Name:Tags[?Key=='Name']|[0].Value}" \
  --output table
```

## Create A Snapshot

Use this only for a small practice volume.

```bash
aws ec2 create-snapshot \
  --region "$AWS_REGION" \
  --volume-id "$VOLUME_ID" \
  --description "aws-learning EBS snapshot practice" \
  --tag-specifications "ResourceType=snapshot,Tags=[{Key=Name,Value=aws-learning-ebs-snapshot}]" \
  --query "SnapshotId" \
  --output text
```

Save the snapshot ID:

```bash
export SNAPSHOT_ID=snap-xxxxxxxxxxxxxxxxx
```

## Wait For Snapshot Completion

```bash
aws ec2 wait snapshot-completed \
  --region "$AWS_REGION" \
  --snapshot-ids "$SNAPSHOT_ID"
```

## Create A Volume From A Snapshot

Create the restored volume in the same Availability Zone as the instance that will attach it.

```bash
aws ec2 create-volume \
  --region "$AWS_REGION" \
  --availability-zone "$AVAILABILITY_ZONE" \
  --snapshot-id "$SNAPSHOT_ID" \
  --volume-type gp3 \
  --tag-specifications "ResourceType=volume,Tags=[{Key=Name,Value=aws-learning-restored-ebs-volume}]" \
  --query "VolumeId" \
  --output text
```

## Delete A Practice Snapshot

Only delete snapshots that were created for this lab.

```bash
aws ec2 delete-snapshot \
  --region "$AWS_REGION" \
  --snapshot-id "$SNAPSHOT_ID"
```

## Check Lifecycle Manager Policies

This is useful if you explored Lifecycle Manager in the console.

```bash
aws dlm get-lifecycle-policies \
  --region "$AWS_REGION" \
  --query "Policies[].{PolicyId:PolicyId,Description:Description,State:State,PolicyType:PolicyType}" \
  --output table
```

If you created a practice policy and no longer need it, delete it:

```bash
aws dlm delete-lifecycle-policy \
  --region "$AWS_REGION" \
  --policy-id policy-xxxxxxxxxxxxxxxxx
```
