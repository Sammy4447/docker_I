# 7. Troubleshooting

## Port is already in use

```
Error response from daemon: ports are not available: exposing port TCP 0.0.0.0:8080 ...
bind: address already in use
```

**Cause:** something else, usually another container, is already using host port `8080`.

**Fix:** find what's using it:

```bash
docker ps
```

Then either stop that container:

```bash
docker stop <container-name>
```

or use a different host port:

```bash
docker run -d -p 8081:80 --name momo-site momo-site
```

## Container name is already in use

```
Error response from daemon: Conflict. The container name "/momo-site" is already in use by container "dad58..."
```

**Cause:** a container named `momo-site` already exists. It may be stopped, but it still holds the name. Check with:

```bash
docker ps -a
```

**Fix:** remove the old container, then run again:

```bash
docker rm -f momo-site
docker run -d -p 8080:80 --name momo-site momo-site
```

`-f` (**force**) stops the container first if it's still running.

## Changes don't show up on the site

**Cause:** the container is still running the old image.

**Fix:** rebuild and restart. See [5. Edit and Rebuild](05-edit-and-rebuild.md).

## Site doesn't load on EC2

**Cause:** the security group is blocking the port.

**Fix:** in **EC2 → Security Groups → Inbound rules**, add a **Custom TCP** rule for the port you mapped (e.g. `8080`), source `0.0.0.0/0`.

---

**Previous:** [← 6. Multi-container](06-multi-container.md) · [Back to README](../README.md)
