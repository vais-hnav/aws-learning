# Phase 1 Notes

This phase covered AWS foundations, account setup, root security, regions, billing, budgets, and Free Tier safety.

Note source:
- Based on playlist video order/titles, available auto-generated Malayalam transcript context from YouTube, and the hands-on setup done in this repo.
- Paraphrased learning notes, not verbatim transcripts.

## 1. AWS Full Course in Malayalam

Concept:
- The course sets up AWS as a phase-by-phase learning path, not a random list of services.
- Main workflow: watch, build, understand, debug, clean up, write notes, commit.
- AWS has many services, so the safe beginner path starts with account safety, IAM, CLI, EC2, S3, Lambda, and cleanup.

Video hands-on:
- No AWS resource creation in this intro.
- The instructor frames how the course will progress and why practice matters.

My hands-on:
- Created the `aws-learning` repo structure.
- Set up phase folders, learning log, cleanup guides, and Notion tracking.

Commands / files:
- `README.md`
- `aws-learning-log.md`
- phase folders in this repo

Warnings / cleanup:
- No AWS cleanup needed.
- Learning rule: no video is complete unless notes and cleanup are done.

## 2. What is Cloud Computing?

Concept:
- Cloud computing means using compute, storage, networking, and other services over the internet instead of owning physical infrastructure.
- AWS owns and manages the data centers; users request resources on demand.
- Key ideas: on-demand access, scalability, elasticity, managed infrastructure, and pay-as-you-go pricing.

Video hands-on:
- Theory explanation only.
- Compares traditional server ownership with cloud resource rental.

My hands-on:
- Added account safety notes because cloud resources are easy to create and can create cost quickly.

Commands / files:
- No AWS commands.
- `phase-01-aws-foundation/README.md`

Warnings / cleanup:
- No AWS cleanup needed.
- Cost habit starts here: always know what a service can charge for.

## 3. IaaS, PaaS, and SaaS

Concept:
- IaaS gives infrastructure such as virtual machines, disks, and networking. EC2 is the main beginner AWS example.
- PaaS gives a managed platform where you deploy code with less server management.
- SaaS gives ready-to-use software.
- The main difference is responsibility: how much you manage versus how much the provider manages.

Video hands-on:
- Theory explanation only.
- Explains the three cloud service models and where responsibility shifts.

My hands-on:
- Mapped future labs to the model: EC2 as IaaS, Lambda/serverless closer to managed platform style.

Commands / files:
- No AWS commands.
- `phase-01-aws-foundation/phase-notes.md`

Warnings / cleanup:
- No cleanup needed.
- Remember: more control usually means more responsibility.

## 4. Introduction to AWS

Concept:
- AWS is Amazon's cloud platform with services for compute, storage, databases, networking, security, monitoring, and deployment.
- AWS resources can be created from the Console, CLI, SDKs, or infrastructure-as-code tools.
- AWS is global, and region choice matters.

Video hands-on:
- Introduces AWS service categories and the idea that each major cloud feature is offered as a separate service.

My hands-on:
- Organized the repo by AWS service/phase so learning stays structured.

Commands / files:
- No AWS commands.
- `README.md`

Warnings / cleanup:
- No cleanup needed.
- Do not try to learn every AWS service at once.

## 5. Create Free Tier AWS Account

Concept:
- Creating an AWS account gives access to real cloud resources and real billing.
- The root user is created first and has full account control.
- Account creation usually includes email, account details, payment verification, phone verification, and support plan choice.

Video hands-on:
- Walks through creating a beginner AWS account.
- Shows the signup flow and highlights that root access must be protected.

My hands-on:
- Completed account setup.
- Added root account safety checklist and beginner account checklist.

Commands / files:
- Console-only setup.
- `phase-01-aws-foundation/README.md`

Warnings / cleanup:
- Choose the basic/free support option unless intentionally paying.
- Do not use root for daily work after setup.
- No resource cleanup, but billing and MFA setup are required before continuing.

## 6. How to Setup MFA to Root User

Concept:
- MFA adds a second login factor to the root account.
- Root has full control, so password-only protection is not enough.
- Root should be used only for account-level tasks.

Video hands-on:
- Signs in as root.
- Opens security credentials.
- Adds an MFA device.
- Scans the QR code or enters setup details in an authenticator app.
- Confirms setup with consecutive MFA codes.

My hands-on:
- Enabled MFA for the root account.
- Added MFA checklist to the Phase 1 docs.

Commands / files:
- Console-only setup.
- `phase-01-aws-foundation/README.md`

Warnings / cleanup:
- Store recovery information safely.
- Do not remove MFA unless replacing it immediately.
- No AWS resource cleanup needed.

## 7. AWS Regions and Availability Zones

Concept:
- A region is a geographic AWS location.
- An Availability Zone is an isolated data center location inside a region.
- Many resources are regional, so resources created in one region may not appear in another.

Video hands-on:
- Explains AWS global infrastructure.
- Shows how region choice affects where resources are created and viewed.

My hands-on:
- Chose one learning region for consistency.
- Added region notes and cleanup habit: always check the selected region.

Commands / files:
- `phase-01-aws-foundation/region-notes.md`

Warnings / cleanup:
- No cleanup needed.
- Wrong-region confusion is a common beginner mistake.

## 19. AWS Billing Basics: Manage Costs and Setup Zero Cost Budget

Concept:
- Billing shows charges, usage, credits, forecasts, and cost trends.
- Budgets send alerts; they do not automatically stop AWS resources.
- A low or zero-cost budget helps catch mistakes early.
- AWS costs are usage-based; different services charge in different ways.
- IAM users may need both billing permissions and root-level billing access enabled before they can view billing pages.

Video description highlights:
- The description says this video focuses on avoiding surprise bills as a beginner.
- It covers enabling billing permissions for IAM users.
- It shows monthly bill summary, which services are contributing to cost, and budget notifications.

Video hands-on:
- Opens Billing and Cost Management.
- Shows that an admin IAM user can still be blocked from billing until root enables IAM/role access to billing information.
- Logs in as root only for that account-level billing setting, then returns to the IAM user.
- Reviews the monthly bill summary and explains month-to-date cost, previous-period comparison, and forecast.
- Explains that EC2 can charge based on running time and that other services may charge by storage, requests, execution time, or other usage.
- Opens detailed bills / bills by service to identify which AWS service created a charge.
- Explains that costs can also be split by Region, which helps catch forgotten resources in another Region.
- Uses the EC2 example to show that charges can come from instance usage, EBS volumes, or other related sub-items.
- Creates a budget using the AWS-provided zero-spend budget template.
- Adds an active email address for notifications so alerts are noticed quickly.
- Also recommends a monthly cost budget so spending beyond the chosen limit triggers an email.
- Reminds beginners to keep monitoring because learning cloud means creating more resources over time.

My hands-on:
- Created billing alert/budget checklist.
- Added billing safety and daily cost check routine.
- Refreshed the billing notes after the EC2 videos because EC2 is the first service in this path that can create meaningful charges.

Commands / files:
- Console-only setup.
- `phase-01-aws-foundation/billing-safety.md`

Warnings / cleanup:
- Budgets are alarms, not automatic brakes.
- Cleanup still means deleting or stopping the actual AWS resources.
- Billing pages can help find the source of a charge, but they do not remove the charge by themselves.
- Root should be used only for account-level tasks, then daily work should return to an IAM user.

## 61. How to Create AWS Free Tier Account in 2026

Concept:
- AWS Free Tier/account signup can change over time.
- Newer signup flows may show Free and Paid plan choices.
- Free plans/credits help beginners explore, but limits still apply.

Video hands-on:
- Revisits account creation using the newer Free Tier flow.
- Explains the difference between safer beginner exploration and full paid access.

My hands-on:
- Updated safety notes to avoid relying only on older Free Tier assumptions.
- Added official references:
- https://aws.amazon.com/free/
- https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html

Commands / files:
- `phase-01-aws-foundation/free-tier-rules.md`

Warnings / cleanup:
- Free Tier is not unlimited.
- Keep budgets and cleanup habits even when using credits/free-tier services.

## Phase 1 Recap

Built:
- Account safety checklist.
- Root MFA checklist.
- Billing and budget safety notes.
- Region notes.
- Free Tier rules.

Must remember:
- Root is powerful and should not be used daily.
- MFA and budgets are mandatory beginner safety steps.
- Region awareness prevents lost resources.
- Cleanup protects money.
