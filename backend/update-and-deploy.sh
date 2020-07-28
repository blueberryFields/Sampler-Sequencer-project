#!/bin/bash

# Shut down docker-compose if running  
docker-compose down

# Fix r/w rights on database file
sudo chmod -R 777 database/

# Build frontend
cd .. && cd frontend && cd seqarc && 
npm run build
cd .. && cd .. && cd backend

# build backend
docker-compose build

# Bring up project
docker-compose up
