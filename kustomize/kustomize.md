# Kustomize
- This is a customization tool for Kubernetes manifests 
- Only focus on customizing already exist k8s files 


### File Structure
#### Kustomization.yaml
- This file exist in the base and layers folders 
- Cotain 2 main sections:
    - resourses: the resourses files that we will apply our customzation on it
        - contain path to resourses
        - path to folder that contain kustomization.yaml that point to resourses
    - customization that we need to do on the resourses

### Transformer
- This is a predefined transformations
- Ex:
    - `commonLabel`: add common labels
    - `namePrefix` / `nameSuffix`: add common prefix and suffix to all
    - `Namespace`: add common namespace to all
    - `commonAnnotations`: add annotations  
    - `images`: customely update spasific image by *Image Name*
    - `replicas`: customize 

```yaml
commonLabel:
  org: myorg
commonAnnotations:
  branch: master

namePrefix: app-
nameSuffix: -deb
namespace: mac

images:
  - name: nginx
    newName: apache
    newTag: 

replicas:
  - name: postgres-deployment
    count: 3
```

### Patches
- provide another method to modify k8s conifg
- surgical method approach to target a spasific section in k8s resourse
- To create a Patch:
    - Operation type: add/remove/replace
    - Target: use kind, namespace, name, labelSelector, etc ..
    - Value: values will be add or replaced
- Types: `JSON 6092 Patch`, `Strategic merge Patch`
- Each type has two styles: **InLine**, **Separate File**

#### JSON 6092 Patch
```yaml
## InLine replace & add
patches:
  - target:
      kind: Deployment
      name: name-of-target-deploy
        patch: |-
          - op: replace or add
            path: /metadata/name
            value: my-new-webapp-deploy-name
---
## InLine remove
patches:
  - target:
      kind: Deployment
      name: name-of-target-deploy
    patch: |-
      - op: remove
        path: /spec/template/metadata/labels/component
        # path: /spec/template/spec/containers/0        #add/replace/remove item in position `0` of list
        # path: /spec/template/spec/containers/-        #append to the end of list

## Separate File
patches:
  - path: replace-patch.yaml
    target:
      kind: Deployment
      name: name-of-target-deploy
### replace-patch.yaml
- op: replace
  path: /metadata/name
  value: my-new-webapp-deploy-name
```

#### Strategic merge Patch
```yaml
## InLine
patches:
    patch: |-
      apiVersion: apps/v1
      kind: Deployment
      name: namve-of-target-deploy
      metadata:
        name: name-of-target-deploy
      spec:
        replicas: 5

## Separate File
patchesStrategicMerge:  #new style
patches:
  - labels-patch.yaml
### labels-patch.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-deployment
spec:
  template:
    metadata:
      labels:
        env: prod       #add this label
        tier: app       #update this label
        company: null   #remove this label
  sepc:
    containers:
      # remove
      - $patch: delete
        name: db
      # add  
      - name: newcontainername
        image: apahce
      # replace  
      - name: alreadyexixtcontainername
        image: mac_image
    
```

### Overlays
- Used to share a defualt config accross all environments
- We create it by adding bases refernce to the main kustomization.yaml file
```yaml
bases: 
  - ../../base
```
- we also can add new resourse in this env by using resourses

### Components
- Provide the ability to define reusable pieces of config logic (resourses & patches)
```yaml
# Kustomization.yaml inside components
apiVersion: kustomize.config.k8s.io/v1alpha1
kind: Component
resources:
  - redis-deploy.yaml
patchesStrategicMerge:
  - redis-patch.yaml
# referancing the component from overlayes
components:
  - ../../components/caching
``` 

### Generator
- when we use secrets or configmap, we shold redeploy the apps manually when updating the secrets or conifgmap 
- when we use generator and when any update happens it generate new sec/config with new name so this will triger new deployment 
- We use it for `secretGenerator` and `configMapGenerator`.
- In case of creating configmap or secret we need to remove the old ones by prune
``` yaml
# @kustomization.yaml
configMapGenerator:
  - name: mykustom-configmap        # name of conifgmap
    file: 
      - filename.conf               # file as configmap
    literals:
      - key1=value1                 # key/value pairs
    behavior: merge                 # update the spasific literal and keep the another literal untouched.

# the output will be configmap resourse like this:
apiVersion: v1
kind: Configmap
metadata:
  name: mykustom-configmap
data:
  key1: "value1"
  filename.conf: data of the file
# used in deployments 
envFrom:
  - configMapRef:
      name: mykustom-map
---
env:
  - name: POSTGRES_PASSWORD 
    valueFrom:
      configMapKeyRef:
        name: db-secret
        key: password 
```

### Commands
```bash
kustomize build /path/to/folder                           # customize the resourses and display the output
kustomize build /path/to/folder | kubectl apply -f -      # apply the custom manifests on k8s cluster
kustomize build /path/to/folder | kubectl delete -f -      # apply the custom manifests on k8s cluster
kubectl apply -k /path/to/folder    
kubectl delete -k /path/to/folder  
# In case of creating configmap or secret we need to remove the old ones by prune  
kubectl apply -k /path/to/folder  --prune -l labelkey=labelvalue  # remove any stall resourse with this label
kustomize edit set iamge nginx=nginx:1.22 
kustomize edit set namespace stagging
kustomize edit set label role:admin org:kodekloud
kustomize edit add configmap domain-config  --from-literal=domain=kodekloud.com --from-literal=subdomain=api
kustomize edit add resource db/dbdeploy.yaml
kustomize edit add resource prometheus-depl.yaml
kustomize edit set image nginx=memcached
kustomize edit set replicas api-deployment=8
```


### Installation
```bash
curl -s "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh"  | bash
sudo cp -r kustomize /usr/bin/
kustomize version --short
```