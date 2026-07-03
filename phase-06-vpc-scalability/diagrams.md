# Diagrams

## Default VPC Mental Model

```text
AWS Region
└── VPC 10.0.0.0/16
    ├── Subnet A 10.0.1.0/24 in AZ-a
    │   └── EC2 instance
    ├── Subnet B 10.0.2.0/24 in AZ-b
    │   └── EC2 instance
    ├── Route table
    │   ├── local route to VPC CIDR
    │   └── 0.0.0.0/0 -> Internet Gateway
    └── Internet Gateway
```

## Security Group SSH Flow

```text
Laptop public IP
    |
    | TCP 22 SSH
    v
Security group inbound rule
    |
    | allow only MY_PUBLIC_IP/32
    v
EC2 instance
```

When my laptop IP is allowed:

```text
MY_PUBLIC_IP/32 -> TCP 22 -> allowed -> SSH works
```

When my laptop IP is removed or changed:

```text
MY_PUBLIC_IP/32 -> TCP 22 -> no matching allow rule -> SSH fails
```

## Security Group vs Network ACL

```text
Security group
- Attached to EC2/network interface
- Stateful
- Allow rules only

Network ACL
- Attached to subnet
- Stateless
- Allow and deny rules
```

## Scaling

Vertical scaling:

```text
One small EC2 instance
        |
        v
One bigger EC2 instance
```

Horizontal scaling:

```text
Users
  |
  v
Load balancer
  |
  +--> EC2 instance 1
  +--> EC2 instance 2
  +--> EC2 instance 3
```

Load balancers and Auto Scaling Groups are important practical follow-up topics after the playlist.
