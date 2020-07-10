#!/bin/bash

docker-compose down
sudo chmod -R 777 database/
docker-compose build
docker-compose up
