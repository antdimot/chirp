# Chirp

The social engine open source, which has been developed using the [MEAN](https://en.wikipedia.org/wiki/MEAN_(software_bundle)) javascript full stack.

Read the [release notes](https://github.com/antdimot/chirp/blob/master/Releasenotes.md)
for the last updates. [Activity board](https://trello.com/b/prRPzzir).

### Features:
- public timeline
- user timeline
- user info
- post of a message
- list of the followers
- list of the following
- follow an user
- unfollow an user
- sign up
- log on


### Try it now on your workstation with Docker

Clone the project and run the following:

> Run Official Chirp Container with `docker-compose`

```sh
docker-compose up
```

On Linux go to:

[http://localhost:3000](http://localhost:3000)

On OSX/Windows get the IP of the docker machine and browse that server, example:

```sh
% docker-machine ip
192.168.99.100
```

[http://192.168.99.100:3000](http://192.168.99.100:3000)


If you don't have docker compose, you can run manually the mongo and chirp containers in the following order:

>  a) Run Official Mongo Container manually

```sh
docker run --name mongodb -d mongo
```

> b) Run Official Chirp Container manually

```sh
docker run --name chirp -p 3000:3000 --link mongodb:mongodb dinolupo/chirp
```



### Todo (missing features):
- searching (users and messages)
- security enhancements (ie. add jwt)
- hashtag support
- rest api documentation
- edit user information
- customize user info (ie. image profile)
- repost

### How to install:
1. Clone the project
2. Install *nodejs*
3. Install *mongodb*
4. Restore *node_modules* using ```npm install```
5. Execute **node main**

### Known issues:
- no check of the username (duplication) when signup
