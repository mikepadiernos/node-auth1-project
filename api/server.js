const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const middle = require('./middleware/middleware.js');

const logger = middle.logger;

const server = express();

const sessionConfig = {
	name: 'fudge-stripes-minis',
	secret: 'supercalifragilisticexpialidocious',
	cookie: {
		maxAge: 3600 * 1000,
		secure: false, // should be true in production
		httpOnly: true
	},
	resave: false,
	saveUninitialized: false,

	store: new knexSessionStore(
		{
			knex: require("../data/db-config.js"),
			tablename: "sessions",
			sidfieldname: "sid",
			createtable: true,
			clearInterval: 3600 * 1000
		}
	)
}
server.use(helmet(), logger, express.json(), cors());

const users = require('./routers/users-router.js');

server
	.route('/')
	.get((req, res) => {
		res.send(`Buckle this! Ludicrous speed, GO!`);
	});

server.use(session(sessionConfig));

server.use('/api/users', users);
server.use('/users', users);

module.exports = server;
