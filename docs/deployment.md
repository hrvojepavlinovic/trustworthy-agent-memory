# Deployment

Production target:

- Domain: `guide.hills-lab.hr`
- Server path: `/var/www/apps/trustworthy-agent-memory`
- Deploy user: `tendeploy`
- Build output: `dist/`
- Canonical source: this GitHub repo

GitHub Actions builds the Starlight site on every push to `main`, uploads `dist/` to Hetzner, flips the `current` symlink, and keeps the latest five releases.

Required GitHub secret:

- `HETZNER_DEPLOY_KEY`

Expected Caddy block:

```caddyfile
guide.hills-lab.hr {
  root * /var/www/apps/trustworthy-agent-memory/current
  encode gzip zstd

  @assets {
    path *.css *.js *.svg *.png *.jpg *.jpeg *.webp *.avif *.ico *.woff2
  }
  header @assets Cache-Control "public, max-age=31536000, immutable"
  header Cache-Control "public, max-age=300, stale-while-revalidate=86400"

  file_server
}
```

Validate before reload:

```sh
caddy validate --config /etc/caddy/Caddyfile
systemctl reload caddy
```

DNS:

- `guide.hills-lab.hr` should point to Hetzner `91.98.33.74`.
