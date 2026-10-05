# 3. Build and Run momo-site

The `Dockerfile` has two stages:

1. **Build stage** (`node:20-alpine`) — installs dependencies and runs `npm run build` to create the static site in `dist/`.
2. **Serve stage** (`nginx:1.27-alpine`) — copies only `dist/` into nginx, which serves it on port `80`.

The final image contains only nginx and the built files. Node, `node_modules` and the source code are left behind, which keeps the image small.

All commands below are run from the project root (the folder with the `Dockerfile`).

## Build the image

```bash
docker build -t momo-site .
```

| Part | Meaning |
|------|---------|
| `docker build` | builds an image from the `Dockerfile` |
| `-t momo-site` | **tags** (names) the image `momo-site`, so you can refer to it by name instead of its long ID |
| `.` | the **build context**: the current folder, which Docker uses to find the `Dockerfile` and source files |

## Run the container

```bash
docker run -d -p 8080:80 --name momo-site momo-site
```

| Part | Meaning |
|------|---------|
| `docker run` | creates and starts a new container from an image |
| `-d` | **detached** — runs in the background so your terminal stays free |
| `-p 8080:80` | **port mapping** `<host-port>:<container-port>` — host port `8080` goes to nginx on port `80` inside the container |
| `--name momo-site` | gives the container a fixed name instead of a random one |
| `momo-site` (last) | the **image** to run, built in the step above |

Open the site:

- Local machine: <http://localhost:8080>
- EC2: `http://<instance-public-ip>:8080` (port `8080` must be allowed in the security group as **Custom TCP**)

## Stop the container

```bash
docker stop momo-site
```

```bash
docker ps       # running containers only — momo-site is gone
docker ps -a    # all containers, including stopped — momo-site still shows here
```

A stopped container still exists until you remove it with `docker rm`.

## Useful commands

| Command | What it does |
|---------|--------------|
| `docker ps` | list running containers |
| `docker ps -a` | list all containers, including stopped ones |
| `docker logs momo-site` | show the container's nginx logs |
| `docker stop momo-site` | stop the container |
| `docker rm momo-site` | remove a stopped container |
| `docker images` | list images on this machine |

---

**Previous:** [← 2. Install Docker](02-install-docker.md) · **Next:** [4. Docker Hub →](04-docker-hub.md)
