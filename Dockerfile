FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy the API package.json and the root yarn.lock into the container
COPY api/package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy all the files from the API folder into the container
COPY api/ .

# Generate the Prisma client (assuming schema.prisma is now at /usr/src/app)
RUN npx prisma generate --schema=./api/prisma/schema.prisma

# Expose the port the app listens on
EXPOSE 5000

# Start the application
CMD ["yarn", "start"]


