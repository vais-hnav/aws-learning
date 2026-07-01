#!/usr/bin/env bash
set -euo pipefail

: "${AWS_PROFILE:=user1}"
: "${AWS_REGION:=us-east-1}"
: "${ACTION:=stop}"
: "${CONFIRM_TERMINATE:=no}"

if [[ -z "${INSTANCE_ID:-}" ]]; then
  echo "Missing INSTANCE_ID. Example: ACTION=stop INSTANCE_ID=i-xxxxxxxxxxxxxxxxx ./cleanup-ec2.sh"
  exit 1
fi

case "$ACTION" in
  stop)
    aws ec2 stop-instances \
      --profile "$AWS_PROFILE" \
      --region "$AWS_REGION" \
      --instance-ids "$INSTANCE_ID" \
      --output table
    ;;
  start)
    aws ec2 start-instances \
      --profile "$AWS_PROFILE" \
      --region "$AWS_REGION" \
      --instance-ids "$INSTANCE_ID" \
      --output table
    ;;
  terminate)
    if [[ "$CONFIRM_TERMINATE" != "yes" ]]; then
      echo "Terminate was requested, but CONFIRM_TERMINATE is not yes."
      echo "Rerun with ACTION=terminate CONFIRM_TERMINATE=yes after you are sure."
      exit 1
    fi

    aws ec2 terminate-instances \
      --profile "$AWS_PROFILE" \
      --region "$AWS_REGION" \
      --instance-ids "$INSTANCE_ID" \
      --output table
    ;;
  *)
    echo "Unknown ACTION: $ACTION"
    echo "Use ACTION=stop, ACTION=start, or ACTION=terminate."
    exit 1
    ;;
esac
