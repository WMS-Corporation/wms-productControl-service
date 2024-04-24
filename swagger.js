const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: 'Product API',
        description: 'This API provides endpoints for managing product data.'
    },
    host: 'localhost:4002'
};

const outputFile = './swagger-doc.json';
const routes = ['./src/routes/*.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);