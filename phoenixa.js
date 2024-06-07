const http = require("node:http");
const fs = require('node:fs/promises');

class Phoenixa {
  constructor() {
    this.server = http.createServer();
    this.routes = {};
    
    this.server.on('request', (request, response) => {
      // Sending a file back to the client
      response.sendFile = async (path, mimeType) => {
        const fileHandle = await fs.open(path, 'r');
        const fileStream = fileHandle.createReadStream();
        
        response.setHeader('Content-Type', mimeType);
        
        fileStream.pipe(response);
      };
      
      this.routes[request.method.toLowerCase() + request.url](request, response);
    });
  }
  
  listen(port, callback) {
    this.server.listen(port,  () => {
      callback();
    });
  }
  
  route(httpMethod, route, callback) {
    this.routes[httpMethod + route] = callback;
  }
}

module.exports = Phoenixa;
