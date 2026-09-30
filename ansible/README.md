# Ansible Automation — Markdown Tech Blog

This directory contains Ansible automation for deploying the Markdown Tech Blog Docker container onto any target host.

## Directory Structure

```text
ansible/
├── inventory.ini       # Defines target hosts (localhost for local testing)
├── playbook.yml        # Main deployment playbook (6 phases)
├── group_vars/
│   └── all.yml         # Shared variables for all hosts (no secrets)
└── README.md           # This documentation file
```

## Prerequisites

Ansible must be installed on the machine where you run these commands (the **control node**).

```bash
# Ubuntu / Debian
sudo apt update && sudo apt install -y ansible

# macOS (via Homebrew)
brew install ansible

# Python pip (any OS)
pip install ansible

# Verify installation
ansible --version
```

Docker must be installed and running on the **target host** (the machine in `inventory.ini`).

---

## Inventory (`inventory.ini`)

The inventory file defines which machines Ansible will manage. By default it targets `localhost` using a **local connection** — meaning no SSH is needed. This is ideal for safe local testing.

```ini
[blog_servers]
localhost ansible_connection=local ansible_user=root
```

### Switching to a Real Remote Server

Edit `inventory.ini` and replace the `localhost` line:

```ini
[blog_servers]
192.168.1.100 ansible_connection=ssh ansible_user=ubuntu ansible_port=22
```

---

## Variables (`group_vars/all.yml`)

All configurable values live in `group_vars/all.yml`:

| Variable | Default | Description |
|---|---|---|
| `docker_image_name` | `selvanayaki06/markdown-tech-blog` | Docker Hub image name |
| `docker_image_tag` | `latest` | Image tag to deploy |
| `docker_full_image` | Composed from above | Full image reference |
| `container_name` | `markdown-blog-app` | Docker container name |
| `container_internal_port` | `80` | Port inside the container (Nginx) |
| `container_external_port` | `8080` | Port exposed on the host |
| `app_health_url` | `http://localhost:8080` | URL used for health check |
| `health_check_retries` | `5` | Number of health check attempts |
| `health_check_delay` | `3` | Seconds between retries |

> **Security Note:** Never put Docker Hub passwords, SSH keys, or API tokens in `group_vars/all.yml`. Use [Ansible Vault](https://docs.ansible.com/ansible/latest/vault_guide/index.html) or environment variables for secrets.

---

## Playbook (`playbook.yml`)

The playbook runs **6 phases** in sequence:

```
Phase 1 — Pre-flight system checks
    ├── Display OS/hostname/IP info
    ├── Verify Docker is installed
    └── Verify Docker daemon is running

Phase 2 — Pull Docker Image
    └── docker pull selvanayaki06/markdown-tech-blog:latest

Phase 3 — Stop/Remove existing container
    ├── Check if container exists
    ├── Stop it (if running)
    └── Remove it (if exists)

Phase 4 — Deploy new container
    └── docker run -d --name markdown-blog-app -p 8080:80 ...

Phase 5 — Verify deployment
    ├── Wait 3 seconds for startup
    ├── Verify container is in "running" state
    └── HTTP health check → http://localhost:8080 (expects 200 OK)

Phase 6 — Deployment Summary
    └── Print app name, image, container, URL, HTTP status
```

---

## Running the Playbook

### Full Deployment Run

```bash
ansible-playbook -i inventory.ini playbook.yml
```

### Dry Run (Check Mode — No Changes Made)

Simulates all tasks without applying any changes. Use this to verify the playbook logic safely:

```bash
ansible-playbook -i inventory.ini playbook.yml --check
```

### Verbose Output

```bash
# Single verbose
ansible-playbook -i inventory.ini playbook.yml -v

# Extra verbose (shows all module arguments)
ansible-playbook -i inventory.ini playbook.yml -vv
```

### Deploy a Specific Build Tag

Override `docker_image_tag` at runtime to deploy a specific Jenkins build number:

```bash
ansible-playbook -i inventory.ini playbook.yml -e "docker_image_tag=11"
```

### Check Inventory / Connectivity

```bash
# List all hosts in inventory
ansible all -i inventory.ini --list-hosts

# Ping all hosts (connectivity test)
ansible all -i inventory.ini -m ping
```

### Validate Playbook Syntax

```bash
ansible-playbook -i inventory.ini playbook.yml --syntax-check
```

---

## Docker Deployment Flow

```
Docker Hub (selvanayaki06/markdown-tech-blog:latest)
        │
        │  docker pull
        ▼
  Target Host (inventory.ini)
        │
        │  Stop & remove old container
        │  docker stop markdown-blog-app
        │  docker rm   markdown-blog-app
        │
        │  Start new container
        │  docker run -d --name markdown-blog-app \
        │             -p 8080:80 \
        │             selvanayaki06/markdown-tech-blog:latest
        │
        ▼
  http://localhost:8080  ← Health check (HTTP 200 expected)
```

---

## Full DevOps Pipeline (Current Architecture)

```
GitHub (source code push)
        │
        ▼
Jenkins (CI/CD pipeline)
        │  ├── Terraform Init
        │  ├── Terraform Validate
        │  ├── Validate (files check)
        │  ├── Docker Build
        │  └── Docker Push → Docker Hub
        │
        ▼
Docker Hub (selvanayaki06/markdown-tech-blog:latest)
        │
        ▼
Ansible (deployment automation)  ← This directory
        │  ├── Pull image from Docker Hub
        │  ├── Stop/remove old container
        │  ├── Start new container on port 8080
        │  └── Health check verification
        │
        ▼
Application running at http://localhost:8080
```

> **Note:** Ansible is currently run **manually** (independently from Jenkins). Jenkins → Ansible integration is the next planned phase.

---

## Troubleshooting

### Docker not found on target host
```bash
# Verify Docker is installed
docker --version

# Verify Docker daemon is running
docker info
```

### Permission denied on Docker socket
```bash
# Add your user to the docker group (Linux)
sudo usermod -aG docker $USER
newgrp docker
```

### Container port already in use
```bash
# Check what's using port 8080
sudo lsof -i :8080
# or
netstat -tulpn | grep 8080
```

### Health check fails
```bash
# Check container logs
docker logs markdown-blog-app

# Check container status
docker ps -a
```
