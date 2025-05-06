# Docker-Compose Configurations for Monitoring

This guide outlines the setup for monitoring tools using Docker Compose, based on my experience with Prometheus and Grafana.

## Prometheus

Prometheus scrapes data from targets such as the Node app and Mongo exporter.

### Configuration Steps
1. **Define Targets:**
    - Edit `prometheus.yml` to specify the targets' IPs and labels.
2. **Deploy Configuration:**
    - Copy the *prometheus.yml* file to the following path `/etc/prometheus/prometheus.yml`

## Grafana

Grafana uses Prometheus as its data source and visualizes data through dashboards.

### Configuration Steps


- **Data Source:**  
  Define the data source details (IP, name, UID) in `datasources.yaml`.

- **Dashboards:**  
  Define dashboard settings (path, label, config) in `dashboards.yaml`.

- **Provisioning:**  
  Copy both `datasources.yaml` and `dashboards.yaml` to: `/etc/grafana/provisioning`


- **Custom Dashboards:**  
    - Create your dashboards and copy them to: `/var/lib/grafana/dashboards/`
    - Make sure that `dashboards.yaml` points to the location of your customized dashboards at `/var/lib/grafana/dashboards/`.




