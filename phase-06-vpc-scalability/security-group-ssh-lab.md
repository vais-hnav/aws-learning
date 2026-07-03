# Security Group SSH Lab

This lab documents the hands-on experiment with custom inbound SSH rules.

## Goal

Control SSH access to an EC2 instance by allowing only my laptop public IP.

## Key Concept

Security groups do not have explicit deny rules.

```text
Allowed = traffic matches an allow rule.
Denied = traffic does not match any allow rule.
```

If I want to "deny" my laptop IP, I remove the allow rule for that IP or change the source to a different IP/CIDR.

## Variables

```bash
export AWS_REGION=ap-south-1
export INSTANCE_ID=i-xxxxxxxxxxxxxxxxx
export SECURITY_GROUP_ID=sg-xxxxxxxxxxxxxxxxx
export KEY_PATH=/path/to/key.pem
export EC2_USER=ec2-user
export PUBLIC_DNS=ec2-x-x-x-x.ap-south-1.compute.amazonaws.com
```

## Find My Laptop Public IP

```bash
curl -s https://checkip.amazonaws.com
```

Save it as CIDR:

```bash
export MY_IP="$(curl -s https://checkip.amazonaws.com | tr -d '\n')/32"
```

Example:

```text
203.0.113.10/32
```

`/32` means exactly one public IPv4 address.

## Allow SSH From My Laptop

```bash
aws ec2 authorize-security-group-ingress \
  --region "$AWS_REGION" \
  --group-id "$SECURITY_GROUP_ID" \
  --ip-permissions "IpProtocol=tcp,FromPort=22,ToPort=22,IpRanges=[{CidrIp=$MY_IP,Description='SSH from my laptop'}]"
```

## Test SSH

```bash
ssh -i "$KEY_PATH" "$EC2_USER@$PUBLIC_DNS"
```

Expected result:

```text
SSH connects successfully when my IP is allowed.
```

## Remove The SSH Allow Rule

```bash
aws ec2 revoke-security-group-ingress \
  --region "$AWS_REGION" \
  --group-id "$SECURITY_GROUP_ID" \
  --protocol tcp \
  --port 22 \
  --cidr "$MY_IP"
```

## Test SSH Again

```bash
ssh -i "$KEY_PATH" "$EC2_USER@$PUBLIC_DNS"
```

Expected result:

```text
SSH fails or times out because there is no matching allow rule.
```

## Inspect Current Inbound Rules

```bash
aws ec2 describe-security-groups \
  --region "$AWS_REGION" \
  --group-ids "$SECURITY_GROUP_ID" \
  --query "SecurityGroups[0].IpPermissions" \
  --output json
```

## Console Version

1. Open EC2.
2. Open Security Groups.
3. Select the security group attached to the EC2 instance.
4. Edit inbound rules.
5. Add SSH on port `22`.
6. Set source to `My IP` or custom `MY_PUBLIC_IP/32`.
7. Save rules.
8. SSH into the instance.
9. Edit inbound rules again.
10. Remove the SSH rule or change the source to another IP.
11. Try SSH again and confirm it fails.

## Safety Rules

- Do not leave SSH open to `0.0.0.0/0`.
- Use `MY_PUBLIC_IP/32` for SSH practice.
- Remove temporary SSH rules after the lab.
- Stop or terminate the EC2 instance if it was only used for this lab.

## Cleanup

Remove temporary SSH access:

```bash
aws ec2 revoke-security-group-ingress \
  --region "$AWS_REGION" \
  --group-id "$SECURITY_GROUP_ID" \
  --protocol tcp \
  --port 22 \
  --cidr "$MY_IP"
```

If the EC2 instance was only for this lab:

```bash
aws ec2 terminate-instances \
  --region "$AWS_REGION" \
  --instance-ids "$INSTANCE_ID"
```
