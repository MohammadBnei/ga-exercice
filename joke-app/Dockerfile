FROM node:16 AS builder
WORKDIR "/app"
COPY . .
RUN npm i
RUN npm run build
RUN npm prune --production
FROM node:16-alpine AS production
WORKDIR "/app"
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/views ./views
COPY --from=builder /app/node_modules ./node_modules
CMD [ "sh", "-c", "npm run start:prod"]