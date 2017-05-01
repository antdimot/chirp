// This mongodb script provides the initialization of database chirp useful for test.

var db = db.getSiblingDB("chirp");
var user1Id = ObjectId().str;
var user2Id = ObjectId().str;
var user3Id = ObjectId().str;
var post1Id = ObjectId().str;
var post2Id = ObjectId().str;
var post3Id = ObjectId().str;
var password = "$2a$10$nn4S7KMtT8GzQhNBLnToJuBs.M3crz77X87b/ixKVmD7Y/Q/U1j1."; // password = 'test'

var addUsers = ()=> {
  db.users.drop();
  db.users.createIndex({'username':1});
  db.users.insert([
    {
        "_id": user1Id,
        "username": "dimotta",
        "displayname": "Antonio Di Motta",
        "password": password,
        "email": "antonio.dimotta@gmail.com",
        "image":"dimotta.jpg",
        "summary": "Web addicted, passionate about cloud, mobile and running.",
        "following": [user2Id,user3Id],
        "followers": [user2Id,user3Id]
    },{
        "_id": user2Id,
        "username": "dinolupo",
        "displayname": "Dino Lupo",
        "password": password,
        "email": "dino.lupo@gmail.com",
        "image":"lupo.jpg",
        "summary": "You can do it.",
        "following": [user1Id],
        "followers": [user1Id]
    },{
        "_id": user3Id,
        "username": "userdemo1",
        "displayname": "I'm not a bot :)",
        "password": password,
        "email": "demo1@dd.dd",
        "image":"ball.gif",
        "summary": "Please write me for testing :)",
        "following": [user1Id],
        "followers": [user1Id,user3Id]
    }
  ]);
};

var addPosts = ()=> {
  db.posts.drop();
  db.posts.createIndex({'timestamp':-1, 'ownerid':1});
  db.posts.insert(
  [
    {
        "_id": post1Id,
        "username": "dimotta",
        "ownerid": user1Id,
        "displayname": "Antonio Di Motta",
        "image":"dimotta.jpg",
        "timestamp": new Date("2015-09-13T16:30:00Z").toISOString(),
        "text": "My first post using Chirp."
    },{
        "_id": post2Id,
        "username": "userdemo1",
        "ownerid": user3Id,
        "displayname": "I'm not a bot :)",
        "image": "ball.gif",
        "timestamp": new Date("2015-09-13T16:35:00Z").toISOString(),
        "text": "Are you ready for production?"
    },{
        "_id": post3Id,
        "username": "userdemo1",
        "ownerid": user1Id,
        "displayname": "I'm not a bot :(",
        "image": "ball.gif",
        "timestamp": new Date("2015-09-13T16:36:00Z").toISOString(),
        "text": "Are you ready for production?"
      }
  ]);
};

addUsers();
addPosts();
