aws ecr get-login-password --region $3 | docker login --username AWS --password-stdin $2

docker build --platform linux/amd64 -t $1 -f tooling/docker/$5/Dockerfile . --build-arg APP_NAME=$1 --build-arg PORT=$4 --build-arg KAFKA_SSL_SECRETS_DIR=$6

docker tag $1:latest $2:latest

docker push $2:latest