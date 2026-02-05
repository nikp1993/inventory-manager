terraform {
  backend "s3" {
    bucket       = "nikp-terraform-state-20260126174424612600000001"
    key          = "inventory-manager/dev/terraform.tfstate"
    region       = "us-east-1"
    encrypt      = true
    use_lockfile = true
  }
}