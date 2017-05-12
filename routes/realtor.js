/**
 * Created by soham on 5/10/17.
 */
/* GET home page. */
var mongo = require('mongodb');
var bcrypt = require('bcrypt-nodejs');

var monk = require('monk');
var db = monk('mongodb://realtoruser:realtoruser@ds137891.mlab.com:37891/realtordb');
var realtors = db.get('realtors');
var listings =  db.get('listings');

exports.register = function(req, res) {
    console.log("Inside register");
    var username = req.param('username');
    var password = req.param('password');
    var hashPassword = bcrypt.hashSync(password);
    var vrpassword= req.param('vrpassword');
    var email = req.param('email');
    var phone = req.param('phone');

    console.log(username+" "+hashPassword+" "+email+" "+phone);

    realtors.insert({username: username, password: hashPassword, email: email, phone: phone}, function (e, data) {
        if (data) {
            console.log("Successfully inserted user information!")
            res.send({"status" : "200"})
        }
        else {
            console.log("Error "+e);
            res.send({"status" : "400"});
        }
    })

}

exports.login = function(req, res){
    res.render('login');
}

exports.signup = function(req, res){
    console.log("inside signup")
    res.render('register');
}

exports.loginCheck = function(req, res){

    console.log("Inside the login check");

    var username = req.param('username');
    var password = req.param("password");


    //bcrypt.compareSync("bacon", hash); // true

    realtors.find({username : username}, function(err, users) {


        var json_responses;

        if(users!=null) {
            console.log("Enc "+users[0].password)
            console.log("check "+bcrypt.compareSync(password, users[0].password))
            if(bcrypt.compareSync(password, users[0].password)) {
                //req.session = ""
                req.session.username = username;
                console.log('Login successful');
                json_responses = {"status": 200};
                res.send(json_responses);
            }
            else{
                console.log("Sorry something went wrong!");
                json_responses = {"status": 400};
                res.send(json_responses)
            }
        }
        else if(err){
            console.log(err);
            json_responses = {"status": 400};
            res.send(json_responses)
        }
        else{
            console.log("No user");
            json_responses = {"status": 400};
            res.send(json_responses)
        }

    });
}


exports.addListingPage = function(req, res){
    if(req.session.username){
        console.log(req.session.username);
        res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.render('realtorHome');
    }
    else{

        console.log("no session found !");
        res.redirect('/');
    }
}

exports.addListing = function (req, res) {

    console.log("Here "+req.session.username);
    var owner = req.session.username;
    var address = req.param('address');
    var city = req.param('city');
    var state= req.param('state');
    var zip = req.param('zip');
    var neighbourhood = req.param('neighbourhood');
    var description = req.param('description');
    var price = req.param('price');
    var status = req.param('status');
    var parking = req.param('parking');
    var fireplace = req.param('fireplace');
    var garage = req.param('garage');
    var image = req.param('image');

    console.log(address+" "+city);


    listings.insert({owner : owner, address: address, city: city, state: state, zip: zip, description: description, price: price, image: image}, function (e, data) {
        if (data) {
            console.log("Successfully inserted user information!")
            res.send({"status" : "200"})
        }
        else {
            console.log("Error "+e);
            res.send({"status" : "400"});
        }
    })


}

exports.showListings = function(req, res){
    listings.find({owner: req.session.username}, function(err, users) {

        if(users){
            console.log(JSON.stringify(users))
            var json_response = users;
            res.send(json_response)
        }
        else {

            var json_response = {"status" : "400"}
            res.send(json_response);
        }

    });

}

exports.showSpecificListing = function(req, res) {

    var address = req.param("address");
    console.log("Specific "+address);
    listings.find({address: address}, function (err, users) {

        if (users) {
            console.log(JSON.stringify(users))
            var json_response = users;
            res.send(json_response)
        }
        else {
            var json_response = {"status": "400"}
            res.send(json_response);

        }

    });
}

exports.signout = function(req, res){
    req.session.destroy();
    res.redirect('/');
}