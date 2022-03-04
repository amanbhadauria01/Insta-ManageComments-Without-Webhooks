"use strict";

// Import dependencies
const config = require("./config"),
    fetch = require("node-fetch"),
    { URL, URLSearchParams } = require("url");

// contains functions, which use GraphAPI
module.exports = class GraphApi {
    // READ COMMENTS CODE 
    // given ig_media, read all the comments of that ig_media
    static async readComments_of_ig_media(ig_media) {
        var cnt = 0;
        console.log('reading comments of '+ ig_media);
        while (true) {
            // console.log("checking comments of " + ig_media.id);
            let url = new URL(`https://graph.facebook.com/v13.0/${ig_media}/comments?pretty=0&fields=text%2Ctimestamp%2Creplies&limit=50&access_token=${config.userAccessToken}`)
            while (true) {
                let response = await fetch(url)
                    .then(async (res) => {
                        return await res.json();
                    });
                if(response.hasOwnProperty('error')){
                    console.log(response);
                    console.log(cnt);
                    return ; 
                }
                let media_comments = response.data;
                //   console.log(ig_media.id + ":" + media_comments.length);
                //   console.log(media_comments);
                if (response.hasOwnProperty('paging')) {
                    url = new URL(`https://graph.facebook.com/v13.0/${ig_media}/comments?pretty=0&fields=text%2Ctimestamp%2Creplies&limit=50&after=${response.paging.cursors.after}&access_token=${config.userAccessToken}`)
                } else {
                    break;
                }
                console.log(cnt);
                cnt++;
            }
        }
    }
    // call this function, if you have a list of ig_medias whose comments you want to read
    static async readComments_of_ig_medias(ig_medias) {
        for (const ig_media of ig_medias) {
            this.readComments_of_ig_media(ig_media);
        }
    }

    // call this function if you want to read comments 
    static async readComments() {
        let url = new URL(`https://graph.facebook.com/v13.0/${config.ig_userId}/media?access_token=${config.userAccessToken}`)
        console.log(url);
        let response = await fetch(url)
            .then(async (res) => {
                return await res.json();
            });
        let ig_medias = response.data;
        console.log(ig_medias);
        this.readComments_of_ig_medias(ig_medias);
    }

};