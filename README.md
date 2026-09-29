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
├── .dockerignore # Excluded files for Docker build context
├── .gitignore    # Excluded files for Git version control
├── Dockerfile    # Nginx Alpine container definition
├── Jenkinsfile   # Declarative Jenkins CI pipeline
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

## Docker Containerization

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

### Docker Image Build
Build the lightweight Nginx container image:
```bash
docker build -t markdown-tech-blog:latest .
```

### List Docker Images
Verify the built image:
```bash
docker images | grep markdown-tech-blog
```

### Run Docker Container
Run the container mapping port `8080` on the host to port `80` in the container:
```bash
docker run -d --name markdown-blog-app -p 8080:80 markdown-tech-blog:latest
```

### Access Application in Browser
Open your browser and navigate to:
`http://localhost:8080`

### Stop and Remove Container
```bash
# Stop the running container
docker stop markdown-blog-app

# Remove the container
docker rm markdown-blog-app
```

## Jenkins CI/CD Pipeline

The project includes a declarative `Jenkinsfile` that automates build validation and Docker image creation across both Windows and Linux Jenkins agents.

### Required Jenkins Plugins
- **Git Plugin** (`git`): For cloning the GitHub repository.
- **Pipeline Plugin** (`workflow-aggregator`): For executing Declarative Pipelines.
- **Credentials Binding Plugin** (`credentials-binding`): For secure credential injection.

### Required Jenkins Credentials
- **`github-credentials`** (Username with Password / GitHub Personal Access Token): Used for authenticating SCM access if the repository is private.
- **`docker-hub-credentials`** (Username with Password / Docker Hub Token): Configured for upcoming registry push operations.

### Step-by-Step Jenkins Setup Guide

1. **Create Jenkins Pipeline Job**:
   - Navigate to Jenkins Dashboard -> **New Item**.
   - Enter `markdown-tech-blog-pipeline`, select **Pipeline**, and click **OK**.

2. **Connect GitHub Repository**:
   - Under **Pipeline** section, set **Definition** to `Pipeline script from SCM`.
   - Set **SCM** to `Git`.
   - Enter **Repository URL**: `https://github.com/Selvanayakikalai/Markdown-tech-blog.git`.
   - Specify **Branches to build**: `*/main` or `*/develop`.
   - Set **Script Path**: `Jenkinsfile`.

3. **Configure Docker Access on Windows**:
   - Ensure the user running the Jenkins service has permission to execute `docker` commands via Docker Desktop for Windows.

4. **Run the Pipeline**:
   - Click **Build Now** to trigger the initial pipeline run.

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
