#!/bin/sh

set -e

if [ "$NODE_ENV"=="development" ]; then
    sed -i.bak 's/goldwheel-api.tech/goldwheel-api-dev.tech/g' /usr/share/nginx/html/*.js
fi

exit 0
