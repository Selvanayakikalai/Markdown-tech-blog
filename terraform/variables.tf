# ==============================================================================
# Variables Definition - Markdown Tech Blog Infrastructure
# ==============================================================================

variable "docker_host" {
  description = "Docker daemon socket address"
  type        = string
  default     = "unix:///var/run/docker.sock"
}

variable "docker_image_name" {
  description = "Docker Hub repository image name"
  type        = string
  default     = "selvanayaki06/markdown-tech-blog"
}

variable "docker_image_tag" {
  description = "Image tag to deploy"
  type        = string
  default     = "latest"
}

variable "container_name" {
  description = "Name for the provisioned application container"
  type        = string
  default     = "markdown-blog-app-infra"
}

variable "internal_port" {
  description = "Internal container port served by Nginx"
  type        = number
  default     = 80
}

variable "external_port" {
  description = "Host port mapped to the container"
  type        = number
  default     = 8085
}

variable "environment" {
  description = "Deployment target environment (production, staging, test)"
  type        = string
  default     = "production"
}
