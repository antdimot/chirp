/* jshint esnext: true */

var config = require('../util/config');
var fs = require('fs');
var co = require('co');
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectID;

mongoClient.connect(config.mongodb.connectionString, { db: { bufferMaxEntries: 0 } },(err,db)=> {

var user1Id = ObjectId().toString();
var user2Id = ObjectId().toString();
var user3Id = ObjectId().toString();
var post1Id = ObjectId().toString();
var post2Id = ObjectId().toString();
var image1Id = ObjectId().toString();

var clearData = ()=> {
    db.dropCollection('users');
    db.dropCollection('posts');
    db.dropCollection('images');
};

var addUsers = ()=> {
    db.collection('users').insert(
    [
        {
            "_id": user1Id,
            "username": "dimotta",
            "displayname": "Antonio Di Motta",
            "password": "greatpass",
            "email": "antonio.dimotta@gmail.com",
            "image":"dimotta.jpg",
            "following": [user2Id,user3Id],
            "followers": [user2Id]
        },
        {
            "_id": user2Id,
            "username": "dinolupo",
            "displayname": "Dino Lupo",
            "password": "pass",
            "email": "dino.lupo@gmail.com",
            "image":"lupo.jpg",
            "following": [user1Id],
            "followers": [user1Id]
        },
        {
            "_id": user3Id,
            "username": "userdemo1",
            "displayname": "I'm not a bot :)",
            "password": "pass",
            "email": "demo1@dd.dd",
            "image":"default.png",
            "following": [user1Id],
            "followers": [user1Id,user3Id]
        }
    ]);
};

var addPosts = ()=> {
    db.collection('posts').insert(
    [
        {
            "_id": post1Id,
            "username": "dimotta",
            "ownerid": user1Id,
            "displayname": "Antonio Di Motta",
            "image":"dimotta.jpg",
            "timestamp": new Date("2015-09-13T16:30:00Z").toISOString(),
            "text": "My first post using Chirp."
        },
        {
            "_id": post2Id,
            "username": "userdemo1",
            "ownerid": user3Id,
            "displayname": "I'm not a bot :)",
            "image":"default.png",
            "timestamp": new Date("2015-09-13T16:35:00Z").toISOString(),
            "text": "Are you ready for production?"
          }
      ]);
};

var addImages = ()=> {
    fs.readFile('../wwwroot/images/dimotta.jpg',(err,data)=> {
      if(err) throw err;
      db.collection('images').insert(
      [
          {
              "_id": image1Id,
              "name": "dimotta.jpg",
              "content": data
          }
      ]);
  });
};

co(function* () {
  yield Promise.resolve(clearData);
  yield Promise.resolve(addUsers);
  yield Promise.resolve(addPosts);
} ).then(
  (result)=>{console.log("End with success!")},
  (err)=>{console.err("Error")}
);

});
