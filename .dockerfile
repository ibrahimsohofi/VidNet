# Use the official Node.js image as a base
FROM node:16

# Install dependencies required by yt-dlp-exec (including Python)
RUN apt-get update && apt-get install -y \
  python3 \
  python3-pip \
  python3-dev \
  build-essential \
  curl \
  ffmpeg

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm dependencies
RUN npm ci

# Copy the rest of the project files
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]
