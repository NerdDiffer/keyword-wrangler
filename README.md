#Keyword Wrangler

Allow users to manage a structured set of data about food & cooking.

Map some keywords into categories, allow users to browse & edit the data.

* Create, read, update, delete keywords.

AngularJS in front-end, connecting to a NodeJS RESTful API on back-end.

Following Part 2 of Manuel Kiessling's, *The Node Craftsman Book*.

##Get started

#####install dependencies

* `npm install`
* `bower install`

#####migrate db
Substitute environment of choice at the end of command.

* `./node_modules/.bin/db-migrate up --env dev`
* `./node_modules/.bin/db-migrate down --env dev`

#####start server
`npm start`  
By default, the server is started in 'test' environment.

#####run tests
`npm test`

#####set environment variables
`KW_ENV='dev'`  
other accepted values are:  
* 'test' (default)
* 'production'
