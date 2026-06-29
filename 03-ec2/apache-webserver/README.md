# Apache Web Server on EC2

Video:
- 17. Host a simple website in Linux EC2 instance

## What Did I Build?

A simple public website hosted on a Linux EC2 instance using Apache HTTP Server.

The lab uses the Linux EC2 instance from video 16, installs Apache, places an `index.html` file in Apache's web root, and tests access from a browser using the instance public IP or public DNS.

## Which AWS Service Did I Use?

- Amazon EC2
- Security Groups
- Amazon Linux
- Apache HTTP Server inside the EC2 instance

## What Did I Learn?

- A web server listens for HTTP requests and serves website files.
- Apache on Amazon Linux serves files from `/var/www/html` by default.
- `httpd` is the Apache package/service name on Amazon Linux.
- The EC2 security group must allow HTTP traffic for browser access.
- `scp` can copy a local website file to the EC2 instance using the same `.pem` key used for SSH.
- A public IPv4 address or public DNS name can be used to test the website.

## How Do I Run It?

Use [`workflow.md`](./workflow.md) and [`commands.md`](./commands.md).

Short version:

```bash
ssh -i KEY_PATH ec2-user@PUBLIC_IPV4
sudo yum install -y httpd
sudo chown -R ec2-user:ec2-user /var/www/html
sudo service httpd start
exit
scp -i KEY_PATH sample-index.html ec2-user@PUBLIC_IPV4:/var/www/html/index.html
```

Then open:

```text
http://PUBLIC_IPV4
```

## How Do I Delete It?

Use [`cleanup.md`](./cleanup.md).

For beginner practice, terminate the EC2 instance after testing the website.
