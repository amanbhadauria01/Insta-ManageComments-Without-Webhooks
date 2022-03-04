var bodyParser = require('body-parser');
var express = require('express');
var path = require("path");
var config = require("./services/config");
var moderate_comments_API = require("./services/moderate-comments-graph-api");
var read_comments_API = require("./services/read-comments-graph-api");
var app = express();

app.use(bodyParser.json());

async function main() {
    // Check if all environment variables are set
    config.checkEnvVariables();
    // await moderate_comments_API.moderateComments();
    // await read_comments_API.readComments();
    console.log('calling readCommentsIGMEDIA');
    // was able to make 1500 requests then token expired
    await read_comments_API.readComments_of_ig_media('17999017951411817');
    // Listen for requests :)
    var listener = app.listen(config.port, function () {
        console.log(`The app is listening on port ${listener.address().port}`);
    });
}

main();