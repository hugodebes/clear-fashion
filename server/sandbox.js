/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const adresse = require('./sources/adresseparisbrand');
const montlimartbrand = require('./sources/montlimartbrand');
const fs = require ('fs');



async function sandbox (eshop = 'https://www.dedicatedbrand.com/en/men/news') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await montlimartbrand.scrape(eshop);

    const data = JSON.stringify(products);

    fs.writeFile('products_montlimartbrand.json',data,(err)=>{
      if (err){
        throw err;
      }
      console.log("JSON file is created and saved.");
    });

    console.log(products);
    console.log('done');
    //process.exit(0); //if executed, it does not create our JSON file
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}


const [,, eshop] = process.argv;

sandbox(eshop);
