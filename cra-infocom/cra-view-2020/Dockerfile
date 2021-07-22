FROM node:12.7-alpine AS build
ARG cible=production
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration=$cible

FROM nginx:1.17.1-alpine
COPY --from=build /usr/src/app/dist/craV2UI /usr/share/nginx/html
