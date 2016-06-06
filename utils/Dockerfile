FROM node:argon

# Create chirp directory
RUN mkdir /usr/src/chirp
WORKDIR /usr/src/chirp

# Bundle app source
COPY src /usr/src/chirp

# Install dependencies
RUN npm install bcrypt
RUN npm install

# Expose default node port
EXPOSE 3000

ENV MDB=mongodb://mongodb:27017/chirp?autoReconnect=true

CMD ["node", "app.js"]

