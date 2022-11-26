import { createUserWithHome } from '../../factories/user.factory.js';
import request from 'supertest';
// @ts-nocheck

describe('homes', () => {
  let tester;
  let token;
  let query = `{
    users {
      id
      firstName
      lastName
      email
      homes {
        id
        addressLine1
        addressLine2
        city
        state
        postalCode
        name
      }
    }
  }`;
  let loginMutation = `mutation {
    userLogin(email: "test@gmail.com", password: "password") {
      id
      token
    }
  }`;

  beforeEach(async () => {
    await createUserWithHome({
      firstName: 'Dylan',
      lastName: 'Kiselbach',
      email: 'test@gmail.com',
      homes: [
        {
          addressLine1: 'An address',
          name: 'A name',
          city: 'A city',
          state: 'A state',
          postalCode: 'A postalCode',
          country: 'A country',
        },
      ],
    });
    await createUserWithHome({
      firstName: 'Han',
      lastName: 'Duet',
      email: 'handuet@thumbwars.com',
    });
  });

  test('returns users and homes', async () => {
    const tokenResponse = await request(global.app)
      .post('/graphql')
      .send({ query: loginMutation })
      .set('Accept', 'application/json');

    const homesResponse = await request(global.app)
      .post('/graphql')
      .send({ query: query })
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + tokenResponse.body.data.userLogin.token);

    const homes = homesResponse.body;

    expect(homes.data.users).toHaveLength(2);
    expect(homes.data.users[0].firstName).toEqual('Dylan');
    expect(homes.data.users[0].lastName).toEqual('Kiselbach');
    expect(homes.data.users[0].email).toEqual('test@gmail.com');
    expect(homes.data.users[0].homes[0].addressLine1).toEqual('An address');
    expect(homes.data.users[0].homes[0].name).toEqual('A name');
    expect(homes.data.users[1].firstName).toEqual('Han');
    expect(homes.data.users[1].lastName).toEqual('Duet');
    expect(homes.data.users[1].email).toEqual('handuet@thumbwars.com');
  });
});
