# Dockerfile for React frontend
FROM node:20-alpine AS build
WORKDIR /app

# Copy source
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# 👇 Inject the environment variable at build time
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

# 👇 Build frontend
RUN npm run build

# Serve with nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]