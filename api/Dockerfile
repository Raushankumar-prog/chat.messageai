# Use the official Node.js image.
FROM node:19.7.0

# Set the working directory.
WORKDIR /usr/src/app

# Copy package.json and yarn.lock first for better caching.
COPY package.json ../yarn.lock ./


# Install dependencies.
RUN yarn install 

# Copy the rest of the application files.
COPY . .

# Set environment variable
ENV NODE_ENV=production

# Generate Prisma client
RUN npx prisma generate

# Expose the port the app runs on.
EXPOSE 3000

# Start the application.
CMD ["yarn", "start"]
