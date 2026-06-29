# Phase 1 Notes

This phase covered the foundation: what cloud computing is, what AWS is, how the account is created, how root security works, how regions are organized, and how billing safety protects the learning account.

Note source:
- These notes are based on the completed playlist video order/titles, the auto-generated Malayalam transcript context available from YouTube, and the hands-on setup work done in this repo.
- They are paraphrased learning notes, not word-for-word transcripts.

## 1. AWS Full Course in Malayalam

Video focus:
- The course starts by setting the learning path for AWS beginners.
- The important message is that AWS should be learned in small topics with hands-on practice, not by only watching videos.
- The course introduces the idea that AWS has many services, but beginners should first understand the foundation: cloud basics, account setup, IAM, CLI, EC2, S3, Lambda, and cleanup.

What the instructor is trying to teach:
- AWS is not one single tool. It is a large cloud platform made of many services.
- A beginner needs a safe workflow before creating resources.
- Learning AWS means understanding both the concept and the operational habit: create, verify, document, and delete.

Mental model:
- Think of AWS as a collection of building blocks.
- Each building block has a purpose, a cost model, permissions, and cleanup steps.
- The right learning approach is to use one service at a time and keep notes for every action.

Hands-on connection:
- This repo became the learning proof for the course.
- Each phase folder stores notes, commands, cleanup instructions, and mistakes.
- The GitHub commits become evidence that a topic was not just watched, but practiced.

## 2. What is Cloud Computing?

Video focus:
- Cloud computing means renting computing resources over the internet instead of owning and maintaining physical servers yourself.
- The video explains the difference between local/on-premise infrastructure and cloud infrastructure.

What the instructor is explaining:
- Traditionally, a company buys servers, storage, networking equipment, and data center space.
- With cloud computing, AWS already owns and manages the physical infrastructure.
- You request resources when needed, use them, and pay based on usage.

Important ideas:
- On-demand: create resources when you need them.
- Elasticity: increase or decrease resources based on demand.
- Pay as you go: cost depends on what you use.
- Managed infrastructure: AWS handles the physical data centers, power, cooling, and hardware.

Mental model:
- Cloud computing is like using electricity from a provider instead of building your own power plant.
- You still need to use it carefully because usage creates cost.

Hands-on connection:
- Our account safety lab exists because cloud resources can be created quickly.
- Fast creation is useful, but it also means mistakes can create charges quickly.

## 3. IaaS, PaaS, and SaaS

Video focus:
- The video explains the three major cloud service models: IaaS, PaaS, and SaaS.
- The key lesson is responsibility: how much you manage versus how much the provider manages.

IaaS:
- Infrastructure as a Service gives you low-level infrastructure such as virtual machines, disks, and networking.
- In AWS, EC2 is the easiest beginner example.
- You control the operating system, packages, security updates, and application setup.

PaaS:
- Platform as a Service gives you a managed platform where you deploy code without managing as much infrastructure.
- You focus more on the application and less on the server.
- Managed databases, app platforms, and serverless patterns are close to this idea.

SaaS:
- Software as a Service is ready-to-use software.
- You do not manage servers, runtime, or the application internals.
- You just use the product.

Mental model:
- IaaS gives maximum control and more responsibility.
- PaaS reduces infrastructure work.
- SaaS gives the least control but the easiest usage experience.

Hands-on connection:
- Later EC2 labs are IaaS-style because we launch and manage a virtual machine.
- Lambda labs are closer to serverless/PaaS-style because we run code without managing a server.

## 4. Introduction to AWS

Video focus:
- The video introduces AWS as Amazon's cloud platform.
- It frames AWS as a large set of services for compute, storage, networking, databases, security, and application hosting.

What the instructor is explaining:
- AWS provides services that replace or extend traditional IT infrastructure.
- You can create resources from the AWS Console, AWS CLI, SDKs, or infrastructure-as-code tools.
- AWS is global, so resources can be created in different regions.

Important AWS categories:
- Compute: EC2, Lambda.
- Storage: S3, EBS.
- Networking: VPC, security groups.
- Security: IAM, MFA, policies, roles.
- Monitoring and billing: CloudWatch, Billing, Budgets.

Mental model:
- AWS is a toolbox.
- You do not need every tool immediately.
- As a beginner, start with account safety, identity, CLI, compute, storage, networking, and cleanup.

Hands-on connection:
- We created a phase-based repo so the AWS toolbox does not feel random.
- Each AWS service gets its own folder and cleanup checklist.

## 5. Create Free Tier AWS Account

Video focus:
- The video walks through creating an AWS account for beginner practice.
- It emphasizes that the account starts with a root user, and that root user needs protection.

What the instructor is explaining:
- AWS account creation usually starts with an email address, account name, contact details, payment verification, phone verification, and support plan selection.
- The root account has full control.
- Even when an account is intended for free-tier practice, billing awareness matters from day one.

Important account setup ideas:
- Use a real email you can access.
- Keep root password strong and private.
- Do not share the root account.
- Choose the basic/free support option unless you intentionally need paid support.
- After account creation, immediately move into security setup and billing setup.

Mental model:
- Creating an AWS account is not just signing up for a website.
- It creates access to real cloud resources with real billing impact.

Hands-on connection:
- Our lab added root account safety checks.
- We made the learning repo before doing larger labs so each future action can be documented.

## 6. How to Setup MFA to Root User

Video focus:
- The video explains why MFA is required for root account safety and shows how to enable it.

What the instructor is explaining:
- Root user is the most powerful identity in an AWS account.
- A password alone is not enough protection.
- MFA adds a second factor, usually an authenticator app code, during login.

Important MFA steps:
- Sign in as root only for account-level security tasks.
- Open security credentials.
- Add an MFA device.
- Scan the QR code or enter the setup key in an authenticator app.
- Enter two consecutive MFA codes to confirm setup.
- Store recovery information safely.

Mental model:
- Root user is like the master key to the whole AWS account.
- MFA is the extra lock that protects the master key if the password leaks.

Hands-on connection:
- The phase completion gate required MFA to be enabled before continuing.
- This protects every future lab because compromised root access would be very dangerous.

## 7. AWS Regions and Availability Zones

Video focus:
- The video explains AWS global infrastructure: regions and availability zones.

What the instructor is explaining:
- A region is a geographic area where AWS runs data centers.
- An Availability Zone is an isolated location inside a region.
- A region usually has multiple Availability Zones so applications can be designed for higher availability.

Important details:
- Not every AWS service is available in every region.
- Some services are global, but many resources are regional.
- Region choice affects latency, cost, compliance, and where resources appear in the console.
- Beginners should pick one default region while learning to avoid losing track of resources.

Mental model:
- Region is the city-level choice.
- Availability Zone is the separate building or campus inside that region.
- Resources in one region do not automatically appear in another region.

Hands-on connection:
- We chose a default learning region.
- Our cleanup habit includes checking the correct region before assuming a resource is deleted.

## 19. AWS Billing Basics: Manage Costs and Setup Zero Cost Budget

Video focus:
- The video teaches how to use billing tools early so AWS learning does not become expensive by accident.

What the instructor is explaining:
- Billing is where you monitor charges, usage, credits, and forecasts.
- Budgets are alerts, not hard stops.
- A zero-cost or very low-cost budget helps beginners notice unexpected spending quickly.

Important billing habits:
- Check Billing and Cost Management regularly.
- Create a budget with email alerts.
- Watch free-tier usage and credit usage.
- Understand that deleting a resource is the real cleanup step; budget alerts only warn you.

Mental model:
- A budget is like a smoke alarm.
- It does not put out the fire automatically, but it warns you early.

Hands-on connection:
- We created billing alert and budget checklist files.
- This became a required phase gate before moving into IAM and CLI.

## 61. How to Create AWS Free Tier Account in 2026

Video focus:
- The later account video revisits account creation with the newer AWS Free Tier flow.
- The point is to understand that the signup and free-tier model can change over time.

What the instructor is explaining:
- AWS may show Free and Paid account plan choices during signup.
- The Free account plan is safer for beginners because it limits surprise charges while exploring.
- Some services and features may require upgrading to a Paid plan.
- Even with credits or a free plan, you should still use budgets and cleanup habits.

Current AWS Free Tier note:
- AWS documentation now describes a Free account plan with signup credits and a limited exploration period.
- AWS also has a Paid account plan for full service access.
- This means beginners should read the current AWS Free Tier page, not rely only on older 12-month assumptions.
- Reference: https://aws.amazon.com/free/
- Reference: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html

Mental model:
- Free Tier is not a permission to ignore cost.
- It is a beginner-friendly starting point with limits, credits, and rules.

Hands-on connection:
- Our safety rules say to avoid expensive services for now.
- We also keep a billing check routine even when using free-tier resources.

## Hands-on recap

What we built:
- Beginner-safe AWS account setup checklist.
- Root account safety checklist.
- MFA checklist.
- Billing alert and budget checklist.
- Region selection notes.
- Free-tier safety rules.
- Cleanup and billing check routine.

What I should be able to explain now:
- What cloud computing is.
- What AWS provides.
- What IaaS, PaaS, and SaaS mean.
- Why root user is dangerous for daily work.
- Why MFA is required.
- What regions and Availability Zones are.
- Why budgets are alerts, not automatic cost blockers.
- Why cleanup matters after every lab.
