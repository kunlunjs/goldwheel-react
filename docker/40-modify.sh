#!/bin/sh

set -e

# this file must have -x permission, then it can be executed by nginx's entrypoint script

if [ "$NODE_ENV" = "development" ]; then
    sed -i.bak 's/goldwheel-api.tech/goldwheel-api-dev.tech/g' /usr/share/nginx/html/*.js
fi

# add image tag
sed -i.bak 's/__IMAGE_TAG__/'"$IMAGE_TAG"'/g' /usr/share/nginx/html/*.js

# set client_max_body_size
sed -i.bak '/server_name  localhost/a\    client_max_body_size '"$CLIENT_MAX_BODY_SIZE"';' /etc/nginx/conf.d/default.conf

exit 0
