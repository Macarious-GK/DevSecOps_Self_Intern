
According to ArgoCD: it use CRD custom resources defenations
- We should define the Application this contain:
    - Project = Default
    - Source: (GitHub Repo and its Path, Helm Chart)
    - Destination: k8s Cluster takes: (Cluster name or server Url and namespace)
    - SyncPolicy: specify it will automate or manully sync 