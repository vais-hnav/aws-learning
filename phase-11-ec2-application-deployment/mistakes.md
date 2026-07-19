# Mistakes And Fixes

## Nginx page opens, but app does not

Possible cause: the Node app is not running.

Check:

```bash
sudo systemctl status phase-11-node-app
curl http://127.0.0.1:3000
```

## SSH does not work

Possible causes:

- Laptop public IP changed
- Security group SSH rule does not use the current `/32` IP
- Wrong key pair path
- Key file permission is too open

Fix key permission:

```bash
chmod 400 ~/.ssh/kp.pem
```

## Browser cannot open the EC2 public IP

Possible causes:

- Nginx is stopped
- Security group does not allow HTTP port `80`
- Instance has no public IP

Check:

```bash
sudo systemctl status nginx
```
