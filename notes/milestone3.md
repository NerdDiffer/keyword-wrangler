#Migrations

Create a `database.json` file in project root, to define connection parameters
for different environments.

Use the `db-migrate` module. It will generate migration files and, by default,
put them in the `migrations/` directory.

####sample commands:
generate a migration

`./node_modules/.bin/db-migrate create createKeywordAndCategoryTable --env test`
