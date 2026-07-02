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

Current status: Phase 1, Phase 2, Phase 3, Phase 4, Phase 5A, Phase 5B, and Phase 7 videos 34-35 are complete. Phase 6 is next.

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
| Phase 6 - VPC and Scalability | VPC and Security Groups | Not started | 37 | VPC/EC2 | Not started |  | Default VPC inspection and security group notes. |
| Phase 6 - VPC and Scalability | Vertical and Horizontal Scalability | Not started | 38 | Scalability | Theory-only |  | Scaling concept notes. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Cloud Storage Hands-on Lab | Complete | 34 | S3 | Complete | 2026-07-03 | Private S3 bucket/object workflow documented: create bucket, upload object, list, download, copy, delete objects, delete bucket, and keep Block Public Access enabled. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Buckets | Not started | 39 | S3 | Not started |  | Bucket concepts and setup. |
| Phase 7 - S3 and EC2 Instance Profile | S3 CLI Upload, Copy, and Manage Buckets | Not started | 40 | S3/CLI | Not started |  | S3 CLI workflow. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Objects | Not started | 41 | S3 | Not started |  | Object, key, metadata, and storage basics. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Storage Classes | Not started | 42 | S3/Pricing | Theory-only |  | Storage class cost comparison. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Standard Storage Class | Not started | 43 | S3 | Theory-only |  | S3 Standard use cases. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Express One Zone | Not started | 44 | S3 | Theory-only |  | High-performance S3 storage class notes. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Directory Buckets | Not started | 45 | S3 | Theory-only |  | Directory bucket concept notes. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Standard-IA and One Zone-IA | Not started | 46 | S3 | Theory-only |  | Infrequent access storage class notes. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Glacier Storage Class | Not started | 47 | S3/Glacier | Theory-only |  | Cold storage and retrieval cost notes. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Lifecycle Policies | Not started | 48 | S3 | Not started |  | Lifecycle policy lab. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Intelligent-Tiering | Not started | 49 | S3 | Theory-only |  | Intelligent-Tiering behavior and cost notes. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Data Protection and Durability | Not started | 50 | S3 | Theory-only |  | Durability and protection concepts. |
| Phase 7 - S3 and EC2 Instance Profile | Recover Deleted Files with S3 Versioning | Not started | 51 | S3 | Not started |  | Versioning recovery lab. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Cross-Region Replication Lab | Not started | 52 | S3 | Not started |  | Replication lab with cost awareness. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Object Lock | Not started | 53 | S3 | Theory-only |  | Object Lock concept and deletion impact. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Security | Not started | 54 | S3/Security | Theory-only |  | S3 security overview. |
| Phase 7 - S3 and EC2 Instance Profile | IAM vs Bucket Policies | Not started | 55 | S3/IAM | Not started |  | Access control comparison and policy lab. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Encryption | Not started | 56 | S3/Security | Not started |  | Encryption settings lab. |
| Phase 7 - S3 and EC2 Instance Profile | S3 Block Public Access | Not started | 57 | S3/Security | Not started |  | Public access safety lab. |
| Phase 7 - S3 and EC2 Instance Profile | EC2 Instance Profile Hands-on | Complete | 35 | IAM/EC2/S3 | Complete | 2026-07-03 | EC2-to-S3 access with IAM role and instance profile documented, including trust policy, read-only S3 policy, temporary credentials, testing, and cleanup. |
| Phase 8 - Lambda and Serverless | What is AWS Lambda? | Not started | 58 | Lambda | Theory-only |  | Lambda concepts and serverless basics. |
| Phase 8 - Lambda and Serverless | Serverless Web API using Lambda and API Gateway | Not started | 59 | Lambda/API Gateway | Not started |  | API Gateway and Lambda lab. |
| Phase 8 - Lambda and Serverless | Write and Upload Lambda Function with CloudWatch Logs | Not started | 61 | Lambda/CloudWatch | Not started |  | Basic Lambda deployment and log viewing. |
| Phase 8 - Lambda and Serverless | Lambda Cost and Memory Performance | Not started | 62 | Lambda/Pricing | Theory-only |  | Lambda pricing and memory tuning notes. |
| Phase 8 - Lambda and Serverless | Handle Large Files in Lambda | Not started | 63 | Lambda | Theory-only |  | Lambda limits and file processing patterns. |
| Phase 8 - Lambda and Serverless | Python Coding in AWS with boto3 | Not started | 64 | Python/boto3 | Not started |  | boto3 scripting practice. |
| Phase 8 - Lambda and Serverless | Complete Serverless API with API Gateway, Lambda, DynamoDB | Not started | 65 | Lambda/API Gateway/DynamoDB | Not started |  | Full serverless API lab. |
| Phase 8 - Lambda and Serverless | Automate File Processing with S3 and Lambda | Not started | 66 | S3/Lambda | Not started |  | S3 event trigger lab. |
| Phase 8 - Lambda and Serverless | Lambda Cold Start | Not started | 67 | Lambda | Theory-only |  | Cold start concept and mitigation notes. |
| Phase 8 - Lambda and Serverless | Lambda Layers | Not started | 68 | Lambda | Not started |  | Layer packaging lab. |
| Phase 8 - Lambda and Serverless | Sensitive Configuration Data in Lambda | Not started | 69 | Lambda/Security | Not started |  | Environment/configuration safety lab. |
| Phase 9 - DynamoDB | Master AWS DynamoDB | Not started | 70 | DynamoDB | Not started |  | DynamoDB basics and table concepts. |
| Phase 9 - DynamoDB | DynamoDB Data Types | Not started | 71 | DynamoDB | Theory-only |  | Data type notes. |
| Phase 9 - DynamoDB | DynamoDB Primary Key | Not started | 72 | DynamoDB | Not started |  | Partition key and sort key lab. |
| Phase 9 - DynamoDB | Strong and Eventual Consistency | Not started | 73 | DynamoDB | Theory-only |  | Playlist update video; consistency model notes. |
