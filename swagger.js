const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Jobs API',
    description: 'Creates and Manages job listings',
  },
  host: 'jobslisting.onrender.com',
  schemes: ['https'],
};

// const outputFile = './path/swagger-output.json';
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc)