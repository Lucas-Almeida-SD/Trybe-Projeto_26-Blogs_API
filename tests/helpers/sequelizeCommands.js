module.exports = {
  drop: 'NODE_ENV=test npx sequelize db:drop',
  create: 'NODE_ENV=test npx sequelize db:create',
  migrate: 'NODE_ENV=test npx sequelize db:migrate',
  seed: 'NODE_ENV=test npx sequelize db:seed:all',
};
