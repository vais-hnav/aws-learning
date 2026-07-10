import json
import logging
from urllib.parse import unquote_plus

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def lambda_handler(event, context):
    processed_objects = []

    for record in event.get("Records", []):
        bucket = record["s3"]["bucket"]["name"]
        key = unquote_plus(record["s3"]["object"]["key"])
        event_name = record.get("eventName", "unknown")

        logger.info(
            "Received %s for s3://%s/%s",
            event_name,
            bucket,
            key,
        )
        processed_objects.append(
            {"bucket": bucket, "key": key, "eventName": event_name}
        )

    return {
        "statusCode": 200,
        "body": json.dumps({"processed": processed_objects}),
    }
