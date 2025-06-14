## Configure Kubectl to control Remote Cluster
```bash
# @ Master Machine
# Create a private key --> Create a certificate signing request --> Sign the CSR with Kubernetes CA
openssl genrsa -out dev-kary.key 2048
openssl req -new -key dev-kary.key -out dev-kary.csr -subj "/CN=dev-kary/O=dev-group"
openssl x509 -req -in dev-kary.csr -CA /etc/kubernetes/pki/ca.crt -CAkey /etc/kubernetes/pki/ca.key -CAcreateserial -out dev-kary.crt -days 365
# use client-key-data instead of path
base64 -w 0 /home/vagrant/.kube/certs/dev-kary.key

```
```bash
# @ Dev Machine
mkdir -p ~/.kube
cp /path/to/kubeconfig ~/.kube/config
```
## Configure NFS Server and Storage Class





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

# Install NFS client @ K8s Master Machine
sudo apt install nfs-common -y

# Testing the server
sudo mount -t nfs <NFS_SERVER_IP>:/home/youruser/kubedata /mnt
touch /mnt/hello-from-k8s
ls /mnt
sudo umount /mnt

# Install external-provisioner using Helm
helm repo add nfs-subdir-external-provisioner https://kubernetes-sigs.github.io/nfs-subdir-external-provisioner/
helm install nfs-subdir-external-provisioner nfs-subdir-external-provisioner/nfs-subdir-external-provisioner \
    --namespace nfs-provisioning \
    --create-namespace \
    --set nfs.server=192.168.56.13 \
    --set nfs.path=/home/vagrant/nfs_kubedata \
    --set storageClass.name=nfs-storage \
    --set storageClass.defaultClass=true



```
- https://github.com/kubernetes-sigs/nfs-subdir-external-provisioner
- https://weng-albert.medium.com/how-to-create-an-nfs-storageclass-en-fe962242f44e
- 