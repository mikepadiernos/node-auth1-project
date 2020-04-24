const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const middle = require('./middleware/middleware.js');
const config = require('./sessions/user-session.js');

const logger = middle.logger;
const sessionConfig = config.sessionConfig;

const server = express();

server.use(helmet(), logger, express.json(), cors());

const users = require('./routers/users-router.js');

server
	.route('/')
	.get((req, res) => {
		res.send(`AH! BUCKLE THIS! Ludicrous speed GO!`);
	});

server.use(session(sessionConfig));

server.use('/api/users', users);
server.use('/users', users);

module.exports = server;
