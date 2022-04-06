FROM node:16
WORKDIR /usr/src/survey-api
COPY package.json .
RUN npm install