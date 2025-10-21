FROM node:18-alpine

WORKDIR /usr/src/app

# copy package first for caching
COPY app/package*.json ./
RUN npm ci

COPY app/ .

EXPOSE 3000

CMD ["node", "server.js"]