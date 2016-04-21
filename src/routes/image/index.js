"use strict"

module.exports = (ctx) => {
    const router = require('express').Router();

    // get a single image
    const single = require('./single')(ctx);
    router.get('/:resource', single);

    return router;
}
