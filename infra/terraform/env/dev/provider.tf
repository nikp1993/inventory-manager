terraform {
  required_version = "~> 1.12"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0.0"
    }
    # azurerm = {
    #   source = "hashicorp/azurerm"
    #   version = "~> 4.0.0"
    # }
  }
}

provider "aws" {
  region = "us-east-1"
}