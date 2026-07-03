# AWS Learning Plan

> A phase-wise, beginner-safe AWS learning roadmap using YouTube for topics, Codex for labs, AWS for real practice, GitHub for proof, and cleanup habits to protect your money.

Playlist: https://www.youtube.com/playlist?list=PLoE0WgvMazmwyv78EAM_I39IWZtJ_lhtZ

Notion dashboard: https://sage-handstand-5f9.notion.site/3860514ccd8e80d6879cfae61295e5cd?v=3860514ccd8e807eaa71000cd24b45a0&source=copy_link

Last playlist check: `2026-06-29`

Live playlist count at last check: `73 videos`

Current learning position: `Phase 7 - S3 remaining videos 39-57`

Completed so far: `Phase 1`, `Phase 2`, `Phase 3`, `Phase 4 videos 15-23`, `Phase 5A videos 24-27`, `Phase 5B videos 28-33`, `Phase 6 videos 37-38`, and `Phase 7 videos 34-35`

## How To Use This Plan

This file is the visible source of truth for the learning path. Keep the phase plan stable. If the playlist changes, add new videos under `Playlist Updates` instead of rewriting the existing phase order.

For every video, follow this loop:

```text
Watch video
-> Build related lab
-> Ask Codex to explain the workflow
-> Debug with Codex
-> Clean up AWS resources
-> Write notes
-> Commit to GitHub when ready
-> Move to next video
```

Recommended learning split:

| Activity | Time |
|---|---:|
| Watching | 30% |
| Hands-on building | 50% |
| Explanation and notes | 20% |

Definition of done for a video:

| Check | Meaning |
|---|---|
| Watched | The video topic is understood at a beginner level. |
| Built | A related lab was completed, or a theory-only safety review was done. |
| Explained | Commands, code, and AWS workflow make sense. |
| Cleaned | AWS resources were deleted, or no resources were created. |
| Documented | Notes and repo files were updated. |

## Learning Philosophy

| Source | Role |
|---|---|
| YouTube | Introduces the topic and shows the instructor workflow. |
| Codex | Turns the topic into a safe lab, explains commands, and helps debug. |
| AWS | Gives real practice with real services. |
| GitHub | Proves progress through notes, commands, and cleanup docs. |
| Cleanup | Prevents surprise bills and builds professional habits. |

## Repository Map

```text
aws-learning/
├── phase-01-aws-foundation/
├── phase-02-iam/
├── phase-03-aws-cli-automation/
├── phase-04-ec2-basics/
│   └── ec2-cli-automation/
├── phase-05-ec2-pricing-storage-ebs/
│   ├── phase-5a-ec2-pricing-models/
│   └── phase-5b-ebs-storage/
├── phase-06-vpc-scalability/
├── phase-07-s3-ec2-instance-profile/
│   ├── phase-7a-s3-basics/
│   ├── phase-7b-s3-storage-lifecycle/
│   ├── phase-7c-s3-data-protection-security/
│   └── phase-7d-ec2-instance-profile-s3/
├── phase-08-lambda-serverless/
│   ├── phase-8a-lambda-basics-operations/
│   ├── phase-8b-serverless-app-patterns/
│   └── phase-8c-python-file-processing/
├── phase-09-dynamodb/
├── phase-10-final-project/
├── cleanup-guides/
├── aws-learning-log.md
└── aws-learning-plan.md
```

Recommended lab folder shape:

```text
phase-folder/
└── topic-lab-name/
    ├── README.md
    ├── commands.md
    ├── explanation.md
    ├── cleanup.md
    └── mistakes.md
```

Each lab `README.md` should answer:

| Question | Purpose |
|---|---|
| What did I build? | Shows the outcome clearly. |
| Which AWS service did I use? | Connects the lab to AWS service knowledge. |
| What did I learn? | Captures the concept in plain language. |
| How do I run it? | Makes the lab repeatable. |
| How do I delete it? | Protects against unwanted AWS cost. |

## Phase Overview

| Phase | Status | Main topic | Videos | Primary proof |
|---|---|---|---|---|
| 1 | Complete | Account, billing, regions, Free Tier | 1-7, 19, 60 | Account safety docs |
| 2 | Complete | IAM users, groups, policies, roles | 8-11, 14 | IAM notes and policies |
| 3 | Complete | AWS CLI, profiles, scripts | 12, 13, 36 | CLI scripts and command notes |
| 4 | Complete | EC2 basics and safe web server lab | 15-18, 20-23 | EC2 labs and cleanup proof |
| 5A | Complete | EC2 pricing models | 24-27 | Pricing notes and cost-safety decisions |
| 5B | Complete | EBS storage | 28-33 | EBS labs, mount workflow, and cleanup proof |
| 6 | Complete | VPC basics and scalability | 37-38 | Default VPC inspection |
| 7 | In progress | S3 and EC2 instance profile | 34, 35, 39-57 | S3 labs and IAM access proof |
| 8 | Not started | Lambda and serverless | 58, 59, 61-69 | Lambda/API/S3 trigger labs |
| 9 | Not started | DynamoDB | 70-72 plus update video 73 | DynamoDB data model and CRUD |
| Final | Not started | Portfolio project | Combined services | Final project docs |

## Phase 1 - AWS Foundation

Goal: Set up a safe AWS account and understand the basic cloud vocabulary before creating resources.

Videos:

| Video | Topic |
|---:|---|
| 1 | AWS Full Course |
| 2 | What is Cloud Computing? |
| 3 | IaaS, PaaS, and SaaS |
| 4 | Introduction to AWS |
| 5 | Create Free Tier AWS Account |
| 6 | Set up MFA for the root user |
| 7 | AWS Regions and Availability Zones |
| 19 | Billing basics and zero-cost budget |
| 60 | AWS Free Tier account changes in 2026 |

Build:

- Account safety checklist
- Root account safety checklist
- MFA checklist
- Billing alert setup
- AWS Budget setup
- Region selection notes
- Free-tier safety rules
- Services to avoid for now
- Cleanup and safety checklist

Safety gate:

```text
Do not continue beyond Phase 1 unless MFA is enabled,
billing alert is created, budget is created,
the region concept is understood, and the learning repo exists.
```

## Phase 2 - IAM

Goal: Understand AWS identity, permissions, policies, users, groups, and roles.

Videos:

| Video | Topic |
|---:|---|
| 8 | Introduction to IAM |
| 9 | Creating IAM Policies |
| 10 | Creating IAM User |
| 11 | Creating IAM Groups |
| 14 | IAM Roles |

Build:

- IAM beginner lab
- IAM user notes
- IAM group notes
- IAM policy examples
- Read-only S3 policy
- Read-only EC2 policy
- IAM role explanation
- IAM cleanup checklist

Safety rules:

- Avoid the root account for daily work.
- Prefer least privilege permissions.
- Do not commit access keys, secret keys, passwords, or MFA backup codes.

## Phase 3 - AWS CLI And Automation Basics

Goal: Use AWS from the terminal and understand profiles, commands, scripting, and common credential errors.

Videos:

| Video | Topic |
|---:|---|
| 12 | How to use AWS CLI |
| 13 | AWS CLI and PowerShell real-world example |
| 36 | Convert AWS Console actions to CLI code with AI |

Build:

- AWS CLI setup notes
- Profile switching notes
- CLI account checker script
- IAM user ARN listing script
- Python boto3 script
- PowerShell script notes
- Common AWS CLI errors
- Command reference

Safety rules:

- Do not keep a real `.aws` folder inside this repo.
- Use the default AWS CLI location in your home directory.
- Store examples or placeholders only, never real credentials.

## Phase 4 - EC2 Basics

Goal: Understand EC2, launch a beginner-safe Linux instance, connect to it, host a small website, and clean it up.

Videos:

| Video | Topic |
|---:|---|
| 15 | Introduction to AWS EC2 Service |
| 16 | Create a Linux EC2 instance |
| 17 | Host a simple website in Linux EC2 |
| 18 | Create EC2 instances using AWS CLI |
| 20 | EC2 Instance Connect |
| 21 | How EC2 instance pricing is calculated |
| 22 | Choose the right EC2 instance |
| 23 | EC2 cost optimization |

Build:

- EC2 introduction lab
- Linux EC2 launch lab
- EC2 Instance Connect lab
- Simple Apache website lab
- EC2 CLI automation lab in `phase-04-ec2-basics/ec2-cli-automation/`
- EC2 pricing notes in `phase-04-ec2-basics/ec2-pricing/`
- EC2 instance type selection notes in `phase-04-ec2-basics/ec2-instance-selection/`
- EC2 cost optimization notes in `phase-04-ec2-basics/ec2-cost-optimization/`
- EC2 cleanup checklist

Safety rules:

- Use Free Tier eligible instance types where available.
- Stop or terminate instances when done.
- Check EBS volumes and Elastic IPs after cleanup.
- Do not open SSH to the whole internet unless the lab specifically requires it and cleanup is immediate.

Next checkpoint:

```text
Start Phase 5 with Video 24 next.
Before moving on, confirm all practice EC2 instances are stopped or terminated.
Do not purchase Savings Plans, Reserved Instances, Dedicated Hosts, or Dedicated Instances during beginner practice.
```

## Phase 5 - EC2 Pricing And Storage/EBS

Goal: Understand EC2 pricing models and safely practice EBS storage workflows.

### Phase 5A - EC2 Pricing Models

Goal: Understand EC2 purchasing options without buying any long-term or expensive commitment.

Videos:

| Video | Topic | Hands-on mode |
|---:|---|---|
| 24 | EC2 Savings Plans | Theory only |
| 25 | EC2 Spot Instances | Theory or safe observation |
| 26 | Dedicated Host | Theory only |
| 27 | Dedicated Instance | Theory only |

Build:

- Savings Plans theory notes
- Spot Instances theory notes
- Dedicated Host theory notes
- Dedicated Instance theory notes
- Beginner pricing comparison table

Safety rules:

- Videos 24-27 are required, but do not perform expensive paid hands-on work for them.
- Do not purchase Savings Plans.
- Do not create Dedicated Hosts.
- Do not create Dedicated Instances.

### Phase 5B - EBS Storage

Goal: Learn EC2 storage choices and safely practice EBS volume workflows.

Videos:

| Video | Topic | Hands-on mode |
|---:|---|---|
| 28 | EC2 storage options: EBS, S3, EFS | Notes and comparison |
| 29 | IOPS, throughput, and latency | Notes and comparison |
| 30 | EBS volumes hands-on lab | Safe lab |
| 31 | Format and mount EBS volumes in Linux | Safe lab |
| 32 | EBS volume types | Notes and comparison |
| 33 | EBS snapshots | Safe lab with cleanup |

Build:

- EBS volume lab
- Format and mount EBS lab
- EBS volume type notes
- EBS snapshot lab
- EBS cleanup checklist

Safety rules:

- Keep test EBS volumes small.
- Delete EBS volumes and snapshots after hands-on labs.

## Phase 6 - VPC And Scalability

Goal: Understand the default network environment around EC2 and the basic idea of scaling.

Videos:

| Video | Topic |
|---:|---|
| 37 | VPC and Security Groups |
| 38 | Vertical and Horizontal Scalability |

Build:

- Default VPC inspection
- Subnet notes
- Route table notes
- Security group notes
- Vertical scaling notes
- Horizontal scaling notes

Safety rules:

- Start with inspection-only networking labs.
- Do not delete the default VPC while learning.

## Phase 7 - S3 Full Section And EC2 Instance Profile

Goal: Learn S3 storage, S3 CLI workflows, S3 cost controls, S3 protection, and safe EC2-to-S3 access using an instance profile.

### Phase 7A - S3 Basics

| Video | Topic |
|---:|---|
| 34 | S3 cloud storage hands-on lab |
| 39 | S3 buckets |
| 40 | S3 CLI upload, copy, and manage buckets |
| 41 | S3 objects |

### Phase 7B - S3 Storage Classes And Lifecycle

| Video | Topic |
|---:|---|
| 42 | S3 storage classes |
| 43 | S3 Standard |
| 44 | S3 Express One Zone |
| 45 | S3 Directory Buckets |
| 46 | S3 Standard-IA and One Zone-IA |
| 47 | S3 Glacier |
| 48 | S3 lifecycle policies |
| 49 | S3 Intelligent-Tiering |

### Phase 7C - S3 Data Protection And Security

| Video | Topic |
|---:|---|
| 50 | S3 data protection and durability |
| 51 | S3 versioning recovery lab |
| 52 | S3 cross-region replication lab |
| 53 | S3 Object Lock |
| 54 | S3 security |
| 55 | IAM vs bucket policies |
| 56 | S3 encryption |
| 57 | S3 Block Public Access |

### Phase 7D - EC2 Instance Profile With S3

| Video | Topic |
|---:|---|
| 35 | EC2 Instance Profile hands-on |

Build:

- Basic S3 bucket lab
- S3 CLI upload/copy/list lab
- S3 object notes
- S3 lifecycle lab
- S3 versioning lab
- S3 security lab
- S3 bucket policy examples
- EC2 instance profile S3 lab
- S3 cleanup checklist

Safety rules:

- Keep S3 Block Public Access enabled unless a lab explicitly teaches public hosting.
- Delete test objects and buckets.
- Be careful with replication and Object Lock because they can create extra cost or make deletion harder.

## Phase 8 - Lambda And Serverless

Goal: Learn Lambda basics, CloudWatch logs, API Gateway, S3 triggers, boto3, and serverless cost/performance concepts.

### Phase 8A - Lambda Basics And Operations

| Video | Topic |
|---:|---|
| 58 | What is AWS Lambda? |
| 61 | Write and upload a Lambda function, view CloudWatch logs |
| 62 | Lambda cost and memory performance |
| 67 | Lambda cold start |
| 68 | Lambda layers |
| 69 | Sensitive/configuration data in Lambda |

### Phase 8B - Serverless App Patterns

| Video | Topic |
|---:|---|
| 59 | Serverless Web API using Lambda and API Gateway |
| 65 | Complete serverless API with API Gateway, Lambda, and DynamoDB |

### Phase 8C - Python And File Processing

| Video | Topic |
|---:|---|
| 63 | Handle large files in Lambda |
| 64 | Python coding in AWS with boto3 |
| 66 | S3 and Lambda file processing trigger |

Build:

- Basic Lambda and CloudWatch lab
- Lambda cost notes
- Lambda memory/performance notes
- API Gateway and Lambda web API lab
- S3 file processor Lambda lab
- boto3 notes
- Lambda layers notes
- Lambda environment variable notes
- Lambda cleanup checklist

Safety rules:

- Delete test Lambda functions, API Gateway APIs, and CloudWatch log groups when labs are done.
- Avoid leaving public APIs active longer than needed.

## Phase 9 - DynamoDB

Goal: Understand NoSQL basics, DynamoDB data modeling, primary keys, and safe CLI/Python operations.

Videos:

| Video | Topic |
|---:|---|
| 70 | Master AWS DynamoDB |
| 71 | DynamoDB data types |
| 72 | DynamoDB primary key |

Build:

- DynamoDB table notes
- DynamoDB data types notes
- Partition key and sort key notes
- CLI CRUD commands
- Python boto3 CRUD script
- DynamoDB cleanup checklist

Safety rules:

- Use small test tables only.
- Prefer on-demand mode for beginner labs unless the video specifically explains provisioned capacity.
- Delete test tables after practice.

## Final Project

Goal: Combine the services into portfolio-ready projects with clear GitHub proof.

Project options:

| Project | Services |
|---|---|
| Serverless file processing pipeline | S3, Lambda, IAM, CloudWatch |
| Serverless notes API | API Gateway, Lambda, DynamoDB, IAM, CloudWatch |

Final project docs:

- Architecture explanation
- Deployment commands
- Cleanup commands
- Cost safety notes
- Mistakes and debugging notes
- Screenshots or proof notes

Safety rules:

- Every final project must include a cleanup guide before deployment.
- Do not leave public endpoints, buckets, Lambda functions, or DynamoDB tables running after practice unless intentionally maintained.

## Playlist Updates

This section is for playlist drift only. It preserves the original plan while still tracking newly added videos.

Last checked against the live playlist on `2026-06-29`.

Current live playlist count: `73 videos`.

New/unmapped video found:

| Video | Title | Recommended placement |
|---:|---|---|
| 73 | Strong and Eventual Consistency | Phase 9 DynamoDB add-on after the primary key video |

Suggested add-on lab:

- Understand strong consistency vs eventual consistency.
- Review where consistency matters in read-heavy systems.
- Use DynamoDB read operations only if the lab can stay low-cost.
- Delete any test table after practice.

<details>
<summary>Live playlist snapshot from 2026-06-29</summary>

1. AWS Full Course | Cloud Computing | Beginner Friendly - `PIvHBc1OpzM` - 9:53
2. What is Cloud Computing? Simple explanation | AWS Tutorial for Beginners - `n7KkgOSVD9U` - 28:02
3. What is IaaS Paas and SaaS | Different Models of Cloud Computing | AWS Tutorial - `QjeP9Y_Wde0` - 7:42
4. Introduction to AWS - AWS Cloud programing Tutorial for Beginners - `UBAtp_5fk64` - 17:43
5. Create free tier AWS Account | AWS Cloud Computing tutorial for beginner | AWS Account - `sUJXT_x81Ik` - 40:37
6. How to setup MFA to Root user - AWS Cloud programming Tutorial for Beginners - `S3Ql0aGmn5o` - 17:10
7. AWS Regions and Availability zones - AWS cloud programming Tutorial for beginners - `cQqK3aNpzgU` - 21:22
8. Introduction to IAM | Identity and Access Management | AWS Tutorial for beginners - `01IqvzULasA` - 30:55
9. Creating IAM Policies - AWS Cloud computing tutorial for beginners - `NPk6DeP5u0Q` - 1:15:13
10. Creating IAM User - AWS cloud computing Tutorial for Beginners - `rjiN-mVYaIk` - 32:07
11. Creating IAM Groups - AWS IAM - AWS cloud computing tutorial for beginners - `XzAVmj3crBA` - 21:45
12. How to use AWS CLI - AWS cloud computing Tutorial for Beginners - `6FS3cV7Js6s` - 44:09
13. Simplify AWS Management with the CLI & PowerShell: A Real-World Example - AWS Tutorial - `DeMUHEi-xGM` - 33:00
14. IAM Roles - AWS Cloud computing Tutorial for beginners - `PQtNTqWb9aw` - 54:05
15. Introduction to AWS EC2 Service - AWS Tutorial for beginners - Create EC2 Instance - `WbOXSkfhz08` - 43:09
16. How to create Linux EC2 instance - AWS Cloud Computing Tutorial for beginners - `ZCRcb8MhCo4` - 19:45
17. Host a simple website in Linux EC2 instance - Step by Step - AWS Tutorial for beginners - `9LNwpADZpPs` - 12:35
18. Create EC2 Instances using AWS CLI - AWS Tutorial for beginners - AWS Automation - `pV6DlIToTJg` - 24:54
19. AWS Billing Basics: Manage Costs & Setup zero cost Budget - AWS Tutorial for beginners - `H_aOsSkiu-c` - 20:20
20. EC2 instance connect - Easy way to connect Linux EC2 instances - AWS Tutorial for beginners - `UDe4cNVL5qw` - 5:51
21. How EC2 instance pricing is calculated - AWS Tutorial for beginners - `r-DBhPrLBDI` - 10:23
22. How to Choose the Right AWS EC2 Instance | AWS Tutorial Series - `88AMvLN5YnU` - 28:03
23. Save 90% on AWS EC2 Bills! | AWS Tutorial | AWS Cost Optimization - `oYCpwZpGSPI` - 12:25
24. AWS EC2 Savings Plans & Save Big - `jEXSUR6-Gjw` - 36:24
25. AWS EC2 Spot Instances Explained | Cost Optimization - `8Bkl3ujqtVA` - 14:06
26. What is an AWS Dedicated Host? - `b2k7uiyuHQ0` - 14:26
27. What is an AWS Dedicated Instance? - `0-Q9E-cKiaY` - 8:35
28. AWS EC2 Storage Options | EBS, S3, EFS | AWS Cloud Computing Tutorial - `i-PQY0q1UcM` - 16:17
29. AWS Storage Performance: IOPS vs Throughput vs Latency | AWS Cloud Computing Tutorial - `oiaJG-LqoQg` - 12:48
30. AWS EC2 EBS Volumes Hands-on Lab | AWS Tutorial - `TqwxCivSRR8` - 22:23
31. How to Format & Mount EBS Volumes in Linux | AWS Tutorial - `GSVZEd_oY6Y` - 17:48
32. AWS EBS Volume Types: SSD vs HDD Explained | AWS Tutorial - `GKIfQbcbDQA` - 26:17
33. How to Create EBS Snapshots | AWS Tutorial - `29bblhLqXr8` - 18:40
34. AWS S3 Cloud Storage Hands-on Lab | AWS Tutorial - `ROiD7_m8qVw` - 31:06
35. AWS EC2 Instance Profile Hands-on | AWS Tutorial - `K6CSfT_AMOU` - 17:50
36. Convert AWS Console Actions to CLI Code with AI! | AWS Tutorial | Amazon Q - `Vp2zu5NR7WA` - 7:52
37. AWS Networking Basics: VPC & Security Groups | AWS Tutorial - `aF9Ydv_xOhw` - 42:54
38. What is Scalability? Vertical and Horizontal Scalability | AWS Tutorial for beginners - `-HQGNxWzyys` - 14:48
39. AWS S3 Buckets | AWS Data Storage - `JzUFlJv-ARc` - 38:40
40. AWS S3 CLI Tutorial: Upload, Copy & Manage Buckets - `Wt-glWBk0k4` - 35:48
41. What are AWS S3 Objects? Tutorial for Beginners - `jMCS3-m7PrY` - 24:34
42. Save 70% on AWS S3! S3 Storage Classes Explained | AWS Tutorial - `t28nI2JXmT0` - 26:35
43. AWS S3 Standard storage class | S3 cost optimisation | AWS Tutorial for beginners - `-GACt0sTw-A` - 23:10
44. AWS S3 Express one zone storage class | S3 Cost optimization | AWS Tutorial for Beginners - `RYy6cy-lNbw` - 36:34
45. S3 Directory Buckets AWS Tutorial for beginners - `-L0rZCvSxfk` - 22:18
46. AWS S3 Standard IA storage class | One Zone IA | AWS Tutorial for beginners - `wCaVgnBQOCY` - 33:26
47. AWS S3 Glacier Storage Class | Cold Data, Pricing, Demo | AWS Tutorial for beginners - `n_D9gyn62f8` - 36:02
48. AWS S3 Life cycle Policies | AWS Cloud computing Tutorial for beginners - `iivWM0I_w3s` - 38:52
49. AWS S3 Intelligent-Tiering Explained + Demo | AWS Tutorial for beginners - `mRpoV1z26xI` - 21:27
50. S3 Data Protection | S3 Durability | AWS Cloud Computing Tutorial for beginners - `C-UM58DYvrM` - 13:00
51. Recover Deleted Files in AWS S3: Versioning Lab | AWS Tutorial | Cloud Computing - `SbuXG6wb8lA` - 20:56
52. AWS S3 Cross-Region Replication Lab | AWS Tutorial | S3 Data Protection - `IcSBuPfdWIg` - 27:10
53. What is AWS S3 Object Lock? | AWS Tutorial - `450zOQV5hn8` - 29:48
54. AWS S3 Security | AWS Cloud Tutorial for beginners - `sDXtfgCm05k` - 8:16
55. How to Control AWS S3 Access: IAM vs Bucket Policies | AWS Tutorial - `FlF1-c-kiyU` - 19:53
56. How to Secure AWS S3 Buckets with Encryption | AWS Tutorial - `-FsMLHbYA58` - 15:46
57. AWS S3 Block Public Access Tutorial | S3 Security - `BdQMd8XHwo8` - 13:15
58. What is AWS Lambda | AWS Tutorial for beginners - `IhL0OD7S7Jk` - 29:15
59. Create Serverless Web API using Lambda and API Gateway | AWS Tutorial for beginners - `vjw-Ek_Fp-s` - 25:02
60. How to create AWS Free tier account in 2026 | Changes in AWS free tier account - `ncIrYtzo6Bo` - 9:39
61. How to Write & Upload Lambda function | View Cloudwatch logs from Lambda | AWS Tutorial - `MdEeK_dp1yE` - 11:21
62. How lambda cost works | How to improve performance by setting memory | AWS Tutorial - `ieIUk8r_1W8` - 17:35
63. How to Handle Large Files in AWS Lambda | AWS Cloud Tutorial - `1UrmHDr_Asw` - 5:03
64. Python Coding in AWS | Boto3 Tutorial - `4ySMANFcPEk` - 13:49
65. Build a Complete Serverless Web API | AWS Tutorial | API Gateway + Lambda + DynamoDB - `QHFcri7NZ5E` - 19:07
66. Automate File Processing with S3 & Lambda | S3 Lambda Trigger - `o3RHXJ3DHpk` - 17:22
67. AWS Lambda Cold Start Explained with Demo | How to Fix & Avoid Cold Start | AWS Tutorial - `7PZKSLQGC6w` - 16:09
68. Master AWS Lambda Layers | AWS Tutorial for beginners | Cloud Computing - `lATYOmxv93w` - 9:57
69. How to use sensitive or configuration data in Lambda | AWS Best Practice - `mRdAFj-PGV4` - 6:21
70. Master AWS DynamoDB | AWS Tutorial | NoSQL Database - `ZYiWxDjtpwQ` - 18:29
71. AWS DynamoDB Data Types Explained | String, Number, Set, List, Map | AWS Tutorial - `qaUyt8VOu5Y` - 16:35
72. AWS Dynamo DB Primary Key | Partition Key | Sort Key | Composite Primary Key - `nc7Z8fWmF6s` - 10:52
73. Strong and Eventual Consistency | AWS Tutorial | Distributed System Design - `srxP4YsSL90` - 10:12

</details>

## Safety Rules That Apply To Every Phase

- Keep MFA enabled.
- Keep budgets and billing alerts active.
- Use IAM users or roles for learning, not the root account.
- Use the intended AWS region consistently.
- Prefer Free Tier eligible resources where available.
- Delete resources after practice.
- Never commit real credentials.
- If a topic can create meaningful cost, treat it as theory-only until you intentionally choose a paid experiment.

## GitHub Proof Checklist

Before marking a phase complete, make sure the repo has:

- Phase notes
- Lab README files
- Commands used
- Explanation of what happened
- Cleanup checklist
- Mistakes or debugging notes
- AWS learning log update

## Notion Tracker Alignment

The Notion tracker should mirror this plan:

- One row per video or lab topic
- Group by Phase
- Keep rows in the same order as the plan
- Video topic
- Watched status
- AWS service
- Lab status
- Date
- Notes

GitHub remains the proof source. Notion is the live dashboard.

[![Open Notion Dashboard](https://img.shields.io/badge/Open-Notion%20Dashboard-black?logo=notion&logoColor=white)](https://sage-handstand-5f9.notion.site/3860514ccd8e80d6879cfae61295e5cd?v=3860514ccd8e807eaa71000cd24b45a0&source=copy_link)
