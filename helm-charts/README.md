# Backstage Helm Chart

## Description
This Helm chart deploys Backstage along with a PostgreSQL database.

## Installation

1. Add the Helm chart:
   ```bash
   helm install backstage ./backstage-helm-chart
   ```

2. Verify the deployment:
   ```bash
   kubectl get all
   ```

## Configuration
Update `values.yaml` to customize the deployment.

## Uninstallation
```bash
helm uninstall backstage
```