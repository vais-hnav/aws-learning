import json

import boto3

from config import TABLE_NAME


dynamodb = boto3.resource("dynamodb", region_name="ap-south-2")
table = dynamodb.Table(TABLE_NAME)


def response(status_code, payload):
    return {
        "statusCode": status_code,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(payload, indent=2, default=str),
    }


def lambda_handler(event, context):
    task_id = (event.get("pathParameters") or {}).get("id")
    if not task_id:
        return response(400, {"message": "Task id is required"})

    result = table.get_item(Key={"id": task_id})
    item = result.get("Item")

    if item is None:
        return response(404, {"message": "Task not found"})

    return response(
        200,
        {
            "message": "Task retrieved successfully",
            "item": item,
        },
    )
