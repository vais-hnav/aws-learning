# AWS Post-Playlist Learning Plan

The initial playlist path is complete through its 73 currently published
videos. This roadmap now fills important production-oriented gaps while keeping
the same learning loop:

```text
Learn the concept
-> Build a focused AWS lab
-> Explain every command and architecture decision
-> Test normal and failure cases
-> Clean up AWS resources
-> Record notes and GitHub proof
```

New videos added to the ongoing playlist will be mapped back into the original
phase plan. They will not replace or reorder this post-playlist roadmap.

## Phase 11: EC2 Application Deployment And Operations

Goal: Move from a static web-server demo to operating a small application on a
Linux EC2 instance.

Build:

- Launch a small Linux EC2 instance with clear learning tags.
- Connect through SSH using a restricted port 22 rule for the current public IP.
- Install Nginx and a small Node application.
- Run the application on a private application port and reverse proxy through
  Nginx on port 80.
- Understand ports 22, 80, 443, and the application port.
- Inspect processes, services, logs, disk, memory, and network listeners.
- Intentionally stop a service, diagnose the failure, and restore it.
- Create a reusable user-data script only after the manual flow is understood.

Proof:

- Architecture and request-flow notes.
- Installation and troubleshooting commands.
- Nginx configuration with no secrets.
- Security-group explanation.
- Cleanup checklist and termination verification.

Cost safety:

- Use one small instance and a small root volume.
- Do not leave an unused public IPv4 address, EBS volume, snapshot, or instance.
- Open SSH only to the current public IP, never permanently to the whole internet.

## Phase 12: Application Load Balancer And Auto Scaling

Goal: Learn horizontal scaling and high availability beyond the playlist's
scalability theory.

Build:

- Create an AMI or launch template for the Phase 11 application.
- Run two instances across separate Availability Zones.
- Create a target group and configure health checks.
- Create an internet-facing Application Load Balancer.
- Restrict instance HTTP access to the load balancer security group.
- Create an Auto Scaling Group with minimum, desired, and maximum capacity.
- Test instance replacement and a simple scaling policy.

Cost safety:

- ALB and multiple instances create hourly charges; use a short lab window.
- Delete the Auto Scaling Group before its launch template and load balancer.
- Confirm target groups, instances, volumes, and public IPv4 addresses are gone.

## Phase 13: Deeper VPC Networking

Goal: Build and understand an isolated network instead of relying only on the
default VPC.

Build:

- Design a CIDR range and create a custom VPC.
- Create public and private subnets in at least two Availability Zones.
- Configure route tables and an internet gateway.
- Compare security groups and network ACLs.
- Place an application or load balancer in the correct subnet type.
- Learn NAT gateway behavior as a cost-aware demonstration or theory exercise.
- Learn VPC endpoints as a way to reach supported AWS services privately.

Cost safety:

- NAT gateways incur hourly and data-processing charges; avoid leaving one idle.
- Do not delete or modify the default VPC during this lab.

## Phase 14: S3 Application Integration

Goal: Connect an application to private object storage without embedding access
keys.

Build:

- Create a private S3 bucket with Block Public Access enabled.
- Give EC2 or Lambda access through an IAM role.
- Build a small upload/download flow with the AWS SDK.
- Compare backend uploads with presigned URLs.
- Validate file type, size, object key, and error responses.
- Add lifecycle and cleanup rules suitable for temporary lab objects.

Cost safety:

- Use small files and remove all versions, multipart uploads, and test objects.

## Phase 15: RDS Managed Databases

Goal: Learn a managed relational database and connect it securely to an
application.

Build:

- Compare PostgreSQL and MySQL, then choose one engine for the lab.
- Create a small RDS instance in private subnets.
- Allow database traffic only from the application security group.
- Store credentials outside source code.
- Create a table and perform basic application CRUD operations.
- Understand automated backups, snapshots, maintenance, and Multi-AZ theory.

Cost safety:

- RDS can create ongoing instance, storage, backup, and snapshot charges.
- Use the smallest suitable lab configuration and a short practice window.
- Delete manual snapshots and retained backups when they are not needed.

## Phase 16: SQS And Asynchronous Processing

Goal: Decouple request handling from background work.

Build:

- Create an SQS standard queue.
- Send messages from a small producer.
- Process messages with Lambda or a Python consumer.
- Understand visibility timeout, retries, long polling, and idempotency.
- Add a dead-letter queue and test a failed message.
- Compare this queue pattern with Kafka conceptually; managed Kafka deployment
  is deferred because it is heavier and more expensive for this stage.

## Phase 17: CloudWatch Monitoring And Alerts

Goal: Monitor systems instead of checking them manually after failure.

Build:

- Read EC2, Lambda, API Gateway, and DynamoDB metrics.
- Install/configure the CloudWatch agent when memory or application logs are
  needed from EC2.
- Create a focused dashboard.
- Create an alarm and connect it to an SNS notification topic.
- Trigger a safe test condition and verify recovery behavior.
- Set log retention so test logs do not remain indefinitely.

## Phase 18: Route 53 And DNS

Goal: Understand how DNS names route users to AWS applications.

Build:

- Learn hosted zones, record types, TTL, aliases, and DNS propagation.
- Point a record at an Application Load Balancer when a domain is available.
- Understand health checks and routing policies at a beginner level.
- Add HTTPS and certificate concepts with AWS Certificate Manager.

Cost safety:

- Hosted zones, domains, and health checks can incur charges.
- Use an existing domain only when intentional; otherwise keep the lab theory
  based and document the console/CLI workflow.

## Phase 19: Terraform Infrastructure As Code

Goal: Rebuild selected labs from code with a predictable destroy workflow.

Build:

- Install Terraform and configure the AWS provider with a named profile.
- Learn resources, variables, outputs, data sources, and dependencies.
- Use `fmt`, `validate`, `plan`, `apply`, and `destroy`.
- Understand why the state file matters and why it may contain sensitive data.
- Rebuild a small VPC or serverless lab before automating expensive resources.
- Learn remote state and state locking after the local workflow is clear.

Safety:

- Never commit real state, plan files, credentials, or secret variable files.
- Review every plan and always run a final AWS inventory check after destroy.

## Phase 20: Integrated Capstone

Goal: combine compute, storage, database, networking, asynchronous processing,
monitoring, DNS, IAM, and infrastructure as code into one portfolio project.

Possible architecture:

```text
Route 53
   -> Application Load Balancer
      -> Auto Scaling EC2 application
         -> private RDS database
         -> private S3 uploads
         -> SQS background jobs -> Lambda worker
CloudWatch metrics, logs, alarms, and dashboard across the system
Terraform creates and destroys the infrastructure
```

The capstone begins only after each paid component has an explicit budget,
short deployment window, and tested cleanup order.

## Immediate Next Step

Start Phase 11 with a single EC2 instance. Before launching it, prepare the
architecture, security-group rules, commands, cost limits, and cleanup checklist.
