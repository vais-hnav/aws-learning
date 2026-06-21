#!/usr/bin/env bash
set -euo pipefail

echo "AWS CLI version:"
aws --version
echo
echo "Current AWS identity:"
aws sts get-caller-identity
echo
echo "Default region:"
aws configure get region
echo
echo "S3 buckets:"
aws s3 ls
echo
echo "EC2 instances:"
aws ec2 describe-instances --query 'Reservations[].Instances[].{InstanceId:InstanceId,State:State.Name,Type:InstanceType}' --output table

