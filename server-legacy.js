const http = require('node:http');
const fs = require('node:fs/promises');

const serverLegacy = http.createServer();

serverLegacy.on('request', async (request, response) => {
  /// File Routes
  
  // Serving HTML
  if (request.url === '/' && request.method === 'GET') {
    response.setHeader('Content-Type', 'text/html');
    
    const fileHandle = await fs.open('./static/index.html', 'r');
    const fileStream = fileHandle.createReadStream();
    
    fileStream.pipe(response);
  }
  
  // Serving CSS
  if (request.url === '/styles.css' && request.method === 'GET') {
    response.setHeader('Content-Type', 'text/css');
    
    const fileHandle = await fs.open('./static/styles.css');
    const fileStream = fileHandle.createReadStream();
    
    fileStream.pipe(response);
  }
  
  // Serving JavaScript
  if (request.url === '/scripts.js' && request.method === 'GET') {
    response.setHeader('Content-Type', 'text/js');
    
    const fileHandle = await fs.open('./static/scripts.js', 'r')
    const fileStream = fileHandle.createReadStream();
    
    fileStream.pipe(response);
  }
  
  /// JSON Routes
  
  // Login Route
  if (request.url === '/login' && request.method === 'POST') {
    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 200;
    
    const body = {
      message: 'Logging you in',
    }
    
    response.end(JSON.stringify(body));
  }
  
  // User Route
  if (request.url === '/user' && request.method === 'PUT') {
    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 401;
    
    const body = {
      message: 'You have to login first!',
    }
    
    response.end(JSON.stringify(body));
  }
  
  /// Advanced Routes
  
  // Upload Route
  if (request.url === '/upload' && request.method === 'PUT') {
    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 200;
    
    const fileHandle = await fs.open('./storage/image.jpeg', 'w');
    const fileStream = fileHandle.createWriteStream();
    
    request.pipe(fileStream);
    
    const body = {message: 'File uploaded successfully!',}
    
    request.on('end', () => {
      response.end(JSON.stringify(body));
    })
  }
});

serverLegacy.listen(9000, () => {
  console.log('Web Server is live at http://127.0.0.1:9000');
});
