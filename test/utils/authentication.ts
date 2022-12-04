import request from 'supertest';

export const authenticationHeader = async (email = 'test@gmail.com', password = 'password') => {
  let loginMutation = `mutation {
    userLogin(email: "${email}", password: "${password}") {
      id
      token
    }
  }`;

  const tokenResponse = await request(global.app)
    .post('/graphql')
    .send({ query: loginMutation })
    .set('Accept', 'application/json');

  return 'Bearer ' + tokenResponse.body.data.userLogin.token;
};
