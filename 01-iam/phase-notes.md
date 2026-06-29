# Phase 2 Notes

This phase covered AWS IAM: users, groups, policies, roles, access keys, and least privilege.

Note source:
- These notes are based on the completed playlist video order/titles, the auto-generated Malayalam transcript context available from YouTube, and the IAM lab work in this repo.
- They are paraphrased explanatory notes, not verbatim transcripts.

## 8. Introduction to IAM

Video focus:
- IAM means Identity and Access Management.
- It controls who can access AWS and what actions they can perform.

What the instructor is explaining:
- The AWS root user should not be used for daily work.
- IAM lets you create separate identities for people, applications, and AWS services.
- Permissions are attached through policies.
- IAM is a global service, so users and policies are not tied to only one region.

Important IAM concepts:
- Identity: who is making the request.
- Permission: what that identity is allowed to do.
- Policy: the JSON document that defines permissions.
- Authentication: proving who you are.
- Authorization: deciding what you can do after you are authenticated.

Mental model:
- IAM is the security gate for AWS.
- Every AWS action asks two questions: who is calling, and are they allowed?

Hands-on connection:
- We created the IAM phase folder to separate identity learning from resource labs.
- We kept the least-privilege idea as the rule for every future AWS action.

## 9. Creating IAM Policies

Video focus:
- The video explains how IAM policies are created and how a JSON policy grants permissions.

What the instructor is explaining:
- A policy is a permission document.
- AWS reads the policy to decide whether a request should be allowed or denied.
- Policies can be AWS managed, customer managed, or inline.

Policy fields to understand:
- `Version`: policy language version. Most modern policies use `2012-10-17`.
- `Statement`: one or more permission rules.
- `Effect`: `Allow` or `Deny`.
- `Action`: the AWS API operation, such as `s3:GetObject`.
- `Resource`: the ARN of the resource the action applies to.
- `Sid`: optional label to describe the statement.

Important lesson:
- Broad permissions are easy but risky.
- A beginner should avoid `Action: "*"` and `Resource: "*"` unless there is a very specific reason.
- Least privilege means granting only the actions and resources needed for the task.

Mental model:
- A policy is a rule card.
- It says: this identity can perform these actions on these resources.

Hands-on connection:
- We created read-only policy examples for S3 and EC2.
- The S3 policy demonstrates that bucket-level actions and object-level actions use different ARNs.

## 10. Creating IAM User

Video focus:
- The video shows how to create an IAM user for everyday AWS work.

What the instructor is explaining:
- IAM users represent human users or long-term identities.
- A user can have console access, programmatic access, or both.
- Console access uses a password.
- Programmatic access uses access keys.

Important user setup ideas:
- Do not use root for daily tasks.
- Give the user only the permissions needed.
- Use groups where possible instead of attaching many policies directly to each user.
- Rotate or delete access keys that are not needed.
- Never commit access keys to GitHub.

Access key mental model:
- An access key is like a username and password for API/CLI access.
- If someone gets the key and secret, they may be able to use your AWS account from anywhere.

Hands-on connection:
- We used IAM users with AWS CLI profiles.
- We also discussed storing credentials in `~/.aws`, not inside the repo.

## 11. Creating IAM Groups

Video focus:
- The video explains how IAM groups simplify permission management.

What the instructor is explaining:
- A group is a collection of IAM users.
- Policies can be attached to a group.
- Every user in the group receives the group permissions.
- Groups are useful when multiple users need the same access pattern.

Why groups matter:
- Without groups, permissions become messy because each user needs separate policy attachments.
- With groups, access can be managed by role type, such as developers, read-only users, or admins.
- Removing a user from a group removes those permissions.

Mental model:
- A user is a person.
- A group is a team.
- A policy is the permission set assigned to that team.

Hands-on connection:
- Our IAM notes keep user, group, and policy as separate concepts.
- This prepares us for later labs where EC2, S3, and Lambda need different permissions.

## 14. IAM Roles

Video focus:
- The video introduces IAM roles and explains why they are different from IAM users.

What the instructor is explaining:
- A role is an identity with permissions, but it is meant to be assumed temporarily.
- Roles are often used by AWS services, applications, or federated users.
- A role has two important parts: who can assume it, and what permissions it grants after assumption.

Important role concepts:
- Trust policy: defines who is allowed to assume the role.
- Permissions policy: defines what the role can do.
- Temporary credentials: AWS provides short-lived credentials when the role is assumed.
- Service role: a role used by an AWS service such as EC2 or Lambda.

Why roles are safer:
- You do not need to store long-term access keys on an EC2 instance or inside application code.
- AWS can give temporary credentials automatically to the service.
- Temporary credentials reduce the damage if credentials leak.

Mental model:
- A user is a permanent identity.
- A role is a temporary hat that an allowed person or service can wear.
- While wearing the role, the identity gets the role's permissions.

Hands-on connection:
- The later EC2 instance profile lab will use this idea.
- Instead of putting access keys on EC2, the EC2 instance will receive permissions through a role.

## Hands-on recap

What we built:
- Read-only S3 policy.
- Read-only EC2 policy.
- IAM explanation notes.
- Common IAM mistakes notes.
- Cleanup checklist for IAM practice.

What I should be able to explain now:
- Root user vs IAM user.
- IAM user vs IAM role.
- Group vs policy.
- Trust policy vs permissions policy.
- Why least privilege matters.
- Why access keys are risky.
- Why `AdministratorAccess` should not be the default beginner choice.

Common mistakes to avoid:
- Using root for daily work.
- Giving every user admin access.
- Creating access keys and forgetting them.
- Storing credentials in a repo.
- Confusing S3 bucket ARNs with S3 object ARNs.
- Forgetting that a role needs both trust and permission rules.
