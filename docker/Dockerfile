# https://hub.docker.com/_/node
FROM node18.14.1-alpine3.16 as builder
COPY . /

RUN npm i -g pnpm
RUN pnpm i --registry https://registry.npmmirror.com
RUN pnpm build

FROM nginx:1.21.5
COPY docker/40-modify.sh /docker-entrypoint.d
COPY --from=builder /dist/ /usr/share/nginx/html/
