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
    try:
        item = json.loads(event.get("body") or "{}")
    except json.JSONDecodeError:
        return response(400, {"message": "Request body must be valid JSON"})

    if not isinstance(item, dict):
        return response(400, {"message": "Request body must be a JSON object"})

    if not item.get("id"):
        return response(400, {"message": "The id attribute is required"})

    try:
        # The complete request body becomes the item, including any extra fields.
        table.put_item(
            Item=item,
            ConditionExpression="attribute_not_exists(id)",
        )
    except ClientError as error:
        if error.response["Error"]["Code"] == "ConditionalCheckFailedException":
            return response(409, {"message": "A task with this id already exists"})
        raise

    return response(
        201,
        {
            "message": "Task created successfully",
            "item": item,
        },
    )
