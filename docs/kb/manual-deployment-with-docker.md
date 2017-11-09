Manual Deployment with Docker
=============================

This is a short docker guide.

### Concept
Docker containers are "lightweight VMs" based on linux.

### Vocabulary
- Docker image: a file system and parameters to use at runtime.
- Docker container: a running instance of an image.
- Docker registry: server application that stores and lets you distribute Docker images.


## Build, tag and push docker image manually
To build and tag it. Make sure to run the command in the project root folder.
  ```
  docker build -t {app-name}:{tag} -f ./pipeline/ship/Dockerfile .
  ```
To push the built image to the repository:
  ```
  docker push {app-name}:{tag}
  ```

## Run container locally

Run the server
  ```
  $docker run -e SPRING_PROFILES_ACTIVE=dev -p 9082:9082 {app-name}:{tag}
  ```

Run interactive bash. Useful if you want to access the terminal to check files or run scripts within the container.
  ```
  docker run -it docker.wds.io:5000/{app-name}:{tag} /bin/bash
  ```

You can stop docker container by:

Getting the container hash
  ```
  $docker ps
  ```
Then use the container hash to stop it
  ```
  $docker stop <hash>
  ```
