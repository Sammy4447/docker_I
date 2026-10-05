# docker_I — Dockerizing momo-site

A small **Vite + React** site packaged with Docker and deployed on an **AWS EC2** instance.

The app is built into static files and served with **nginx**, using a multi-stage `Dockerfile`.

## Guides

Follow these in order:

| # | Guide | What you'll do |
|---|-------|----------------|
| 1 | [EC2 Setup](docs/01-ec2-setup.md) | Launch an Ubuntu server on AWS and connect with SSH |
| 2 | [Install Docker](docs/02-install-docker.md) | Install Docker, run it without `sudo`, test with `hello-world` |
| 3 | [Build and Run](docs/03-build-and-run.md) | Build the `momo-site` image and run it as a container |
| 4 | [Docker Hub](docs/04-docker-hub.md) | Push your image to Docker Hub and pull it back |
| 5 | [Edit and Rebuild](docs/05-edit-and-rebuild.md) | Change the code and see it in the running site |
| 6 | [Multi-container](docs/06-multi-container.md) | Run several containers from one image |
| 7 | [Troubleshooting](docs/07-troubleshooting.md) | Fix common errors (port in use, name conflict) |

## Project structure

```
docker_I/
├── Dockerfile        # multi-stage build: Node builds the app, nginx serves it
├── .dockerignore     # files Docker should not copy into the image
├── package.json      # app dependencies and scripts
├── vite.config.js    # Vite settings
├── index.html        # page entry point
├── public/           # static assets (images, etc.)
├── src/              # React source code (App.jsx lives here)
└── docs/             # step-by-step guides
```

## Quick start

If Docker is already installed:

```bash
docker build -t momo-site .
docker run -d -p 8080:80 --name momo-site momo-site
```

Then open <http://localhost:8080>.
