FROM node:latest as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /user/share/nginx/html

EXPOSE 80