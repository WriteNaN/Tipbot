#!/bin/bash

echo "would you like to stop all existing images? (y/N)"
read answer

if [[ "$answer" =~ ^[Yy]$ ]]; then
    echo "stopping running containers.."
    docker stop $(docker ps -a -q)
    echo "done."
else
    echo "no action taken."
fi

echo "please make sure you know what you're about to do. you can choose N if you want to manage containers yourself."
docker system prune -a
docker build --pull -t tipbot .

docker run -p 3000:3000 tipbot