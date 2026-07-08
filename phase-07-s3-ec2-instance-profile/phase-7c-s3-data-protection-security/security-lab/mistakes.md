# Mistakes

## Thinking Durability Means Recovery From Every Mistake

S3 durability protects object storage, but it does not automatically protect against bad permissions, accidental deletes, overwrites, or application mistakes.

Safer rule:

```text
Use versioning, replication, Object Lock, backups, and least privilege for stronger protection.
```

## Enabling Versioning Without Planning Cleanup

Versioning keeps old versions and delete markers. Those versions can keep using storage.

Safer rule:

```text
Use versioning on test buckets only when you also know how to delete versions and delete markers.
```

## Assuming Delete Means Gone In A Versioned Bucket

A normal delete in a versioned bucket creates a delete marker. Older versions can still exist.

Safer rule:

```text
List object versions before assuming a file is permanently deleted.
```

## Creating Replication Without Cost Awareness

Replication can duplicate storage and create cross-Region data transfer or request costs.

Safer rule:

```text
Use small test files and delete replication rules immediately after practice.
```

## Expecting Replication To Copy Old Objects Automatically

A new replication rule usually applies to new objects. Existing objects need separate planning, such as batch replication.

Safer rule:

```text
Upload a new test object after enabling replication when verifying the rule.
```

## Enabling Object Lock Casually

Object Lock is designed to prevent deletion and overwrite. That is useful in production compliance scenarios but risky in beginner labs.

Safer rule:

```text
Learn Object Lock conceptually unless the lab explicitly requires a temporary lock-enabled bucket.
```

## Using Compliance Mode For Practice

Compliance mode can prevent deletion until retention expires, even for highly privileged users.

Safer rule:

```text
Avoid compliance mode in learning accounts unless you fully understand retention and cleanup impact.
```

## Making A Bucket Public Accidentally

Public access can come from ACLs, bucket policies, access point policies, or object permissions.

Safer rule:

```text
Keep all S3 Block Public Access settings enabled for beginner buckets.
```

## Thinking Access Points Replace Bucket Security

Access point policies apply only to requests made through that access point. Direct bucket requests still use the bucket policy and IAM permissions.

Safer rule:

```text
Secure the bucket first, then add access points for specific access paths.
```

## Creating Too Many Access Points Too Early

Access Points are useful for large shared datasets, but they add another policy layer to understand.

Safer rule:

```text
Use IAM and bucket policies for simple labs. Add Access Points when access patterns become complex.
```

## Confusing IAM Policies And Bucket Policies

IAM policies are attached to identities. Bucket policies are attached to buckets.

Safer rule:

```text
Use IAM policies for what a user, group, or role can do. Use bucket policies for rules attached directly to the bucket.
```

## Forgetting Explicit Deny Wins

An explicit deny in an IAM policy, bucket policy, Service Control Policy, VPC endpoint policy, or other applicable policy overrides allows.

Safer rule:

```text
When access is denied, search for explicit deny statements before adding more allow policies.
```

## Using SSE-KMS Without KMS Permissions

SSE-KMS requires S3 permissions and KMS permissions. The KMS key policy can also block access.

Safer rule:

```text
Use SSE-S3 for beginner labs. Use SSE-KMS only when you also understand KMS key policies and grants.
```

## Disabling Block Public Access To Fix A Permission Error

Turning off Block Public Access can expose the bucket if a public policy or ACL exists.

Safer rule:

```text
Keep Block Public Access enabled and fix the IAM or bucket policy instead.
```
