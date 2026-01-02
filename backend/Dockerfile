# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.20.0

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

COPY . .

FROM base AS final

ENV NODE_ENV=production

USER node

EXPOSE 5000

# Run the application.
CMD ["node", "src/server.js"]
