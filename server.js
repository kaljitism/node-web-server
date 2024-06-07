const http = require('node:http');
const fs = require('node:fs/promises');

const server = http.createServer();

server.on('request', async (request, response) => {
  if (request.url === '/' && request.method === 'GET') {
    response.setHeader('Content-Type', 'text/html');
    
    const fileHandle = await fs.open('./static/index.html', 'r');
    const fileStream = fileHandle.createReadStream();
    
    fileStream.pipe(response);
  }
  
  if (request.url === '/styles.css' && request.method === 'GET') {
    response.setHeader('Content-Type', 'text/css');
    
    const fileHandle = await fs.open('./static/styles.css');
    const fileStream = fileHandle.createReadStream();
    
    fileStream.pipe(response);
  }
  
  if (request.url === '/scripts.js' && request.method === 'GET') {
    response.setHeader('Content-Type', 'text/js');
    
    const fileHandle = await fs.open('./static/scripts.js', 'r')
    const fileStream = fileHandle.createReadStream();
    
    fileStream.pipe(response);
  }
});


server.listen(9000, () => {
  console.log('Web Server is live at http://127.0.0.1:9000');
});
