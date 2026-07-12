# API Test Commands

Set the deployed API stage URL once:

```bash
export URL="https://YOUR_API_ID.execute-api.ap-south-2.amazonaws.com/dev"
```

Create a task:

```bash
curl -X POST "$URL/tasks" \
  -H "Content-Type: application/json" \
  -d '{"id":"1","title":"Learn AWS","status":"IN_PROGRESS"}'
```

Get all tasks:

```bash
curl "$URL/tasks"
```

Get one task:

```bash
curl "$URL/tasks/1"
```

Update the status and timestamp with PUT:

```bash
curl -X PUT "$URL/tasks/1" \
  -H "Content-Type: application/json" \
  -d '{"status":"DONE","updatedAt":"2026-07-12"}'
```

Update only selected fields or add new attributes with PATCH:

```bash
curl -X PATCH "$URL/tasks/1" \
  -H "Content-Type: application/json" \
  -d '{"priority":"HIGH"}'
```

Delete a task:

```bash
curl -X DELETE "$URL/tasks/1"
```
