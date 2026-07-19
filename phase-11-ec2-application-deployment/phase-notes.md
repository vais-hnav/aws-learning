# Phase Notes

## Main idea

This phase moved from simply launching EC2 to operating a small application on EC2.

The important shift was understanding that a cloud server is not just an instance. It also needs network rules, operating system packages, a process manager, logs, and cleanup checks.

## Request flow

```text
Browser
-> EC2 public IP on port 80
-> Nginx
-> 127.0.0.1:3000
-> Node app
```

Nginx receives the public request.

The Node app stays private inside the instance.

This is safer than opening the application port directly to the internet.

## What was built

A small Node.js HTTP server returned JSON with:

- a message
- the request path
- the current server time

The path test showed that Nginx forwarded browser paths correctly to the app.

## Important Linux concepts

`systemd` is the Linux service manager.

`systemctl` is the command used to control services managed by `systemd`.

The app was first run manually with `node server.js`, then converted into a background service so it could survive SSH disconnects and reboot.

## Debugging lessons

When the Node app was stopped, Nginx could still receive traffic but could not reach the backend.

When Nginx was stopped, the browser could not reach the app, even though the app still worked internally with `curl`.

This made the responsibility of each layer clear:

- Nginx is the public entry point
- Node is the private application process
- systemd keeps services running
- Security Groups decide what traffic reaches the instance

## Cleanup result

The lab was cleaned up after completion.

The checks for unattached EBS volumes and Elastic IPs returned empty output, so no obvious paid leftovers were found.
