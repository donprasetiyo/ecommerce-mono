aws ecr get-login-password --region $3 | docker login --username AWS --password-stdin $2

docker build --platform linux/amd64 -t $1 -f apps/$1/Dockerfile .

docker tag $1:latest $2:latest

docker push $2:latest