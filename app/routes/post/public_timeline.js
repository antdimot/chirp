"use strict"

module.exports = (ctx) => {
    return (req,res) => {
        ctx.db.collection('posts').find() // only original post
                .limit(ctx.config.server.limit)
                .sort({'timestamp':-1}) // order by timestamp desc
                .toArray((err,data)=> {
                    if(err) return ctx.helper.action.errorResult(err.message,req,res);

                    data.forEach((element,index)=> {
                        element.text = ctx.helper.string.bodyProcess(element.text); // process the body
                        element.imagepath = ctx.config.server.api + '/image/' + element.image; // added image resource api
                    });
    
                    ctx.helper.action.jsonResult(req,res,data);
                });
    };
}
