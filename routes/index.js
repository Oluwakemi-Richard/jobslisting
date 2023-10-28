const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Hello, Welcome and Good luck in your jobs search!');
});

routes.use('/user', require('./user'))
routes.use('/jobs', require('./jobs'))

module.exports = routes;