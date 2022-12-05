import Koa from 'koa';
import cors from '@koa/cors';
import mount from 'koa-mount';
import { graphqlHTTP } from 'koa-graphql';
import { Model } from 'objection';
// @ts-ignore
import { graphQLSchema } from './graphql/schema.js';
import knex from './data/db.js';
import { authenticateToken } from './services/auth.js';
import User from './models/user.js';

Model.knex(knex);
const app = new Koa();
let PORT;

app.use(cors());

app.use(async (ctx, next) => {
  const token = ctx.request.header.authorization;
  if (token) ctx.token = token.split(' ')[1];
  await next();
});

app.use(async (ctx, next) => {
  if (ctx.token) {
    const creds = authenticateToken(ctx.token);
    if (creds) ctx.user = await User.query().findById(creds.id);
  }

  await next();
});

app.use(
  mount(
    '/graphql',
    graphqlHTTP({
      schema: graphQLSchema,
      graphiql: { headerEditorEnabled: true },
    }),
  ),
);

if (process.env.NODE_ENV === 'test') {
  PORT = 0;
} else {
  PORT = 4000;

  console.log('listening');
}
export default app.listen(PORT);
