# Explanation

## Main Idea From The Video

The video explains that cost optimization is important cloud knowledge, but the goal is not blindly reducing cost. Good savings reduce waste without harming users or future flexibility.

Bad savings:
- hurts customer experience
- blocks future product changes
- removes needed capacity
- creates operational risk

Good savings:
- removes unused resources
- rightsizes over-provisioned resources
- uses the correct purchasing option for predictable or flexible workloads

## EC2 Purchasing Options

On-Demand:
- pay as you go
- no long-term commitment
- good for learning, testing, and unpredictable workloads

Savings Plans:
- commit to a consistent spend amount for 1 or 3 years
- can reduce costs compared with On-Demand
- not for beginner practice purchases

Reserved Instances:
- commit to a specific instance configuration for 1 or 3 years
- useful for steady workloads
- not for beginner practice purchases

Spot Instances:
- use unused EC2 capacity at large discounts
- can be interrupted
- good for flexible and interruption-tolerant workloads

Dedicated Hosts:
- physical server dedicated to you
- useful for licensing/compliance cases
- avoid for beginner labs

Dedicated Instances:
- instances run on single-tenant hardware
- avoid for beginner labs

Capacity Reservations:
- reserve capacity in a specific Availability Zone
- useful when capacity availability matters
- avoid for beginner labs unless specifically learning it safely

## Beginner Cost Optimization Order

1. Delete resources you do not need.
2. Stop or terminate idle EC2 instances.
3. Check EBS volumes and Elastic IPs.
4. Choose smaller/right-sized instances.
5. Use budgets and billing checks.
6. Learn commitments later, but do not buy them during practice.

## My Beginner Rule

For this learning repo:
- use On-Demand/Free-Tier-style short labs only
- do not buy Savings Plans
- do not buy Reserved Instances
- do not create Dedicated Hosts
- do not use Spot unless a future lab explicitly explains interruption handling
