# Step 1: Build the React app
FROM node:14 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve the React app with http-server
FROM node:14 as production
RUN npm install -g http-server
WORKDIR /app
COPY --from=build /app/build /app/build
EXPOSE 5173
CMD ["http-server", "-p", "5173"]
