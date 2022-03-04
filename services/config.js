"use strict";

// Use dotenv to read .env vars into Node
require("dotenv").config();

// Required environment variables
const ENV_VARS = [
"PAGE_ID",
"APP_ID",
"PAGE_ACCESS_TOKEN",
"APP_SECRET",
"VERIFY_TOKEN"
];

module.exports = {
// Messenger Platform API
apiDomain: "https://graph.facebook.com",
apiVersion: "v13.0",

// Page and Application information
pageId: process.env.PAGE_ID,
appId: process.env.APP_ID,
pageAccesToken: process.env.PAGE_ACCESS_TOKEN,
appSecret: process.env.APP_SECRET || null,
verifyToken: process.env.VERIFY_TOKEN || null,
shopUrl: process.env.SHOP_URL || "https://webhookco18.herokuapp.com",
ig_userId : process.env.INSTAGRAM_USER_ID || null,
userAccessToken : process.env.USER_ACCESS_TOKEN || null,

// URL of your app domain. Will be automatically updated.
appUrl: process.env.APP_URL || "<App URL>",

// Preferred port (default to 3000)
port: process.env.PORT || 5000,

// Base URL for Messenger Platform API calls
get apiUrl() {
    return `${this.apiDomain}/${this.apiVersion}`;
},

checkEnvVariables: function() {
    ENV_VARS.forEach(function(key) {
    if (!process.env[key]) {
        console.warn(`WARNING: Missing required environment variable ${key}`);
    }
    });
}
};