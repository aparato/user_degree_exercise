FROM node:slim
WORKDIR /app
ENV NODE_ENV development
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 3000
CMD npx pm2 start process.yml && tail -f /dev/null
