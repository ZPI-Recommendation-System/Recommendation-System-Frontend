# Base image
FROM node:18

# Create app directory
WORKDIR /frontend

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install
RUN npm install react-scripts@3.4.1 -g

# Bundle app source
COPY . .

# Start the server using the production build
CMD [ "npm", "start" ]
