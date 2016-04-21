"use strict"

module.exports = (ctx) => {
    return (req,res)=>
    {
        ctx.db.collection('users').findOne({'username':req.params.username},(err,data)=> {
            if(err) return ctx.helper.action.errorResult(err.message,req,res);
            if (data) {
                ctx.db.collection('users')
                    .find({'following':data._id})
                    .toArray((err,items)=> {
                        if(err) return ctx.helper.action.errorResult(err.message,req,res);

                        items.forEach((element)=> {
                            element.imagepath = ctx.config.server.api + '/image/' + element.image; // added image resource api
                            //ctx.logger.debug(element);
                        });

                        ctx.helper.action.jsonResult(req, res, items);
                });
            }
            else {
                ctx.helper.action.forbiddenResult(req,res);
            }
        });
    };
}
