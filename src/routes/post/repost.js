"use strict"

module.exports = (ctx) => {
    return (req,res) =>
    {
        const userSearchFields = {'_id':1,'following':1,'displayname':1,'image':1};
        
        // check the user that wants to repost
        ctx.db.collection('users').findOne({'username':req.body.username},{'fields':userSearchFields},(err,user)=>
        {
            if(err) return ctx.helper.action.errorResult(err.message,req,res);
            if (user) {
                const ObjectID = require('mongodb').ObjectID;

                // check the post to repost
                ctx.db.collection('posts').findOne({'_id':req.body.id},(err,post)=>
                {
                    if(err) return ctx.helper.action.errorResult(err.message,req,res);
                    var newPost = {
                        "_id": new ObjectID().toString(),
                        "username": post.username,
                        "ownerid": user._id,
                        "repostid": post._id,
                        "repostdisplayname": user.displayname,
                        "repostusername": req.body.username,
                        "displayname": post.displayname,
                        "timestamp": new Date().toISOString(),
                        "image": post.image,
                        "text": post.text
                    };

                    ctx.db.collection('posts').save(newPost,(err)=>
                    {
                        if(err) return ctx.helper.action.errorResult(err.message,req,res);
                        ctx.helper.action.okResult(req,res);
                    });
                });
            }
        });
    };
}
