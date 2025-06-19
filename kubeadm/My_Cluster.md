# Kubernetes Admin
## Table of Contents

- [Setup Kubeadm CLuster](#setup-kubeadm-cluster)
- [Configure Kubectl to control Remote Cluster](#configure-kubectl-to-control-remote-cluster)
- [Configure NFS Server and Storage Class](#configure-nfs-server-and-storage-class)
- [Accessing Kubernetes Services via NodePort](#accessing-kubernetes-services-via-nodeport)
- [Pod Autoscaling](#pod-autoscaling)
- [CI/CD + GitOps Tasks](#cicd--gitops-tasks)
- [Logging & Monitoring](#logging--monitoring)
- [Accessing Private Container Registry with imagePullSecrets](#accessing-private-container-registry-with-imagepullsecrets)
- [Disaster Recovery & Backup](#disaster-recovery--backup)
- [Multi-Cluster Kubernetes Management with Rancher](#multi-cluster-kubernetes-management-with-rancher)


## Setup Kubeadm Cluster

### Prepare Infra-Machines Networks
> Enable IPv4,IPv6 packet forwarding
```bash
sudo swapoff -a
sudo modprobe br_netfilter
sudo modprobe overlay
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF
sudo sysctl --system
```

### Install Docker Engine on Ubuntu & CRI 
> Add Docker's official GPG key:
```bash
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
```
> Add the repository to Apt sources:
```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### Installing cri-dockerd
```bash
# get version from https://github.com/Mirantis/cri-dockerd/releases/latest
apt-get install ./cri-dockerd-<version>.deb
systemctl status cri-docker
```

### Installing kubeadm, kubelet and kubectl
```bash
sudo apt-get update
# apt-transport-https may be a dummy package; if so, you can skip that package
sudo apt-get install -y apt-transport-https ca-certificates curl gpg
# If the directory `/etc/apt/keyrings` does not exist, it should be created before the curl command, read the note below.
# sudo mkdir -p -m 755 /etc/apt/keyrings
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.32/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.32/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
sudo systemctl enable --now kubelet
```

### Initialize the Kubernetes cluster
```bash
sudo kubeadm init --pod-network-cidr=10.244.0.0/16 --cri-socket unix:///var/run/cri-dockerd.sock --v=5 --apiserver-advertise-address=192.168.56.10
--pod-network-cidr= --apiserver-advertise-address= --cri-socket --v=
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

### Setup Pod_networking

> Installing Addons --> Pod_networking --> cilium

```bash
# Add the Cilium Helm repository and update it
helm repo add cilium https://helm.cilium.io/
helm repo update

# Install Cilium-cli
CILIUM_CLI_VERSION=$(curl -s https://raw.githubusercontent.com/cilium/cilium-cli/main/stable.txt)
CLI_ARCH=amd64
if [ "$(uname -m)" = "aarch64" ]; then CLI_ARCH=arm64; fi
curl -L --fail --remote-name-all https://github.com/cilium/cilium-cli/releases/download/${CILIUM_CLI_VERSION}/cilium-linux-${CLI_ARCH}.tar.gz{,.sha256sum}
sha256sum --check cilium-linux-${CLI_ARCH}.tar.gz.sha256sum
sudo tar xzvfC cilium-linux-${CLI_ARCH}.tar.gz /usr/local/bin
rm cilium-linux-${CLI_ARCH}.tar.gz{,.sha256sum}

# Install Cilium with Helm
helm install cilium cilium/cilium --version 1.17.4 \
  --namespace kube-system
 cilium status --wait
kubectl -n kube-system scale deployment cilium-operator --replicas=1
```

### Debugging the Cluster or Resting
```bash
sudo kubeadm reset -f --cri-socket unix:///var/run/cri-dockerd.sock
sudo rm -rf /etc/kubernetes /var/lib/etcd /var/lib/kubelet ~/.kube /etc/cni/net.d
sudo systemctl restart cri-docker
sudo systemctl restart kubelet cri-docker
```

## Configure Kubectl to control Remote Cluster

### Steps
- Create a private key for the client user (dev)
- Create a certificate signing request
- Sign the request using kubernetes ca.crt
- Secure Copy dev.crt, dev.key, ca.crt to Client 
- @Client Update the kubectl config to use this certificates and keys
- Add Role and RoleBinding in the cluster to give permissions to client

```bash
# @ Master Machine
# Create a private key --> Create a certificate signing request --> Sign the CSR with Kubernetes CA
openssl genrsa -out dev-kary.key 2048
openssl req -new -key dev-kary.key -out dev-kary.csr -subj "/CN=dev-kary/O=dev-group"
sudo openssl x509 -req -in dev-kary.csr -CA /etc/kubernetes/pki/ca.crt -CAkey /etc/kubernetes/pki/ca.key -CAcreateserial -out dev-kary.crt -days 365
# use client-key-data instead of path
base64 -w 0 /home/vagrant/.kube/certs/dev-kary.key

```
```bash
# @ Dev Machine
mkdir -p ~/.kube
cp /path/to/kubeconfig ~/.kube/config
```
- `kubeconfig file`:
```yaml
apiVersion: v1
kind: Config
clusters:
- name: kary-cluster
  cluster:
    server: https://master:6443
    certificate-authority: /path/to/ca.crt
users:
- name: dev-kary
  user:
    client-certificate: /path/to/client.crt
    client-key: /path/to/client.key
contexts:
- name: my-context
  context:
    cluster: kary-cluster
    user: dev-kary
current-context: my-context
```

## Configure NFS Server and Storage Class

> Configure NFS Server on Master Machine or Another remote Machine
```bash
# Install NFS-Server
sudo apt install nfs-kernel-server
sudo systemctl start nfs-kernel-server.service

# Create the NFS Directory
sudo mkdir /nfs_shared_folder
chmod 777 /nfs_shared_folder

# Edit /etc/exports
/nfs_shared_folder *(rw,async,no_subtree_check,no_root_squash)

# Apply the new config via:
sudo exportfs -ar

# Install NFS client @ K8s Master Machine & Nodes
sudo apt install nfs-common -y

# Testing the server
sudo mount -t nfs <NFS_SERVER_IP>:/home/youruser/kubedata /mnt
touch /mnt/hello-from-k8s
ls /mnt
sudo umount /mnt
```

> Prepare the Cluster to use NFS for external-provisioner
```bash
# Install external-provisioner using Helm
helm repo add nfs-subdir-external-provisioner https://kubernetes-sigs.github.io/nfs-subdir-external-provisioner/
helm install nfs-subdir-external-provisioner nfs-subdir-external-provisioner/nfs-subdir-external-provisioner \
    --namespace nfs \
    --create-namespace \
    --set nfs.server=192.168.56.13 \
    --set nfs.path=/home/vagrant/nfs_kubedata \
    --set storageClass.name=nfs-storage \
    --set storageClass.defaultClass=true\
```
> Now you can use the nfs-provisioner by defining storageClass.name = nfs-storage in your `PVC`

- [Ex.Provisioner-Reference](https://github.com/kubernetes-sigs/nfs-subdir-external-provisioner)
- [NFS-Helm-Reference](https://weng-albert.medium.com/how-to-create-an-nfs-storageclass-en-fe962242f44e)



## Accessing Kubernetes Services via NodePort
> Prepare the Master kubeadm Configuration for network access
- kubeadm-config.yaml 
    - `criSocket`: the container runtime Interface used
    - `advertiseAddress`: the IP that the other nodes will use to access the master api-server
    - `node-ip`: the control plane ip 
    - `networking/podSubnet`: The CNI Subnet for PodNetwork

```yaml
apiVersion: kubeadm.k8s.io/v1beta3
kind: InitConfiguration
nodeRegistration:
  criSocket: unix:///var/run/cri-dockerd.sock
  kubeletExtraArgs:
    node-ip: "192.168.56.10"
localAPIEndpoint:
  advertiseAddress: "192.168.56.10"
  bindPort: 6443
---
apiVersion: kubeadm.k8s.io/v1beta3
kind: ClusterConfiguration
kubernetesVersion: "v1.32.5"
controlPlaneEndpoint: "192.168.56.10"
networking:
  podSubnet: "10.244.0.0/16"
```
```bash
sudo kubeadm init --config=kubeadm-config.yaml --v=5
# Equivalent kubeadm Command
sudo kubeadm init --control-plane-endpoint=192.168.56.10 \
  --apiserver-advertise-address=192.168.56.10 \
  --pod-network-cidr=10.244.0.0/16 --cri-socket=unix:///var/run/cri-dockerd.sock --v=5 
# Create Token for nodes to join
kubeadm token create --print-join-command
```

> Prepare the Node Configuration for network access
```bash
cat <<EOF | sudo tee /etc/default/kubelet
KUBELET_EXTRA_ARGS=--node-ip=<machine-ip>
EOF
kubeadm join <Master_IP>:6443 --token <TOKEN> --discovery-token-ca-cert-hash <hash>
```

> Testing
```bash
kubectl create deployment hello --image=nginxdemos/hello
kubectl expose deployment hello --type=NodePort --port=80
curl http://any-node-ip:nodePort
```
- [***kubeadm-config-Reference***](https://kubernetes.io/docs/reference/config-api/kubeadm-config.v1beta3/)


## Pod Autoscaling 

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install prometheus prometheus-community/prometheus --namespace prometheus --create-namespace 
helm install prometheus-adapter prometheus-community/prometheus-adapter -n prometheus
## CI/CD + GitOps Tasks

## Logging & Monitoring

## policy enforcement kubernetes

## Accessing Private Container Registry with imagePullSecrets

## Disaster Recovery & Backup

## Multi-Cluster Kubernetes Management with Rancher

apiVersion: v1
kind: Service
metadata:
  annotations:
    meta.helm.sh/release-name: prometheus
    meta.helm.sh/release-namespace: prometheus
  labels:
    app.kubernetes.io/component: server
    app.kubernetes.io/instance: prometheus
    app.kubernetes.io/managed-by: Helm
    app.kubernetes.io/name: prometheus
    app.kubernetes.io/part-of: prometheus
    app.kubernetes.io/version: v3.1.0
    helm.sh/chart: prometheus-26.1.0
  name: prometheus-server
  namespace: prometheus
  resourceVersion: "129912"
  uid: e3b6c02c-1290-4c5e-80f3-dda49f34ff34
spec:
  clusterIP: 10.104.47.112
  clusterIPs:
  - 10.104.47.112
  internalTrafficPolicy: Cluster
  ipFamilies:
  - IPv4
  ipFamilyPolicy: SingleStack
  ports:
  - name: http
    port: 80
    protocol: TCP
    targetPort: 9090
    nodePort: 30080
  selector:
    app.kubernetes.io/component: server
    app.kubernetes.io/instance: prometheus
    app.kubernetes.io/name: prometheus
  sessionAffinity: None
  type: ClusterIP
status:
  loadBalancer: {}
                      

