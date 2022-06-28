const Koa = require('koa');
const cors = require('@koa/cors');
const mount = require('koa-mount');
const { graphqlHTTP } = require('koa-graphql');
const HomeAutomationSchema = require('./graphql/schema');
const { Model } = require('objection');
const knex = require('./data/db');

Model.knex(knex);
const app = new Koa();
app.use(cors());

app.use(
  mount(
    '/graphql',
    graphqlHTTP({
      schema: HomeAutomationSchema,
      graphiql: true,
    }),
  ),
);

app.listen(4000);
console.log('listening');
