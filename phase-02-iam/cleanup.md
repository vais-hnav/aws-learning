# IAM Cleanup

IAM usually does not create direct compute cost like EC2, but IAM cleanup is still important for account safety.

Cleanup goal:
- remove access that is no longer needed
- delete old credentials
- keep permissions simple
- avoid leaving powerful identities behind

## Before Cleanup

Check:
- Do I still need this IAM user?
- Do I still need this access key?
- Is this policy attached anywhere?
- Is this group still useful?
- Is this role used by an AWS service?

Do not delete your only working admin IAM user unless you have another safe way to access the account.

## Root User Checklist

Keep:
- root MFA enabled
- root email/password secure
- root user not used for daily work

Do not:
- create root access keys
- use root for regular labs
- share root credentials

## IAM User Cleanup

For lab users you no longer need:

1. Remove the user from groups.
2. Detach direct policies from the user.
3. Delete access keys.
4. Remove console password if the user should not log in.
5. Delete the IAM user if it was only for practice.

CLI inspection:

```bash
AWS_PROFILE=user1 aws iam list-users
AWS_PROFILE=user1 aws iam list-access-keys --user-name USER_NAME
AWS_PROFILE=user1 aws iam list-groups-for-user --user-name USER_NAME
AWS_PROFILE=user1 aws iam list-attached-user-policies --user-name USER_NAME
```

## Access Key Cleanup

Access keys are sensitive.

Delete unused keys:

```bash
AWS_PROFILE=user1 aws iam delete-access-key \
  --user-name USER_NAME \
  --access-key-id ACCESS_KEY_ID
```

Safety rule:
- If a key was copied into a document, terminal history, chat, or GitHub, treat it as leaked and delete it.

Example JSON to recognize:

```json
{
  "AccessKeyMetadata": [
    {
      "UserName": "user1",
      "AccessKeyId": "AKIAEXAMPLEONLY1234",
      "Status": "Active",
      "CreateDate": "2026-07-01T00:00:00+00:00"
    }
  ]
}
```

Cleanup decision:
- If the key is old, unused, or exposed, delete it.
- Do not store the secret access key in notes.

## Group Cleanup

For practice groups:

1. Remove users from the group.
2. Detach policies from the group.
3. Delete the group if it is no longer needed.

CLI inspection:

```bash
AWS_PROFILE=user1 aws iam list-groups
AWS_PROFILE=user1 aws iam get-group --group-name GROUP_NAME
AWS_PROFILE=user1 aws iam list-attached-group-policies --group-name GROUP_NAME
```

## Policy Cleanup

For practice customer-managed policies:

1. Check where the policy is attached.
2. Detach it from users, groups, or roles.
3. Delete the policy only when it has no attachments.

CLI inspection:

```bash
AWS_PROFILE=user1 aws iam list-policies --scope Local
AWS_PROFILE=user1 aws iam list-entities-for-policy --policy-arn POLICY_ARN
```

Example JSON to understand before deleting a policy:

```json
{
  "PolicyGroups": [
    {
      "GroupName": "S3ReadOnlyLearners"
    }
  ],
  "PolicyUsers": [],
  "PolicyRoles": []
}
```

Cleanup decision:
- This policy is attached to a group.
- Detach it from the group before deleting the policy.

## Role Cleanup

Do not delete a role until you know what uses it.

For practice roles:

1. Check the trust policy.
2. Check attached policies.
3. Confirm no EC2 instance, Lambda function, or other service depends on it.
4. Detach policies.
5. Delete the role if it was only for practice.

CLI inspection:

```bash
AWS_PROFILE=user1 aws iam list-roles
AWS_PROFILE=user1 aws iam list-attached-role-policies --role-name ROLE_NAME
```

Example trust policy to recognize before deleting a role:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Cleanup decision:
- This role is trusted by EC2.
- Check whether any EC2 instance profile or EC2 lab depends on it before deleting.

## Final IAM Safety Checklist

After every IAM lab:
- root MFA is still enabled
- no root access keys exist
- no real credentials are in the repo
- unused access keys are deleted
- test users/groups/policies are removed if not needed
- powerful permissions are not attached accidentally
- daily work uses IAM user/profile, not root
