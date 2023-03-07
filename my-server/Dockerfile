FROM strapi/base

WORKDIR /app

COPY ./package*.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 1337

CMD ["npm", "start"]