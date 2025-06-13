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
