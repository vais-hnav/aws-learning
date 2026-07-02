# Mistakes

## Running aws configure On The EC2 Instance

The goal of the lab is to avoid long-term access keys on EC2.

Safer rule:

```text
Use an instance profile, not aws configure, on EC2.
```

## Giving The Role AdministratorAccess

The role only needs enough S3 access for the lab.

Safer rule:

```text
Start with read-only access to one practice bucket.
```

## Confusing IAM Role And Instance Profile

The IAM role contains the permissions. The instance profile is what EC2 attaches.

Safer rule:

```text
Role = permissions.
Instance profile = EC2 wrapper for the role.
```

## Forgetting IAM Propagation Delay

New roles and instance profiles can take a short time before EC2 can use them.

Safer rule:

```text
If the first attach/test fails, wait a minute and retry before changing everything.
```

## Forgetting Cleanup

Roles and instance profiles do not usually cost money directly, but they can leave unnecessary access paths behind.

Safer rule:

```text
Delete temporary roles, policies, and profiles after the lab.
```
