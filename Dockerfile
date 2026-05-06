FROM node:20-alpine

ENV NODE_ENV=production \
    PORT=3000

WORKDIR /app

# Install only production dependencies first so this layer caches well.
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY src ./src
COPY public ./public
COPY config.json ./config.json

EXPOSE 3000
USER node

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/info >/dev/null 2>&1 || exit 1

CMD ["node", "src/server.js"]
