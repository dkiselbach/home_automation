const Home = require('../../models/home');

const homes = async () => {
  return Home.query().orderBy('createdAt', 'desc');
};

const homeUsers = async (home_id) => {
  return Home.relatedQuery('users').for(home_id).orderBy('createdAt', 'desc');
};

module.exports = { homes, homeUsers };
