# AWS Learning Log

This file is the source of truth for the Notion progress dashboard.

Dashboard layout:

- Group by `Phase`.
- Keep rows in the same order as this file.
- Use `Video Topic` as the title/name column in Notion.
- Keep `Watched Status` as the third visible column.
- Use `Playlist Video` for the original playlist video number.

Status values:

- `Complete` means the video/lab work is done.
- `Not started` means the video has not been started yet.
- `Pending` means the video was watched, but the matching lab/check is still open.
- `Theory-only` means no AWS resource lab is expected.

Current status: All 73 currently published playlist videos and the Phase 10 Serverless Tasks CRUD API project are complete. Phase 9 remains open for future DynamoDB playlist additions. Post-playlist Phase 11 is next.

| Phase | Video Topic | Watched Status | Playlist Video | AWS Service | Lab Status | Date | Notes |
|---|---|---|---:|---|---|---|---|
| Phase 1 - AWS Foundation | AWS Full Course | Complete | 1 | AWS Overview | Theory-only | 2026-06-21 | Course roadmap, AWS learning approach, and why hands-on practice matters. |
| Phase 1 - AWS Foundation | What is Cloud Computing? | Complete | 2 | Cloud Concepts | Theory-only | 2026-06-21 | Cloud computing basics, on-demand infrastructure, scalability, and managed services. |
| Phase 1 - AWS Foundation | IaaS, PaaS, and SaaS | Complete | 3 | Cloud Models | Theory-only | 2026-06-22 | Compared cloud service models and understood where AWS services fit. |
| Phase 1 - AWS Foundation | Introduction to AWS | Complete | 4 | AWS Overview | Theory-only | 2026-06-22 | AWS global platform, service categories, and beginner learning path. |
| Phase 1 - AWS Foundation | Create Free Tier AWS Account | Complete | 5 | Account/Billing | Complete | 2026-06-23 | Account created and Free Tier safety basics reviewed. |
| Phase 1 - AWS Foundation | Set up MFA for Root User | Complete | 6 | Account/IAM | Complete | 2026-06-23 | Root MFA enabled and root account safety checklist completed. |
| Phase 1 - AWS Foundation | AWS Regions and Availability Zones | Complete | 7 | Regions/AZs | Complete | 2026-06-24 | Region selection understood; default learning region documented. |
| Phase 1 - AWS Foundation | AWS Billing Basics and Zero-Cost Budget | Complete | 19 | Billing/Budgets | Complete | 2026-07-01 | IAM billing access, bill summary, charges by service/Region, zero-spend budget, and monthly cost budget reviewed. |
| Phase 1 - AWS Foundation | AWS Free Tier Account Changes in 2026 | Complete | 60 | Account/Billing | Theory-only | 2026-06-25 | Free Tier changes and beginner cost rules reviewed. |
| Phase 2 - IAM | Introduction to IAM | Complete | 8 | IAM | Complete | 2026-06-26 | IAM identity, authentication, authorization, and least privilege. |
| Phase 2 - IAM | Creating IAM Policies | Complete | 9 | IAM | Complete | 2026-06-26 | JSON policy structure, actions, resources, and permission scope. |
| Phase 2 - IAM | Creating IAM User | Complete | 10 | IAM | Complete | 2026-06-27 | IAM user created for daily work and credential safety reviewed. |
| Phase 2 - IAM | Creating IAM Groups | Complete | 11 | IAM | Complete | 2026-06-27 | Group-based permission management and policy reuse. |
| Phase 2 - IAM | IAM Roles | Complete | 14 | IAM | Complete | 2026-06-28 | Temporary credentials, service roles, and role-based access. |
| Phase 3 - AWS CLI and Automation Basics | How to use AWS CLI | Complete | 12 | AWS CLI | Complete | 2026-06-28 | CLI setup, profiles, identity checks, and common commands. |
| Phase 3 - AWS CLI and Automation Basics | AWS CLI and PowerShell Real-World Example | Complete | 13 | AWS CLI/PowerShell | Complete | 2026-06-29 | PowerShell AWS tooling explored; Python boto3 chosen for scripting where useful. |
| Phase 3 - AWS CLI and Automation Basics | Convert AWS Console Actions to CLI Code with AI | Complete | 36 | AWS CLI/Automation | Complete | 2026-06-29 | Console-to-CLI workflow reviewed and scripts documented. |
| Phase 4 - EC2 Basics | Introduction to AWS EC2 Service | Complete | 15 | EC2 | Pending | 2026-06-29 | Video watched and EC2 intro lab prepared; read-only CLI checks still pending. |
| Phase 4 - EC2 Basics | Create Linux EC2 Instance | Complete | 16 | EC2 | Complete | 2026-06-30 | Linux EC2 launch, key pair, SSH connection, public IPv4, and cost cleanup notes. |
| Phase 4 - EC2 Basics | Host a Simple Website in Linux EC2 | Complete | 17 | EC2 | Complete | 2026-06-30 | Apache HTTP Server installed on Linux EC2; sample index file uploaded with SCP and tested over HTTP. |
| Phase 4 - EC2 Basics | Create EC2 Instances using AWS CLI | Complete | 18 | EC2/CLI | Complete | 2026-07-01 | EC2 CLI launch, default/explicit Region behavior, JSON output, instance IDs, stop/start commands, and cleanup safety documented. |
| Phase 4 - EC2 Basics | EC2 Instance Connect | Complete | 20 | EC2 | Complete | 2026-07-01 | Browser-based Linux EC2 connection, default username, private-key simplification, IAM permission requirement, and cleanup notes documented. |
| Phase 4 - EC2 Basics | EC2 Instance Pricing | Complete | 21 | EC2/Pricing | Theory-only | 2026-07-01 | EC2 pricing inputs, running-time billing, related EBS/IP costs, and cleanup checks documented. |
| Phase 4 - EC2 Basics | Choose the Right EC2 Instance | Complete | 22 | EC2 | Theory-only | 2026-07-01 | Instance families, vCPU/memory/storage/network selection, right-sizing, and safe CLI inspection documented. |
| Phase 4 - EC2 Basics | EC2 Cost Optimization | Complete | 23 | EC2/Pricing | Theory-only | 2026-07-01 | Good vs bad savings, purchasing options, Spot interruption risk, and beginner no-commitment rules documented. |
| Phase 5A - EC2 Pricing Models | EC2 Savings Plans | Complete | 24 | EC2/Pricing | Theory-only | 2026-07-02 | Savings Plans explained as one-year or three-year compute spend commitments; Compute vs EC2 Instance Savings Plans and no-purchase beginner rule documented. |
| Phase 5A - EC2 Pricing Models | EC2 Spot Instances | Complete | 25 | EC2/Pricing | Theory-only | 2026-07-02 | Spot explained as spare EC2 capacity with lower price and interruption risk; safe use cases, unsafe stateful workloads, and observe-only rule documented. |
| Phase 5A - EC2 Pricing Models | Dedicated Host | Complete | 26 | EC2/Pricing | Theory-only | 2026-07-02 | Dedicated Host explained as dedicated physical server capacity with host visibility, BYOL/compliance use cases, and no-allocation beginner rule documented. |
| Phase 5A - EC2 Pricing Models | Dedicated Instance | Complete | 27 | EC2/Pricing | Theory-only | 2026-07-02 | Dedicated Instance explained as account-dedicated hardware without host placement control; Dedicated Host comparison and no-launch beginner rule documented. |
| Phase 5B - EBS Storage | EC2 Storage Options: EBS, S3, EFS | Complete | 28 | EC2/EBS/S3/EFS | Theory-only | 2026-07-02 | EBS as block storage, S3 as object storage, EFS as shared Linux file storage, and instance store as temporary local storage documented. |
| Phase 5B - EBS Storage | IOPS vs Throughput vs Latency | Complete | 29 | Storage Performance | Theory-only | 2026-07-02 | IOPS, throughput, latency, workload matching, queue depth, and EBS performance factors documented. |
| Phase 5B - EBS Storage | EBS Volumes Hands-on Lab | Complete | 30 | EBS | Complete | 2026-07-02 | Created/attached small EBS volume concept documented with same-AZ rule, tagging, CLI commands, cleanup checks, and detach/reattach persistence proof. |
| Phase 5B - EBS Storage | Format and Mount EBS Volumes in Linux | Complete | 31 | EBS/Linux | Complete | 2026-07-02 | Linux disk detection, file-system check, format, mount point, mount verification, fstab safety, reattach without formatting, and unmount cleanup documented. |
| Phase 5B - EBS Storage | EBS Volume Types | Complete | 32 | EBS | Theory-only | 2026-07-02 | SSD vs HDD volume categories, gp3 beginner default, io1/io2 advanced use cases, and st1/sc1 throughput/cold-storage use cases documented. |
| Phase 5B - EBS Storage | Create EBS Snapshots | Complete | 33 | EBS | Complete | 2026-07-02 | Snapshot backup/restore flow, incremental backup concept, create-volume-from-snapshot workflow, cleanup rules, and basic Lifecycle Manager console exploration documented. |
| Phase 6 - VPC and Scalability | VPC and Security Groups | Complete | 37 | VPC/EC2 | Complete | 2026-07-03 | Default VPC, subnets, route tables, internet gateway, security groups, and custom SSH inbound rule testing with laptop public IP documented. |
| Phase 6 - VPC and Scalability | Vertical and Horizontal Scalability | Complete | 38 | Scalability | Theory-only | 2026-07-03 | Vertical scaling as bigger instance and horizontal scaling as more instances documented, with ALB/ASG marked as post-playlist follow-up topics. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Cloud Storage Hands-on Lab | Complete | 34 | S3 | Complete | 2026-07-03 | Private S3 bucket/object workflow documented: create bucket, upload object, list, download, copy, delete objects, delete bucket, and keep Block Public Access enabled. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Buckets | Complete | 39 | S3 | Complete | 2026-07-04 | Bucket naming, Region, private defaults, prefixes as folder-like object keys, bucket settings, and cleanup documented. |
| Phase 7 - S3 and EC2 Instance Profile | S3 CLI Upload, Copy, and Manage Buckets | Complete | 40 | S3/CLI | Complete | 2026-07-04 | S3 CLI upload/copy/list workflows, s3api list-objects-v2 with prefix/fetch-owner/query, cp --recursive, and sync comparison documented. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Objects | Complete | 41 | S3 | Complete | 2026-07-04 | Object key, value/data, metadata, tags, prefixes, storage class, object properties, and head-object inspection documented. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Storage Classes | Complete | 42 | S3/Pricing | Theory-only | 2026-07-04 | Storage classes compared by access pattern, latency, retrieval behavior, durability/resiliency, minimum duration, and total cost tradeoffs. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Standard Storage Class | Complete | 43 | S3 | Theory-only | 2026-07-04 | S3 Standard documented as the default beginner-safe class for frequently accessed general-purpose objects. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Express One Zone | Complete | 44 | S3 | Theory-only | 2026-07-04 | Express One Zone documented as high-performance single-AZ storage for latency-sensitive data; hands-on deferred until directory buckets are covered. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Directory Buckets | Complete | 45 | S3 | Theory-only | 2026-07-04 | Directory buckets documented for S3 Express One Zone: hierarchical directories, zone-scoped naming, access model, and beginner no-casual-create rule. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Standard-IA and One Zone-IA | Complete | 46 | S3/Pricing | Theory-only | 2026-07-04 | Standard-IA and One Zone-IA compared for infrequent access, retrieval charges, minimum-duration risk, and multi-AZ versus single-AZ tradeoff. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Glacier Storage Class | Complete | 47 | S3/Glacier | Theory-only | 2026-07-04 | Glacier Instant Retrieval, Flexible Retrieval, and Deep Archive documented with archive use cases, restore expectations, and cleanup/cost cautions. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Lifecycle Policies | Complete | 48 | S3 | Complete | 2026-07-04 | Lifecycle transition and expiration rules documented with disabled JSON example, prefix filter, storage-class transitions, and cleanup commands. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Intelligent-Tiering | Complete | 49 | S3/Pricing | Theory-only | 2026-07-04 | Intelligent-Tiering documented for unknown or changing access patterns, automatic access tiers, monitoring charge, and optional archive tiers. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Data Protection and Durability | Complete | 50 | S3 | Theory-only | 2026-07-08 | S3 durability, availability, versioning, replication, Object Lock, backups, encryption, access controls, and delete-protection mindset documented. |
| Phase 7 - S3 and EC2 Instance Profile | Recover Deleted Files with S3 Versioning | Complete | 51 | S3 | Complete | 2026-07-08 | Versioning recovery workflow documented: enable versioning, upload versions, delete marker behavior, list object versions, recover by removing delete marker, and cleanup all versions. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Cross-Region Replication Lab | Complete | 52 | S3 | Complete | 2026-07-08 | CRR workflow documented with source/destination buckets, versioning requirement, IAM role concept, prefix/tag rules, asynchronous replication, and cost cleanup. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Object Lock | Complete | 53 | S3 | Theory-only | 2026-07-08 | Object Lock documented as WORM protection with versioning, retention modes, legal holds, governance versus compliance caution, and no-casual-create rule. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Security | Complete | 54 | S3/Security | Theory-only | 2026-07-08 | S3 security baseline documented: private by default, Block Public Access, least privilege, bucket policies, IAM policies, encryption, logging/monitoring, and Access Analyzer. |
| Phase 7 - S3 and EC2 Instance Profile | IAM vs Bucket Policies | Complete | 55 | S3/IAM | Complete | 2026-07-08 | IAM identity policies and S3 bucket resource policies compared, with same-account, cross-account, explicit deny, principal, action, resource, and condition examples documented. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Encryption | Complete | 56 | S3/Security | Complete | 2026-07-08 | S3 default encryption, SSE-S3, SSE-KMS, KMS permissions, bucket keys, object-level encryption headers, and verification commands documented. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Block Public Access | Complete | 57 | S3/Security | Complete | 2026-07-08 | S3 Block Public Access documented at account, bucket, and access point levels, including four settings, override behavior, safe checks, and beginner keep-enabled rule. |
| Phase 7 - S3 and EC2 Instance Profile | EC2 Instance Profile Hands-on | Complete | 35 | IAM/EC2/S3 | Complete | 2026-07-03 | EC2-to-S3 access with IAM role and instance profile documented, including trust policy, read-only S3 policy, temporary credentials, testing, and cleanup. |
| Phase 8 - Lambda and Serverless | What is AWS Lambda? | Complete | 58 | Lambda | Complete | 2026-07-11 | Lambda vs EC2, event-driven compute, short-lived tasks, scaling behavior, first function demo, and beginner decision rule documented. |
| Phase 8 - Lambda and Serverless | Write and Upload Lambda Function with CloudWatch Logs | Complete | 61 | Lambda/CloudWatch | Complete | 2026-07-11 | Python handler, inline and ZIP upload paths, test events, print/logging output, CloudWatch log groups, log streams, execution role permissions, and log cleanup documented. |
| Phase 8 - Lambda and Serverless | Lambda Cost and Memory Performance | Complete | 62 | Lambda/Pricing | Complete | 2026-07-11 | Request pricing, duration pricing, GB-second mental model, memory-to-CPU relationship, memory tuning, billed duration, and cost/performance tradeoff documented. |
| Phase 8 - Lambda and Serverless | Lambda Cold Start | Complete | 67 | Lambda | Complete | 2026-07-11 | Cold start vs warm start, execution environment initialization, package/runtime/VPC/init-code causes, CloudWatch `Init Duration`, and provisioned concurrency caution documented. |
| Phase 8 - Lambda and Serverless | Lambda Layers | Complete | 68 | Lambda | Complete | 2026-07-11 | Lambda layer purpose, ZIP structure, `/opt/python` import path, layer versions, sharing dependencies, package-size tradeoffs, and layer cleanup documented. |
| Phase 8 - Lambda and Serverless | Sensitive Configuration Data in Lambda | Complete | 69 | Lambda/Security | Complete | 2026-07-11 | Avoided hardcoded secrets, used environment variables for non-sensitive config, documented Secrets Manager/SSM pattern, IAM permission requirements, and no-secret-logging rule. |
| Phase 8 - Lambda and Serverless | Serverless Web API using Lambda and API Gateway | Complete | 59 | Lambda/API Gateway | Complete | 2026-07-12 | Built the API pattern with REST resources and methods, Lambda proxy events/responses, GET/POST foundations, JSON formatting, deployment-stage testing, and CloudWatch debugging; extended it in the Phase 10 Tasks API. |
| Phase 8 - Lambda and Serverless | Complete Serverless API with API Gateway, Lambda, DynamoDB | Complete | 65 | Lambda/API Gateway/DynamoDB | Complete | 2026-07-12 | Built a serverless Tasks CRUD API with DynamoDB, six Lambda handlers, boto3 operations, a shared configuration layer, API Gateway routes, a Lambda execution role, and a separate IAM user project policy. |
| Phase 8 - Lambda and Serverless | Handle Large Files in Lambda | Complete | 63 | Lambda | Complete | 2026-07-11 | Lambda ephemeral `/tmp` storage, 512 MB default, configurable storage up to 10 GB, large-file use cases, cost awareness, and safe processing patterns documented. |
| Phase 8 - Lambda and Serverless | Python Coding in AWS with boto3 | Complete | 64 | Python/boto3 | Complete | 2026-07-11 | boto3 setup, service clients, AWS API responses, S3 bucket listing, bucket Region lookup, profile credentials, and virtual environment workflow practised. |
| Phase 8 - Lambda and Serverless | Automate File Processing with S3 and Lambda | Complete | 66 | S3/Lambda | Complete | 2026-07-11 | S3 event notifications, object-created events, prefix/suffix filters, object-key extraction, CloudWatch logs, IAM, and cleanup documented. |
| Phase 9 - DynamoDB | Master AWS DynamoDB | Complete | 70 | DynamoDB | Complete | 2026-07-06 | DynamoDB as managed NoSQL database documented: tables, items, attributes, schemaless design outside keys, primary key requirement, on-demand table setup, and safe cleanup. |
| Phase 9 - DynamoDB | DynamoDB Data Types | Complete | 71 | DynamoDB | Theory-only | 2026-07-06 | Scalar, document, and set data types documented with CLI typed-JSON examples, number/string rules, empty-set warning, and item-size awareness. |
| Phase 9 - DynamoDB | DynamoDB Primary Key | Complete | 72 | DynamoDB | Complete | 2026-07-06 | Partition key, sort key, composite primary key, key schema, query pattern, and beginner table design lab documented. |
| Phase 9 - DynamoDB | Strong and Eventual Consistency | Complete | 73 | DynamoDB | Theory-only | 2026-07-06 | Eventually consistent reads, strongly consistent reads with ConsistentRead, GSI/stream limitations, global table consistency, and cost tradeoff documented. |
| Phase 10 - Final Project | Serverless Tasks CRUD API | Complete |  | API Gateway/Lambda/DynamoDB/IAM/CloudWatch | Complete | 2026-07-12 | Completed a six-function Tasks CRUD API with GET, POST, PUT, PATCH, and DELETE routes, a shared Lambda layer, formatted responses, DynamoDB conditions and pagination, separate runtime/user IAM policies, testing commands, notes, and cleanup guidance. |
