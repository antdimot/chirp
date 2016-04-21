"use strict"

module.exports = (ctx) => {
    return (req,res) =>
    {
        const userSearchFields = {'_id':1,'following':1,'displayname':1,'image':1};
        
        ctx.db.collection('users').findOne({'username':req.body.username}, {'fields':userSearchFields},(err,data)=>
        {
            if(err) return ctx.helper.action.errorResult(err.message,req,res);
            if (data) {
                var ObjectID = require('mongodb').ObjectID;
                var newPost = {
                    "_id": new ObjectID().toString(),
                    "username": req.body.username,
                    "ownerid": data._id,
                    "displayname": data.displayname,
                    "timestamp": new Date().toISOString(),
                    "image": data.image,
                    "text": req.body.text
                };
                ctx.db.collection('posts').save(newPost,(err)=>
                {
                    if(err) return ctx.helper.action.errorResult(err.message,req,res);
                    ctx.helper.action.okResult(req,res);
                });
            }
        });
    };
}
