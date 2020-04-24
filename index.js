const server = require("./api/server.js");

const PORT = process.env.PORT || 5000;

// SERVER LISTEN ON DEFAULT PORT
server.listen(PORT, error => {
		if (error) {
			return console.log("What's the error? ", error);
		}
		console.log("Server is listening on port:", PORT);
	});
