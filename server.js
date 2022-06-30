import Koa from 'koa';
import cors from '@koa/cors';
import mount from 'koa-mount';
import { graphqlHTTP } from 'koa-graphql';
import { Model } from 'objection';
import { graphQLSchema } from './graphql/schema';
import knex from './data/db';
import authenticate from './services/auth';
import User from './models/user';

Model.knex(knex);
const app = new Koa();
app.use(cors());

app.use(async (ctx, next) => {
  const token = ctx.request.header.authorization;
  ctx.token = token.split(' ')[1];
  await next();
});

app.use(async (ctx, next) => {
  if (ctx.token) {
    const creds = authenticate(ctx.token);
    if (creds) ctx.user = await User.query().findById(creds.id);
  }

  console.log(ctx.user);
  await next();
});

app.use(
  mount(
    '/graphql',
    graphqlHTTP({
      schema: graphQLSchema,
      graphiql: true,
    }),
  ),
);

app.listen(4000);
console.log('listening');
