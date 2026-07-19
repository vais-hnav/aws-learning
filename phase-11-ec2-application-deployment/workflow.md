# Workflow

## 1. Prepare local AWS CLI context

The lab started by confirming the active AWS profile and Region.

The selected Region was `ap-south-2`.

## 2. Check laptop IP and existing EC2 resources

The laptop public IP was checked and used for the SSH inbound rule.

An existing stopped instance named `ws1` was found and left untouched.

## 3. Launch EC2 instance

The lab instance was launched as:

```text
Name: phase-11-node-nginx
Instance ID: i-01d426e30586a1625
Availability Zone: ap-south-2a
Public IP: 16.112.128.222
Instance type: t3.micro
```

Security group rules:

```text
SSH  22  Source: laptop-public-ip/32
HTTP 80  Source: 0.0.0.0/0
```

Port `3000` was intentionally not opened.

## 4. Install server packages

Nginx, Node.js 22, and npm were installed on Amazon Linux 2023 using `dnf`.

Nginx was started and tested through the EC2 public IP.

## 5. Build the Node app

The Node app was created in:

```text
/home/ec2-user/phase-11-node-app/server.js
```

It listened on:

```text
127.0.0.1:3000
```

This made the app private to the EC2 instance.

## 6. Run app with systemd

A service file was created at:

```text
/etc/systemd/system/phase-11-node-app.service
```

The app was started, enabled, and verified with:

```bash
sudo systemctl status phase-11-node-app
curl http://127.0.0.1:3000
```

## 7. Connect Nginx to Node

An Nginx reverse proxy config was created at:

```text
/etc/nginx/conf.d/phase-11-node-app.conf
```

Nginx forwarded public HTTP traffic to the private Node app.

The browser returned:

```json
{
  "message": "Hello from Phase 11 EC2 Node app",
  "path": "/",
  "serverTime": "2026-07-19T15:34:11.127Z"
}
```

## 8. Debug and reboot tests

The Node app was stopped to observe a backend failure through Nginx.

Nginx was stopped to observe public entry-point failure while Node still worked internally.

The instance was rebooted and both services came back automatically.

## 9. Cleanup verification

The instance was cleaned up after the lab.

Unattached EBS volume and Elastic IP checks returned empty output.

## 10. Reusable automation artifact

After completing the manual flow, a user-data script was added to the repo:

```text
user-data/phase-11-node-nginx-user-data.sh
```

This script is for future repeat launches, not for skipping the first manual learning path.
