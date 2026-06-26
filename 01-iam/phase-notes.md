# Phase 2 Notes

This phase covered IAM basics: users, policies, groups, roles, and least privilege.

## 8. Introduction to IAM
- IAM is the AWS service for identity and access management.
- It decides who can sign in and what they can do.
- The big idea is least privilege: give only the permissions needed.

## 9. Creating IAM Policies
- Policies are JSON documents that grant or deny permissions.
- The main parts are effect, action, and resource.
- A policy should be as narrow as possible so permissions stay safe.

## 10. Creating IAM User
- IAM users are for everyday human access, unlike the root user.
- This is the normal identity you use for day-to-day AWS work.
- Access keys must be treated carefully because they can be powerful.

## 11. Creating IAM Groups
- Groups help manage permissions for many users at once.
- Instead of attaching the same policy to each user, you attach it to the group.
- This keeps IAM simpler and easier to maintain.

## 14. IAM Roles
- Roles are for temporary access, often used by AWS services.
- A role is better than long-term access keys for service-to-service access.
- The EC2 example shows how a service can get permission without storing credentials.

## Hands-on recap
- Built read-only IAM policy examples for S3 and EC2.
- Compared safe policies with more dangerous broad-permission patterns.
- Practiced the idea of least privilege.
- Reviewed the difference between users, groups, policies, and roles.

