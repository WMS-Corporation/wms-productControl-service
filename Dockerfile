# Use an official Node runtime as a parent image
FROM node:20.18.0-alpine

# Set the working directory to /app
WORKDIR /wms-productControl-service

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose port 4002 for the application to run on
EXPOSE 4002

# Start the application
CMD ["node", "index.js"]
