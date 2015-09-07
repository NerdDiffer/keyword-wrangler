#Notes

##API Responding with db content

Development & test environments are using `sqlite3`, while production
environment will use `mysql`.

* use the `spec/resetDatabase.js` file to reset db between test runs
* define a dbSession object in `src/backend/dbSession.js`. Later on, it'll be used to allow different db setups for different environments.

###Creating a sqlite db

From the terminal, open up the sqlite3 prompt and create a db file:
`sqlite3 /var/tmp/keyword-wrangler.test.sqlite`

From sqlite prompt, make 'keyword' and 'category' tables.

``` sqlite
sqlite> CREATE TABLE keyword (id INTEGER PRIMARY KEY, value TEXT, categoryID INTEGER);
sqlite> CREATE TABLE category (id INTEGER PRIMARY KEY, name TEXT);
sqlite> .quit
```

---

##Migrations

Create a `database.json` file in project root, to define connection parameters
for different environments.

Use the `db-migrate` module. It will generate migration files and, by default,
put them in the `migrations/` directory.

####sample commands:
generate a migration

`./node_modules/.bin/db-migrate create createKeywordAndCategoryTable --env test`
