# Commands

Replace placeholders before running commands:

- `KEY_PATH` with your local `.pem` file path
- `PUBLIC_IPV4` with the EC2 public IPv4 address

## Connect To The Instance

```bash
chmod 400 KEY_PATH
ssh -i KEY_PATH ec2-user@PUBLIC_IPV4
```

## Install Apache

Video command:

```bash
sudo yum install httpd
```

Recommended non-interactive version:

```bash
sudo yum install -y httpd
```

## Give `ec2-user` Access To The Web Root

```bash
sudo chown -R ec2-user:ec2-user /var/www/html
```

## Start Apache

Video command:

```bash
sudo service httpd start
```

Modern systemd equivalent:

```bash
sudo systemctl start httpd
```

Optional check:

```bash
sudo systemctl status httpd
```

Exit SSH:

```bash
exit
```

## Upload The Website File

From your local machine:

```bash
scp -i KEY_PATH sample-index.html ec2-user@PUBLIC_IPV4:/var/www/html/index.html
```

## Test In Browser

Open:

```text
http://PUBLIC_IPV4
```

If it does not load, check:

- EC2 instance state is `running`
- Security group allows inbound HTTP on port `80`
- Apache service is running
- `index.html` exists in `/var/www/html`
