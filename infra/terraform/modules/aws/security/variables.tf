variable "sg_name" {
  description = "Name of the security group"
  type        = string
}

variable "vpc_id" {
  description = "The ID of the VPC where the security group will be created"
  type        = string
}

variable "enable_ssh" {
  type        = bool
  description = "Enable SSH ingress rule"
  default     = false
}

variable "ssh_cidr" {
  type        = string
  description = "CIDR block to allow SSH from when enable_ssh is true"
  default     = "94.145.221.109/32"
}