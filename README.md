# DevSecOps_Self_Intern

I developed and containerized a **Node.js application** ("Orderly App") with a **MongoDB** backend, starting with a single-stage Docker build and optimizing it to a **multi-stage build** for improved efficiency and security. I created a **Docker Compose** setup with a secure network architecture, using a **proxy to protect the application** and ensuring MongoDB remains **inaccessible externally**.

For **observability**, I integrated **Prometheus and Grafana**, provisioning dashboards using templates for Node.js metrics and developing a **custom dashboard for MongoDB monitoring**.

The infrastructure is deployed both **on-premises using Vagrant** and **in the cloud with Terraform**. For **orchestration and deployment**, I used **Kubernetes (Minikube)**, with **GitOps workflows managed by Argo CD**.

Additionally, I **automated CI/CD pipeline workflows using GitHub Actions** to streamline the build, test, and deployment pipelines:

1. Builds and tests the Node.js application.
2. Runs linting to enforce code quality.
3. Creates a Docker image after passing tests.
4. Performs a security scan using **Snyk** as a security gate to catch vulnerabilities.
5. On success, pushes the Docker image to **Docker Hub**.
6. Triggers a **Snyk scan in Argo CD** to ensure security compliance before deployment.

> This pipeline is fully automated using **GitHub Actions**, integrating **quality checks**, **security gates**, and **automated deployment** in a seamless flow.

<!-- I've reduced the image size by nearly 80% -->

