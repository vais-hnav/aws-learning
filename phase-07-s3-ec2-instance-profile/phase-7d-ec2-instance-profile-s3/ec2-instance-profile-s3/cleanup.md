# Cleanup

Use this checklist after the EC2 instance profile S3 lab.

## 1. Find The Instance Profile Association

```bash
aws ec2 describe-iam-instance-profile-associations \
  --region "$AWS_REGION" \
  --filters "Name=instance-id,Values=$INSTANCE_ID" \
  --query "IamInstanceProfileAssociations[].{AssociationId:AssociationId,State:State,InstanceId:InstanceId,Profile:IamInstanceProfile.Arn}" \
  --output table
```

## 2. Disassociate The Instance Profile

```bash
aws ec2 disassociate-iam-instance-profile \
  --region "$AWS_REGION" \
  --association-id "$ASSOCIATION_ID"
```

## 3. Remove Role From Instance Profile

```bash
aws iam remove-role-from-instance-profile \
  --instance-profile-name "$INSTANCE_PROFILE_NAME" \
  --role-name "$ROLE_NAME"
```

## 4. Delete Instance Profile

```bash
aws iam delete-instance-profile \
  --instance-profile-name "$INSTANCE_PROFILE_NAME"
```

## 5. Delete Inline Policy

```bash
aws iam delete-role-policy \
  --role-name "$ROLE_NAME" \
  --policy-name "$POLICY_NAME"
```

## 6. Delete Role

```bash
aws iam delete-role \
  --role-name "$ROLE_NAME"
```

## 7. Clean Up S3 Test Resources

If the bucket was created only for this lab:

```bash
aws s3 rm "s3://$S3_BUCKET/" --recursive
aws s3 rb "s3://$S3_BUCKET"
```

## 8. Clean Up EC2

Terminate the EC2 instance if it was only used for this lab:

```bash
aws ec2 terminate-instances \
  --region "$AWS_REGION" \
  --instance-ids "$INSTANCE_ID"
```

## Completion Checklist

- Instance profile disassociated from EC2.
- Role removed from instance profile.
- Instance profile deleted.
- Inline role policy deleted.
- IAM role deleted.
- S3 test object and bucket deleted if temporary.
- EC2 instance terminated if temporary.
