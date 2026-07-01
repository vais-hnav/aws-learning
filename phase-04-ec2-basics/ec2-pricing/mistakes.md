# Mistakes

## Thinking Free Tier Means Everything Is Free

Free Tier has limits and eligibility rules. Always check the console and official pricing pages before relying on it.

## Stopping Instead Of Cleaning Up

Stopping an instance may stop compute charges, but storage can remain.

Better:
- terminate completed practice instances
- check EBS volumes after termination

## Ignoring Region

Prices and AMI IDs are Region-specific. A lab in one Region may not match another Region exactly.

## Forgetting Related Services

EC2-related cost can come from:
- EBS volumes
- snapshots
- Elastic IPs
- data transfer
- NAT Gateways
- Load Balancers

## Waiting Only For Budget Alerts

Budget alerts can be delayed. Check resources directly after every lab.
