# https://hub.docker.com/_/node
FROM node:18.14.0-alpine3.16 as builder
COPY . /

RUN npx pnpm i --registry https://registry.npmmirror.com
RUN pnpm build

FROM harbor.pegasus.tech/infra/base-os/nginx:1.21.5
COPY docker/40-modify.sh /docker-entrypoint.d
COPY --from=builder /dist/ /usr/share/nginx/html/
