const db = require('./db');
var fs = require('fs');


async function find_brand (brand) {
  try {
    
    const result = await db.find({brand:brand});
    console.log(result);
    db.close();

  } catch (e) {
    console.error(e);
  }
}

async function find_product_less_price (price) {
  try {  
    const result = await db.find({price:{$lte:price}});
    console.log(result);
    db.close();

  } catch (e) {
    console.error(e);
  }
}


async function find_product_sort_price (order) {
  try {  
    const result = await db.sort(order);
    console.log(result);
    db.close();

  } catch (e) {
    console.error(e);
  }
}



async function add_doc (docs) {
  try {  
    const result = await db.insert(docs);
    db.close();

  } catch (e) {
    console.error(e);
  }
}



async function drop_doc (query) {
  try {  
    const result = await db.drop(query);
    db.close();

  } catch (e) {
    console.error(e);
  }
}



var adresseparis_db = JSON.parse(fs.readFileSync('sources/adresseparis_db_v2.json', 'utf8'));
var dedicated_db = JSON.parse(fs.readFileSync('sources/dedicated_db_v2.json', 'utf8'));
var montlimart_db = JSON.parse(fs.readFileSync('sources/montlimart_db_v2.json', 'utf8'));



//drop_doc({});
//add_doc(adresseparis_db);
//add_doc(dedicated_db);
//add_doc(montlimart_db);
find_brand("dedicated");
//find_product_less_price(29);
//find_product_sort_price(-1);