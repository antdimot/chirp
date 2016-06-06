"use strict"

module.exports = (ctx) => {
    return (req,res) => {
        ctx.db.collection('posts').find(
            {'username': req.params.username},
            {'sort':{'timestamp':-1}} )
            .toArray((err,items)=> {
                if(err) return ctx.helper.action.errorResult(err.message,req,res);
                ctx.helper.action.jsonResult(req, res, items);
            });
    };
}
