FROM node:20

# Set working directory at the repo root
WORKDIR /usr/src/app

# Copy the API package.json and root-level yarn.lock
COPY api/package.json yarn.lock ./

# Install dependencies

RUN yarn install --production=false

# Copy the entire API folder, preserving its structure
COPY api/ ./api/

# Run Prisma generate with the schema path adjusted for the preserved structure
RUN npx prisma generate --schema=./api/prisma/schema.prisma

# Change working directory to the API folder for running the application
WORKDIR /usr/src/app/api

EXPOSE 3000
CMD ["yarn", "start"]
