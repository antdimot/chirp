/* jshint esnext: true */
/* jslint node: true */

module.exports = (ctx)=>
{
    var limit = ctx.config.server.limit;
    var baseurl = ctx.config.server.api + '/post';

    var postListFields = {'username':1,'displayname':1,'timestamp':1,'text':1,'image':1};
    var userSearchFields = {'_id':1,'following':1,'displayname':1,'image':1};

    // get items posted to public timeline
    ctx.app.get( baseurl + '/public', (req,res) => {
        ctx.db.collection('posts').find({},{'limit':limit,'fields': postListFields,'sort': {'timestamp':-1}})
            .toArray((err,data)=> {
                if(err) return ctx.util.action.errorResult(err.message,req,res);

                data.forEach((element)=>{
                  element.text = ctx.util.string.bodyProcess(element.text);
                });

                ctx.util.action.jsonResult(req,res,data);
            });
    });

    // get items posted to user timeline
    ctx.app.get( baseurl + '/home/:username', (req,res) => {
        var username = req.params.username;

        ctx.db.collection('users').findOne({'username':username},{'fields':userSearchFields},(err,data)=>{
            if (data) {
                data.following.push(data._id); // add my id for showing also my posts
                ctx.db.collection('posts').find({'ownerid':{ $in:data.following}},{'limit':limit,'fields': postListFields,'sort':{'timestamp':-1}})
                    .toArray((err,items)=> {
                        if(err) return ctx.util.action.errorResult(err.message,req,res);
                        items.forEach((element)=>{
                          element.text = ctx.util.string.bodyProcess(element.text);
                        });
                        ctx.util.action.jsonResult(req,res,items);
                    });
            }
            else {
                ctx.util.action.okResult(req, res);
            }
        });
    });

    // get the items posted from an user
    ctx.app.get( baseurl + '/:username',(req,res) => {
        var username = req.params.username;

        ctx.db.collection('posts').find({'username': username},{'fields':postListFields,'sort':{'timestamp':-1}})
            .toArray((err,items)=> {
                if(err) return ctx.util.action.errorResult(err.message,req,res);
                ctx.util.action.jsonResult(req, res, items);
            });
    });

    // post a new message
    ctx.app.post( baseurl, (req,res) => {
        var username = req.body.username;
        var text = req.body.text;

        ctx.db.collection('users').findOne(
          {'username':username},
          {'fields':userSearchFields},
          (err,data)=> {
                if(err) return ctx.util.action.errorResult(err.message,req,res);
                if (data) {
                    var newPost = {
                        "username": username,
                        "ownerid": data._id,
                        "displayname": data.displayname,
                        "timestamp": new Date().toISOString(),
                        "image": data.image,
                        "text": text
                    };
                    ctx.db.collection('posts').save(newPost,(err)=>
                    {
                        if(err) return ctx.util.action.errorResult(err.message,req,res);
                        ctx.util.action.okResult(req,res);
                    });
                }
            });
      });
      // post a new message
    /*  ctx.app.repost( baseurl, (req,res) => {
          var username = req.body.username;
          var id = req.body.id;

          // check the user that wants to repost
          ctx.db.collection('users').findOne(
            {'username':username},
            {'fields':userSearchFields},
            (err,user)=> {
                  if(err) return ctx.util.action.errorResult(err.message,req,res);
                  if (user) {
                      // check the post to repost
                      ctx.db.collection('posts').findOne({'_id':id},(err,post)=> {
                        if(err) return ctx.util.action.errorResult(err.message,req,res);
                        var newPost = {
                            "username": post.username,
                            "ownerid": user._id,
                            "displayname": post.displayname,
                            "timestamp": post.timestamp,
                            "image": post.image,
                            "text": post.text,
                            "reposts": [post]
                        };

                        ctx.db.collection('posts').save(newPost,(err)=>
                        {
                            if(err) return ctx.util.action.errorResult(err.message,req,res);
                            ctx.util.action.okResult(req,res);
                        });
                      });
                  }
              });
        });*/
};
