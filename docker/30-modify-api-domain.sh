#!/bin/sh

set -e

if [ "$NODE_ENV"=="development" ]; then
    sed -i.bak 's/dataportal-api.pegasus.tech/dataportal-api-dev.pegasus.tech/g' /usr/share/nginx/html/*.js
fi

exit 0
