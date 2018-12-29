const express = require('express')
const routes  = require('./controllers/routes')
const userController  = require('./controllers/users')
const session = require('express-session')({ secret: "my-secret", resave: true, saveUninitialized: true })
const http = require('http')
const db = require('./database/database.js');

var app = express();

const server = http.Server(app)

// use sessions
app.use(session)

// handling the views
app.set('views', __dirname + '/views')

// app.use(express.static())

//Set the view engine
app.set('view engine', 'ejs')

//Middleware to serve static files
app.use('/public', express.static('public'))

//set the headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*")
    res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE")
    res.header('Access-Control-Allow-Headers', "Content-Type")
    next();
})

//Fire controllers
routes(app);
userController(app)
db();

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('404', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('404', {
//         message: err.message,
//         error: {}
//     });
// });

server.listen(3000)
console.log('listening to port 3000')
