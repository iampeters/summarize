const mongoose = require('mongoose')



module.exports = () => {
    // var url = 'mongodb://iampeters:iampeters91@ds042698.mlab.com:42698/lyrisoft';
    // var url = 'mongodb://iampeters:iampeters91@cluster0-shard-00-00-0nc2o.azure.mongodb.net:27017,cluster0-shard-00-01-0nc2o.azure.mongodb.net:27017,cluster0-shard-00-02-0nc2o.azure.mongodb.net:27017/lyrisoft?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
    var url = 'mongodb://127.0.0.1:27017/lyrisoft'

    const conn = mongoose.connect(url, {
        useNewUrlParser: true
    })
    if (conn) {
        console.log('database connected');
    } else {
        console.log('Connection failed')
    }
};