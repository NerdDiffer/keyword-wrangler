#Keyword Wrangler

Allow users to manage a structured set of data about food & cooking.

Map some keywords into categories, allow users to browse & edit the data.

* Create, read, update, delete keywords.

AngularJS in front-end, connecting to a NodeJS RESTful API on back-end.

Following Part 2 of Manuel Kiessling's, *The Node Craftsman Book*.

##Get started

`npm start` to start server  
`npm test` run tests

###Components

####Front end

* `Bower`:  front-end dependencies
* AngularJS plugin, `Restangular`: manage webservice calls

####Back end

* `npm`:  back-end dependencies
* `Percolator`, a library to streamline creation of restful APIs with Node
* Databases:
  * environments
    * testing & development: `sqlite`
    * production: `MySQL`
  * database access abstraction: `node-dbi`
  * versioning details of structural changes to databases: `db-migrate`
* Testing:
  * `Jasmine`
