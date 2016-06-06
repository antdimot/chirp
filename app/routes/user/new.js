"use strict"

module.exports = (ctx) => {
    return (req,res)=>
    {
        const bcrypt = require('bcrypt');
        
        ctx.db.collection('users').findOne({'username':req.body.username},(err,data)=>
        {
            if(err) return ctx.helper.action.errorResult(err.message,req,res);

            if(data) { // username already existing
                ctx.helper.action.forbiddenResult(req,res);
            }
            else {
                bcrypt.genSalt(10, (err,salt)=>
                {
                    bcrypt.hash(req.body.password, salt, (err, hash)=> {
                        // Store hash in your password DB.
                        const user = {
                            "username": req.body.username,
                            "displayname": req.body.displayname,
                            "password": hash,
                            "email": req.body.email,
                            "image": ctx.config.image,
                            "summary": req.body.summary,
                            "following": [],
                            "followers": []
                        };

                        ctx.db.collection('users').save(user,(err)=> {
                            if(err) return ctx.helper.action.errorResult(err.message,req,res);
                            ctx.helper.action.okResult(req,res);
                        });

                    });
                });
            }
        });
    };
}
