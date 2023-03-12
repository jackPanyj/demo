FROM node:18
WORKDIR /usr/app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]
