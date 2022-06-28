const Home = require('../../models/home');

const homes = async () => {
  return Home.query().orderBy('created_at', 'desc');
};

const homeUsers = async (home_id) => {
  return Home.relatedQuery('users').for(home_id).orderBy('created_at', 'desc');
};

module.exports = { homes, homeUsers };
