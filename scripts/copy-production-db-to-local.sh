#!/usr/bin/env bash
set -e

if [ -a .env ] ; then
  source .env;
fi

prod_databaseurl="$(echo $PRODUCTION_DATABASE_URL |cut -d/ -f3-)"
prod_dbuserwithpass="$(echo $prod_databaseurl | grep @ | cut -d@ -f1)"
prod_dbuser="$(echo $prod_dbuserwithpass | cut -d\: -f1)"
prod_dbpass="$(echo $prod_dbuserwithpass | cut -d\: -f2)"
prod_dbhost="$(echo ${prod_databaseurl/$prod_dbuserwithpass@/} | cut -d\/ -f1 | cut -d\: -f1)"
prod_dbport="$(echo ${prod_databaseurl/$prod_dbuserwithpass@/} | cut -d\/ -f1 | cut -d\: -f2)"
prod_dbname="$(echo $prod_databaseurl | grep / | cut -d\/ -f2-)"

databaseUrl="$(echo $DATABASE_URL |cut -d/ -f3-)"
dbuserwithpass="$(echo $databaseUrl | grep @ | cut -d@ -f1)"
dbuser="$(echo $dbuserwithpass | cut -d\: -f1)"
dbpass="$(echo $dbuserwithpass | cut -d\: -f2)"
dbhost="$(echo ${databaseUrl/$dbuserwithpass@/} | cut -d\/ -f1 | cut -d\: -f1)"
dbport="$(echo ${databaseUrl/$dbuserwithpass@/} | cut -d\/ -f1 | cut -d\: -f2)"
dbname="$(echo $databaseUrl | grep / | cut -d\/ -f2-)"


echo "Script copy whole database from $prod_dbhost/$prod_dbname to $dbhost/$dbname (database $dbhost/$dbname will be cleaned)."
read -p "Are you sure? [Y/N] "
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
  echo "Exit"
  exit 1
fi

mkdir -p tmp
echo "Exporting production database ..."
PGPASSWORD="$prod_dbpass" pg_dump --no-privileges -U $prod_dbuser -h $prod_dbhost $prod_dbname > tmp/dump.sql
echo "Cleaning local database ..."
PGPASSWORD="$dbpass" psql -U $dbuser -h $dbhost -p $dbport -d $dbname -c "DROP SCHEMA public CASCADE;"
PGPASSWORD="$dbpass" psql -U $dbuser -h $dbhost -p $dbport -d $dbname -c "CREATE SCHEMA public;"
echo "Importing to local database ..."
PGPASSWORD="$dbpass" psql -U $dbuser -h $dbhost -p $dbport -d $dbname < tmp/dump.sql
rm -rf tmp/dump.sql
