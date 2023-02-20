# https://hub.docker.com/_/node
# https://harbor.pegasus.tech/harbor/projects/4/repositories/node18.14.1-alpine3.16-pnpm
FROM harbor.pegasus.tech/pbdata/node18.14.1-alpine3.16-pnpm:7.27.1 as builder
COPY . /

RUN npx pnpm i --registry https://registry.npmmirror.com
RUN pnpm build

FROM harbor.pegasus.tech/infra/base-os/nginx:1.21.5
COPY docker/40-modify.sh /docker-entrypoint.d
COPY --from=builder /dist/ /usr/share/nginx/html/
