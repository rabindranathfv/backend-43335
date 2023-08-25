FROM node:16-alpine

# crea un directorio para nuestra API
RUN mkdir -p /usr/src/app

# Defino el directorio de trabajo y donde estare ubicado
WORKDIR /usr/src/app

# copio los package json
COPY package*.json ./

# copio todos los archivos de la API hacia el contedor
COPY . .

RUN npm install

ENV NODE_ENV=production

EXPOSE 6000

CMD ["npm", "run", "start:prod"]