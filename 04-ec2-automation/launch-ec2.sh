#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

: "${AWS_PROFILE:=user1}"
: "${AWS_REGION:=us-east-1}"
: "${INSTANCE_TYPE:=t2.micro}"
: "${INSTANCE_COUNT:=1}"
: "${INSTANCE_NAME:=aws-learning-cli-ec2}"
: "${CONFIRM_LAUNCH:=no}"
: "${USE_USER_DATA:=no}"

if [[ -z "${AMI_ID:-}" ]]; then
  echo "Missing AMI_ID. Example: AMI_ID=ami-xxxxxxxxxxxxxxxxx ./launch-ec2.sh"
  exit 1
fi

if [[ -z "${KEY_NAME:-}" ]]; then
  echo "Missing KEY_NAME. Example: KEY_NAME=my-key-pair ./launch-ec2.sh"
  exit 1
fi

cmd=(
  aws ec2 run-instances
  --profile "$AWS_PROFILE"
  --region "$AWS_REGION"
  --image-id "$AMI_ID"
  --instance-type "$INSTANCE_TYPE"
  --count "$INSTANCE_COUNT"
  --key-name "$KEY_NAME"
  --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=$INSTANCE_NAME},{Key=Project,Value=aws-learning}]"
)

if [[ -n "${SECURITY_GROUP_ID:-}" ]]; then
  cmd+=(--security-group-ids "$SECURITY_GROUP_ID")
fi

if [[ -n "${SUBNET_ID:-}" ]]; then
  cmd+=(--subnet-id "$SUBNET_ID")
fi

if [[ "$USE_USER_DATA" == "yes" ]]; then
  cmd+=(--user-data "file://${SCRIPT_DIR}/user-data.sh")
fi

echo "Profile: $AWS_PROFILE"
echo "Region: $AWS_REGION"
echo "AMI ID: $AMI_ID"
echo "Instance type: $INSTANCE_TYPE"
echo "Instance count: $INSTANCE_COUNT"
echo "Key pair: $KEY_NAME"
echo "Instance name tag: $INSTANCE_NAME"

if [[ "$CONFIRM_LAUNCH" != "yes" ]]; then
  echo
  echo "Safety mode: this will not launch an instance."
  echo "Running AWS dry-run to check permissions and parameters."
  "${cmd[@]}" --dry-run || true
  echo
  echo "To launch for real, rerun with CONFIRM_LAUNCH=yes."
  exit 0
fi

"${cmd[@]}" \
  --query 'Instances[0].{InstanceId:InstanceId,State:State.Name,InstanceType:InstanceType,AvailabilityZone:Placement.AvailabilityZone,PrivateIp:PrivateIpAddress,PublicIp:PublicIpAddress}' \
  --output table
