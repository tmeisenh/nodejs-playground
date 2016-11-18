'use strict';

const EchoHandler = require('./echo-handler');

function register(server, options, next) {
  server.route({
    method: 'GET',
    path: '/echo/{str}',
    handler: function(request, reply) {
      let eh = new EchoHandler();
      eh.echo(request, reply);
    },
    config: {
      description: 'Get echo',
      notes: 'echos the incoming str',
      tags: ['api']
    }
  });

  return next();
}

register.attributes = {
  name: 'echo'
};

module.exports = register;
