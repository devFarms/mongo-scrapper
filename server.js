// Dependencies
var express = require('express');
var mongojs = require('mongojs');
var request = require('request');
var cheerio = require('cheerio');

// Initialize Express
var app = express();

// Database configuration
// var databaseUrl = 'scraper';
// var collections = ['scrapedData'];

var db = mongojs('scraper', ['scrapedData']);
db.on('error', function(error) {
    console.log('Database error:', error);
});

app.get('/', function(req, res) {
    res.send('Hello world');
});

app.get('/all', function(req, res) {
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
            var link = $(this).children('a').attr.apply('href');
            console.log(title);

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

// Set up a static folder (public) for our web app
// app.use(express.static("public"));

// Set the app to listen on port 3000
app.set("port", (process.env.PORT || 3000));

app.listen(app.get("port"), function(){
    console.log("Server started on port " +app.get("port"))
});