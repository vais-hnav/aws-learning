#!/bin/bash
set -euo pipefail

dnf update -y
dnf install -y nginx nodejs22 nodejs22-npm

mkdir -p /home/ec2-user/phase-11-node-app

cat > /home/ec2-user/phase-11-node-app/server.js <<'APP'
const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  const response = {
    message: "Hello from Phase 11 EC2 Node app",
    path: req.url,
    serverTime: new Date().toISOString(),
  };

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(response, null, 2));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
APP

chown -R ec2-user:ec2-user /home/ec2-user/phase-11-node-app

cat > /etc/systemd/system/phase-11-node-app.service <<'SERVICE'
[Unit]
Description=Phase 11 Node App
After=network.target

[Service]
Type=simple
User=ec2-user
WorkingDirectory=/home/ec2-user/phase-11-node-app
ExecStart=/usr/bin/node /home/ec2-user/phase-11-node-app/server.js
Restart=on-failure
RestartSec=5
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
SERVICE

cat > /etc/nginx/conf.d/phase-11-node-app.conf <<'NGINX'
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGINX

systemctl daemon-reload
systemctl enable --now phase-11-node-app
systemctl enable --now nginx
nginx -t
systemctl reload nginx
