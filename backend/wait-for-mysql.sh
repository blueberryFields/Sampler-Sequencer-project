#!/bin/bash
# wait-for-mysql.sh

# Set locale to binary, needed to make 'tr'-command work on macOS
LC_CTYPE=C

# Test flags
set -e

# Set variables from flags  
host="$1"
shift
cmd="$@"

# check for a connection to the database server
check=$(curl -s --fail $host:3306 --output - | tr -d '\0')

while [ -z "$check" ]; do
    # wait a moment
    echo Database not running yet, sleep for 1 second...
    sleep 1s

    # check again
    check=$(curl -s --fail $host:3306 --output - | tr -d '\0')
done

#If running, start container
echo Database running, starting container...
exec $cmd
