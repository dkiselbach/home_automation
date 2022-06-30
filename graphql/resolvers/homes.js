import Home from '../../models/home';

const homes = async () => Home.query().orderBy('created_at', 'desc');

const homeUsers = async (homeId) => Home.relatedQuery('users').for(homeId).orderBy('created_at', 'desc');

export { homes, homeUsers };
