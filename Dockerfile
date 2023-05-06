FROM node:18

WORKDIR ./auth

COPY package.json .
# COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3031

CMD npm start
