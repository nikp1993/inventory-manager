# data "aws_availability_zones" "available" {
#   state = "available"

#   filter {
#     name = "opt-in-status"
#     values = ["opted-in"]
#   }
# }

resource "aws_vpc" "app" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.app.id
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.app.id
  availability_zone       = "us-east-1a"
  cidr_block              = "10.0.0.0/24"
  map_public_ip_on_launch = true
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.app.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}
