const Home = require('../../models/home');

const homes = async () => {
  return Home.query();
};

const homeUsers = async (home_id) => {
  return Home.relatedQuery('users').for(home_id).orderBy('createdAt');
};

module.exports = { homes, homeUsers };
