FROM node:26-slim

WORKDIR /frontend

COPY package*.json ./

RUN npm ci

COPY . .

ENV NODE_ENV=production

ARG BACKEND_URL

ENV BACKEND_URL=$BACKEND_URL

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]