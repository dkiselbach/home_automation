import request from 'supertest';

describe('userCreate', () => {
  let createMutation = `mutation {
    userCreate(firstName: "Dylan", lastName: "Kiselbach", email: "test@gmail.com", password: "password") {
      id
      firstName
      lastName
      email
    }
  }`;

  let mutation = `mutation userCreate($firstName: String!, $lastName: String!, $email: String!, $password: String!)`;

  test('creates a user and returns it', async () => {
    const tokenResponse = await request(global.app)
      .post('/graphql')
      .send({ query: createMutation })
      .set('Accept', 'application/json');

    console.log(tokenResponse.body);
  });
});
