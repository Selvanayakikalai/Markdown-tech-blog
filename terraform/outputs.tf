# ==============================================================================
# Outputs - Markdown Tech Blog Infrastructure
# ==============================================================================

output "container_id" {
  description = "The ID of the provisioned Docker container"
  value       = docker_container.blog_app.id
}

output "container_name" {
  description = "The name of the provisioned Docker container"
  value       = docker_container.blog_app.name
}

output "application_url" {
  description = "Access URL for the deployed Markdown Tech Blog application"
  value       = "http://localhost:${var.external_port}"
}

output "image_deployed" {
  description = "The Docker image tag deployed by Terraform"
  value       = "${var.docker_image_name}:${var.docker_image_tag}"
}
