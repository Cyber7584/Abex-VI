FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install pm2 -g
RUN npm install concurrently -g
RUN npm install jest -g
RUN npm install

RUN apt-get update && apt-get install -y libaio1

RUN chown node:node -R /usr/src/app/node_modules

USER node
EXPOSE 8080

CMD [ "node", "server.js" ]
