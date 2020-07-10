#!/bin/bash

# check for a connection to the database server
#
check=$(curl -s --fail db:3306 --output - | tr -d '\0')

while [ -z "$check" ]; do
    # wait a moment
    #
    echo Database not running yet, sleep for 1 second...
    sleep 1s

    # check again
    #
    check=$(curl -s --fail db:3306 --output - | tr -d '\0')
done

#If running, start container
echo Database running, starting container...
java -Djava.security.egd=file:/dev/./urandom -server -Dspring.profiles.active=prod -jar /opt/training/training.jar
