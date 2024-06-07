const Phoenixa = require('./phoenixa');

const PORT = 4060;

// Defining server and listening
const server = new Phoenixa();
server.listen(PORT, () => {
  console.log(`Server live on http://localhost:${PORT}`);
});

// Routes
server.route('get', '/', (request, response) => {
  response.sendFile('./static/index.html', 'text/html');
});

// server.route('post', '/upload', (request, response) => {
//   response.sendFile('./storage/image.jpeg', 'image/jpeg');
// });
