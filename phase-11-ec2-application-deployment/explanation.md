# Explanation

## Why Nginx is used

The Node app listens on `127.0.0.1:3000`, which keeps it private inside the EC2 instance.

Nginx listens on public port `80`. When a browser request reaches the instance, Nginx forwards that request to the Node app internally.

This is a common production pattern because Nginx is good at handling public web traffic, headers, and future HTTPS setup.

## Why port 3000 is not opened

The security group allows HTTP on port `80`, but not port `3000`.

That means users cannot directly reach the Node process. They must go through Nginx.

## Why systemd is used

Running `node server.js` manually is useful for testing, but the app stops when the terminal closes.

`systemd` runs the app as a managed Linux service. It can start the app in the background, restart it after failure, and start it again after a reboot.

`systemctl` is the command used to control services managed by `systemd`.

Common examples:

```bash
sudo systemctl start phase-11-node-app
sudo systemctl stop phase-11-node-app
sudo systemctl restart phase-11-node-app
sudo systemctl status phase-11-node-app
sudo systemctl enable phase-11-node-app
```

`start` runs the service now.

`stop` stops it now.

`restart` stops and starts it again.

`status` shows whether it is running.

`enable` makes it start automatically after reboot.

## Important service file fields

`User=ec2-user` means the app runs as the normal EC2 user.

`WorkingDirectory=/home/ec2-user/phase-11-node-app` tells Linux where the app folder is.

`ExecStart=/usr/bin/node /home/ec2-user/phase-11-node-app/server.js` is the command used to start the app.

`Restart=on-failure` restarts the app if it crashes.

`WantedBy=multi-user.target` allows the service to start during normal server boot.

## What the failure tests proved

Stopping the Node app caused Nginx to receive the browser request but fail to contact the backend. This proves Nginx and Node are separate layers.

Stopping Nginx caused the browser page to fail while `curl http://127.0.0.1:3000` still worked from inside EC2. This proves the Node app was private and Nginx was the public entry point.

The reboot test proved that `systemctl enable nginx` and `systemctl enable phase-11-node-app` made both services start automatically after server restart.

## Security group lesson

SSH on port `22` was restricted to the laptop public IP with `/32`.

HTTP on port `80` was open publicly because this was the browser entry point.

Port `3000` was not opened because the Node app should only be reachable inside the instance.
