"use strict"

module.exports = (ctx) => {
    const router = require('express').Router();

    // get an user by login and password
    const authenticate = require('./authenticate')(ctx);
    router.get('/authenticate/:username/:password', authenticate);

    // get an user by username
    const access = require('./access')(ctx);
    router.get('/access/:username', access);

    // get the following of an user
    const following = require('./following')(ctx);
    router.get('/following/:username', following);

    // get the followers of an user
    const followers = require('./followers')(ctx);
    router.get('/followers/:username', followers);

    // sign up an user
    const new_user = require('./new')(ctx);
    router.post('/', new_user);

    // follow an user
    const follow = require('./follow')(ctx);
    router.post('/follow', follow);

    // unfollow an user
    const unfollow = require('./unfollow')(ctx);
    router.post('unfollow', unfollow);

    // get the user info
    const info = require('./info')(ctx);
    router.get('/info/:username', info);

    return router;
}