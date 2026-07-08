# Phase 7C: S3 Data Protection And Security

Goal:
Learn S3 durability, versioning, replication, Object Lock, bucket policies, encryption, and public-access safety.

Videos:
- 50. S3 data protection and durability - complete
- 51. S3 versioning recovery lab - complete
- 52. S3 cross-region replication lab - complete
- 53. S3 Object Lock - complete
- 54. S3 security - complete
- 55. IAM vs bucket policies - complete
- 56. S3 encryption - complete
- 57. S3 Block Public Access - complete

Labs:
- `security-lab/`

Supplemental notes:
- `security-lab/access-points-notes.md`

What I learned from videos 50-54:
- S3 durability protects object data, but I still need protection against accidental delete, overwrite, misconfiguration, and unauthorized access.
- Versioning keeps previous object versions and can help recover overwritten or deleted objects.
- A delete in a versioned bucket creates a delete marker instead of immediately removing all object versions.
- Cross-Region Replication copies new objects asynchronously to another bucket and requires versioning on both buckets.
- Replication can increase storage, request, and data transfer cost, so it needs careful cleanup.
- Object Lock uses a WORM model to protect object versions from overwrite or delete for a retention period or legal hold.
- S3 security combines identity permissions, resource policies, Block Public Access, encryption, monitoring, and least privilege.

What I learned from videos 55-57:
- IAM policies are identity-based policies attached to users, groups, or roles.
- Bucket policies are resource-based policies attached to S3 buckets.
- IAM policies are useful for controlling what an identity can do across AWS.
- Bucket policies are useful for bucket-level rules, cross-account access, and resource-side explicit denies.
- S3 encrypts objects by default with SSE-S3, and SSE-KMS adds KMS key control, auditability, and key policy requirements.
- S3 Block Public Access is a guardrail that can override public ACLs, bucket policies, and access point policies.
- Beginner S3 buckets should keep Block Public Access enabled.

Supplemental topic: S3 Access Points
- S3 Access Points are not currently a dedicated playlist video in this phase.
- They fit naturally after S3 security and before IAM vs bucket policies.
- They help manage access to shared datasets by creating separate access endpoints and policies for different applications, teams, or network paths.

Safety:
- Be careful with replication and Object Lock because they can increase cost or make deletion harder.
- Keep public access blocked unless the video explicitly explains a safe exception.
- Delete all test object versions and delete markers after versioning practice.
- Do not enable Object Lock on casual learning buckets.
