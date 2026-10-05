# 2. Install Docker

Run these on the EC2 instance after connecting with SSH.

## Install

```bash
sudo apt update
sudo apt install docker.io
```

Check that the `docker` command works (this lists all available commands):

```bash
docker
```

## Check Docker status

```bash
systemctl status docker
```

Shows whether the Docker service is **active (running)** or stopped. Press `q` to exit.

```bash
sudo docker ps
```

Lists all currently running containers. It will be empty for now.

## Run Docker without `sudo`

```bash
sudo usermod -aG docker ubuntu
newgrp docker
```

This adds the `ubuntu` user to the `docker` group, so you don't need `sudo` for every Docker command.

| Part | Meaning |
|------|---------|
| `-a` | **append** — keep the user's existing groups, just add a new one |
| `-G docker` | the **group** to add the user to |
| `newgrp docker` | applies the change now, without logging out and back in |

Now `sudo` is no longer needed:

```bash
docker ps        # running containers
docker images    # images downloaded on this machine
```

## Test the installation

```bash
docker pull hello-world
```

Downloads the `hello-world` image from Docker Hub.

```bash
docker run hello-world
```

Creates a container from that image. It prints a welcome message and exits. If you see the message, Docker is working.

---

**Previous:** [← 1. EC2 Setup](01-ec2-setup.md) · **Next:** [3. Build and Run →](03-build-and-run.md)
