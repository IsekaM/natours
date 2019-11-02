// Require Module
const app = require('./app');

// Just Some Vars
const port = process.env.PORT || 3000;

// Functions
const log = console.log;
const logServerStartUp = () => log('Server started...');

// Exposing server to the world
app.listen(port, logServerStartUp);
