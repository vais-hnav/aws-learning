# AWS Learning

A hands-on AWS learning repository built around a video-to-lab workflow. Each phase converts playlist topics into practical AWS labs, notes, cleanup guides, and GitHub proof of progress.

[![Open Notion Dashboard](https://img.shields.io/badge/Notion-Progress%20Dashboard-black?logo=notion&logoColor=white)](https://sage-handstand-5f9.notion.site/3860514ccd8e80d6879cfae61295e5cd?v=3860514ccd8e807eaa71000cd24b45a0&source=copy_link)

## Roadmap

| Resource | Description |
|---|---|
| [`aws-learning-plan.md`](./aws-learning-plan.md) | Phase-wise roadmap, playlist mapping, safety gates, and project plan |
| [`aws-learning-log.md`](./aws-learning-log.md) | Progress log for completed videos, labs, notes, and cleanup |
| [Notion Dashboard](https://sage-handstand-5f9.notion.site/3860514ccd8e80d6879cfae61295e5cd?v=3860514ccd8e807eaa71000cd24b45a0&source=copy_link) | Live progress tracker synced with the learning log |

## Current Progress

| Phase | Topic | Status |
|---|---|---|
| Phase 1 | Account, billing, budget, regions, Free Tier | Complete |
| Phase 2 | IAM users, groups, policies, roles | Complete |
| Phase 3 | AWS CLI, profiles, scripts, automation basics | Complete |
| Phase 4 | EC2 basics | Complete |
| Phase 5A | EC2 pricing models | Complete |
| Phase 5B | EBS storage | Complete |
| Phase 6 | VPC and scalability | Complete |
| Phase 7 | S3 and EC2 instance profile | Complete |
| Phase 9 | DynamoDB | Open / current videos 70-73 complete out of order |

## Learning Workflow

```text
Watch video
-> Build lab
-> Understand commands and workflow
-> Debug
-> Clean up AWS resources
-> Document notes
-> Commit progress
-> Sync tracker
```

## Repository Structure

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
├── notion-scripts/
├── aws-learning-log.md
└── aws-learning-plan.md
```

Top-level learning folders are named by phase so the repo matches the roadmap and Notion tracker.

## Lab Format

Most labs follow this structure:

```text
lab-name/
├── README.md
├── commands.md
├── explanation.md
├── cleanup.md
└── mistakes.md
```

## Local Setup

AWS CLI profile:

```bash
aws configure --profile aws-learning
```

Verify the active AWS identity:

```bash
AWS_PROFILE=aws-learning aws sts get-caller-identity
```

## Notion Sync

The repo includes helper scripts for syncing the local learning log with the Notion tracker.

Dashboard link: [AWS Learning Notion Dashboard](https://sage-handstand-5f9.notion.site/3860514ccd8e80d6879cfae61295e5cd?v=3860514ccd8e807eaa71000cd24b45a0&source=copy_link)

Required environment variables:

| Variable | Purpose |
|---|---|
| `NOTION_TOKEN` | Notion integration token |
| `NOTION_DATABASE_ID` | Target tracker database |
| `LOG_PATH` | Optional path to the learning log |

Run a one-time sync:

```bash
npm run notion:sync
```

Watch the learning log and sync on changes:

```bash
npm run notion:watch
```

## Safety Baseline

Every lab includes cleanup guidance. AWS credentials and local environment files are excluded from version control.
