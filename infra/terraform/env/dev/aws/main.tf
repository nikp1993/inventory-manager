module "vpc" {
  source = "../../../modules/aws/network"
}

module "security_group" {
  source  = "../../../modules/aws/security"
  sg_name = "dev-app-security-group"
  vpc_id  = module.vpc.vpc_id
}

module "iam_profile" {
  source = "../../../modules/aws/roles"
}

module "ec2" {
  source                    = "../../../modules/aws/compute"
  iam_instance_profile_name = module.iam_profile.profile_name
  security_group_id         = module.security_group.security_group_id
  subnet_id                 = module.vpc.subnet_id
}