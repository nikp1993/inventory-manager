output "vpc_id" {
  description = "The ID of the VPC"
  value       = aws_vpc.app.id
}

output "subnet_id" {
  description = "The IDs of the public subnets"
  value       = aws_subnet.public.id
}