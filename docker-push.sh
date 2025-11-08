#!/bin/bash

docker login

docker compose build

docker push javaria725/todo-mern-frontend:latest
docker push javaria725/todo-mern-backend:latest
