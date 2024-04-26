# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /app
COPY package*.json .
COPY app/ app/
COPY app.js app.js

RUN npm install
CMD ["node", "app.js"]
EXPOSE 2024
