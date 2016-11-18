"use strict";

class EchoHandler {

  echo(request, reply) {
    reply({msg: request.params.str})
  }
}

module.exports = EchoHandler;
