variable "subnet_id" {
  description = "The ID of the subnet where the compute resources will be deployed"
  type        = string
}

variable "security_group_id" {
  description = "The ID of the security group to associate with the compute resources"
  type        = string
}

variable "iam_instance_profile_name" {
  description = "The name of the IAM instance profile to associate with the compute resources"
  type        = string
}