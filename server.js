// Require Module
const dotenv = require('dotenv');
const app = require('./app');

// Just Some Vars
const port = process.env.PORT || 3000;

// Env vars
dotenv.config();

// Functions
const { log } = console;
const logServerStartUp = () => log(`Server started on port: ${port}`);

// Exposing server to the world
app.listen(port, logServerStartUp);
