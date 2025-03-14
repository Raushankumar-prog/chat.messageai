FROM node:20

# Set working directory to the repo root
WORKDIR /usr/src/app

# Copy the repo-level package.json and yarn.lock (for workspaces)
COPY package.json yarn.lock ./

# Install all dependencies (including those for the API)
RUN yarn install

# Copy the entire repository into the image
COPY . .

# Run Prisma generate and explicitly point to the schema location
RUN npx prisma generate --schema=./api/prisma/schema.prisma

# Expose the port
EXPOSE 5000

# Start the application
CMD ["yarn", "start"]
