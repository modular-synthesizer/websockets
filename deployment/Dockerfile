FROM node:18-buster

RUN mkdir -p /usr/src/websockets
WORKDIR /usr/src/websockets
COPY . .

EXPOSE 3000

RUN npm install

ENTRYPOINT ["deployment/entrypoint.sh"]