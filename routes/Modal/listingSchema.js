/**
 * Created by soham on 5/10/17.
 */
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


var listing= new Schema({
        listingId : {
            type : String
        },

        address : String,
        city : String,
        state : String,
        zip : String,
        neighbourhood :String,
        description : String,
        price : String,
        status : String,
        parking : String,
        fireplace: String,
        garage : String,
        image: String
    },
    {
        _id : true
    });

var Listing = mongoose.model('Listing', listing);
listing.plugin(autoIncrement.plugin, {
    model: 'Listing',
    field: 'listingId',
    startAt: 1,
    incrementBy: 1
});

