# Explanation

## EC2

EC2 stands for Elastic Compute Cloud.

For beginners, the simplest explanation is:

EC2 lets you rent a virtual computer from AWS.

You choose the operating system, size, network access, and storage. AWS creates the computer inside its cloud infrastructure.

## EC2 Instance

An EC2 instance is one virtual computer.

In the video, the instructor compares this to buying a computer from a shop. You normally think about CPU, RAM, storage, and network needs. In AWS, those choices become EC2 launch settings.

## Instance Type

An instance type is a predefined size for the virtual computer.

Example:
- `t3.micro` is a small instance type.
- Bigger instance types have more CPU and memory.
- Bigger instance types usually cost more.

The beginner rule is to choose the smallest safe type for the lab.

## AMI

AMI means Amazon Machine Image.

It is the template used to create the instance.

It can include:
- operating system
- installed software
- default configuration

Examples:
- Amazon Linux AMI
- Ubuntu AMI
- Windows AMI

## Security Group

A security group is like a firewall for the instance.

It controls inbound and outbound network traffic.

Examples:
- SSH uses port `22`
- HTTP uses port `80`
- HTTPS uses port `443`

In beginner labs, never open SSH to the whole internet unless the lab explicitly explains why.

## Key Pair

A key pair is used to connect securely to an instance.

The private key file is secret.

Do not:
- commit it to GitHub
- upload it to random tools
- share it in chat
- store it inside this repo

## Instance State

Common EC2 states:
- `pending`: AWS is creating or starting the instance
- `running`: the virtual computer is on
- `stopping`: shutdown is in progress
- `stopped`: the virtual computer is off
- `terminated`: the instance is deleted

For short learning labs, termination is usually the final cleanup step.
