# Inspect Default VPC

Use this as a read-only default VPC inspection lab.

Set a region:

```bash
export AWS_REGION=ap-south-2
```

## Confirm Identity

```bash
aws sts get-caller-identity
```

## List VPCs

```bash
aws ec2 describe-vpcs \
  --region "$AWS_REGION" \
  --query "Vpcs[].{VpcId:VpcId,CidrBlock:CidrBlock,IsDefault:IsDefault,State:State}" \
  --output table
```

## Find The Default VPC

```bash
aws ec2 describe-vpcs \
  --region "$AWS_REGION" \
  --filters "Name=is-default,Values=true" \
  --query "Vpcs[0].VpcId" \
  --output text
```

Save it:

```bash
export VPC_ID=vpc-xxxxxxxxxxxxxxxxx
```

## List Subnets In The VPC

```bash
aws ec2 describe-subnets \
  --region "$AWS_REGION" \
  --filters "Name=vpc-id,Values=$VPC_ID" \
  --query "Subnets[].{SubnetId:SubnetId,AZ:AvailabilityZone,CidrBlock:CidrBlock,PublicIpOnLaunch:MapPublicIpOnLaunch}" \
  --output table
```

## List Route Tables

```bash
aws ec2 describe-route-tables \
  --region "$AWS_REGION" \
  --filters "Name=vpc-id,Values=$VPC_ID" \
  --query "RouteTables[].{RouteTableId:RouteTableId,Routes:Routes[].DestinationCidrBlock}" \
  --output table
```

## List Internet Gateways

```bash
aws ec2 describe-internet-gateways \
  --region "$AWS_REGION" \
  --filters "Name=attachment.vpc-id,Values=$VPC_ID" \
  --query "InternetGateways[].{InternetGatewayId:InternetGatewayId,State:Attachments[0].State}" \
  --output table
```

## List Security Groups

```bash
aws ec2 describe-security-groups \
  --region "$AWS_REGION" \
  --filters "Name=vpc-id,Values=$VPC_ID" \
  --query "SecurityGroups[].{GroupId:GroupId,GroupName:GroupName,Description:Description}" \
  --output table
```

## Safety

Do not delete:
- Default VPC
- Default subnets
- Default route table
- Internet gateway

This phase is mainly about inspection and security group rule practice.
