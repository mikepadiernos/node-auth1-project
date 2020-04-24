const router = require("express").Router();
const bc = require('bcryptjs');

const db = require("../helpers/users-helper.js");
const middle = require('../middleware/middleware.js');

const restricted = middle.restrict;

router
	.route('/')
	.get(restricted, (req, res) => {
		db.findUser()
			.then(users => {
				res.json(users);
			})
			.catch(error => {
				res.status(500).json({ success: false, message: "Unable to find users", error });
			});
	});

router
	.route('/register')
	.post((req, res) => {
		const user = req.body;
		// const round = process.env.ROUNDS;
		user.password = bc.hashSync(user.password, 8);;

		db.addUser(user)
			.then(saved => {
				res.status(201).json({ success: true, saved });
			})
			.catch(error => {
				console.log(user);
				res.status(500).json({ success: false, message: "Problem with registration", error });
			});
	});

router
	.route('/login')
	.post((req, res) => {
		let { username, password } = req.body;

		db.findUserBy({ username })
			.first()
			.then(user => {
				console.log('user: ', user.password);
				user && bc.compareSync(password, user.password)
					? req.session.user = username && res.status(200).json({ message: `Welcome ${user.username}!`, })
					: res.status(401).json({ message: 'Good. Well, why don\'t we take a five minute break?' });
			})
			.catch(error => {
				res.status(500).json({success: false, message: "Problem with login attempt", error});
			});
});

router
	.route('/logout')
	.get(restricted, (req, res) => {
		if (req.session) {
			req.session.destroy(error => {
				if (error) {
					res.send('Problem logging out');
				} else {
					res.send('Well, I hope it\'s a long ceremony, \'cause it\'s gonna be a short honeymoon.');
				}
			});
		}
	})

module.exports = router;