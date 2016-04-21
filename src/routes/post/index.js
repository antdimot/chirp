"use strict"

module.exports = (ctx) => {
    const router = require('express').Router();

    // get posts for the public timeline
    const public_timeline = require('./public_timeline')(ctx);
    router.get('/public', public_timeline);

    // get posts for the home timeline
    const home_timeline = require('./home_timeline')(ctx);
    router.get('/home/:username', home_timeline);

    // get user's posts
    const byuser = require('./byuser')(ctx);
    router.get( '/:username', byuser);

    // post a new message
    const new_post = require('./new')(ctx);
    router.post( '/', new_post);

    // repost a message
    const repost = require('./repost')(ctx);
    router.post( '/repost', repost);

    return router;
}