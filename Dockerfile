# Use lightweight Nginx alpine base image
FROM nginx:alpine-slim

# Copy custom Nginx configuration if provided (optional, using default here or custom)
# Set working directory to Nginx html folder
WORKDIR /usr/share/nginx/html

# Remove default Nginx welcome page files
RUN rm -rf ./*

# Copy application static files into Nginx web root
COPY index.html style.css script.js ./

# Expose port 80 for HTTP traffic
EXPOSE 80

# Add healthcheck to monitor container status
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start Nginx in foreground mode
CMD ["nginx", "-g", "daemon off;"]
