output "profile_name" {
  description = "The name of the IAM role profile"
  value       = aws_iam_instance_profile.ec2_profile.name
}