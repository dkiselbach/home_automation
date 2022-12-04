import { createUserWithHome } from '../../factories/user.factory.js';
import request from 'supertest';
import { authenticationHeader } from '../../utils/authentication.js';

describe('homes', () => {
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
    const usersResponse = await request(global.app)
      .post('/graphql')
      .send({ query: query })
      .set('Accept', 'application/json')
      .set('Authorization', await authenticationHeader());

    const users = usersResponse.body;

    expect(users.data.users).toHaveLength(2);
    expect(users.data.users[0].firstName).toEqual('Dylan');
    expect(users.data.users[0].lastName).toEqual('Kiselbach');
    expect(users.data.users[0].email).toEqual('test@gmail.com');
    expect(users.data.users[0].homes[0].addressLine1).toEqual('An address');
    expect(users.data.users[0].homes[0].name).toEqual('A name');
    expect(users.data.users[1].firstName).toEqual('Han');
    expect(users.data.users[1].lastName).toEqual('Duet');
    expect(users.data.users[1].email).toEqual('handuet@thumbwars.com');
  });
});
