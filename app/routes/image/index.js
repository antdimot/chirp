"use strict"

module.exports = (ctx) => {
    const router = require('express').Router();

    // get a single image
    router.get('/:resource', require('./single')(ctx));

    return router;
}
