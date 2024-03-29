import { createHomeWithUser } from '../../factories/home.factory.js';
import request from 'supertest';
import bcrypt from 'bcrypt';
import { authenticationHeader } from '../../utils/authentication.js';

describe('homes', () => {
  let query = `{
    homes {
      id
      addressLine1
      addressLine2
      city
      state
      postalCode
      name
      users {
        id
        firstName
        lastName
        email
      }
    }
  }`;

  beforeEach(async () => {
    await createHomeWithUser({
      addressLine1: '101 California',
      name: "Dylan's Home",
      users: [
        {
          firstName: 'Dylan',
          lastName: 'Kiselbach',
          email: 'test@gmail.com',
        },
      ],
    });
    await createHomeWithUser({
      addressLine1: 'Another address',
      name: 'A Home',
    });
  });

  test('returns homes and users', async () => {
    const homesResponse = await request(global.app)
      .post('/graphql')
      .send({ query: query })
      .set('Accept', 'application/json')
      .set('Authorization', await authenticationHeader());

    const homes = homesResponse.body;

    expect(homes.data.homes).toHaveLength(2);
    expect(homes.data.homes[0].addressLine1).toEqual('101 California');
    expect(homes.data.homes[0].name).toEqual("Dylan's Home");
    expect(homes.data.homes[0].users[0].firstName).toEqual('Dylan');
    expect(homes.data.homes[0].users[0].lastName).toEqual('Kiselbach');
    expect(homes.data.homes[0].users[0].email).toEqual('test@gmail.com');
    expect(homes.data.homes[1].addressLine1).toEqual('Another address');
    expect(homes.data.homes[1].name).toEqual('A Home');
  });
});
