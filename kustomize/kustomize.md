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

### Commands
```bash
kustomize build /path/to/folder                           # customize the resourses and display the output
kustomize build /path/to/folder | kubectl apply -f -      # apply the custom manifests on k8s cluster
kustomize build /path/to/folder | kubectl delete -f -      # apply the custom manifests on k8s cluster
kubectl apply -k /path/to/folder    
kubectl delete -k /path/to/folder    



```


### Installation
```bash
curl -s "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh"  | bash
sudo cp -r kustomize /usr/bin/
kustomize version --short
```