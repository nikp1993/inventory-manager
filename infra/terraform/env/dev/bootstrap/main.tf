module "tfstate_storage" {
  source        = "../../../modules/aws/storage"
  bucket_prefix = "nikp-terraform-state-"
}

output "tfstate_aws_bucket_name" {
  value = module.tfstate_storage.bucket_name
}