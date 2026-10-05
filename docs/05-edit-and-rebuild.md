# 5. Edit the Code and Rebuild

A running container doesn't see changes to your source files. The code was copied into the image at build time, so after editing you must **rebuild the image** and **start a new container**.

## Example: edit App.jsx

Open the file:

```bash
cd src
nano App.jsx
```

Find this line (around line 48):

```jsx
A small guide to momo: the kinds you'll find on the street, the
```

Change the text, then save and exit `nano`:

| Keys | Action |
|------|--------|
| `Ctrl + O`, then `Enter` | save the file |
| `Ctrl + X` | exit the editor |

Go back to the project root:

```bash
cd ..
```

## Rebuild and restart

```bash
docker stop momo-site && docker rm momo-site
docker build -t momo-site .
docker run -d -p 8080:80 --name momo-site momo-site
```

1. Stop and remove the old container (frees the name and the port).
2. Build a new image with your change.
3. Run a new container from it.

Refresh <http://localhost:8080> to see the change.

---

**Previous:** [← 4. Docker Hub](04-docker-hub.md) · **Next:** [6. Multi-container →](06-multi-container.md)
