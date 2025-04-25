# Dockerfile for auth-service
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Allow .env to be passed at runtime (docker-compose will mount it)
EXPOSE 4002
CMD ["node", "index.js"]
