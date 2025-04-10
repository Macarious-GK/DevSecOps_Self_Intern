This is a guide and notes from my study about dockerfile 

# Defination
- dockerfile is the blueprint of a docker image that create the image layers 

## Dockerfile Instructions Reference Guide

| **Instruction**   | **Purpose** | **Example**|
|-------------------|-------------|------------|
| **FROM**          | Defines the base image for your container.      | `FROM node:18`  |
| **WORKDIR**       | Sets the working directory inside the container.  | `WORKDIR /app` |
| **COPY**          | Copies files from the host to the container.       | `COPY . /app` |
| **RUN**           | Executes commands inside the container during the build phase.    | `RUN apt-get update && apt-get install -y python3`  |
| **EXPOSE**        | Exposes a port to make it accessible from the host or other containers.  | `EXPOSE 5000` |
| **CMD**           | Defines the default command to run when the container starts. Can be overridden at runtime.  | `CMD ["node", "app.js"]`                           |
| **ENTRYPOINT**    | Defines the executable to run when the container starts. Can't be easily overridden.   | `ENTRYPOINT ["python", "app.py"]`                  |
| **ENV**           | Sets environment variables in the container.     | `ENV NODE_ENV=production`       |
| **ARG**           | Defines build-time variables passed during the build process. Not available after the build.| `ARG NODE_VERSION=16`<br>`FROM node:${NODE_VERSION}`|
| **VOLUME**        | Creates a mount point inside the container for persistent or shared data.  | `VOLUME ["/data"]`                                 |
| **USER**          | Specifies the user to run the application inside the container.    | `USER node`                                        |
| **HEALTHCHECK**   | Defines a command to check if the container is healthy. Can restart if unhealthy. | `HEALTHCHECK --interval=30s CMD curl --fail http://localhost:5000/health exit 1` |
| **MAINTAINER**    | (Deprecated) Specifies the maintainer's contact info.     | `MAINTAINER "John Doe <john.doe@example.com>"` |
| **LABEL**         | Adds metadata to the image in key-value pairs (e.g., version, author). | `LABEL version="1.0" author="John Doe"`  |

## Dockerfile Best Practices 
### Security Best Practices

| **Best Practice**    | **Description**    | **Example**    |
|----------------------|-----------------------|--------------------------------|
| **Use Official Base Images**             | Start with trusted official images for security.         | `FROM node:18-slim`                                |
| **Use Multi-Stage Builds**               | Separate build and runtime stages to reduce image size.  | `FROM node:18 AS build`<br>`FROM node:18-slim`     |
| **Avoid Running as Root**                | Run as a non-root user for better security.              | `USER appuser`                                     |
| **Use `ENTRYPOINT`**                     | Set the main executable for the container.               | `ENTRYPOINT ["node", "app.js"]`                    |
| **Avoid Storing Secrets in Dockerfile**  | Don't hard-code secrets; use environment variables.      | `docker run -e MY_SECRET_KEY=secret-value my-app`  |
| **Define Health Checks**                 | Check container health and restart if needed.            | `HEALTHCHECK CMD curl --fail http://localhost:5000`|

### Performance Best Practices
| **Best Practice**    | **Description**    | **Example**    |
|----------------------|-----------------------|--------------------------------|
| **Keep Images Small**                    | Remove unnecessary files and use minimal images.         | `RUN apt-get clean && rm -rf /var/lib/apt/lists/*` |
| **Use `.dockerignore`**                  | Exclude unnecessary files (e.g., `.git`, `node_modules`).| `.dockerignore: node_modules/ .git/ .env`          |
| **Optimize Caching**                     | Order commands to maximize caching for faster builds.    | `COPY package.json .`<br>`RUN npm install`         |
| **Minimize Layers**                      | Combine commands to reduce the number of layers.         | `RUN apt-get update && apt-get install -y python3` |
| **Clean Up After Installing Packages**   | Remove caches and temporary files to reduce size.        | `RUN apt-get clean`                                |
| **Always Specify Versions**              | Pin versions to ensure consistent builds.                | `FROM node:18`                                     |
| **Use `--no-cache` with Package Managers**| Prevent caching of package manager data.                | `RUN apk add --no-cache python3`                   |
| **Use `LABEL` for Metadata**              | Add image metadata (e.g., version, maintainer).         | `LABEL version="1.0" maintainer="your-email"`      |
