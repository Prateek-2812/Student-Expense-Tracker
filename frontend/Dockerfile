# Stage 1: build the frontend
FROM node:18-alpine AS builder
LABEL stage=builder

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Install dependencies (use package-lock or yarn.lock if present)
COPY package*.json ./
RUN npm ci --silent

# Copy source and build
COPY . .
# If your project uses a different build command adjust accordingly
RUN npm run build --if-present

# Stage 2: serve with nginx
FROM nginx:stable-alpine
LABEL stage=final

# Remove default static files and add a lightweight nginx config
RUN rm -rf /usr/share/nginx/html/* \
 && mkdir -p /usr/share/nginx/html /var/cache/nginx \
 && cat > /etc/nginx/conf.d/default.conf <<'EOF'
server {
    listen       80;
    server_name  _;
    root   /usr/share/nginx/html;
    index  index.html;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_min_length 256;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets aggressively
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Copy built app from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port and add a basic healthcheck
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]