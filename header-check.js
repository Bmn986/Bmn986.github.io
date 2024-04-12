// Import the http module
import http from 'http';
import fs from 'fs';

// Create a server
http.createServer((req, res) => {
  // Check if the request is for index.html
  if (req.url === '/index.html') {
    // Get the Origin and Referer headers
    const origin = req.headers.origin;
    const referer = req.headers.referer;

    // Log the headers
    console.log(`Origin: ${origin}`);
    console.log(`Referer: ${referer}`);

    // Check the headers
    if (origin === 'http://expected-origin.com' && referer === 'http://expected-referer.com') {
      // If the headers are as expected, serve the index.html file
      fs.readFile('./index.html', (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end('Error loading index.html');
        } else {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(data);
        }
      });
    } else {
      // If the headers are not as expected, send a 403 Forbidden response
      res.writeHead(403);
      res.end('Forbidden');
    }
  } else {
    // If the request is not for index.html, send a 404 Not Found response
    res.writeHead(404);
    res.end('Not Found');
  }
}).listen(8080); // The server listens on port 8080