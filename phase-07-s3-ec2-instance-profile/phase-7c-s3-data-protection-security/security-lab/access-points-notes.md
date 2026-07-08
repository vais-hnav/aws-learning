# S3 Access Points Notes

S3 Access Points are a supplemental Phase 7C topic. They are not currently a dedicated playlist video, but they fit with S3 security, IAM policies, bucket policies, and private access design.

## What Are S3 Access Points?

An S3 Access Point is a named endpoint attached to an S3 bucket or supported FSx file system.

For S3 buckets, think of it like this:

```text
One bucket can have many access points.
Each access point can have its own policy and network controls.
Applications use the access point instead of directly using the bucket name.
```

Access Points are mainly used for object-level operations such as:
- `GetObject`
- `PutObject`
- `DeleteObject`
- `ListObjectsV2`

They are not used for bucket management operations such as deleting a bucket or changing bucket-level replication.

## Why Access Points Exist

Without Access Points, a large shared bucket can end up with one huge bucket policy trying to support many teams and apps.

Example:

```text
Bucket: company-data-lake
Team A needs access to finance/
Team B needs access to analytics/
Team C needs VPC-only access to raw/
```

Instead of putting every rule into one bucket policy, you can create separate access points:

```text
finance-app-access-point
analytics-read-access-point
raw-vpc-only-access-point
```

Each access point gets a focused policy.

## Access Point Policy And Bucket Policy Relationship

An access point policy does not replace all bucket security.

For a request through an access point to work:
- The access point policy must allow the request.
- The underlying bucket must also allow the request or delegate access control to access points.
- IAM identity policies, Service Control Policies, VPC endpoint policies, and Block Public Access can still affect the final decision.

Important:

```text
Access point restrictions apply only to requests made through that access point.
Direct requests to the bucket still follow the bucket's own policies and permissions.
```

## Access Point ARN And Alias

Access points have ARNs.

Pattern:

```text
arn:aws:s3:region:account-id:accesspoint/access-point-name
```

Example:

```text
arn:aws:s3:ap-south-1:111122223333:accesspoint/aws-learning-readonly-ap
```

S3 can also generate an access point alias. The alias can be used like a bucket name for supported object operations.

## VPC-Only Access Points

An access point can be restricted to a VPC.

This is useful when:
- EC2, Lambda, or ECS workloads should access S3 privately.
- Data should not be reachable from the public internet path.
- You want to combine S3 access with VPC endpoint policies.

Important:
- The access point network origin can be internet or VPC.
- For VPC-only access, the VPC endpoint policy must allow access to both the access point and the underlying bucket.
- VPC-only access points are more advanced and should be practiced after VPC endpoints are understood.

## When To Use Access Points

Use S3 Access Points when:
- One bucket is shared by many teams or applications.
- Each app needs a different access policy.
- You want smaller, focused policies instead of one large bucket policy.
- You want to restrict access through a VPC.
- You are building data lake style access patterns.

## When Not To Use Access Points

Do not add Access Points just because a bucket exists.

For beginner projects, normal IAM policies and bucket policies are enough when:
- The bucket has one simple use case.
- One app or one user needs access.
- The policy is already easy to read.
- There is no VPC-only access requirement.

Beginner rule:

```text
Use IAM and bucket policies first. Add Access Points when bucket access becomes shared, complex, or network-specific.
```

## Safe CLI Examples

Set variables:

```bash
export AWS_REGION=ap-south-1
export AWS_ACCOUNT_ID=111122223333
export S3_BUCKET=aws-learning-secure-bucket
export S3_ACCESS_POINT=aws-learning-readonly-ap
```

Create an access point:

```bash
aws s3control create-access-point \
  --account-id "$AWS_ACCOUNT_ID" \
  --name "$S3_ACCESS_POINT" \
  --bucket "$S3_BUCKET" \
  --region "$AWS_REGION"
```

Get access point details:

```bash
aws s3control get-access-point \
  --account-id "$AWS_ACCOUNT_ID" \
  --name "$S3_ACCESS_POINT" \
  --region "$AWS_REGION"
```

Attach an access point policy:

```bash
aws s3control put-access-point-policy \
  --account-id "$AWS_ACCOUNT_ID" \
  --name "$S3_ACCESS_POINT" \
  --policy file://phase-07-s3-ec2-instance-profile/phase-7c-s3-data-protection-security/security-lab/access-point-readonly-policy.json \
  --region "$AWS_REGION"
```

Delete the access point after practice:

```bash
aws s3control delete-access-point \
  --account-id "$AWS_ACCOUNT_ID" \
  --name "$S3_ACCESS_POINT" \
  --region "$AWS_REGION"
```

## Example Access Point Policy

This example allows one IAM role to list and read objects through one access point.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowListThroughAccessPoint",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::111122223333:role/aws-learning-read-only-role"
      },
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:ap-south-1:111122223333:accesspoint/aws-learning-readonly-ap"
    },
    {
      "Sid": "AllowReadObjectsThroughAccessPoint",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::111122223333:role/aws-learning-read-only-role"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:ap-south-1:111122223333:accesspoint/aws-learning-readonly-ap/object/*"
    }
  ]
}
```

Notice the object ARN format:

```text
arn:aws:s3:region:account-id:accesspoint/access-point-name/object/key-pattern
```

## Access Points vs Bucket Policies

| Feature | Bucket policy | Access point policy |
|---|---|---|
| Scope | Whole bucket resource | One named access path |
| Best for | Simple bucket-level access | Separate app/team access patterns |
| Network control | Can use conditions | Can be internet or VPC-only |
| Complexity | Can become large | Keeps policies smaller |
| Direct bucket access | Controls bucket directly | Does not automatically block direct bucket access |

## Cleanup Checklist

- Delete test access point policies.
- Delete test access points.
- Confirm direct bucket policies still follow least privilege.
- Keep Block Public Access enabled unless there is a specific public-hosting lab.
- Do not leave unused access points in the account.

## Official References

- https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-points.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-access-points.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-access-points.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-points-policies.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-points-vpc.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-points-naming.html
