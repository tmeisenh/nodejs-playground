'use strict';

const Hapi = require('hapi');

const Pack = require('../package');
const Config = require('./config');
const Echo = require('./echo');

var server = new Hapi.Server();

server.connection({
  host: Config.host,
  port: Config.port
});

const options = {
  info: {
    'title': 'Test API Documentation',
    'version': Pack.version,
  }
};

server.register([
  Echo
], (err) => {
  if (err) {
    console.error(err); // eslint-disable-line no-console
  } else {
    server.start(() => {
      console.log('Server started at: ' + server.info.uri); // eslint-disable-line no-console
    });
  }
});
