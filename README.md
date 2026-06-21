# AWS Learning

This repo follows a video-to-lab learning loop:

1. Watch the video
2. Take short notes
3. Build a hands-on lab with Codex
4. Explain the commands and workflow
5. Debug if needed
6. Clean up AWS resources
7. Write notes
8. Commit the work
9. Sync progress to Notion

## Folder layout
The repo is organized by the revised phase plan, not by individual video number.

- `00-account-billing/`
- `01-iam/`
- `02-aws-cli/`
- `03-ec2/`
- `04-ec2-automation/`
- `05-ec2-storage-ebs/`
- `06-vpc-basics/`
- `07-s3/`
- `08-ec2-instance-profile-s3/`
- `09-lambda/`
- `10-dynamodb/`
- `11-final-project/`
- `cleanup-guides/`

Each phase folder can hold one or more lab folders, notes, scripts, and cleanup guides as the playlist moves forward.

## Current progress
- Phase 1 is complete.
- Phase 2 is next.

## Learning log
Use [`aws-learning-log.md`](./aws-learning-log.md) as the local source of truth for progress.

## Notion sync
This repo includes a sync helper for your live Notion tracker:

- [`scripts/sync-notion-tracker.mjs`](./scripts/sync-notion-tracker.mjs)
- [`scripts/watch-notion-tracker.mjs`](./scripts/watch-notion-tracker.mjs)

### Required environment variables
- `NOTION_TOKEN`
- `NOTION_DATABASE_ID`
- `LOG_PATH` is optional and defaults to `aws-learning-log.md`

### Local `.env`
If you create a local `.env` file in the repo root, the sync scripts will load it automatically.

### Example
```bash
npm run notion:sync
```

To keep Notion updated while you edit the learning log:
```bash
npm run notion:watch
```

Leave that command running in a terminal, and every save to `aws-learning-log.md` will sync into Notion.

## Safety rule
Never commit your Notion token to git.
