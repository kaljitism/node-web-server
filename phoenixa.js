const http = require("node:http");

class Phoenixa {
  
  constructor() {
    this.server = http.createServer();
    
  }
  
  listen  = (port, callback) => {
    this.server.listen(port,  () => {
      callback();
    });
  }
  
}

module.exports = Phoenixa;
