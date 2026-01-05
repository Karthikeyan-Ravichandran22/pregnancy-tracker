FROM node:18-slim

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY server.js .
COPY public ./public

# Create data directory for volume mounting
RUN mkdir -p data

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "start"]
