module.exports = async () => {
  try {
    await knex.raw(`DROP DATABASE IF EXISTS ${database}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
