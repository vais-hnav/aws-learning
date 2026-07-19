# Commands

## Local setup checks

```bash
export AWS_PROFILE=user1
export AWS_DEFAULT_REGION=ap-south-2
aws configure list
aws sts get-caller-identity
```

## Find laptop public IP

```bash
curl -s https://checkip.global.api.aws
```

Use this IP as `/32` in the EC2 security group SSH rule.

## Inspect existing EC2 instances

```bash
aws ec2 describe-instances \
  --filters "Name=instance-state-name,Values=pending,running,stopping,stopped" \
  --query "Reservations[].Instances[].{Name:Tags[?Key=='Name']|[0].Value,Id:InstanceId,State:State.Name,Type:InstanceType,PublicIP:PublicIpAddress}" \
  --output table
```

## SSH into EC2

```bash
chmod 400 ~/.ssh/kp.pem
ssh -i ~/.ssh/kp.pem ec2-user@16.112.128.222
```

Replace the public IP if a new instance is launched.

## Confirm operating system

```bash
whoami
hostname
cat /etc/os-release
```

## Install Nginx and Node.js

```bash
sudo dnf update -y
sudo dnf install -y nginx nodejs22 nodejs22-npm
node --version
npm --version
nginx -v
```

## Start Nginx

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
sudo systemctl status nginx
```

## Run the Node app manually

```bash
mkdir -p ~/phase-11-node-app
cd ~/phase-11-node-app
nano server.js
node server.js
```

Test from the EC2 instance:

```bash
curl http://127.0.0.1:3000
```

## Run the Node app with systemd

```bash
sudo nano /etc/systemd/system/phase-11-node-app.service
sudo systemctl daemon-reload
sudo systemctl start phase-11-node-app
sudo systemctl enable phase-11-node-app
sudo systemctl status phase-11-node-app
curl http://127.0.0.1:3000
```

## Configure Nginx reverse proxy

```bash
sudo nano /etc/nginx/conf.d/phase-11-node-app.conf
sudo nginx -t
sudo systemctl reload nginx
```

The Nginx config used in this lab is stored in `nginx/phase-11-node-app.conf`.

After reload, open the EC2 public IP in the browser:

```text
http://16.112.128.222
```

Expected response:

```json
{
  "message": "Hello from Phase 11 EC2 Node app",
  "path": "/",
  "serverTime": "2026-07-19T15:34:11.127Z"
}
```

## Test different paths

```text
http://16.112.128.222/
http://16.112.128.222/test
http://16.112.128.222/hello
```

The JSON `path` field should change based on the browser path.

## Break and fix Node app

```bash
sudo systemctl stop phase-11-node-app
sudo systemctl status phase-11-node-app
sudo systemctl start phase-11-node-app
sudo systemctl status phase-11-node-app
```

When Node is stopped, Nginx can still receive browser traffic, but it cannot reach the backend app. This usually causes `502 Bad Gateway`.

## Break and fix Nginx

```bash
sudo systemctl stop nginx
sudo systemctl status nginx
curl http://127.0.0.1:3000
sudo systemctl start nginx
sudo systemctl status nginx
```

When Nginx is stopped, the browser cannot reach the public web entry point, even if the Node app is still running privately.

## View logs

```bash
sudo journalctl -u phase-11-node-app --no-pager -n 30
sudo tail -n 30 /var/log/nginx/error.log
sudo tail -n 30 /var/log/nginx/access.log
```

## Reboot test

```bash
sudo reboot
```

Reconnect after about one minute:

```bash
ssh -i ~/.ssh/kp.pem ec2-user@16.112.128.222
sudo systemctl status nginx
sudo systemctl status phase-11-node-app
curl http://127.0.0.1:3000
```

Both services should restart automatically because they were enabled with `systemctl enable`.

## Optional user-data automation

After the manual setup is understood, the file below can be used as EC2 user data for a repeat launch:

```text
user-data/phase-11-node-nginx-user-data.sh
```

User data runs during first boot as root, installs packages, writes the app file, creates the systemd service, creates the Nginx reverse proxy config, and starts both services.
