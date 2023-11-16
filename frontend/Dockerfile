FROM node:18-alpine

WORKDIR /library_frontapp

COPY package.json .

RUN npm i

COPY . .

CMD [ "npm", "run", "dev" ]