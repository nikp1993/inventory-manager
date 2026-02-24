terraform {
  required_version = "~> 1.12"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

module "tfstate_storage" {
  source        = "../../../modules/aws/storage"
  bucket_prefix = "nikp-terraform-state-"
}

output "tfstate_aws_bucket_name" {
  value = module.tfstate_storage.bucket_name
}