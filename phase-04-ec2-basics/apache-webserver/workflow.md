# Workflow

## Video Flow

1. Start from the running Linux EC2 instance created in video 16.
2. SSH into the instance.
3. Install Apache HTTP Server.
4. Change ownership of `/var/www/html` so `ec2-user` can upload website files.
5. Start the Apache service.
6. Exit the SSH session.
7. Create a simple local `index.html` file.
8. Use `scp` to upload the file to `/var/www/html`.
9. Open the public IPv4 address or public DNS name in a browser.
10. Confirm the website loads over HTTP.

## Description Notes

The video description includes the main reference commands:

- SSH into the Linux instance.
- Install Apache with `sudo yum install httpd`.
- Change `/var/www/html` ownership.
- Start Apache with `sudo service httpd start`.
- Upload `index.html` using `scp`.

## My Hands-On Flow

The repo version keeps the same flow, with small safety improvements:

- Use `chmod 400` for the key on macOS/Linux.
- Use `sudo yum install -y httpd` to avoid an interactive install prompt.
- Keep the sample HTML file in the repo, but never keep the `.pem` key in the repo.
- Terminate the instance after the website test.
