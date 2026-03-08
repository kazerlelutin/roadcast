# Cache buster - force rebuild
FROM docker.io/oven/bun:1.3 AS builder
WORKDIR /app
COPY . .
RUN bun install --frozen-lockfile
RUN bun run build

FROM docker.io/oven/bun:1.3
WORKDIR /app

COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/roadcast /app/roadcast
COPY --from=builder /app/public /app/public
COPY --from=builder /app/index.html /app/index.html

EXPOSE 3000
CMD ["/app/roadcast"]