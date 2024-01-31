# Run Server

Database: PostgreSQL



### 1 - For Development

1. Download PostgreSQL and run it locally

   ~~~bash
   # check db server
   $pg_ctl status
   
   # login db
   $ psql -U postgress
   ~~~

   

2. Set a password for database

   ~~~postgresql
   ALTER USER postgres PASSWORD 'your_password';
   ~~~

   

3. Create a database and schema consistent with the environment variables

   ~~~postgresql
   # create database
   CREATE DATABASE auth;
   
   # switch database
   \c database_name;
   
   # create schema
   CREATE SCHEMA testschema1;
   ~~~

4. Execute the following command in the project's root directory in the command prompt

   ~~~bash
   # async the data, only first time run need
   $ npm run schema:sync
   
   # run server in development mode
   $ npm run dev:start
   ~~~

   

### 2 - For Production

~~~bash
$ npm run pro:start
~~~











