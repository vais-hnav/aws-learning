# Phase 11: EC2 Application Deployment

## What did I build?

A small Node.js web app running on an EC2 instance behind Nginx.

The browser talks to Nginx on port `80`, and Nginx forwards the request internally to the Node app on `127.0.0.1:3000`.

```text
Browser -> EC2 public IP:80 -> Nginx -> 127.0.0.1:3000 -> Node app
```

## Which AWS service did I use?

- EC2 for the virtual server
- Security Groups for firewall rules
- Key Pair for SSH access
- Amazon Linux 2023 as the server operating system
- Nginx as the reverse proxy
- systemd as the Linux service manager

## What did I learn?

- How to launch an EC2 instance safely
- How to allow SSH only from my laptop IP
- How to install Nginx and Node.js on Amazon Linux 2023
- Why an app can run privately on `127.0.0.1`
- Why Nginx is used as the public entry point
- How to run a Node app as a background Linux service
- How to debug service failures using `systemctl`, `journalctl`, and Nginx logs
- How to verify cleanup using EC2, EBS volume, and Elastic IP checks

## How do I run it?

SSH into the EC2 instance, install the required packages, run the Node app, configure systemd, then configure Nginx to proxy traffic to it.

Detailed commands are in [commands.md](/Users/vaishnav/Documents/Workspace/AWS/aws-learning/phase-11-ec2-application-deployment/commands.md).

After understanding the manual flow, the same setup can be automated with [phase-11-node-nginx-user-data.sh](/Users/vaishnav/Documents/Workspace/AWS/aws-learning/phase-11-ec2-application-deployment/user-data/phase-11-node-nginx-user-data.sh).

## How do I delete it?

Terminate the EC2 instance after the lab, then verify that no extra EBS volumes or Elastic IPs are left behind.

Cleanup steps are in [cleanup.md](/Users/vaishnav/Documents/Workspace/AWS/aws-learning/phase-11-ec2-application-deployment/cleanup.md).
