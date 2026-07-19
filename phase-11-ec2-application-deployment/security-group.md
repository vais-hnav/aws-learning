# Security Group Notes

## Inbound rules used

```text
SSH   TCP 22  laptop-public-ip/32
HTTP  TCP 80  0.0.0.0/0
```

## Why SSH used `/32`

The SSH rule allowed only the current laptop public IP.

`/32` means one exact IPv4 address.

This is safer than allowing SSH from `0.0.0.0/0`.

## Why HTTP was public

HTTP port `80` was opened to `0.0.0.0/0` because the purpose of the lab was to view the app in a browser.

## Why port `3000` stayed closed

The Node app used port `3000`, but it listened only on `127.0.0.1`.

Nginx forwarded traffic internally to that port.

Keeping port `3000` closed means users cannot bypass Nginx and directly access the app process.
