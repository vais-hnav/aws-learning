# Troubleshooting

## `DryRunOperation`

Meaning:
- Good sign. AWS understood the request and you likely have permission.

Next step:
- Recheck cost safety, then rerun with `CONFIRM_LAUNCH=yes` only if you truly want to create the instance.

## `UnauthorizedOperation`

Meaning:
- The selected profile does not have permission for the EC2 action.

Check:
- Correct `AWS_PROFILE`
- IAM policy permissions
- Region

## `InvalidAMIID.NotFound`

Meaning:
- The AMI ID does not exist in the selected Region.

Fix:
- Find the AMI again in the same Region.

## `InvalidKeyPair.NotFound`

Meaning:
- The key-pair name does not exist in the selected Region.

Fix:
- Check the EC2 key-pair name in the console.
- Remember: key pairs are regional.

## Instance Does Not Appear In Console

Likely cause:
- Console is open in a different Region.

Fix:
- Match the console Region to the CLI `--region`.

## Instance Is Still Charged

Likely cause:
- Instance is running, or storage/IP resources remain.

Fix:
- Terminate the instance after practice.
- Check EBS volumes and Elastic IPs.
