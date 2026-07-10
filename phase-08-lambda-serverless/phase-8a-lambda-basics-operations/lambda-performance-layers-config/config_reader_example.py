import json
import logging
import os

import boto3

logger = logging.getLogger()
logger.setLevel(logging.INFO)

secrets_client = boto3.client("secretsmanager")


def lambda_handler(event, context):
    app_stage = os.getenv("APP_STAGE", "dev")
    secret_id = os.getenv("APP_SECRET_ID")

    response = {
        "stage": app_stage,
        "hasSecretConfigured": bool(secret_id),
    }

    if secret_id:
        secret_value = secrets_client.get_secret_value(SecretId=secret_id)
        response["secretLoaded"] = "SecretString" in secret_value
        logger.info("Loaded configured secret without printing its value.")
    else:
        logger.info("No secret configured. Set APP_SECRET_ID when practicing secrets.")

    return {
        "statusCode": 200,
        "body": json.dumps(response),
    }
