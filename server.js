// Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 6081, () => {
//     console.log(`Server running on ${(process.env.PORT || 6081)}`);
// });

// var port = process.env.PORT || 6081;
// app.listen(port, function() {
//   console.log('Express server listening on port ' + port);
// });

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: false
}));
// Point static path to dist
app.use(express.static(path.join(__dirname, '/dist/')));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, '/dist/'));
});

// Get port from environment and store in Express.
const port = process.env.PORT || '6081';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port, () =>  console.log(`APP is running on localhost: ${port}`))