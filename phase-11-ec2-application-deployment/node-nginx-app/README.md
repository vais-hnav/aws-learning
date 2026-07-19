# Node + Nginx App

This is the small app used in Phase 11.

It intentionally listens on `127.0.0.1:3000`, which means it is reachable only from inside the EC2 instance. Public browser traffic should come through Nginx on port `80`.

## Run Manually

```bash
node server.js
```

Test from the EC2 instance:

```bash
curl http://127.0.0.1:3000
```

Expected response:

```json
{
  "message": "Hello from Phase 11 EC2 Node app",
  "path": "/",
  "serverTime": "2026-07-19T00:00:00.000Z"
}
```
