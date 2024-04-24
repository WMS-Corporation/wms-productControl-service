const express = require('express');
const cors = require('cors');
const {connectDB} = require("./src/config/dbConnection");
const router = require('./src/routes/route');
const dotenv = require('dotenv');
/*
* Allow access from any subroute of http://localhost:3000
* */
const productServicePort = process.env.PORT || 4002;
let corsOptions = {
    origin: new RegExp(`http:\/\/wms-product:${productServicePort}\/.*`),
};
dotenv.config();
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-doc.json'); // Importa il file di documentazione Swagger JSON
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.disable("x-powered-by");
app.use(express.json());
app.use(cors(corsOptions));
app.use(router);
app.listen(productServicePort, () => console.info(`WMS-product-service is running`));

connectDB(process.env.DB_NAME);

module.exports = { app };