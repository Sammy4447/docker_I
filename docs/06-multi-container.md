# 6. Multi-container Deployment

One image can run as many containers at the same time. This is useful for testing versions side by side or serving the app on more than one port.

Each container needs:

- its own **name** (`--name`)
- its own **host port** (two containers can't use the same host port)

## Run two containers

```bash
docker run -d -p 8080:80 --name momo-site-1 momo-site
docker run -d -p 8081:80 --name momo-site-2 momo-site
```

| Container | URL |
|-----------|-----|
| `momo-site-1` | <http://localhost:8080> |
| `momo-site-2` | <http://localhost:8081> |

Both use port `80` *inside* their own container. That's fine, because each container is isolated. Only the host ports must differ.

## Manage them

The containers are independent. Stopping or removing one doesn't affect the other.

```bash
docker ps                             # see all running containers
docker stop momo-site-1 momo-site-2   # stop both
docker rm momo-site-1 momo-site-2     # remove both
```

---

**Previous:** [← 5. Edit and Rebuild](05-edit-and-rebuild.md) · **Next:** [7. Troubleshooting →](07-troubleshooting.md)
