# Common Mistakes

- Trying to open the website before allowing HTTP in the security group.
- Uploading the file with a name other than `index.html`.
- Uploading the file to the wrong folder.
- Forgetting that Apache uses `/var/www/html` as the default web root.
- Forgetting to start the `httpd` service.
- Running `scp` from inside the EC2 SSH session instead of from the local machine.
- Using private IPv4 instead of public IPv4 from your laptop.
- Leaving the EC2 instance running after testing.
