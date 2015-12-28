module.exports = function(ctx)
{
    var baseurl = ctx.config.server.api;

    //var userFields = {'_id':1,'username':1,'displayname':1,'image':1,'email':1,'following':1};

    // get the user using login and password
    ctx.app.get( baseurl + '/user/authenticate/:username/:password', function(req,res) {
        var username = req.params.username;
        var password = req.params.password;

        ctx.db.collection('users').findOne({'username':username,'password':password},function(err,data) {
            if(err) throw err;

            if (data) {
                ctx.util.action.jsonResult(req,res,{
                    "username": data.username,
                    "displayname": data.displayname,
                    "password": data.password,
                    "email": data.email,
                    "image": data.image,
                    "followingcount": data.following.length,
                    "followercount": data.followers.length
                });
            }
            else {
                ctx.util.action.forbiddenResult(req,res);
            }
        });
    });

    // get the user using a token
    ctx.app.get( baseurl + '/user/access/:token', function(req,res) {
        var token = req.params.token;

        ctx.db.collection('users').findOne({'username':token},function(err, data)
        {
            if (err) throw err;

            if (data) {
                ctx.util.action.jsonResult(req,res,{
                    "username": data.username,
                    "displayname": data.displayname,
                    "password": data.password,
                    "email": data.email,
                    "image": data.image,
                    "followingcount": data.following.length,
                    "followercount": data.followers.length
                });
            }
            else {
                ctx.util.action.forbiddenResult(req,res);
            }
        });
    });

    // get the following of a user
    ctx.app.get( baseurl + '/user/following/:token', function(req,res) {
        var token = req.params.token;

        ctx.db.collection('users').findOne({'username':token},function(err, data)
        {
            if (err) throw err;

            if (data) {
                ctx.db.collection('users').find({'followers':data._id}).toArray(function (err, items) {
                    if (err) throw err;

                    ctx.util.action.jsonResult(req, res, items);
                });
            }
            else {
                ctx.util.action.forbiddenResult(req,res);
            }
        });
    });

    // get the followers of a user
    ctx.app.get( baseurl + '/user/followers/:token', function(req,res) {
        var token = req.params.token;

        ctx.db.collection('users').findOne({'username':token},function(err, data) {
            if (err) throw err;

            if (data) {
                ctx.db.collection('users').find({'following':data._id}).toArray(function (err, items) {
                    if (err) throw err;

                    ctx.util.action.jsonResult(req, res, items);
                });
            }
            else {
                ctx.util.action.forbiddenResult(req,res);
            }
        });
    });

    // post a new message
    ctx.app.post( baseurl + '/user', function(req,res) {
        var username = req.body.username;
        var password = req.body.password;
        var displayname = req.body.displayname;
        var email = req.body.email;

        var user = {
            "username": username,
            "displayname": displayname,
            "password": password,
            "email": email,
            "image": ctx.config.image,
            "following": [],
            "followers": []
        };

        ctx.db.collection('users').save(user,function(err) {
            if(err) throw err;
            ctx.util.action.okResult(req,res);
        });
    });

    // get the user info
    ctx.app.get( baseurl + '/user/info/:username', function(req,res) {
        var username = req.params.username;

        ctx.db.collection('users').findOne({'username':username},function(err,data) {
            if(err) throw err;

            if (data) {
                ctx.util.action.jsonResult(req,res,{
                    "username": data.username,
                    "displayname": data.displayname,
                    "password": data.password,
                    "email": data.email,
                    "image": data.image,
                    "followingcount": data.following.length,
                    "followercount": data.followers.length
                });
            }
            else {
                ctx.util.action.forbiddenResult(req,res);
            }
        });
    });
};
