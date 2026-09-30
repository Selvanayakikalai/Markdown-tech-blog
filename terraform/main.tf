# ==============================================================================
# Terraform Infrastructure Configuration - Markdown Tech Blog
# Defines container & deployment infrastructure locally using Docker provider.
# Safe, local, zero-cloud-cost infrastructure automation.
# ==============================================================================

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.2"
    }
  }
}

# Configure the Docker Provider
provider "docker" {
  host = var.docker_host
}

# Pull the Markdown Tech Blog Docker image
resource "docker_image" "blog_app" {
  name         = "${var.docker_image_name}:${var.docker_image_tag}"
  keep_locally = true
}

# Deploy the Markdown Tech Blog application container
resource "docker_container" "blog_app" {
  name  = var.container_name
  image = docker_image.blog_app.image_id

  ports {
    internal = var.internal_port
    external = var.external_port
  }

  restart = "unless-stopped"

  env = [
    "APP_ENV=${var.environment}",
    "APP_NAME=Markdown-Based Tech Blog"
  ]
}
