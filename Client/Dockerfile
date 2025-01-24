# Step 1: Build the app using a Node.js image
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if you have it)
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app for production using Vite
RUN npm run build || (echo "Build failed" && exit 1)

# Step 2: Serve the app using a lightweight web server (Nginx)
FROM nginx:alpine

# Copy the build files from the previous stage
# Vite's build output is in the 'dist' folder, not 'build'
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
