const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const middle = require('./middleware/middleware.js');

const logger = middle.logger;
const restricted = middle.restrict;

const server = express();

server.use(helmet(), logger, express.json(), cors());

const users = require('./routers/users-router.js');

server
	.route('/')
	.get((req, res) => {
		res.send(`Buckle this! Ludicrous speed, GO!`);
	});

server.use('/api/users', users);
server.use('/users', users);

module.exports = server;
