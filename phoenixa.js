const http = require('node:http');
const fs = require('node:fs/promises');

class Phoenixa {
  constructor() {
    this.server = http.createServer();
    this.routes = {};
    
    this.server.on('request', (request, response) => {
      // Set the status code of the response
      response.status = (code) => {
        response.statusCode = code;
        return response;
      };
      
      // Send JSON data back to the client (for small JSON Data less than highWaterMarkValue)
      response.json = (data) => {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(data));
      };
      
      // Sending a file back to the client
      response.sendFile = async (path, mime) => {
        const fileHandle = await fs.open(path, 'r');
        const fileStream = fileHandle.createReadStream();
        
        response.setHeader('Content-Type', mime);
        
        fileStream.pipe(response);
      };
      
      // If the routes object does not have a key of request.method + request.url,
      // return 404
      if (!this.routes[request.method.toLowerCase() + request.url]) {
        return response.status(404).
            json({error: `Cannot find route ${request.method} ${request.url}`});
      }
      
      this.routes[request.method.toLowerCase() + request.url](request,
          response);
    });
  }
  
  listen(port, callback) {
    this.server.listen(port, () => {
      callback();
    });
  }
  
  route(method, route, callback) {
    this.routes[method + route] = callback;
  }
}

module.exports = Phoenixa;
