# EC2 Instance Setup

Steps to create the EC2 instance for this project.

1. Go to **AWS Console → EC2 → Launch Instance**.
2. **Name**: give the instance a name (e.g. `docker-server`).
3. **Application and OS Image (AMI)**: select **Ubuntu** (latest LTS).
4. **Instance type**: select **t3.small**.
5. **Key pair**: create a new key pair (or select an existing one) and download the `.pem` file — needed for SSH access.
6. **Network settings**: allow SSH (port 22), and HTTP/HTTPS if needed.
7. **Configure storage**: set to **20 GiB**.
8. Click **Launch instance**.

## Connect to the instance

```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@<instance-public-ip>
```

## Install Docker

```bash
sudo apt update
sudo apt install docker.io
```

Check available commands:

```bash
docker
```

## Check Docker status

```bash
systemctl status docker
```

Shows whether the Docker service is running (active) or stopped.

```bash
sudo docker ps
```

Lists all currently running containers.

## Run Docker without sudo

```bash
sudo usermod -aG docker ubuntu
newgrp docker
```

Adds the `ubuntu` user to the `docker` group so you don't need `sudo` for every docker command. `newgrp docker` applies the group change to the current session immediately (otherwise you'd need to log out and back in).

- `-a` = append → keep existing groups as they are, just add the `docker` group.
- `-G` = groups → add the user to the specified group(s).

After this, you can drop `sudo`:

```bash
docker ps
```

```bash
docker images
```

Lists all Docker images downloaded/available on the machine.

## Test Docker installation

```bash
docker pull hello-world
```

Downloads the `hello-world` image from Docker Hub to the local machine.

```bash
docker run hello-world
```

Creates and runs a container from the `hello-world` image. It prints a confirmation message and exits — confirming that Docker is installed and working correctly.

# Dockerize and run momo-site

The site (Vite + React) is built into a static bundle and served with nginx, using a multi-stage `Dockerfile` at the repo root. All app source files, `Dockerfile`, `nginx.conf` and `.dockerignore` live directly in this folder — there is no separate `momo-site/` subfolder.

## Build the image

```bash
docker build -t momo-site .
```

## Run the container

```bash
docker run -d -p 8080:80 --name momo-site momo-site
```

Visit `http://localhost:8080` (or `http://<instance-public-ip>:8080` on the EC2 instance — make sure that port is allowed in the security group). (port 8080 custom tcp)

## Tag and push to Docker Hub

```bash
docker tag momo-site sammysunway/momo-site:latest
docker push sammysunway/momo-site:latest
```

## Stop the container

```bash
docker stop momo-site
```

```bash
docker ps       # running containers only — momo-site should no longer appear
docker ps -a    # all containers, including stopped — momo-site still shows here
```

## Useful commands

```bash
docker ps                 # check the container is running
docker logs momo-site     # view nginx/container logs
docker stop momo-site     # stop the container
docker rm momo-site       # remove the stopped container
```

## Rebuild after code changes

```bash
docker stop momo-site && docker rm momo-site
docker build -t momo-site .
docker run -d -p 8080:80 --name momo-site momo-site
```

## Pull and run from Docker Hub

```bash
docker pull sammysunway/momo-site:latest
docker run -d -p 8082:80 --name momo-site sammysunway/momo-site:latest
```

Visit `http://localhost:8082` in the browser.

## Edit App.jsx and rebuild

Example: change the "small guide" line in `src/App.jsx`.

```bash
cd src
nano App.jsx
```

Find this line (around line 48):

```jsx
A small guide to momo: the kinds you'll find on the street, the
```

Edit the text as needed, then save and exit `nano`:

- `Ctrl + O` then `Enter` — writes (saves) the file
- `Ctrl + X` — exits the editor

Go back to the project root folder:

```bash
cd ..
```

Rebuild and restart the container so the change shows up (edits to source files aren't picked up by an already-running container — the image has to be rebuilt):

```bash
docker stop momo-site && docker rm momo-site
docker build -t momo-site .
docker run -d -p 8080:80 --name momo-site momo-site
```

# docker_I
