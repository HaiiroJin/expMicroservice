# Dockerfile for produit-service
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Copy env file if present (docker-compose will mount it for dev)
EXPOSE 4000
CMD ["node", "index.js"]
