#!/bin/bash

# Login to Docker Hub
docker login

# Build the images
docker compose build

# Push the images to Docker Hub
docker push ${DOCKER_USERNAME}/todo-mern-frontend:latest
docker push ${DOCKER_USERNAME}/todo-mern-backend:latest