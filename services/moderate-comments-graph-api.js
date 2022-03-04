"use strict";

// Import dependencies
const config = require("./config"),
  fetch = require("node-fetch"),
  { URL, URLSearchParams } = require("url");

// contains functions, which use GraphAPI
module.exports = class GraphApi {

  // given a comment, check if it contains obscenity, if yes then delete this comment
  static async moderateComments_of_ig_comment(media_comment) {
    if (media_comment.text.includes("Hi")) {
      // delete media_comment
      let url = new URL(`https://graph.facebook.com/${media_comment.id}?access_token=${config.userAccessToken}`);
      let response = await fetch(url, {
        method: "DELETE"
      });
      console.log("deleting comment");
    }
    if (media_comment.hasOwnProperty('replies')){
      // code will not handle more than 25 replies
      let media_comments = media_comment.replies.data;
      for (const media_comment of media_comments) {
        this.moderateComments_of_ig_comment(media_comment);
      } 
    }
  }
  // given ig_media, check all the comments of that ig_media
  static async moderateComments_of_ig_media(ig_media) {
    console.log("checking comments of " + ig_media.id);
    let url = new URL(`https://graph.facebook.com/v13.0/${ig_media.id}/comments?pretty=0&fields=text%2Ctimestamp%2Creplies&limit=50&access_token=${config.userAccessToken}`)
    while (true) {
      let response = await fetch(url)
        .then(async (res) => {
          return await res.json();
        });
      let media_comments = response.data;
      console.log(ig_media.id + ":" + media_comments.length);
      console.log(media_comments);
      for (const media_comment of media_comments) {
        this.moderateComments_of_ig_comment(media_comment);
      }
      if(response.hasOwnProperty('paging')){
        url = new URL(`https://graph.facebook.com/v13.0/${ig_media.id}/comments?pretty=0&fields=text%2Ctimestamp%2Creplies&limit=50&after=${response.paging.cursors.after}&access_token=${config.userAccessToken}`)
        // url = new URL(response.paging.next);
      }else{
        break;
      }
    }

  }
  // call this function, if you have a list of ig_medias whose comments you want to check
  static async moderateComments_of_ig_medias(ig_medias) {
    for (const ig_media of ig_medias) {
      this.moderateComments_of_ig_media(ig_media);
    }
  }

  // call this function, to check all comments of all medias of a user
  static async moderateComments() {
    let url = new URL(`https://graph.facebook.com/v13.0/${config.ig_userId}/media?access_token=${config.userAccessToken}`)
    console.log(url);
    let response = await fetch(url)
      .then(async (res) => {
        return await res.json();
      });
    let ig_medias = response.data;
    console.log(ig_medias);
    console.log(response);
    this.moderateComments_of_ig_medias(ig_medias);
  }
};