const compression = require('compression');
//Install express server
const express = require('express');
const fallback = require('express-history-api-fallback');
const app = express();

// compress all responses
app.use(compression());

// Serve only the static files form the dist directory
var root = __dirname + '/dist';
app.use(express.static(root));

app.use(fallback('index.html', { root: root }));

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 6081, () => {
    console.log(`Server running on ${(process.env.PORT || 6081)}`);
});