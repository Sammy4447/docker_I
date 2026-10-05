# 4. Push and Pull with Docker Hub

Docker Hub stores your images online so any machine can download and run them.

## Log in

```bash
docker login
```

Enter your Docker Hub username and password (or an access token). You must log in before pushing.

## Tag and push

```bash
docker tag momo-site <your-dockerhub-username>/<your-image-name>:latest
docker push <your-dockerhub-username>/<your-image-name>:latest
```

| Command | Meaning |
|---------|---------|
| `docker tag` | gives the local `momo-site` image a second name in the format Docker Hub expects: `username/image:tag` |
| `docker push` | uploads the image to your Docker Hub account |
| `:latest` | the **tag** (version label). `latest` is the usual default. |

After pushing, open [hub.docker.com](https://hub.docker.com) and you'll see the image under **Repositories**.

## Pull and run from Docker Hub

On any machine with Docker:

```bash
docker pull <your-dockerhub-username>/<your-image-name>:latest
docker run -d -p 8082:80 --name momo-site-hub <your-dockerhub-username>/<your-image-name>:latest
```

Open <http://localhost:8082>.

> This uses port `8082` and a different container name so it doesn't clash with a `momo-site` container already running on `8080`.

---

**Previous:** [← 3. Build and Run](03-build-and-run.md) · **Next:** [5. Edit and Rebuild →](05-edit-and-rebuild.md)
