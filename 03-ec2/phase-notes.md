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
- `03-ec2/ec2-introduction/`

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
- `03-ec2/linux-ec2-instance/`

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
- `03-ec2/apache-webserver/`

Warnings / cleanup:
- HTTP port `80` must be allowed in the security group.
- Run `scp` from the local machine, not inside the SSH session.
- Upload the page as `index.html`.
- Terminate the EC2 instance after testing unless you are intentionally keeping it.
- Check for leftover EBS volumes after termination.
