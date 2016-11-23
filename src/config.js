"use strict";

class Config {
  constructor() {
    this.host = "0.0.0.0";
    this.port = 3000;
    this.db_user = "system";
    this.db_password = "oracle";
    this.db_connectstring = "localhost:1521/xe.oracle.docker";
  }
}

const config = new Config();
module.exports = config;
