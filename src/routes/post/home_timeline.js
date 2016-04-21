"use strict"

module.exports = (ctx) => {
    return (req,res) =>
    {
        const userSearchFields = {'_id':1,'following':1,'displayname':1,'image':1};

        ctx.db.collection('users').findOne({'username':req.params.username},{'fields':userSearchFields},(err,data)=>
        {
            if (data) {
                data.following.push(data._id); // add my id for showing also my posts
                ctx.db.collection('posts')
                    .find( {'ownerid':{$in:data.following}, 'repostusername':{$ne:req.params.username} },
                        {'limit':ctx.config.server.limit,'sort':{'timestamp':-1}})
                    .toArray((err,items)=> {
                        if(err) return ctx.helper.action.errorResult(err.message,req,res);
                        items.forEach((element)=>
                        {
                            element.text = ctx.helper.string.bodyProcess(element.text); // process the body
                            element.imagepath = ctx.config.server.api + '/image/' + element.image; // added image resource api

                            // check if repost
                            if(element.repostid!==undefined) {
                                element.isrepost = true;
                            }
                            else {
                                element.isrepost = false;
                            }

                            // check if can repost
                            if( element.username === req.params.username ) {
                                element.canrepost = false;
                            }
                            else {
                                element.canrepost = true;
                            }
                        });
                        ctx.helper.action.jsonResult(req,res,items);
                    });
            }
            else {
                ctx.helper.action.okResult(req, res);
            }
        });
    };
}
