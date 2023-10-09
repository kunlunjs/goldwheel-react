# https://hub.docker.com/_/node
FROM node:18.17.1-alpine3.18 as builder
COPY . /

RUN npm i -g pnpm
RUN pnpm i --registry https://registry.npmmirror.com
RUN pnpm build

# :1.21.5
FROM nginx
# COPY docker/40-modify.sh /docker-entrypoint.d
COPY --from=builder /dist/ /usr/share/nginx/html/
