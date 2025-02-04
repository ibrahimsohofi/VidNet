FROM node:18

# Install yt-dlp
RUN apt-get update && apt-get install -y curl
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
RUN chmod +x /usr/local/bin/yt-dlp

# Copy and install Node.js dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Copy application code
COPY . .

# Start the application
CMD ["node", "index.js"]