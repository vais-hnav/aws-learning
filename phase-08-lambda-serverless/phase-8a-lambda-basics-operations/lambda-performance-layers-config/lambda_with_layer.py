import json
import logging
import os

from aws_learning_utils import build_message

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def lambda_handler(event, context):
    app_stage = os.getenv("APP_STAGE", "dev")
    app_message = os.getenv("APP_MESSAGE", "hello-from-layer-lambda")

    source = event.get("source", "manual-test")
    message = event.get("message", app_message)

    logger.info("Running layer demo in stage: %s", app_stage)

    return {
        "statusCode": 200,
        "body": json.dumps(
            {
                "stage": app_stage,
                "result": build_message(source, message),
            }
        ),
    }
