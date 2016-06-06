"use strict"

module.exports = (ctx) => {
    const router = require('express').Router();

    // get posts for the public timeline
    router.get('/public', require('./public_timeline')(ctx));

    // get posts for the home timeline
    router.get('/home/:username', require('./home_timeline')(ctx));

    // get user's posts
    router.get( '/:username', require('./byuser')(ctx));

    // post a new message
    router.post( '/', require('./new')(ctx));

    return router;
}