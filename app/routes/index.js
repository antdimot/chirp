"use strict"

module.exports = (ctx)=> {
    const routes = require('express').Router();

    routes.use(ctx.config.server.api + '/user', require('./user')(ctx));

    routes.use(ctx.config.server.api + '/post', require('./post')(ctx));

    routes.use(ctx.config.server.api + '/image', require('./image')(ctx));

    return routes;
}