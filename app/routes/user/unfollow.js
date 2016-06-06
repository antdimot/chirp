"use strict"

module.exports = (ctx) => {
    return (req,res)=>
    {
        ctx.db.collection('users').findOne({'username':req.body.username1},(err,user1)=>
        {
            if(err) return ctx.helper.action.errorResult(err.message,req,res);

            if (user1) {
                ctx.db.collection('users').findOne({'username':req.body.username2},(err,user2)=>{
                    if(err) return ctx.helper.action.errorResult(err.message,req,res);

                    // check if already follow
                    if(user2) {
                        let found = false;
                        for (var i = 0; i < user1.following.length; i++) {
                            if(user1.following[i]===user2._id)
                            {
                                found = true;
                                break;
                            }
                        }

                        if( !found ) {
                            ctx.logger.debug('[%s] does not follow [%s]',user1.username,user2.username);
                            ctx.helper.action.forbiddenResult(req,res);
                            return;
                        }

                        ctx.db.collection('users')
                            .updateOne({_id:user1._id},{$pull: {following: user2._id }})
                            .then(()=>{
                                ctx.db.collection('users')
                                    .updateOne({_id:user2._id},{$pull: {followers: user1._id }});
                            });
                        ctx.helper.action.okResult(req,res);
                    }
                    else {
                        ctx.helper.action.forbiddenResult(req,res);
                    }
                });
            }
            else {
                ctx.helper.action.forbiddenResult(req,res);
            }
        });
    };
}
