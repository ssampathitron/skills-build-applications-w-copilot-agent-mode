# OctoFit Tracker Frontend

For GitHub Codespaces, define `VITE_CODESPACE_NAME` in `.env.local` so the presentation tier can call the API tier on port 8000.

```env
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend builds API URLs as:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is unset, the app safely falls back to `http://localhost:8000/api/[component]/` to avoid invalid `https://undefined-8000...` requests.