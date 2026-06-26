# Phase 1: AWS Basics, Account, Billing, Regions

This phase covers the first safety setup videos in the playlist.

## What did I build?
I built a beginner-safe AWS setup checklist for my account.

This phase is about protecting my AWS account before I start deeper hands-on work.

## Which AWS services did I use?
- AWS Billing
- AWS Budgets
- IAM
- SNS or CloudWatch, if billing alerts use a notification target

## What did I learn?
- The root account should be used only when absolutely needed.
- MFA adds a second lock to the account.
- Billing alerts warn me when spending starts to move.
- AWS Budgets help me set a spending limit.
- Region choice matters because AWS services run in a specific location.
- Free Tier still needs care because some services can cost money.

## Do not continue until these are done
- MFA is enabled
- Billing alert is created
- Budget is created
- Region concept is understood
- Learning repo is created

## Root account safety checklist
- Use the root account only for account-level setup.
- Do not create everyday resources with the root account.
- Turn on MFA right away.
- Save the account recovery details in a safe place.
- Do not share the root password.
- Do not use the root account for daily practice.

## IAM/admin user note
- Create or use a normal IAM admin user for daily learning.
- Keep the root user only for account-level tasks like billing and MFA setup.

## MFA checklist
- Sign in as the root user.
- Open the security settings for the root account.
- Turn on MFA.
- Keep the backup codes in a safe place.
- Test that the second sign-in step works.
- Never remove MFA after setting it up.

## Billing alert setup
Billing alerts help me notice spending early.

Simple idea:
- I turn on billing notifications.
- I create an alert so AWS can warn me when charges appear.
- I connect the alert to email or another notification target.

What to check:
- Billing alerts are enabled in the account.
- The alert threshold is low enough to catch small charges.
- The alert destination works.

## AWS Budget setup
AWS Budgets help me set a money limit.

Simple idea:
- I choose a monthly budget.
- I choose a low amount that matches my practice work.
- I add email alerts for 50%, 80%, and 100% of the budget.

What to check:
- The budget name is easy to understand.
- The amount is small for beginner practice.
- Notifications are working.

## Region selection
A region is a geographic place where AWS runs services.

Why this matters:
- Resources in one region are separate from resources in another region.
- Some services are cheaper or available only in certain regions.
- I should keep using one region while learning so I do not get confused.

Recommended beginner rule:
- Pick one region and stay there for most practice.
- Use the region closest to you or the one your course recommends.
- Check the region before creating anything.

## Free-tier safety rules
- Always read the service pricing before creating it.
- Stop services when I am done.
- Avoid large EC2 instances.
- Avoid leaving storage or databases running for no reason.
- Do not keep extra copies, snapshots, or test data unless I need them.
- Check billing after every lab.

## Services to avoid for now
These can surprise beginners with charges:
- Large EC2 instances
- RDS databases
- NAT Gateway
- Load balancers
- EKS clusters
- OpenSearch
- Redshift
- Always-on data transfer-heavy setups

## How do I run it?
This is a setup checklist, so "running it" means completing the safety steps in AWS.

1. Sign in to the root account only if needed for setup.
2. Turn on MFA.
3. Enable billing alerts.
4. Create an AWS Budget.
5. Pick one AWS Region and keep using it.
6. Review the free-tier rules.
7. Avoid the risky services listed above.
8. Write down what changed in my learning log.

## How do I delete it?
I usually keep the safety setup because it protects my account.

If I ever need to remove it:
- Delete the AWS Budget.
- Delete the billing alert.
- Delete any SNS topic or email subscription used for alerts.
- Make sure billing notifications are still understood before removing anything.
- Keep MFA on the root account unless I have a very strong reason to change it.

## Cleanup and safety checklist
- Confirm MFA is still enabled.
- Confirm billing alerts still work.
- Confirm the budget still exists.
- Confirm I know which region I am using.
- Confirm I am not leaving any test resources running.
- Confirm I did not create any paid services by mistake.
- Update my notes and learning log.

## Learning repo note
This phase should be tracked in the `aws-learning` repo and in Notion.

Suggested repo location:
- `00-account-billing/`

Phase notes:
- [`phase-notes.md`](./phase-notes.md)
