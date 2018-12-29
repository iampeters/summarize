//Body parser
const bodyParser = require('body-parser')
const models = require('../models/users')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json();

module.exports = (app) => {
	// session variable
	var SESSION;

    //post register
	app.post('/register', urlencodedParser, (req, res) => {
		//set session
		SESSION = req.session;

		var uname = req.body.username,
			email = req.body.email,
			password = req.body.password
			
			//calling the register method of the model
			models.register(uname, email, password, (err, result) => {
				if (err) {
					console.log('Errors were found', err);
				} else {
					if(!result) {
						console.log('Username/Email already exists!');
					} else {
						//add the username to the session
						SESSION.username = uname
						//redirect the user to the profile page
						res.redirect(`profile/${uname}`)
						// res.json(uname)
					}
				}
			})
		
		// res.render('register-success', {data: req.body})
		// res.json(req.body)
    })
    
    // Login
    app.post('/signin', urlencodedParser, (req, res) => {
		//set session
		SESSION = req.session

		var username = req.body.username,
			password = req.body.password;
		
		models.login(username, password, (err, response) => {
			if (err) {
                console.log('A fatal error occurred', err);
			} else {
                // console.log(`You are logged in as ${u_name}`)
				if (!response) {
					res.status(401).json({error: 'Incorrect login credentials'})
				} else {
					//will do some calculation
					SESSION.username = response.username
					console.log(response)
					res.redirect(`profile/${response.username}`)
				}
				
				
			}
		});
	})

	//get users
	app.get('/users', (req, res) => {

		models.users((err, rows, fields) => {
			if (err) {
				console.log('Error occurred')
				return;
			}
			if (rows == 0) {
				res.json({error: 'Oops! There are no users to display'})
			} else {
				res.json(rows)
			}
			
		})
	})

	//logout
	app.get('/logout', (req, res) => {
		if(SESSION.username) {
			req.session.destroy((err) => {
				if(err) {
					console.log('Error')
				} else {
					res.redirect('/')
				}
			})
		}
	})

}