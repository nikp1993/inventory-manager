# Overview
A full-stack inventory management application designed to demonstrate modern DevOps practices, cloud infrastructure provisioning, containerized deployments, and CI/CD automation. The project showcases a production-like workflow where application code changes automatically trigger build, test, publish, and deploy pipelines, with infrastructure managed entirely through Infrastructure as Code.

## Architecture
                ┌───────────────────────┐
                │       GitHub          │
                │   CI/CD Pipelines     │
                └───────────┬───────────┘
                            │
                            │
                     Build / Test / Publish
                            │
                            ▼
                ┌───────────────────────┐
                │ GitHub Container      │
                │ Registry (GHCR)       │
                └───────────┬───────────┘
                            │
                            │ Deploy
                            ▼
                ┌──────────────────────────┐
                │        AWS EC2           │
                │  Docker Compose Runtime  │
                │                          │
                │  Nginx                   │
                │  Frontend Container      │
                │  Backend API Container   │
                │  PostgreSQL Database     │
                └───────────┬──────────────┘
                            │
                            ▼
                       Application

## Tech Stack

**Application**
- React (Frontend)
- Node.js + Express (Backend)
- PostgreSQL (Database)

**DevOps / Infrastructure**
- Docker & Docker Compose
- Terraform (Infrastructure as Code)
- AWS (EC2, IAM, SSM, S3)
- GitHub Actions (CI/CD)
- GitHub Container Registry (GHCR)

---

## Key Highlights

- **Infrastructure as Code** with modular Terraform setup for AWS
- **Containerized architecture** for frontend, backend, and database
- **Reusable GitHub workflows and composite actions** for CI/CD
- Automated pipeline for:
  - Provisioning infrastructure
  - Building Docker images
  - Running tests
  - Publishing images to GHCR
  - Deploying to AWS EC2
- Secure deployment using **AWS OIDC authentication and SSM (no SSH)**


---

## Getting Started (Local Development)

### Prerequisites
- Docker
- Docker Compose
- Node.js (optional for local backend testing)

### Run the Application

```bash
docker compose -f docker-compose.dev.yml up --build -d
```

Application will be available at: http://localhost/