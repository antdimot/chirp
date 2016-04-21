"use strict"

module.exports = (ctx) => {
    return (req, res)=> {
        const bcrypt = require('bcrypt');

        ctx.db.collection('users').findOne({'username': req.params.username}, (err, data)=> {
            if (err) return ctx.helper.action.errorResult(err.message, req, res);
            if (data) {
                bcrypt.compare(req.params.password, data.password, (err, resbcrypt)=> {
                    if (resbcrypt === true) {
                        ctx.helper.action.jsonResult(req, res, {
                            "username": data.username,
                            "displayname": data.displayname,
                            "password": data.password,
                            "email": data.email,
                            "image": data.image,
                            "summary": data.summary,
                            "followingcount": data.following.length,
                            "followercount": data.followers.length,
                            "imagepath": ctx.config.server.api + '/image/' + data.image
                        });
                    } else { // check password failed
                        ctx.helper.action.forbiddenResult(req, res);
                    }
                });
            }
            else {
                ctx.helper.action.forbiddenResult(req, res);
            }
        });
    }
}
