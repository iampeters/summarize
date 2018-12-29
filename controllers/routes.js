/*jshint esversion: 6 */

//Body parser
const bodyParser = require('body-parser')
const models = require('../models/users')
const urlencodedParser = bodyParser.urlencoded({ extended: false })


module.exports = (app) => {
	//session variable
	var SESSION;

	app.get('/', (req, res) => {
		res.render('index')
		// console.log(req);
	})

	//get register
	app.get('/register', (req, res) => {
		SESSION = req.session
		// checks if there is a session with
		// the username
		if(SESSION.username) {
			res.redirect('/profile');
		} else {
			res.render('register')
		}
	})

	app.get('/register-success', (req, res) => {
		res.render('register-success')
	})

	//redirect all request to profile to profile/username
	app.get('/profile', (req, res) => {
		SESSION = req.session
		if(SESSION.username) {
			res.redirect(`profile/${SESSION.username}`)
		} else {
			res.redirect('signin')
		}
	})

	app.get('/profile/:id', (req, res) => {
		SESSION = req.session
		var username= req.params.id;

		if(SESSION.username) {
			models.users(username, (err, response) => {
				if (err) {
					console.log('Oops! A fatal error occurred!');
				} else {
					if(!response) {
						console.log('There is no user with that username');
					} else {
						res.render('profile', {data: response})
					}
				}
			})

		} else {
			res.redirect('/signin')
		}

	})

	//Login
	app.get('/signin', (req, res) => {
		SESSION = req.session
		// checks if there is a session with
		// the username
		if(SESSION.username) {
			res.redirect('/profile');
		} else {
			res.render('signin')
		}
	})




}
