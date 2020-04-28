const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

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
			knex: require("../../data/db-config.js"),
			tablename: "sessions",
			sidfieldname: "sid",
			createtable: true,
			clearInterval: 3600 * 1000
		}
	)
}

module
	.exports = {
		sessionConfig,
};