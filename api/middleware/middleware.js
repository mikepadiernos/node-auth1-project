const logger = (req, res, next) => {
	const method = req.method;
	const endpoint = req.originalUrl;
	const date = new Date();
	console.log(`A ${method} request to ${endpoint} initiated on ${date.toDateString()}`);
	next()
};

const restrict = (req, res, next) => {
	req.session && req.session.user
		? next()
		: res.status(401).json({ success: false, message: 'Unable to log in' })
}

module
	.exports = {
		logger,
		restrict,
	};