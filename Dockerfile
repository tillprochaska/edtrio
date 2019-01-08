# Use Node.js version 10
FROM mhart/alpine-node:10

# Set the working directory
WORKDIR /usr/src

# Copy package manager files to the working directory and run install
COPY package.json package-lock.json ./
RUN npm install

# Copy all files to the working directory
COPY . .

# Build the app and move the resulting build to the `/public` directory
RUN REACT_APP_SHOW_PREVIEW_BUTTON=TRUE
RUN REACT_APP_ENV=development npm run build
RUN mv ./build /public