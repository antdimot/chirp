"use strict"

module.exports = (ctx) => {
    return (req,res) =>
    {
        const fs = require('fs');

        const filePath = ctx.config.server.imagepath + '/' + req.params.resource;

        fs.readFile(filePath, (err, data)=>
        {
            if(err) return ctx.helper.action.errorResult(err.message,req,res);

            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.end(data); // Send the file data to the browser.
        });
    };
}
