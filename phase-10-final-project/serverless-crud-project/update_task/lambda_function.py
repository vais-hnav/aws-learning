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

    # The partition key identifies the item and must not be changed by PATCH.
    body.pop("id", None)

    if not body:
        return response(400, {"message": "No attributes provided for update"})

    update_parts = []
    attribute_names = {}
    attribute_values = {}

    for index, (attribute, value) in enumerate(body.items()):
        name_placeholder = f"#field{index}"
        value_placeholder = f":value{index}"

        update_parts.append(f"{name_placeholder} = {value_placeholder}")
        attribute_names[name_placeholder] = attribute
        attribute_values[value_placeholder] = value

    try:
        result = table.update_item(
            Key={"id": task_id},
            UpdateExpression="SET " + ", ".join(update_parts),
            ExpressionAttributeNames=attribute_names,
            ExpressionAttributeValues=attribute_values,
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
            "message": "Task updated successfully",
            "item": result["Attributes"],
        },
    )
