/**
 * Created by soham on 5/10/17.
 */
var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://localhost:27017/realtorUsers');
var db = mongoose.connection;


db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected.');
});

var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(connection);


var userData= new Schema({
        userId : {
            type : String
        },
        username : String,
        password : String,
        email: String,
        phone: String
    },
    {
        _id : true
    });

var Users = mongoose.model('Users', userData);
userData.plugin(autoIncrement.plugin, {
    model: 'Users',
    field: 'userId',
    startAt: 1,
    incrementBy: 1
});

