# Commands

These commands build the EC2 instance profile S3 lab.

Set variables:

```bash
export AWS_REGION=ap-south-1
export ROLE_NAME=aws-learning-ec2-s3-read-role
export INSTANCE_PROFILE_NAME=aws-learning-ec2-s3-read-profile
export POLICY_NAME=aws-learning-s3-read-only
export INSTANCE_ID=i-xxxxxxxxxxxxxxxxx
export S3_BUCKET=aws-learning-s3-lab-example
```

Replace `INSTANCE_ID` and `S3_BUCKET`.

## Create IAM Role For EC2

Run from your local terminal:

```bash
aws iam create-role \
  --role-name "$ROLE_NAME" \
  --assume-role-policy-document file://phase-07-s3-ec2-instance-profile/phase-7d-ec2-instance-profile-s3/ec2-instance-profile-s3/trust-policy.json
```

## Attach Inline S3 Read Policy

The provided policy allows read access to buckets that start with `aws-learning-s3-lab-`.

```bash
aws iam put-role-policy \
  --role-name "$ROLE_NAME" \
  --policy-name "$POLICY_NAME" \
  --policy-document file://phase-07-s3-ec2-instance-profile/phase-7d-ec2-instance-profile-s3/ec2-instance-profile-s3/iam-policy.json
```

If your bucket uses another name, update `iam-policy.json` before running this command.

## Create Instance Profile

```bash
aws iam create-instance-profile \
  --instance-profile-name "$INSTANCE_PROFILE_NAME"
```

## Add Role To Instance Profile

```bash
aws iam add-role-to-instance-profile \
  --instance-profile-name "$INSTANCE_PROFILE_NAME" \
  --role-name "$ROLE_NAME"
```

IAM changes can take a short time to propagate.

## Attach Instance Profile To EC2

```bash
aws ec2 associate-iam-instance-profile \
  --region "$AWS_REGION" \
  --instance-id "$INSTANCE_ID" \
  --iam-instance-profile Name="$INSTANCE_PROFILE_NAME"
```

## Check Association

```bash
aws ec2 describe-iam-instance-profile-associations \
  --region "$AWS_REGION" \
  --filters "Name=instance-id,Values=$INSTANCE_ID" \
  --query "IamInstanceProfileAssociations[].{AssociationId:AssociationId,State:State,InstanceId:InstanceId,Profile: IamInstanceProfile.Arn}" \
  --output table
```

Save the association ID if needed:

```bash
export ASSOCIATION_ID=iip-assoc-xxxxxxxxxxxxxxxxx
```

## Test From Inside EC2

Do not run `aws configure` on the EC2 instance for this lab.

Inside the EC2 instance:

```bash
aws sts get-caller-identity
```

List the target bucket:

```bash
aws s3 ls "s3://$S3_BUCKET/"
```

Download a test object:

```bash
aws s3 cp "s3://$S3_BUCKET/s3-lab-test.txt" .
```

## Remove Association During Cleanup

```bash
aws ec2 disassociate-iam-instance-profile \
  --region "$AWS_REGION" \
  --association-id "$ASSOCIATION_ID"
```
