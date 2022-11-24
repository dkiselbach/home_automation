import { createUserWithHome } from '../../factories/user.factory';
import EasyGraphQLTester from 'easygraphql-tester';
import { graphQLSchema } from '../../../src/graphql/schema';

describe('homes', () => {
  let tester;
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
    tester = new EasyGraphQLTester(graphQLSchema);
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
    const homes = await tester.graphql(query);

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
