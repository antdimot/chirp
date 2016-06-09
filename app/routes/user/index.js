"use strict"

module.exports = (ctx) => {
    const router = require('express').Router();

    // get an user by login and password
    router.get('/authenticate/:username/:password', require('./authenticate')(ctx));

    // get an user by username
    router.get('/access/:username', require('./access')(ctx));

    // get the following of an user
    router.get('/following/:username', require('./following')(ctx));

    // get the followers of an user
    router.get('/followers/:username', require('./followers')(ctx));

    // sign up an user
    router.post('/', require('./new')(ctx));

    // follow an user
    router.post('/follow', require('./follow')(ctx));

    // unfollow an user
    router.post('/unfollow', require('./unfollow')(ctx));

    // get the user info
    router.get('/info/:username', require('./info')(ctx));

    return router;
}