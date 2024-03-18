SERVICE := mapper
NAMESPACE := default
REPO := bysabbir/k8s-cm-mapper
TAG := $(shell git describe --abbrev=0 --tags)-$(shell git rev-parse --short HEAD)


.PHONY:
image:
	go mod vendor && \
	docker build -f docker/Dockerfile -t $(REPO):$(TAG) . && \
	docker tag $(REPO):$(TAG) $(REPO)

push:
	docker push $(REPO):$(TAG) && docker push $(REPO)

uninstall-helm:
	@helm uninstall $(SERVICE)

install-helm:
	@helm upgrade --install --set $(SERVICE).image="$(REPO):$(TAG)" $(SERVICE) ./helm/k8s-kube-watchtower -n $(NAMESPACE)

kube-up: image push install-helm

docker-up:
	docker compose -f docker/compose.yaml up --build -d