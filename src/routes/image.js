module.exports = (ctx)=>
{
    const fs = require('fs');
    const baseurl = ctx.config.server.api + '/image';

    // get items posted to public timeline
    ctx.app.get( baseurl + '/:resource',(req,res) => {
      const resource = req.params.resource;
      const filePath = ctx.config.server.imagepath + '/' + resource;
      //ctx.logger.debug("Try to download a from path [%s]",filePath);

      fs.readFile(filePath, function (err, data) {
        if(err) return ctx.util.action.errorResult(err.message,req,res);

        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.end(data); // Send the file data to the browser.
    });
  });
};
