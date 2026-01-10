# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.20.0

# Base stage with Node.js and dependencies installation
FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

# Build stage to compile the frontend application
FROM base as build

COPY . .
RUN npm run build

# Final stage to serve the built application using Nginx
FROM base as final

FROM nginx:alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
