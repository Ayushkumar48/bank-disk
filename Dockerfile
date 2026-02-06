FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies (try bun, then pnpm, yarn, npm)
RUN set -e && \
    if command -v bun >/dev/null 2>&1; then PM=bun; \
    elif command -v pnpm >/dev/null 2>&1; then PM=pnpm; \
    elif command -v yarn >/dev/null 2>&1; then PM=yarn; \
    elif command -v npm >/dev/null 2>&1; then PM=npm; \
    else echo "No package manager found"; exit 1; fi && \
    $PM install --frozen-lockfile && \
    apt-get update && apt-get install -y postgresql-client

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Run the app (detect PM for dev)
CMD sh -c "if command -v bun >/dev/null 2>&1; then PM=bun; elif command -v pnpm >/dev/null 2>&1; then PM=pnpm; elif command -v yarn >/dev/null 2>&1; then PM=yarn; elif command -v npm >/dev/null 2>&1; then PM=npm; else echo 'No PM'; exit 1; fi && $PM run dev"
