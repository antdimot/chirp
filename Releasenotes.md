## 04/06/2016
* Refactoring of post directive

## 05/04/2016
* Added docker file
* Refactoring of the routes

## 24/02/2016
* Moved source files to src directory
* Added image route api handler
* Updated views and template for supporting the new image api
* Updated public view

## 23/02/2016
* Added repost (aka retweet) feature on home view
* Fix problem about ObjectId while post a message

## 22/02/2016
* Refactoring post list with post directive

## 15/02/2016
* Added favicon
* Added text sanitize on send message
* Login and Signup views enhancement

## 11/02/2016
* Added password encryption

## 28/01/2016
* Message visualization enhancement, adding link when there is a user reference (e.g. @dimotta)

## 18/01/2016
* Public timeline visualization enhancement
* Home timeline visualization enhancement
* Added a new user to *data.js*
* Added an image on logo
* Added the environment variable **MDB** for specifying the connectionString (e.g. production)
* Updated project structure
* Rename the folder *public* to *wwwroot*
* Disabled grunt tasks

## 17/01/2016
* Changing the property *usertargets* with *ownerid*
* Now the collection using the ObjectId.valueOf
* Update rest api for searching home posts
* Update rest api for posting a new message

## 31/12/2015
* Deep refactoring of solution
* Added support for realtime update of the timelines (by [socket.io](http://socket.io/))
* Added support for follow and unfollow

## 08/09/2015
* Updated solution
* Added **bower** support

## 05/07/2015
* Added **grunt** support
* Updated solution
* Update MIT license

## 07/04/2015
* Added **appContext** logic for encapsulation of utilities
* Added **following** and **followers** api
* Added **following** controller and view
* Added **followers** controller and view

## 06/04/2015
* Updated security api **authenticate** and **access**
* Split routes
* Updated **home** timeline with user following and follower counter

## 05/04/2015
* Back-end moved on root.
* Front-end (AngularJS) moved into the static folder
* Added a new security api for getting user by a token (actually is the username)
