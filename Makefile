SERVICE := mapper
NAMESPACE := default
TAG := beta
REPO := bysabbir/k8s-cm-mapper


.PHONY:
image:
	go mod vendor && \
	docker build -f docker/Dockerfile -t $(REPO):$(TAG) .

push:
	docker push $(REPO):$(TAG)

uninstall-helm:
	@helm uninstall $(SERVICE)

install-helm:
	@helm upgrade --install --set $(SERVICE).image="$(REPO):$(TAG)" $(SERVICE) ./helm/k8s-config-mapper -n $(NAMESPACE)

kube-up: image push install-helm