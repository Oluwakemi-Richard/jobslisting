const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Hello, Welcome and Good luck in your jobs search!');
});
routes.use('/jobs', require('./jobs'))
routes.use('/user', require('./user'))

module.exports = routes;