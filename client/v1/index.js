// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}];

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);



/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

console.log("🎯 TODO: The cheapest t-shirt");
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable
const cheapestShirtLink = "https://www.loom.fr";
console.log(`The link of the cheapest t-shirt proposed by a brand is : ${cheapestShirtLink}`);
/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

console.log("🎯 TODO: Number of products");
// 1. Create a variable and assign it the number of products
// 2. Log the variable
const nproduct = marketplace.length;
console.log(`In our database we have ${nproduct} products`);

// 1. Create a variable and assign it the list of brands name only
// 2. Log the variable
// 3. Log how many brands we have
console.log("🎯 TODO: Brands name");
const brand_name = new Set();
for (const brand of Object.values(marketplace)){
  brand_name.add(brand.brand);
}
console.log(`In total, we have ${brand_name.size} different brands`);
console.log(brand_name);

console.log("🎯 TODO: Sort by price");
// 1. Create a function to sort the marketplace products by price
// 2. Create a variable and assign it the list of products by price from lowest to highest
// 3. Log the variable
/*function sort_by_price(marketplace_products){
  for (let i=0;i<=10-2;i++){
    if(marketplace_products[i+1].price<marketplace_products[i].price){
      let temp = marketplace_products[i];
      marketplace_products[i]= marketplace_products[i+1];
      marketplace_products[i+1] = temp;
    }
  }
  return marketplace_products; 
}*/

function sort_by_price_asc (marketplace_products) {
  return marketplace_products.sort((a,b)=>parseFloat(a.price)-parseFloat(b.price));
}

const marketplace_sortPrice = sort_by_price_asc(marketplace);
console.log("sort by price")
console.log(marketplace_sortPrice);


console.log("🎯 TODO: Sort by date");
// 1. Create a function to sort the marketplace objects by products date
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable
function sort_by_date(marketplace_products){
  return marketplace_products.sort((productA,productB)=>Date.parse(productB.date) - Date.parse(productA.date));
}
var marketplace_sortDate = sort_by_date(marketplace);
console.log("sort by date")
console.log(marketplace_sortDate);
// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
// 2. Log the list
const res = [];
for (let i=0;i<=marketplace.length-1;i++){
  if (marketplace[i].price<=100 && marketplace[i].price>=50){
    res.push(marketplace[i]);
  }
}
console.log(res);
console.log("🎯 TODO: Average price");
// 1. Determine the average price of the marketplace
// 2. Log the average
let sum = 0;
for (let i=0;i<=marketplace.length-1;i++){
  sum+=marketplace[i].price;
}
const avg = sum/marketplace.length;
console.log(`The average price for a product is ${Math.round(avg)}€`);


/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */
console.log("🎯 TODO: Products by brands");
// 
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
// 2. Log the variable
// 3. Log the number of products by brands

var dictBrands={};
for(const name of brand_name){
  const list_product=[];
  for(var i =0;i<=marketplace.length-1;i++){
    if(marketplace[i].brand==name){
      list_product.push(marketplace[i]);
    }
  }
  dictBrands[name]=list_product;
}

console.log(dictBrands);
for(const[key,value] of Object.entries(dictBrands)){
  console.log(key,"has",value.length,"products");
}

console.log("🎯 TODO: Sort by price for each brand");
// 1. For each brand, sort the products by price, from highest to lowest
// 2. Log the sort

function sort_by_price_desc (marketplace_products) {
  return marketplace_products.sort((a,b)=>parseFloat(b.price)-parseFloat(a.price));
}

console.log("sort by price from highest to lowest");
const new_sort = {}
for (const name of brand_name){
  const new_sort = sort_by_price_desc(dictBrands[name])
  console.log(new_sort)
  dictBrands[name] = new_sort
}

console.log("🎯 TODO: Sort by date for each brand");
// 1. For each brand, sort the products by date, from old to recent
// 2. Log the sort

function sort_by_date_oldrecent(marketplace_products) {
  return marketplace_products.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  });
}
console.log("sort by date from old to recent");
for (const name of brand_name){
  const new_sort = sort_by_date_oldrecent(dictBrands[name])
  console.log(new_sort)
  dictBrands[name] = new_sort
}


/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

console.log("🎯 TODO: Compute the p90 price value");
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products


for (const name of brand_name){
  const data = sort_by_price_asc(dictBrands[name]);
  let res = data[Math.round(90*data.length/100)]
  console.log(`p90 value for the ${name} brand : ${res.price}€`);
}



/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]


console.log("🎯 TODO: New released products");
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.
for(let i =0;i<=COTELE_PARIS.length-1;i++){
  let released_date = new Date(COTELE_PARIS[i].released);
  let today = new Date();
  let diff = today.getTime()-released_date.getTime();
  let diff_day = parseInt(diff/(1000*3600*24));
  if(diff_day<14){
    console.log(`This product called ${COTELE_PARIS[i].name} was released for less than 2 weeks, exactly : ${diff_day} days`);
  }
  else{
    console.log(`This product called ${COTELE_PARIS[i].name} was released for more than 2 weeks, exactly : ${diff_day} days`);
  }
  
}

console.log(' 🎯 TODO: Reasonable price');
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€

let reasonable_price_shop = true;
let costly_product =[]
for (let i = 0; i < COTELE_PARIS.length;i++){
  if (COTELE_PARIS[i].price > 100){
    costly_product.push(COTELE_PARIS[i]);
    reasonable_price_shop = false;
    break;
  }
}
if(reasonable_price_shop==true){
  console.log(`In the CoteleParis store, there is only reasonable price for products`);
}
else{
  console.log(`In the CoteleParis, we have products where the price is higher than 100€ like : ${costly_product[0].name}`);
}

console.log("🎯 TODO: Find a specific product");
// 1. Find the product with the uuid b56c6d88-749a-5b4c-b571-e5b5c6483131
const index = Object.keys(COTELE_PARIS).find(key => COTELE_PARIS[key].uuid==='b56c6d88-749a-5b4c-b571-e5b5c6483131')
const product_b56 = COTELE_PARIS[index]
// 2. Log the product
console.log(product_b56)

console.log("🎯 TODO: Delete a specific product");
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
console.log(`Number of products : ${COTELE_PARIS.length}`);
COTELE_PARIS.splice(index,1);
console.log("delete...");
// 2. Log the new list of product
console.log(`Number of products : ${COTELE_PARIS.length}`);

// 🎯 TODO: Save the favorite product
console.log("🎯 TODO: Save the favorite product")
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};
// we make a copy of blueJacket to jacket
// and set a new property favorite to true
let jacket = blueJacket;
jacket.favorite = true;



// 1. Log blueJacket and jacket variables
console.log("blueJacket variable : ",blueJacket)
console.log("jacket variable : ",jacket)

// 2. What do you notice?
// The 'favorite' property of blueJacket also changed to true
blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update jacket property with favorite to true WITHOUT changing blueJacket properties
jacket = Object.assign({},jacket,{favorite : true})
console.log("blueJacket variable : ",blueJacket)
console.log("jacket variable : ",jacket)




console.log('🎯 TODO: Save in localStorage');
// 1. Save MY_FAVORITE_BRANDS in the localStorage
// 2. log the localStorage
console.log('Save in Local Storage');
window.localStorage.setItem("MY_FAVORITE_BRANDS",JSON.stringify(MY_FAVORITE_BRANDS));
console.log(window.localStorage.getItem("MY_FAVORITE_BRANDS"));

/*
 * 🎬
 * The End
 * 🎬
 */
