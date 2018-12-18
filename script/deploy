#!/bin/bash

if  [[ $TRAVIS_PULL_REQUEST = "false" ]]
then
    cd _site || exit
    ncftpput -R -v -u "$USERNAME" -p "$PASSWORD" "$HOST" . .
fi
