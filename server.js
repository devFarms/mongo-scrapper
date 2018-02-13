// Dependencies
var express = require('express');
var mongojs = require('mongojs');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = 'mongoHeadlines';
var collection = ['scrapedData'];

var db = mongojs(databaseUrl, collection);
db.on('error', function(error) {
    console.log('Database error:', error);
});

// Set up a static folder (public) for our web app
app.use(express.static("public"));

// Create the routes
app.get('/', function(req, res) {
    res.send('Hello world');
});

app.get('/saved', function(req, res) {
    db.scrapedData.find({}, function (err, found) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(found);
        }
    });
});

app.get('/scrape', function(req, res) {
    
    request('http://saascoalition.org/saas-blog/', function(error, response, html){
        var $ = cheerio.load(html);

        $('.entry-title').each(function(i, element) {
            var title = $(this).children('a').text();
            var link = $(this).children('a').attr('href');
            console.log(title);
            console.log(link);

            if (title && link) {
                db.scrapedData.save({
                    title: title,
                    link: link
                },
                function(error, saved) {
                    if (error) {
                        console.log(error);
                    } else {
                    console.log(saved);
                    }
                });
            }
        });
    });

    res.send('Scrape complete');
});

// Set the app to listen on port 3000
app.set("port", (process.env.PORT || 3000));

app.listen(app.get("port"), function(){
    console.log("Server started on port " +app.get("port"))
});

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});