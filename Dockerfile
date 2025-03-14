FROM node:20

# Set working directory at the repo root
WORKDIR /usr/src/app

# Copy the root-level yarn.lock and the API package.json
COPY api/package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the entire API folder preserving its structure
COPY api/ ./api/

# Run Prisma generate with the correct schema path
RUN npx prisma generate --schema=./api/prisma/schema.prisma

EXPOSE 3000
CMD ["yarn", "start"]
