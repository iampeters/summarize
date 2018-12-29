// var conn = require('../database/database')
const UserSchema = require('./schema')
const mongoose = require('mongoose')

//user login
var login = (username, password, callback) => {
    var uname = username
    var pass = password

    UserSchema.findOne({username: uname, password: pass}, (err, response) => {
        callback(err, response)
    })

}

//register user
var register = (username, email, password, callback) => {
    // query
    const user = new UserSchema({
        __id: mongoose.Types.ObjectId,
        username: username,
        email: email,
        password: password

    })

    user.save((err, res) => {
        callback(err, res)
    })

}

//get all users
var users = (username, callback) => {
    UserSchema.findOne({username: username}, (err, response) => {
        callback(err, response)
    })
}


//Exports
module.exports = {
    login: login,
    register: register,
    users: users
}