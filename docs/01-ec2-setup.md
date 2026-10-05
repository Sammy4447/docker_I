# 1. EC2 Instance Setup

Create an Ubuntu server on AWS to run Docker on.

## Launch the instance

1. Go to **AWS Console → EC2 → Launch Instance**.
2. **Name** — give the instance a name, e.g. `docker-server`.
3. **Application and OS Image (AMI)** — select **Ubuntu** (latest LTS).
4. **Instance type** — select **t3.small**.
5. **Key pair** — create a new key pair (or select an existing one) and download the `.pem` file. You need it for SSH.
6. **Network settings** — allow **SSH (port 22)**, plus HTTP/HTTPS if needed.
7. **Configure storage** — set to **20 GiB**.
8. Click **Launch instance**.

> **Tip:** Later you'll open the site on port `8080`. Add a **Custom TCP** rule for port `8080` in the instance's security group so your browser can reach it.

## Connect with SSH

```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@<instance-public-ip>
```

| Command | Meaning |
|---------|---------|
| `chmod 400 your-key.pem` | Makes the key file read-only for you. SSH refuses keys that other users can read. |
| `ssh -i your-key.pem` | Connects using that key file. |
| `ubuntu@<instance-public-ip>` | Logs in as the default `ubuntu` user. Find the public IP on the EC2 dashboard. |

---

**Next:** [2. Install Docker →](02-install-docker.md)
