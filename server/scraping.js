/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const fs = require("fs");
const montlimartbrand = require('./sources/montlimartbrand');
const adresseparisbrand = require('./sources/adresseparisbrand.js');
const crypto = require("crypto");
const { profile } = require('console');


const pages = {
  "men" : {
    "t-shirts" : "https://www.dedicatedbrand.com/en/men/t-shirts",
    "basics" : "https://www.dedicatedbrand.com/en/men/basics",
    "sweats" : "https://www.dedicatedbrand.com/en/men/sweats",
    "knitwear" : "https://www.dedicatedbrand.com/en/men/knitwear",
    "shirts" : "https://www.dedicatedbrand.com/en/men/shirts",
    "bottoms" : "https://www.dedicatedbrand.com/en/men/bottoms",
    "jackets" : "https://www.dedicatedbrand.com/en/men/jackets",
    "caps_and_beanies" : "https://www.dedicatedbrand.com/en/men/jackets",
    "socks" : "https://www.dedicatedbrand.com/en/men/socks",
    "underwear" : "https://www.dedicatedbrand.com/en/men/underwear",
    "swim_shorts" : "https://www.dedicatedbrand.com/en/men/swim-shorts"
  },
  "women":{
    "t-shirts" : "https://www.dedicatedbrand.com/en/women/t-shirts-and-tops",
    "basics" : "https://www.dedicatedbrand.com/en/women/basics",
    "sweats" : "https://www.dedicatedbrand.com/en/women/sweats",
    "knitwear" : "https://www.dedicatedbrand.com/en/women/knitwear",
    "dresses" : "https://www.dedicatedbrand.com/en/women/dresses",
    "shirts" : "https://www.dedicatedbrand.com/en/women/shirts",
    "bottoms" : "https://www.dedicatedbrand.com/en/women/bottoms",
    "jackets" : "https://www.dedicatedbrand.com/en/women/jackets",
    "caps_and_beanies" : "https://www.dedicatedbrand.com/en/women/jackets",
    "socks" : "https://www.dedicatedbrand.com/en/women/socks",
    "underwear" : "https://www.dedicatedbrand.com/en/women/underwear",
  },
  "kids":{
    "t-shirts" : "https://www.dedicatedbrand.com/en/kids/t-shirts",
    "sweatshirts" : "https://www.dedicatedbrand.com/en/kids/sweatshirts",
    "bottoms" : "https://www.dedicatedbrand.com/en/kids/bottoms",
    "swimwear" : "https://www.dedicatedbrand.com/en/kids/swimwear",
  }
  
}

const pages_montlimart = {
  "sweats" : "https://www.montlimart.com/pulls-sweats.html",
  "shirts" : "https://www.montlimart.com/chemises.html",
  "polos" : "https://www.montlimart.com/polos-t-shirts.html",
  "shoes" : "https://www.montlimart.com/chaussures.html",
  "accessories" : "https://www.montlimart.com/accessoires.html",
  "jeans" : "https://www.montlimart.com/pantalons-jeans.html"
}

const pages_paris = {
  "sweats" : "https://adresse.paris/608-pulls-et-sweatshirts",
  "jackets" : "https://adresse.paris/583-manteaux-et-blousons",
  "jeans" : "https://adresse.paris/610-pantalons",
  "shirts" : "https://adresse.paris/584-chemises",
  "t-shirts" : "https://adresse.paris/659-t-shirts-et-polos"


}


const results = []

async function sandbox (eshop) {
  try {   
    for(var type in pages_paris){ 
        link = pages_paris[type];
        console.log("🕵️‍♀️  browsing through"+ link);     
        const products = await adresseparisbrand.scrape(link);
        const brands = {};
        var count = 0;
        products.forEach(product => {
          count=count+1;
          //console.log(product.link);
          const link_brand = {product: {id:''+count+'_'+type+'_adresseparis'}};
          brands[link_brand.product.id] = {
            brand : "adresseparis",
            name: product.name,
            price: product.price,
            link : product.link,
            type : type,
            image_link :product.picture,
            _id: crypto.randomBytes(16).toString("hex")
          };
          //console.log(product.image);
        //console.log(brands)
        })
        //console.log(category);
        //console.log(products);
        //const data = JSON.stringify(brands);
        //fs.appendFileSync('./sources/file.json', data);
        var values = Object.keys(brands).map(function(key){
          return brands[key];
        });
        results.push(values);
        //console.log("DONE");
    }   
    const database = JSON.stringify(results);
    //console.log("data");
    //console.log(data);
    fs.appendFileSync('./sources/adresseparis_db_v2.json', database);
    //fs.appendFile("Users/Hugo/Documents/Travail/A4/Web Applications Architecture/Hugo Branch/clear-fashion/server/dedicated.json",data,(err)=>{
     // if(err){
     //   throw err;
      //}
    //})
    //console.log(results.length);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;
sandbox(eshop);

