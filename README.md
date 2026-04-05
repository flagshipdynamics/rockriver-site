# Rock River Research Website

Static website for Rock River Research, LLC and the RockTerm product.

## Local Development

Open `index.html` in a browser. No build step required.

For local development with correct paths, use a simple HTTP server:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deployment

This site deploys to Cloudflare Pages.

- **Build command:** (none)
- **Build output directory:** `/`
- **Branch:** `main`

## Structure

All pages use absolute paths (`/css/style.css`) and the shared stylesheet in `css/style.css`.
