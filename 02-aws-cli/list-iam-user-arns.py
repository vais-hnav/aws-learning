#!/usr/bin/env python3
"""List IAM user ARNs for the current AWS profile.

Examples:
  AWS_PROFILE=user1 python3 list-iam-user-arns.py
  python3 list-iam-user-arns.py --profile user1
"""

from __future__ import annotations

import argparse
import os
import sys

import boto3
from botocore.exceptions import BotoCoreError, ClientError, ProfileNotFound


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="List IAM user ARNs.")
    parser.add_argument(
        "--profile",
        help="AWS CLI profile name to use. If omitted, uses AWS_PROFILE or the default profile.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    profile_name = args.profile or os.environ.get("AWS_PROFILE")

    try:
        session = boto3.Session(profile_name=profile_name) if profile_name else boto3.Session()
        iam = session.client("iam")
        paginator = iam.get_paginator("list_users")

        for page in paginator.paginate():
            for user in page["Users"]:
                print(user["Arn"])
    except ProfileNotFound as exc:
        print(f"Profile not found: {exc}", file=sys.stderr)
        return 1
    except (ClientError, BotoCoreError) as exc:
        print(f"AWS error: {exc}", file=sys.stderr)
        return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
