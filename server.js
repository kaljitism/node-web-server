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
