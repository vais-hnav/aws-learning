import json

import boto3
from botocore.exceptions import ClientError

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

    try:
        body = json.loads(event.get("body") or "{}")
    except json.JSONDecodeError:
        return response(400, {"message": "Request body must be valid JSON"})

    if not isinstance(body, dict):
        return response(400, {"message": "Request body must be a JSON object"})

    missing_fields = [
        field for field in ("status", "updatedAt") if field not in body
    ]
    if missing_fields:
        return response(
            400,
            {
                "message": "PUT requires status and updatedAt",
                "missingFields": missing_fields,
            },
        )

    try:
        result = table.update_item(
            Key={"id": task_id},
            UpdateExpression="SET #status = :status, updatedAt = :updatedAt",
            ExpressionAttributeNames={"#status": "status"},
            ExpressionAttributeValues={
                ":status": body["status"],
                ":updatedAt": body["updatedAt"],
            },
            ConditionExpression="attribute_exists(id)",
            ReturnValues="ALL_NEW",
        )
    except ClientError as error:
        if error.response["Error"]["Code"] == "ConditionalCheckFailedException":
            return response(404, {"message": "Task not found"})
        raise

    return response(
        200,
        {
            "message": "Task updated successfully using PUT",
            "item": result["Attributes"],
        },
    )
