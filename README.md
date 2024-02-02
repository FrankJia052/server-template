# Introduction

This is our basic express server

It integrate typeorm, basic error handler, response helper and separate the development / production environment.



# Configuration:

Based on the `.env.example`, create your own `.env` with correct database information.

Change `.env` content:

- DEVELOP DATABASE
- HTTP_PORT to the port of project announcement announced





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

before run it, you need to setup the `.env` for the PRODUCTION DATABASE. Please ask Jurong for details.



# Other

You can add any library , add any technology in your service, make proper documentation that others can understand easily. 









