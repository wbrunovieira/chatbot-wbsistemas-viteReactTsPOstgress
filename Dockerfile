FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm run dev

COPY . .

EXPOSE 5173

CMD ["npx", "vite"]
