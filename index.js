// Dependencies
var express = require("express");

// Initialize Express
var app = express();

// Set up a static folder (public) for our web app
app.use(express.static("public"));

// Set the app to listen on port 3000
app.set("port", (process.env.PORT || 3000));

app.listen(app.get("port"), function(){
    console.log("Server started on port " +app.get("port"))
});