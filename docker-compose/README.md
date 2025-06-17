## 🔧 Common Docker Compose Keys Reference

| **Key**             | **Purpose**| **Example** |
|---------------------|-------------|----------|
| `version`           | Specifies the version of the Compose file format.      | `version: "3.8"`|
| `services`          | Defines a list of services (containers).               | `services: web:`                   |
| `build`             | Builds the Docker image from a Dockerfile.             | `build: .`      |
| `image`             | Uses a prebuilt image from Docker Hub or a custom registry.                | `image: nginx:alpine`   \|
| `ports`\  | Maps host ports to container ports.| `ports: "8080:80"`\      |
| `volumes`\| Mounts host paths or named volumes into the container. | `volumes: .:/app`\       |
| `environment`       | Sets environment variables inside the container.       | `environment: DEBUG=True`          |
| `depends_on`        | Specifies service startup order.   | `depends_on: [db]`\      |
| `command`\| Overrides the default command.     | `command: python app.py`\|
| `entrypoint`        | Overrides the default entrypoint.  | `entrypoint: ["sh", "-c"]`         |
| `networks`          | Defines custom networks for communication between containers.\   | `networks: - frontend`\  |
| `restart`\| Defines the restart policy.        | `restart: always`\       |

---

## ⚙️ Useful CLI Commands

| **Command**| **Purpose**                                      |
|-------------------------------|--------------------------------------------------|
| `docker-compose up`           | Starts all services defined in the file.         |
| `docker-compose up -d`        | Starts services in detached mode (background).   |
| `docker-compose down`         | Stops and removes all services/containers.       |
| `docker-compose build`        | Builds or rebuilds services.                     |
| `docker-compose logs`         | Shows logs from all services.                    |
| `docker-compose exec [svc]`   | Run a command inside a running container.        |
| `docker-compose ps`           | List containers started by Compose.              |



### 🔄 **General Best Practices**

| **Best Practice**                        | **Reason**                                                 | **Example**                                       |
|------------------------------------------|-----------------------------------------------------------|---------------------------------------------------|
| **Use named volumes for persistent data** | Ensures data persists between container restarts.         | `volumes: data:/var/lib/postgresql`               |
| **Leverage `depends_on`**                 | Controls the startup order of containers (though not for health checks). | `depends_on: [db]`                               |
| **Use networks to separate services**    | Helps organize and isolate services for better communication control. | `networks: - frontend`                           |
| **Clean up unused containers/volumes**   | Prevents unused resources from taking up space.           | `docker-compose down -v`                         |
| **Use version control for `docker-compose.yml`** | Allows for better collaboration and tracking changes to configuration files. | `git commit -m "Updated docker-compose.yml"`     |