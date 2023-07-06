#Todo

docker build -t banhjiwebapi .

docker run -p 80:4000 -d --name webapi banhjiwebapi