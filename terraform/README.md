# Terraform Infrastructure for Markdown-Based Tech Blog

This directory contains Terraform code for automating the container and deployment infrastructure of the Markdown-Based Tech Blog application locally using Docker.

## Architecture

```text
Terraform Infrastructure (HCL)
         ↓
Docker Provider (local socket)
         ↓
Pull Image: selvanayaki06/markdown-tech-blog:latest
         ↓
Deploy Container: markdown-blog-app-infra (Port 8085 -> 80)
         ↓
Live Web Application (http://localhost:8085)
```

## Files

- `main.tf`: Provider configuration, Docker image resource, and container resource definition.
- `variables.tf`: Input variables with safe defaults (ports, tags, container names).
- `outputs.tf`: Declares output URLs and container IDs.
- `terraform.tfvars.example`: Example variable definitions file.

## Safe Local Execution Commands

```bash
# 1. Initialize Terraform and download provider
terraform init

# 2. Format configuration files
terraform fmt

# 3. Validate configuration syntax
terraform validate

# 4. Preview execution plan without changing anything
terraform plan
```
