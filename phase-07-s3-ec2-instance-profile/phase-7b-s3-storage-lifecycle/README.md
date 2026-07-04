# Phase 7B: S3 Storage Classes And Lifecycle

Goal:
Understand S3 storage classes, lifecycle rules, and storage-cost behavior.

Videos:
- 42. S3 storage classes - complete
- 43. S3 Standard - complete
- 44. S3 Express One Zone - complete
- 45. S3 Directory Buckets - complete
- 46. S3 Standard-IA and One Zone-IA - complete
- 47. S3 Glacier - complete
- 48. S3 lifecycle policies - complete
- 49. S3 Intelligent-Tiering - complete

Labs:
- `lifecycle-lab/`

What I learned from videos 42-49:
- S3 storage classes are selected based on access pattern, latency need, durability/resiliency expectations, and cost.
- S3 Standard is the default general-purpose storage class for frequently accessed data.
- S3 Standard is the safest beginner default because it avoids retrieval fees and special bucket workflows.
- S3 Express One Zone is for very latency-sensitive, frequently accessed data.
- S3 Express One Zone stores data within a single Availability Zone and uses directory buckets.
- Directory buckets are different from general purpose buckets and are designed for high-performance hierarchical workloads.
- S3 Standard-IA and S3 One Zone-IA are for infrequently accessed data that still needs fast retrieval.
- S3 Glacier classes are for archive data and require careful restore and minimum-duration planning.
- Lifecycle policies can transition or expire objects automatically, so filters and cleanup checks matter.
- S3 Intelligent-Tiering helps when access patterns are unknown or changing.
- Lower storage price does not automatically mean lower total cost; request charges, retrieval charges, minimum storage duration, and operational complexity matter.

Safety:
- Avoid creating expensive or long-retention storage configurations unless the lab is explicitly safe.
- Delete test objects, lifecycle rules, and buckets after practice.
