ARG NGINX_VERSION=1.27.3

FROM node:22.18.0-alpine AS build-frontend
WORKDIR /app
COPY admin/package.json admin/yarn.lock admin/tailwind.config.ts ./
COPY admin/patches ./patches
RUN yarn install --non-interactive
ARG API_BASE_URI
COPY admin ./
RUN NODE_ENV=production yarn build

RUN apk add --no-cache findutils gzip brotli && \
    find ./dist \( \
        -name "*.html" -o \
        -name "*.js" -o \
        -name "*.css" -o \
        -name "*.svg" -o \
        -name "*.txt" -o \
        -name "*.json" -o \
        -name "*.xml" -o \
        -name "*.webmanifest" \
    \) -type f -size +1k -print | while read -r file; do \
        gzip -c9 "$file" > "$file.gz" && \
        brotli -Z "$file" -o "$file.br"; \
    done

FROM nginx:${NGINX_VERSION}-alpine3.20
ARG NGINX_VERSION
COPY --from=build-frontend /app/dist /var/www/html
COPY nginx/config/nginx.conf /etc/nginx/nginx.conf
COPY nginx/config/default.conf /etc/nginx/conf.d
COPY --from=nginx-brotli-build /nginx-build/nginx-${NGINX_VERSION}/objs/ngx_http_brotli_static_module.so /usr/lib/nginx/modules