IMAGE_REPO=us.icr.io/redsonja_hyboria
IMAGE_NAME=burpees-collector
IMAGE_TAG=latest

IMG=${IMAGE_REPO}/${IMAGE_NAME}:${IMAGE_TAG}

#local/burpees-collector:latest
build-local:
	eval $(minikube -p minikube docker-env) && docker build -t local/${IMAGE_NAME}:${IMAGE_TAG} .

docker-build:
	docker build . -t ${IMG}

docker-push: docker-build
	docker push ${IMG}


run-docker-local: build-local
	-docker kill speech-met-collector
	docker run -t --name=speech-met-collector --rm \
	-e PORT=8085 \
	-p 8085:8085 \
	local/${IMAGE_NAME}:${IMAGE_TAG}

run-local:
	nodemon server.js
