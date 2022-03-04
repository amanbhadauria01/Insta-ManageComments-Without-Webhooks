"use strict";

// Import dependencies
const config = require("./config"),
    fetch = require("node-fetch"),
    { URL, URLSearchParams } = require("url");

// contains functions, which use GraphAPI
module.exports = class GraphApi {
    static async refresh() {
        let url = new URL(`https://graph.instagram.com/refresh_access_token
        ?grant_type=ig_refresh_token
        &access_token=${config.userAccessToken}`)
        let response = await fetch(url)
        .then(async (res) => {
            return await res.json();
        });
        if(response.hasOwnProperty('access_token')){
            config.userAccessToken = response.access_token ; 
        }
    }
};