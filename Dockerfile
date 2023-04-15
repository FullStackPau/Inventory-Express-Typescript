FROM node:19
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . .
EXPOSE 8000