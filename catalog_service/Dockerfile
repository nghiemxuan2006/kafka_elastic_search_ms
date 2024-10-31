FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

# CMD ["yarn", "dev"]
CMD ["sh", "-c", "npx prisma migrate dev && yarn dev"]