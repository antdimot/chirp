"use strict"

module.exports = (ctx)=>
{
    const routes = require('express').Router();

    const user = require('./user')(ctx);
    routes.use(ctx.config.server.api + '/user', user);

    const post = require('./post')(ctx);
    routes.use(ctx.config.server.api + '/post', post);

    const image = require('./image')(ctx);
    routes.use(ctx.config.server.api + '/image', image);

    return routes;
}