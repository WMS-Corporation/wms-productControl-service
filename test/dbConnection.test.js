const { MongoClient } = require('mongodb');
const { connectDB, collections } = require('../src/config/dbConnection');
const dotenv = require('dotenv');
const path = require("path");
const fs = require("fs");

dotenv.config();
describe('Database Connection', () => {
    let connection;
    let db;
    let productCollection;

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.DB_CONN_STRING);
        db = connection.db(process.env.DB_NAME);
        productCollection = db.collection(process.env.COLLECTION);
    });

    afterAll(async () => {
        await connection.close();
    });

    it('should connect to the database and collection', async () => {
        await connectDB(process.env.DB_NAME);
        const jsonFilePath = path.resolve(__dirname, './Resources/MongoDB/WMS.Product.json')
        const productData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'))
        collections.products.insertOne(productData)
        expect(db.databaseName).toBe("WMS");
        expect(collections.products).toBeDefined();
        expect(collections.products.collectionName).toBe(productCollection.collectionName);

    });

});
