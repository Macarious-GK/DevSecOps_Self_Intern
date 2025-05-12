App archetectures 
- Monolethic single big unit
- SOA service orianted archeterue using APIS
- Microservices: each service has its own codebase and team acting as indebended working entity








### labels and seclectors
kubectl get pods -l key=value
kubectl get pods -l 'key in (value, value), key notin (value, value)'
kubectl get pods --show-labels

we use labels to easyly identify app and pods so somethiong like service can find the target pods with matchlabels selectors

each resource in k8s has its metadata/labels that can identfy with 


### Deployment scaling 
kubectl scale deploy ndeploy --replicas=3
kubectl set image deploy ndeploy ndeploy=newImage
kubectl rollout status deployment/ndeploy

#### Deployment strategies
- Rolling Update Deployment (Default)
    - This strategy replace pod by pod without any downtime 
    - Minor performace reduction happend (the desired no. of pods is less by one)
- Recreate Deployment
    - This strategy shutdown all old pods and up the new ones 
    - Used for system that cannot work with partially update state 
    - It has downtime
- Canary Deployment
    - Its partially udpade strategy that allow you to test your new version by assignening % of the real users to user the new version 25%


### Multi Container Pods
 more than one conatinaer in one pod
- Design Patterns:
    - SideCar: Main app container and Helper Container
    - Ambassador: connect the containers with outside world (Act as Proxy)
    - Adaptor: It adapte the requests in/out 
- Communictatoin:
    - Shared network Namespace (localhost)
    - Shared Volumn
    - Shard Process

# ----------------------------------------------------------------
## K8s Networking
### Service
 
#### Types:
- Cluster IP: service only accesable within the k8s cluster, not exposed outside the cluster
- NodePort: service accesable on static port defined, can be accessed from outside the cluster
- LoadBalancer: service accessable through cloud provider load balancer
- ExternalName: service as a way to return an alias to external services ouside the cluster 
#### commands:
- kubectl expose deploy ndeploy --name=nservice --type=ClusterIP --port= --target-port= 
- kubectl port-forward svc/nservice port:port
- sudo socat TCP-LISTEN:exposed_IP,fork TCP:127.0.0.1:internal_Machine_IP
- minikube service svc/nservice 



### Ingress: 
minikube addons enable ingress

- act as entrypoint to the cluster and can route you to multiple services 
- you can access k8s services from outside of the cluster by defining inbound rules
- It combined from API, controller and Rules (APIs implemented by controller "can act as loadbalancer")
- 
#### Hostname & Path
- by default it accecpt all http requests without defining matching hostname but when it defined it will match first with hostname and route the trafic to the target service
- Path types: 
    - ImplementationSpecific: With this path type, matching is up to the IngressClass.
    - Exact: "/bar" exact path
    - Prefix: "/" all pathes 
- Types of Ingress:
    - ingress backed with one service
    - Simple fanout: one entry point to multiple services based on URL provided
    - Name based virtual hosting: single ip address to multipe service based on hostname

### Gateway:
#### Resource model
- GatewayClass: Defines a set of gateways with common configuration 
- Gateway: Defines an instance of traffic handling infrastructure,
- HTTPRoute / TCPRoute / GRPCRoute: Defines specific rules for mapping traffic and how traffic is routed to services based on the host, path, or protocols.
- we install gateway CRDs and we install gatewayclass controller 
- we use gateway to have more control over calls from outside of the k8s
- we can't use backend ref to another namespace without using ReferenceGrant for **(enable cross namespace references )**
- This security mesusers made to overcome *CVE-2021-25740: Endpoint & EndpointSlice permissions allow cross-Namespace forwarding*
- We use **ReferenceGrant** and describe *From* and *To* to enable cross-ns, to make our httproute able to access and forward traffic to our service in another ns

#### commands:
- kubectl describe gatewayclass nginx
- kubectl describe gateway gateway-name
- kubectl describe httproute httproute-name
- kubectl describe refercegrant

#### Links here: 
- https://docs.nginx.com/nginx-gateway-fabric/installation/installing-ngf/manifests/
- https://blog.nashtechglobal.com/hands-on-kubernetes-gateway-api-with-nginx-gateway-fabric/ 
- https://gateway-api.sigs.k8s.io/api-types/referencegrant/
- https://www.manifests.io/gateway%20api/1.1.0%20standard/io.k8s.networking.gateway.v1alpha2.ReferenceGrant 


### Network Policy

# ----------------------------------------------------------------
## K8s Storage
