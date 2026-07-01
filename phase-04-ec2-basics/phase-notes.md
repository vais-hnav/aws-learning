# Phase 4 Notes

This phase covers EC2 virtual servers, launching instances, connecting to instances, hosting a website, and EC2 cost control.

Note source:
- Based on playlist video order/titles, video descriptions, available auto-generated Malayalam transcript context from YouTube, and EC2 lab work in this repo.
- Paraphrased explanatory notes, not verbatim transcripts.

## 15. Introduction to AWS EC2 Service

Concept:
- EC2 lets you create virtual computers inside AWS.
- Each virtual computer is an EC2 instance.
- Instance type is the CPU/RAM size.
- AMI is the operating system/template.
- Security group is the network firewall.
- Key pair/private key is used for secure login.
- Instance states include `running`, `stopped`, and `terminated`.

Video hands-on:
- Opens the EC2 service after IAM.
- Explains EC2 using the physical-computer analogy: CPU, RAM, storage, and network.
- Walks through the Launch Instance screen.
- Shows naming an instance, choosing an AMI, choosing an instance type, key pair/security settings, storage, and launch.
- Shows instance state changing to `running`.
- Demonstrates stopping and starting an instance.
- Warns that running EC2 instances can create charges.

My hands-on:
- Prepared the `ec2-introduction` lab.
- Added read-only EC2 commands for identity, regions, existing instances, and instance type information.
- Did not require launching a new instance for this repo lab yet.

Commands / files:
- `AWS_PROFILE=user1 aws sts get-caller-identity`
- `AWS_PROFILE=user1 aws ec2 describe-regions --output table`
- `AWS_PROFILE=user1 aws ec2 describe-instances --output table`
- `phase-04-ec2-basics/ec2-introduction/`

Warnings / cleanup:
- EC2 can create charges.
- Stopped is not the same as terminated.
- Attached EBS storage can remain.
- Private key files must never be committed.
- For short labs, terminate the instance and check leftover EBS volumes.

Official references:
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-lifecycle.html
- https://aws.amazon.com/ec2/pricing/on-demand/
- https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html

## 16. How to create Linux EC2 instance

Concept:
- A Linux EC2 instance is launched like a Windows EC2 instance, but the connection method is different.
- Windows commonly uses RDP; Linux commonly uses SSH.
- A key pair produces a `.pem` private key file used to prove identity.
- Amazon Linux uses `ec2-user` as the default login user.
- Public IPv4 is used from your laptop over the internet; private IPv4 is for internal network traffic.
- HTTP can be allowed during launch when the next lab will host a website.

Video description highlights:
- The description says the video covers creating/configuring a Linux EC2 instance, choosing the AMI, configuring security groups/key pairs, and connecting with SSH.

Video hands-on:
- Opens the EC2 launch flow and names the Linux instance.
- Chooses Amazon Linux 2023 AMI and checks Free Tier eligibility.
- Keeps a small Free Tier eligible instance type such as `t2.micro`.
- Creates a new key pair and downloads the `.pem` file.
- Leaves SSH allowed so the instance can be reached from the local machine.
- Enables HTTP traffic because the same instance is used in the next website-hosting video.
- Keeps the default 8 GiB Linux EBS root volume.
- Launches the instance and waits until it reaches `running`.
- Copies the public IPv4 address.
- Connects with SSH using `ssh -i KEY_PATH ec2-user@PUBLIC_IPV4`.
- Tests the Linux shell with simple commands like creating/listing a folder.
- Warns about Free Tier hours and explains why old practice instances should be stopped or terminated.

My hands-on:
- Created the `linux-ec2-instance` lab.
- Added console workflow notes, SSH commands, CLI inspection commands, cleanup steps, and common mistakes.
- Added `.pem` to `.gitignore` so private keys do not enter GitHub.

Commands / files:
- `ssh -i KEY_PATH ec2-user@PUBLIC_IPV4`
- `chmod 400 KEY_PATH`
- `AWS_PROFILE=user1 aws ec2 describe-instances --output table`
- `phase-04-ec2-basics/linux-ec2-instance/`

Warnings / cleanup:
- Do not commit `.pem` files.
- Use public IPv4 for laptop-to-instance SSH.
- Keep the Linux instance running only if immediately continuing to the website lab.
- Terminate unused practice instances and check available EBS volumes.
- Multiple running EC2 instances can consume Free Tier hours faster.

## 17. Host a simple website in Linux EC2 instance

Concept:
- A web server receives HTTP requests and returns website files.
- Apache HTTP Server is installed as the `httpd` package/service on Amazon Linux.
- Apache serves files from `/var/www/html` by default.
- A local `index.html` file can be copied to the EC2 instance using `scp`.
- The website is tested using the instance public IPv4 address or public DNS name.

Video description highlights:
- The description includes the practical command flow: SSH into the Linux instance, install Apache, change `/var/www/html` ownership, start `httpd`, upload `index.html` with `scp`, and test browser access.

Video hands-on:
- Starts from the running Linux EC2 instance created in video 16.
- Connects to the instance using SSH.
- Installs Apache HTTP Server with `yum install httpd`.
- Gives `ec2-user` ownership of `/var/www/html`.
- Starts the web server using `sudo service httpd start`.
- Creates a simple local `index.html` file.
- Uses `scp` with the `.pem` key to upload the file to `/var/www/html`.
- Opens the public IPv4 or public DNS in a browser to verify the site is accessible.

My hands-on:
- Replaced the placeholder web-server lab with an Apache lab because the video uses Apache.
- Added Apache commands, workflow, cleanup, mistakes, and a sample `index.html`.
- Kept both the video command style and macOS-friendly command variants.

Commands / files:
- `sudo yum install -y httpd`
- `sudo chown -R ec2-user:ec2-user /var/www/html`
- `sudo service httpd start`
- `scp -i KEY_PATH sample-index.html ec2-user@PUBLIC_IPV4:/var/www/html/index.html`
- `phase-04-ec2-basics/apache-webserver/`

Warnings / cleanup:
- HTTP port `80` must be allowed in the security group.
- Run `scp` from the local machine, not inside the SSH session.
- Upload the page as `index.html`.
- Terminate the EC2 instance after testing unless you are intentionally keeping it.
- Check for leftover EBS volumes after termination.

## 18. Create EC2 Instances using AWS CLI

Concept:
- AWS CLI is used to create and manage AWS resources from the terminal.
- Console is useful for learning visually; CLI is better for repeatable work and automation.
- EC2 CLI commands use exact values such as AMI ID, instance type, key-pair name, Region code, and instance ID.
- Region matters because AMI IDs, key pairs, and EC2 instances are regional.
- AWS CLI output is usually JSON, and `run-instances` returns an `Instances` array because it can create more than one instance.

Video description highlights:
- The description says the video walks through creating Linux EC2 instances using AWS CLI.
- It specifically calls out launching, starting, and stopping instances from the terminal.
- It frames CLI usage as a productivity and automation skill for developers and system administrators.
- The description references the AWS CLI docs for `run-instances`, `start-instances`, and `stop-instances`.

Video hands-on:
- Opens the command prompt after AWS CLI has already been configured.
- Explains that organizations usually prefer CLI, scripts, or automation for repeated resource creation.
- Chooses the target Region before creating the instance.
- Opens the EC2 AMI catalog and copies an Amazon Linux AMI ID.
- Uses a small Free Tier eligible instance type such as `t2.micro`.
- Creates or reuses a key pair in the console, then passes only the key-pair name to the CLI.
- Runs a minimal `aws ec2 run-instances` command with AMI ID, instance type, count, and key name.
- Verifies the created instance in the EC2 console.
- Explains that if `--region` is not passed, AWS CLI uses the default Region configured for the profile.
- Reads the JSON response and explains why the response is an array.
- Shows that `--count` can create multiple instances, but the beginner example keeps it minimal.
- Uses the instance ID with `aws ec2 stop-instances`.
- Waits for the state to become `stopped`.
- Uses the same instance ID with `aws ec2 start-instances`.
- Explains that multiple instance IDs can be passed to stop or start multiple instances.

My hands-on:
- Replaced the placeholder automation files with a beginner-safe EC2 CLI lab.
- Added a dry-run-first launch script so the command can be checked before creating a paid resource.
- Set the script count default to `1` for beginner safety.
- Added stop, start, and terminate helpers using the instance ID.
- Added command notes, explanation, cleanup, mistakes, and troubleshooting docs.

Commands / files:
- `aws ec2 run-instances`
- `aws ec2 stop-instances --instance-ids INSTANCE_ID`
- `aws ec2 start-instances --instance-ids INSTANCE_ID`
- `phase-04-ec2-basics/ec2-cli-automation/`

Warnings / cleanup:
- Confirm the Region before launching.
- Do not use `--count` casually while learning.
- Use the key-pair name in the CLI, not the `.pem` file path.
- Stop/start proves the video command flow, but terminate after practice to finish cleanup.
- Check EBS volumes and Elastic IPs after EC2 labs.

## 20. EC2 Instance Connect

Concept:
- EC2 Instance Connect is a browser-based way to connect to supported Linux EC2 instances.
- It is still SSH-based, but the AWS console handles the connection flow.
- For Amazon Linux, the default username is usually `ec2-user`.
- It avoids handling the local `.pem` private key during the connection step.
- The signed-in IAM user still needs permission to use EC2 Instance Connect.

Video description highlights:
- The description says the video explains what EC2 Instance Connect is, its benefits, setup for Linux instances, a step-by-step connection demo, and required permissions.
- It links to AWS documentation for EC2 Instance Connect and IAM-role/permission configuration.

Video hands-on:
- Uses a Linux EC2 instance that already exists.
- Selects the instance in the EC2 console.
- Checks the AMI details to confirm it is an Amazon Linux instance.
- Clicks `Connect`.
- Chooses the first tab, `EC2 Instance Connect`.
- Keeps the default username shown by AWS for Amazon Linux.
- Connects from the browser without selecting a local `.pem` private key.
- Opens a browser terminal and runs Linux commands from there.
- Explains that this is useful when SSH client/private-key setup is difficult.
- Explains that an admin IAM user may work immediately, while a restricted user needs specific permissions.

My hands-on:
- Added the `ec2-instance-connect` lab.
- Documented the console workflow, basic commands to run inside the browser terminal, permission requirements, cleanup, and common mistakes.

Commands / files:
- `whoami`
- `pwd`
- `ls`
- `cat /etc/os-release`
- `phase-04-ec2-basics/ec2-instance-connect/`

Warnings / cleanup:
- EC2 Instance Connect does not create a separate resource to delete.
- The EC2 instance is still the resource that can cost money.
- Close the browser terminal, then stop or terminate the EC2 instance.
- If access fails, check IAM permissions and whether the instance is a supported Linux instance.

## 21. How EC2 instance pricing is calculated

Concept:
- Cloud development adds cost awareness to normal software development.
- EC2 cost depends on instance type, Region, operating system, running time, and purchasing option.
- EC2-related bills can also include EBS volumes, snapshots, Elastic IPs, data transfer, and other connected services.
- Stopped is not the same as deleted; storage can continue to cost money.
- Budgets help notify, but they do not replace cleanup.

Video description highlights:
- The description says this is an introductory beginner video about how AWS calculates EC2 instance pricing.
- It emphasizes that developers moving into cloud need to understand service billing and cost.
- It uses a simple example rather than advanced pricing math.

Video hands-on / walkthrough:
- Focuses on pricing concepts rather than creating a new EC2 instance.
- Explains that EC2 pricing is usage-based.
- Frames cost as something developers must consider before and after launching resources.
- Connects EC2 pricing back to billing/budget safety from the earlier billing video.

My hands-on:
- Added the `ec2-pricing` theory lab.
- Documented EC2 pricing inputs, safe read-only CLI checks, cleanup checks, and common pricing mistakes.
- Kept the lab resource-free to avoid accidental charges.

Commands / files:
- `phase-04-ec2-basics/ec2-pricing/`
- `aws ec2 describe-instance-types`
- `aws ec2 describe-instances`
- `aws ec2 describe-volumes`
- `aws ec2 describe-addresses`

Warnings / cleanup:
- Check pricing before launching non-Free-Tier or long-running instances.
- Terminate completed EC2 practice instances.
- Check EBS volumes and Elastic IPs after termination.
- Budget alerts can be delayed, so direct resource cleanup still matters.

## 22. How to Choose the Right AWS EC2 Instance

Concept:
- EC2 instance types are grouped into families for different workload patterns.
- General purpose balances CPU, memory, and networking.
- Compute optimized is for CPU-heavy workloads.
- Memory optimized is for memory-heavy workloads.
- Storage optimized is for storage I/O-heavy workloads.
- Accelerated computing is for GPU or specialized hardware workloads.
- Right-sizing means choosing enough capacity without paying for unused capacity.

Video description highlights:
- The description says the video covers EC2 instance families and specific instance types.
- It calls out vCPU, memory, storage capacity, scaling up/down, and cost management.
- It references the AWS EC2 instance types page.

Video hands-on / walkthrough:
- Explains the major EC2 instance families.
- Compares instance selection by workload need instead of choosing randomly.
- Connects instance choice to cost control.
- Encourages scaling up or down as needed rather than over-provisioning from the start.

My hands-on:
- Added the `ec2-instance-selection` theory lab.
- Added read-only CLI commands for inspecting instance type details.
- Documented a beginner selection flow and common instance-selection mistakes.

Commands / files:
- `phase-04-ec2-basics/ec2-instance-selection/`
- `aws ec2 describe-instance-types`

Warnings / cleanup:
- Do not choose large or specialized instance types for beginner labs.
- Check Free Tier eligibility before launching.
- Compare memory, vCPU, network, storage, and cost, not just the instance name.

## 23. Save 90% on AWS EC2 Bills

Concept:
- Cost optimization is foundational cloud knowledge.
- Not every saving is good; savings should not harm users or block future innovation.
- EC2 purchasing options include On-Demand, Savings Plans, Reserved Instances, Spot Instances, Dedicated Hosts, Dedicated Instances, and Capacity Reservations.
- Spot Instances can offer large discounts, but they can be interrupted.
- Beginners should learn purchasing options without buying long-term commitments.

Video description highlights:
- The description says cost optimization is important and appears in Cloud Practitioner-style knowledge.
- It warns that savings are bad if they hurt customer experience or future innovation.
- It introduces EC2 purchasing options and says deeper discussion continues in upcoming videos.
- It specifically mentions On-Demand, Savings Plans, Spot, Dedicated Hosts, Dedicated Instances, Reserved Instances, and Capacity Reservations.

Video hands-on / walkthrough:
- Focuses on cost-optimization concepts rather than creating resources.
- Explains EC2 purchasing options at a high level.
- Emphasizes choosing the right option based on usage plan.
- Frames Spot as a discount option for flexible workloads, not critical always-on workloads.

My hands-on:
- Added the `ec2-cost-optimization` theory lab.
- Documented purchasing options, beginner-safe rules, cost cleanup commands, and mistakes.
- Marked this as no paid experiment: no Savings Plans, Reserved Instances, Dedicated Hosts, Dedicated Instances, or Capacity Reservations.

Commands / files:
- `phase-04-ec2-basics/ec2-cost-optimization/`
- `aws ec2 describe-instances`
- `aws ec2 describe-volumes`
- `aws ec2 describe-addresses`

Warnings / cleanup:
- Do not buy commitments during beginner practice.
- Use Spot only when a future lab explains interruption handling.
- Remove idle resources before thinking about advanced purchasing options.
- Budgets notify; cleanup actually removes cost sources.
