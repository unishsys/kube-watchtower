# Build the application from source
FROM golang:1.22 AS build-stage

WORKDIR /kube-watchtower


COPY . .

RUN go mod tidy
RUN go build -o appbin .

# Run the tests in the container
FROM build-stage AS run-test-stage
RUN go test -v ./...

# Deploy the application binary into a lean image
FROM debian:bookworm-slim AS build-release-stage

WORKDIR /

COPY --from=build-stage /kube-watchtower/appbin /mapper

EXPOSE 8080