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
├── .dockerignore       # Excluded files for Docker build context
├── .gitignore          # Excluded files for Git version control
├── Dockerfile          # Nginx Alpine container definition
├── docker-compose.yml  # Docker Compose config for Jenkins container
├── Jenkinsfile         # Declarative Jenkins CI pipeline
├── index.html          # Main layout structure, UI components, and library CDN links
├── style.css           # Dark mode styling, layout grids, typography, and Markdown styles
├── script.js           # Markdown parsing logic, live event bindings, and utility functions
└── README.md           # Documentation and deployment instructions
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

## Jenkins Docker Setup & CI/CD Integration

Jenkins is deployed as a Docker container using the Docker-outside-of-Docker (DooD) pattern, allowing it to communicate directly with the host's Docker Desktop daemon via `/var/run/docker.sock`.

### Jenkins Container Setup (`docker-compose.yml`)
To start or reproduce the Jenkins CI container:
```bash
docker compose up -d
```
- **Jenkins URL**: `http://localhost:8081`
- **Volume Persistence**: `jenkins_home` (stores all pipeline jobs and plugins)
- **Docker Socket Integration**: `/var/run/docker.sock:/var/run/docker.sock`

### Verification of Docker Access inside Jenkins
To verify that the Jenkins container can build Docker images:
```bash
docker exec jenkins-ci docker --version
docker exec jenkins-ci docker info
```

### Troubleshooting: `docker: not found`
If a pipeline build fails with `docker: not found`:
1. Ensure the `docker.io` package is installed inside the Jenkins container:
   ```bash
   docker exec -u 0 jenkins-ci apt-get update && docker exec -u 0 jenkins-ci apt-get install -y docker.io
   ```
2. Grant read/write permissions on the Docker socket:
   ```bash
   docker exec -u 0 jenkins-ci chmod 666 /var/run/docker.sock
   ```

### Step-by-Step Pipeline Execution Guide

1. **Create Jenkins Pipeline Job**:
   - Open `http://localhost:8081` -> Click **New Item**.
   - Enter `markdown-tech-blog-pipeline`, select **Pipeline**, and click **OK**.

2. **Connect GitHub Repository**:
   - Under **Pipeline**, set **Definition** to `Pipeline script from SCM`.
   - Set **SCM** to `Git`.
   - **Repository URL**: `https://github.com/Selvanayakikalai/Markdown-tech-blog.git`.
   - **Branch**: `*/main`.
   - **Script Path**: `Jenkinsfile`.

3. **Run the Pipeline**:
   - Click **Build Now** to execute the pipeline stages: `Checkout` ➔ `Validate` ➔ `Docker Build`.

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
