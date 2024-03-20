const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');

dotenv.config();

const collections = {};
let client = null;
let db = null;

/**
 * Connects to the database.
 *
 * This function establishes a connection to the MongoDB database using the connection string
 * specified in the environment variables. It initializes the MongoDB client, connects to the
 * database, and sets up the product collection for further database operations.
 */
async function connectDB(dbName) {
    try {
        client = new MongoClient(process.env.DB_CONN_STRING);
        await client.connect();
        db = client.db(dbName);
        const productCollection = db.collection(process.env.COLLECTION);
        const userCollection = db.collection(process.env.COLLECTION_USER);
        collections.products = productCollection;
        collections.users = userCollection;
        collections.counter = db.collection(process.env.COUNTER_COLLECTION);
        console.log(db.databaseName)
        if(await collections.counter.countDocuments() === 0){
            await collections.counter.insertOne({count : 1})
        }
        console.log(`Successfully connected to database: ${db.databaseName} and collection: ${productCollection.collectionName}`);
        return db;
    } catch (error) {
        console.error('Error during the connection to db: ', error);
    }
}


/**
 * Closes the database connection.
 *
 * This function closes the MongoDB client connection and performs cleanup tasks.
 */
async function closeDB() {
    try {
        if (client) {
            await client.close();
            console.log('Database connection closed successfully.');
        } else {
            console.warn('No database connection to close.');
        }
    } catch (error) {
        console.error('Error while closing database connection: ', error);
    }
}

module.exports = {
    connectDB,
    closeDB,
    collections,
    db
};