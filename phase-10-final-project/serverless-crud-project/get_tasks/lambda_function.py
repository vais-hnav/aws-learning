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
    items = []
    scan_arguments = {}

    # A scan returns at most 1 MB, so continue while DynamoDB has another page.
    while True:
        scan_response = table.scan(**scan_arguments)
        items.extend(scan_response.get("Items", []))

        last_key = scan_response.get("LastEvaluatedKey")
        if not last_key:
            break

        scan_arguments["ExclusiveStartKey"] = last_key

    return response(
        200,
        {
            "message": "Tasks retrieved successfully",
            "count": len(items),
            "items": items,
        },
    )
