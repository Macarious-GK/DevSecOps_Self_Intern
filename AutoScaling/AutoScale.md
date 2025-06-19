# AutoScaling
> ### Features:
- Improve Application Availability
- Efficient Resource Utilization
- Elasticity
- Fault tolerance & Recovery
- Seamless Load Manager
- Simplify Management
> ### Kubernetes Scaling

- Cluster Scaling: Worker node Scaling
    - Ensure the Infra is up to the workload needed
- Pod Scaling
    - Ensure the App is up to the workload needed
> ### Manual Scaling 
- Manual `HPA`:
    - Increase Replicas of a deployment 
    - Each pod will have it's hostname
    - App should be stateless
```bash
kubectl scale deployment my-deploy --replicas=5
```
- Manual `VPA`:
    - Make a pod has more resources
    - Modify the `spec.resources` of deployment

## HPA
- `Horizontal Pod Autoscaling`:  Increase the units that handel the workload **`+Pods`**
- `HPA` works with *Deployment* & *Statefulset*
- We need to define resources in or Deploy/stateful, also we need metrics server
- How it works:
    - HPA need Metrics Server to be configured
    - We Define a resource of HPA with target Deploy and Metric Threshold 
    - HPA tracks key Metrics & Evaluate
    - Adjust workload by adding or removing replicas of pods based on the Metrics
    - Run in Control loop to make sure every thing is okay as desired
- `HPA Arch`:
    - Resource Definition: Define target Deployment, Min/Max Replicas, Metrics Threshold
        - Based on this the kube-api collect metrics and take actions
    - Metric Server: Server that collect metrics 
    - Metrics Collection Source: 
        - ***Custom collection***: workload in the cluster 
        - ***External collection***: External data Source
    - Metrics Adaptor: sit between kube-api and collection sources --> `Custom Adaptor`, `External Adaptor`
    - Metrics API: 
        - *metrics.k8s.io*: 
        - *custom.metrics.k8s.io*: App Gen, originate within cluster
        - *external.metrics.k8s.io*: External Gen, originate outside cluster

- `HPA Custom Metrics`: 
    - `Custom` means that we will not use native Metrics Server
    - In order to collect custom metrics we use custom 
    - The `Application` will expose the custom metrics that we need to get
    - `Metrics Collection Agent`: Get Metrics from the app then it sends to `Metrics Adaptor`
    - `Metrics Adaptor`: will provide the metrics to the `kube-api`
    - `Kube-api` will check the `HPA Rules` and apply what is needed 



## VPA

## Cluster Scaling

## KEDA
