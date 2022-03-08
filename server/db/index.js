require('dotenv').config();
const {MongoClient} = require('mongodb');
const fs = require('fs');

const MONGODB_DB_NAME = 'clearfashion';
const MONGODB_COLLECTION = 'products';
const MONGODB_URI = process.env.MONGODB_URI;

let client = null;
let database = null;

/**
 * Get db connection
 * @type {MongoClient}
 */
const getDB = module.exports.getDB = async () => {
  try {
    if (database) {
      console.log('💽  Already Connected');
      return database;
    }

    client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    database = client.db(MONGODB_DB_NAME);

    console.log('💽  Connected');

    return database;
  } catch (error) {
    console.error('🚨 MongoClient.connect...', error);
    return null;
  }
};

/**
 * Insert list of products
 * @param  {Array}  products
 * @return {Object}
 */
module.exports.insert = async products => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    // More details
    // https://docs.mongodb.com/manual/reference/method/db.collection.insertMany/#insert-several-document-specifying-an-id-field
    const result = await collection.insertMany(products, {'ordered': false});

    return result;
  } catch (error) {
    console.error('🚨 collection.insertMany...', error);
    fs.writeFileSync('products.json', JSON.stringify(products));
    return {
      'insertedCount': error.result.nInserted
    };
  }
};

/**
 * Find products based on query : 1 for ascending, -1 for descending
 * @param  {Array}  query
 * @return {Array}
 */
module.exports.find = async query => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const result = await collection.find(query).toArray();

    return result;
  } catch (error) {
    console.error('🚨 collection.find...', error);
    return null;
  }
};

/**
 * Sort products 
 * @param  {Array}  order
 * @return {Array}
 */
 module.exports.sort = async order => {
  try {
    const db = await getDB();
    var sort_key = {price:order};
    const collection = db.collection(MONGODB_COLLECTION);
    const result = await collection.find().sort(sort_key).toArray();

    return result;
  } catch (error) {
    console.error('🚨 collection.find...', error);
    return null;
  }
};


/**
 * drop products 
 * @param  {Array}  order
 * @return {Array}
 */
 module.exports.drop = async query => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const result = await collection.deleteMany(query);
  } catch (error) {
    console.error('🚨 collection.find...', error);
    return null;
  }
};


/**
 * Close the connection
 */
module.exports.close = async () => {
  try {
    await client.close();
  } catch (error) {
    console.error('🚨 MongoClient.close...', error);
  }
};
