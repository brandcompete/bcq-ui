# ── Build stage ──────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Production stage ──────────────────────────────────────────────────────────
# Pinned on purpose - do not change to the unpinned nginx:alpine. The current nginx:alpine
# (nginx 1.31 on a newer Alpine/musl) cannot start on web01 (CentOS 7, Docker 26.1.4 - the last
# release for el7): Docker's seccomp filter rejects the syscall musl now uses for pwrite(), and
# nginx dies with 'pwrite() "/run/nginx.pid" failed (1: Operation not permitted)'.
# 1.29-alpine was tested on web01 on 18.11.2026 and runs. Same version as the aiman.rocks site.
FROM nginx:1.29-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 9085

CMD ["nginx", "-g", "daemon off;"]
