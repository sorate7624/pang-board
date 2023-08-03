FROM node:16

WORKDIR /app
COPY package.json package-lock.json /app/
COPY . /app/

RUN npm install -g npm-run-all

RUN npm install
RUN npm run build

CMD ["npm", "start"]