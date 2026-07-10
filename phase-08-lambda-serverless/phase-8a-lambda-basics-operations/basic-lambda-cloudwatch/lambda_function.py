import json
import logging
import os
import time

logger = logging.getLogger()
logger.setLevel(logging.INFO)

INIT_TIME = time.time()


def lambda_handler(event, context):
    app_stage = os.getenv("APP_STAGE", "dev")
    app_message = os.getenv("APP_MESSAGE", "hello-from-lambda")

    logger.info("Received event: %s", json.dumps(event))
    logger.info("Function name: %s", context.function_name)
    logger.info("Configured memory: %s MB", context.memory_limit_in_mb)

    return {
        "statusCode": 200,
        "body": json.dumps(
            {
                "message": app_message,
                "stage": app_stage,
                "eventSource": event.get("source", "manual-test"),
                "initializedAt": INIT_TIME,
            }
        ),
    }
