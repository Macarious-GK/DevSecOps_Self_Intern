# Using Kustomize for Customizing Manifests
- Kustomize allows you to customize Kubernetes manifests by removing redundant information and centralizing values such as environment-specific settings (e.g., prod, dev) and labels. This helps to create cleaner, reusable, and shorter Kubernetes manifests, enabling the use of a single file across multiple environments like prod and dev.

- By using Kustomize, you can reduce duplication, keep your configuration organized, and easily manage different environments with a consistent structure.
## Kustomize Directory Structure
``` text
base
├── Application_NodeJS.yaml      # Base deployment for Node.js application
├── Database_MongoDB.yaml        # Base deployment for MongoDB database
├── kustomization.yaml           # Kustomization file that references base resources
└── namespace.yaml               # Defines the namespace for your application

overlays
├── dev
│   ├── config.properties        # Development-specific configurations
│   └── kustomization.yaml       # Kustomization file for the development environment
└── prod
    ├── config.properties        # Production-specific configurations
    └── kustomization.yaml       # Kustomization file for the production environment
```
## Kustomize: Base Layer and Overlay Layer

Kustomize allows you to define a base layer for your Kubernetes resources and overlay environments to customize configurations per environment (like `dev`, `prod`). This separation helps keep the configuration clean, reusable, and manageable across different environments.

### Base Layer

The **base layer** contains the common Kubernetes resources that are shared across all environments. These resources are environment-agnostic and serve as the foundation for any environment-specific customizations. 

#### Key Elements of the Base Layer:

- **Common Resources**: These resources are shared across different environments and include components like deployments, services, config maps, and more.
- **Namespace**: The base layer might include a default namespace, which can be overridden in the overlays.
- **Kustomization File**: The `kustomization.yaml` file in the base layer includes references to all the resources needed for the application. It provides a way to manage and apply those resources together as a unit.

### overlay Layer

The overlay layer is used to customize or override settings in the base resources according to the environment. Each environment (e.g., dev, prod) will have its own overlay folder, containing its own configurations, such as custom environment variables, image tags, replica counts, etc.

#### Key Elements of the Overlay Layer:
- **Environment-Specific Customization:** The overlay layer allows you to make environment-specific adjustments without changing the base resources.

- **Kustomization File:** Each environment's overlay includes a kustomization.yaml file, which references the base resources and applies customizations such as labels, environment variables, or replica counts.

- **Configuration Properties:** Environment-specific configurations like database URLs, image versions, or resource limits can be stored here.