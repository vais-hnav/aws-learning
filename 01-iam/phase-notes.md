# Phase 2 Notes

This phase covered IAM users, groups, policies, roles, access keys, and least privilege.

Note source:
- Based on playlist video order/titles, available auto-generated Malayalam transcript context from YouTube, and IAM lab work in this repo.
- Paraphrased explanatory notes, not verbatim transcripts.

## 8. Introduction to IAM

Concept:
- IAM means Identity and Access Management.
- It controls who can access AWS and what actions they can perform.
- IAM answers two questions: who is calling, and are they allowed?
- IAM is global, so users/groups/policies are not tied to a single region.

Video hands-on:
- Introduces IAM after account setup.
- Shows IAM as the place for managing users, groups, roles, and permissions.
- Explains why root should not be used for regular AWS work.

My hands-on:
- Created the IAM phase folder.
- Documented least privilege as the rule for all future labs.

Commands / files:
- `01-iam/README.md`
- `01-iam/explanation.md`

Warnings / cleanup:
- No billable AWS resource cleanup needed.
- Do not use root as the daily working identity.

## 9. Creating IAM Policies

Concept:
- A policy is a JSON permission document.
- Main fields: `Version`, `Statement`, `Effect`, `Action`, `Resource`, and optional `Sid`.
- Policies can allow or deny API actions on specific resources.
- Least privilege means granting only what the task needs.

Video hands-on:
- Opens IAM policies.
- Creates or explains a policy document.
- Shows how actions and resources define what access is granted.

My hands-on:
- Added `s3-read-only-policy.json`.
- Added `ec2-describe-only-policy.json`.
- Practiced bucket-level versus object-level S3 ARNs.

Commands / files:
- `01-iam/policies/s3-read-only-policy.json`
- `01-iam/policies/ec2-describe-only-policy.json`

Warnings / cleanup:
- Avoid broad `Action: "*"` and `Resource: "*"` patterns.
- Remove test policies when no longer needed.

## 10. Creating IAM User

Concept:
- IAM users are long-term identities for people or programmatic access.
- Console access uses a password.
- CLI/API access uses access keys.
- Access keys are sensitive and must be treated like passwords.

Video hands-on:
- Creates an IAM user.
- Shows console/programmatic access choices.
- Explains attaching permissions directly or through groups.

My hands-on:
- Used IAM users with named AWS CLI profiles.
- Kept credentials in `~/.aws`, not inside the repo.

Commands / files:
- `aws configure --profile user1`
- `AWS_PROFILE=user1 aws sts get-caller-identity`

Warnings / cleanup:
- Never commit access keys.
- Delete unused access keys.
- Prefer group/role-based permission management where possible.

## 11. Creating IAM Groups

Concept:
- A group is a collection of IAM users.
- Policies attached to a group apply to all users in that group.
- Groups simplify permission management for teams.

Video hands-on:
- Creates or demonstrates IAM groups.
- Adds users to groups.
- Attaches policies to groups instead of repeating the same policy per user.

My hands-on:
- Documented user/group/policy differences.
- Used this model to reason about safer access management.

Commands / files:
- Console IAM group workflow.
- `01-iam/explanation.md`

Warnings / cleanup:
- Do not leave users in powerful groups unnecessarily.
- Removing a user from a group removes that group's permissions.

## 14. IAM Roles

Concept:
- A role is an identity that is assumed temporarily.
- Roles are commonly used by AWS services such as EC2 or Lambda.
- A role has a trust policy and a permissions policy.
- Temporary credentials are safer than long-term access keys for services.

Video hands-on:
- Introduces roles after users/groups/policies.
- Explains service access without storing access keys on servers.
- Prepares for later EC2 instance profile work.

My hands-on:
- Added role explanation notes.
- Connected IAM roles to the future EC2 instance profile S3 lab.

Commands / files:
- Console IAM role workflow.
- `01-iam/explanation.md`

Warnings / cleanup:
- A role needs both trust and permissions to work.
- Do not put IAM user access keys on EC2 when a role can be used.

## Phase 2 Recap

Built:
- S3 read-only policy.
- EC2 describe-only policy.
- IAM explanation notes.
- IAM JSON examples.
- Common IAM mistakes notes.
- Cleanup checklist.

Must remember:
- Root user vs IAM user.
- User vs role.
- Group vs policy.
- Trust policy vs permissions policy.
- Access keys are risky.
- Least privilege is the default.
