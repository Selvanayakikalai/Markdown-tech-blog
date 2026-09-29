# Markdown-Based Tech Blog

A production-ready static web application that allows users to write and preview Markdown in real-time, designed specifically for tech blogging and documentation.

## Features

- **Pure Static Frontend**: Built using plain HTML5, CSS3, and JavaScript (ES6+). Zero backend server or database required.
- **Real-Time Live Preview**: Instant Markdown parsing powered by `marked.js`.
- **Syntax Highlighting**: Pre-configured with `highlight.js` for automatic formatting of code snippets.
- **Rich Markdown Support**: Fully supports headings, lists, links, blockquotes, inline code, fenced code blocks, horizontal rules, and tables.
- **Responsive Modern UI**: Modern dark theme with split-pane layout for desktop and single column responsive stacking for mobile views.
- **Status Indicator**: Built-in health/status badge showing frontend static engine state.
- **Utility Tools**: Word/character counters, one-click HTML copy button, and clear editor action.

## Project Structure

```text
markdown-tech-blog/
├── .gitignore    # Excluded files for OS, IDEs, and secrets
├── index.html    # Main layout structure, UI components, and library CDN links
├── style.css     # Dark mode styling, layout grids, typography, and Markdown styles
├── script.js     # Markdown parsing logic, live event bindings, and utility functions
└── README.md     # Documentation and deployment instructions
```

## How to Run Locally

Since this is a pure static web application, you can run it using any static HTTP server or simply by opening `index.html` directly in any web browser.

### Option 1: Direct File Opening
Double-click `index.html` or open it directly in Google Chrome, Firefox, Edge, or Safari.

### Option 2: Python Simple HTTP Server
If you have Python installed:
```bash
# Navigate into the project folder
cd markdown-tech-blog

# Start local server
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

### Option 3: Node.js `npx serve`
```bash
npx serve .
```

## Git Branching Strategy

This project follows a structured Git branching strategy tailored for collaborative development and stable production releases:

- **`main`**: Production-ready code. Represents tested, stable application state ready for hosting.
- **`develop`**: Integration/development branch. Features are merged here first for integration testing before reaching `main`.
- **`feature/*`**: Individual feature development branches (e.g., `feature/dark-mode-toggle`, `feature/export-pdf`). Created off `develop`.

### Recommended Workflow

```text
feature branch (feature/*)
        ↓
   Pull Request (Code Review)
        ↓
    develop (Integration)
        ↓
  Testing & QA
        ↓
     main (Production Release)
        ↓
  Production (Nginx / Static Host)
```

## Production Deployment (Nginx)

To host this static site using Nginx:

1. Copy all project files (`index.html`, `style.css`, `script.js`) into your Nginx web root directory (e.g., `/usr/share/nginx/html` or `/var/www/html`).
2. Reload or restart your Nginx server:
   ```bash
   sudo systemctl reload nginx
   ```
