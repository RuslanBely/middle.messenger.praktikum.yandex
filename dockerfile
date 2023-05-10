FROM node:18.16.0-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build && npm prune --production

EXPOSE 3000

CMD ["node", "./server.js"]
