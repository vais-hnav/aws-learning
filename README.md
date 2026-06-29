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
| Phase 4 | EC2 basics | In progress |

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
├── 00-account-billing/
├── 01-iam/
├── 02-aws-cli/
├── 03-ec2/
├── 04-ec2-automation/
├── 05-ec2-storage-ebs/
├── 06-vpc-basics/
├── 07-s3/
├── 08-ec2-instance-profile-s3/
├── 09-lambda/
├── 10-dynamodb/
├── 11-final-project/
├── cleanup-guides/
├── notion-scripts/
├── aws-learning-log.md
└── aws-learning-plan.md
```

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
