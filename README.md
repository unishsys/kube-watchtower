# Kube-Watchtower

[![Go Report Card](https://goreportcard.com/badge/github.com/by-sabbir/kube-watchtower)](https://goreportcard.com/report/github.com/by-sabbir/kube-watchtower)

## Introduction:

The Kube-Watchtower is a Kubernetes-based project designed to provide a centralized monitoring and management platform for cluster resources and deployments. This repository contains the source code for the Kube-Watchtower server-side application, written in Go.

## Features:

### Core Features

- Real-time monitoring of Kubernetes cluster resources (namespaces, pods, deployments, services)
- ConfigMap management (create, update, get)
- Deployment management (scale, list, get YAML files)
- Service creation and deletion
- Pod log retrieval
- Cluster logging and alerting

### Additional Functionality

- CORS support for cross-origin requests
- Ping endpoint for health checks
- Static file serving for assets and spa files

## Architecture:

The Kube-Watchtower application consists of the following components:

1. **Handler**: The core logic handler responsible for processing incoming requests.
2. **KubeClient**: A wrapper around the Kubernetes API client, used to interact with the cluster.
3. **Echo Server**: An HTTP server implementation based on the LabStack Echo framework.

## Usage:

### Pre-requisites

**`kube-watchtower` relies on `~/.kube/config` file to authenticate kubernetes.**

### Running the Application

To run the Kube-Watchtower application, simply execute the following command in your terminal:

1. Clone the repository

2. Build from source

```bash
make build
```

3. Run with remote cluster configuration

```bash
./tmp/kube-watchtower remotecluster
```

The application will start and listen for incoming requests on port 8081.

## Getting Started:

To get started with the Kube-Watchtower, follow these steps:

1. Clone this repository.
2. Run `go mod init` to initialize the Go module.
3. Run `go run main.go` to start the application.
4. Explore the available API endpoints using your preferred HTTP client or a tool like curl.

## License:

The Kube-Watchtower is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Contributing:

We welcome contributions to the Kube-Watchtower! If you're interested in contributing, please review our [contributor guidelines](docs/contributor-guidelines.md).
