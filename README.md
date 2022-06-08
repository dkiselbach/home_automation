# home_automation

This app is a GraphQL/Koa application. The purpose of this app is to control various smart devices
in your home. I started working with something similar for Rails but never finished it. I figured
this was a good opportunity to learn some Node and do it a bit differently.

## migrations

This application uses postgres and knex to handle database migrations. To setup the db locally,
in `psql` run `CREATE DATABASE home_automation;` and `CREATE DATABASE home_automation_test;`, then
run the migrate script.

### migrate

`npm run migrate`

### rollback

`npm run rollback`

### seeds

`npm run seeds`
