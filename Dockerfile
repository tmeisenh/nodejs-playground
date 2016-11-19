FROM collinestes/docker-node-oracle:6

ARG APP_DIR=/usr/src/node_playground
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

COPY package.json $APP_DIR
RUN npm install

# Bundle app source
COPY ./src $APP_DIR/src

EXPOSE 3000
CMD [ "npm", "start" ]
