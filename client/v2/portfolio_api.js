// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};
let favorites = [];

// inititiqte selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const selectBrand = document.querySelector('#brand-select');
const selectPrice = document.querySelector('#price-select');
//const selectReleased = document.querySelector('#released-select')
const selectSort = document.querySelector('#sort-select');
//const spanNewproducts = document.querySelector('#newProducts');
const spanp50 = document.querySelector('#p50');
const spanp90 = document.querySelector('#p90');
const spanp95 = document.querySelector('#p95');
//const spanReleased=document.querySelector('#lastReleased');


//currentProducts=dictBrands[selectBrand];
//console.log(currentProducts);
/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 * 
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};


const reduceProducts = async(body,size,page) =>{
    console.log("greg");
    console.log(body);
    try {
        let res = [];
        for(var i = page*size-size; i < page*size ;i++){
            res.push(body[i]);
        }
        return res;
    }catch(error){
        console.log(error);
    }
}
function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}

/**
 * Fetch products from api
 * @param  {Number}  [page=selectPage] - current page to fetch
 * @param  {Number}  [size=selectShow] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://server-ashen.vercel.app/products?limit=1000`
    );
    const body = await response.json();
    if (body.length==0) {
      console.error(body);
      return {currentProducts, currentPagination};
    }
    let meta= {"currentPage":page,"count":body.length,"pageCount":size*page,"pageSize":size}
    var shuffle_body = shuffle(body);
    let result = await reduceProducts(shuffle_body,size,page);
    let res = {result,meta} 
    console.log("res");
    console.log(res);
    return res;
  } catch (error) {
    console.log("problem")
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

/**
 * Render list of products
 * @param {Array} products 
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
    return `
    <div class="card">
        <img src="${product.image_link}" alt="" style="width:100%" >
        <h1>${product.name}</h1>
        <p class="price">${product.price}€</p>
        <p>Brand : ${product.brand}</p>
        <p><button onclick="window.open('${product.link}', '_blank'); return false;">Open link</button></p>
        <p><button id ='button${product.name}' onclick="SaveAsFavorite('${product._id}');setColor('button${product.name}','#D6140E')">Add to favorites</button></p>
    </div>`
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<div class = "feature-product"><h2>Products</h2><div>';
  sectionProducts.appendChild(fragment);
};


/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};


//----------------------------------------------------------------------------------------------------------------------------------------

/**
 * 📱
 * FEATURES
 * 
 * A User Story is an informal, general explanation of a software feature written from the perspective of the end user or customer
 * 
 * A user story should typically have a summary structured this way
 * 1. As a [user concerned by the story]
 * 2. I want [goal of the story]
 * 3. so that [reason for the story]
 * 📱
 */

/**
 * 🎯 Feature 0 - Show more 
 * 
 * As a user
 * I want to show more products
 * So that i can display 12, 24 or 48 products on the same page
 */
 selectShow.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage, parseInt(event.target.value))
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination))
);


/**
 * 🎯 Feature 1 - Browse pages
 * 
 * As a user
 * I want to browse available pages
 * So that i can load more products
 */
selectPage.addEventListener('change',event => {
  //console.log(event.target.value);
  fetchProducts(parseInt(event.target.value), currentPagination.size)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
})

/**
 * 🎯 Feature 2 - Filter by brands
 * 
 * As a user
 * I want to filter by brands name
 * So that i can browse product for a specific brand
 */
 selectBrand.addEventListener('change',event => {
  let brands = ["adresseparis","montlimart","dedicated"]
  var dictBrands={}
  for(const name of brands){
    const list_product = []
    for (var i = 0;i < currentProducts.length;i++){
      if (currentProducts[i].brand == name){
        list_product.push(currentProducts[i]);
      }
    }
    dictBrands[name] = list_product;
  } 
  var brand=selectBrand.value;
  var temp= dictBrands[brand];
  console.log(temp);
  fetchProducts(currentPagination.currentPage, currentPagination.size)
    .then(setCurrentProducts)
    .then(() => render(temp, currentPagination));
})

/**
 * 🎯 Feature 3 - Filter by recent products
 * 
 * As a user
 * I want to filter by recent products
 * So that i can browse the new released products (less than 2 weeks)
 */
 /*selectReleased.addEventListener('change',event => {
  var date =selectReleased.value;
  var nb_days = 0;
  if (date == "2w"){
    nb_days = 14;
  }
  else if (date == "1m"){
    nb_days = 30;
  }
  else if (date == "2m"){
    nb_days = 60;
  }
  else if (date == "6m"){
    nb_days = 180;
  }
  var temp = []
  const today = new Date();
  for(var i = 0; i < currentProducts.length;i++){
    const date = new Date(today.getTime())
    const date_product = new Date(currentProducts[i].released);
    const lessthan = new Date(date_product.getTime() + nb_days*24*60*60*1000);
    if ( date < lessthan){
      console.log('DATE DEBUG',date)
      console.log(date_product)
      temp.push(currentProducts[i]);
    }
  }

  console.log(temp);
  fetchProducts(currentPagination.currentPage, currentPagination.size)
    .then(setCurrentProducts)
    .then(() => render(temp, currentPagination));
})
*/
/**
 * 🎯 Feature 4 - Filter by reasonable price
 * 
 * As a user
 * I want to filter by reasonable price
 * So that i can buy affordable product i.e less than 50€
 */
 selectPrice.addEventListener('change',event => {
  var price=selectPrice.value;
  var temp = []
  for(var i = 0; i < currentProducts.length;i++){
    if (currentProducts[i].price <= price){
      temp.push(currentProducts[i]);
    }
  }
  console.log(temp);
  fetchProducts(currentPagination.currentPage, currentPagination.size)
    .then(setCurrentProducts)
    .then(() => render(temp, currentPagination));
})

/**
 * 🎯 Feature 5 - Sort by price
 * 
 * As a user
 * I want to sort by price
 * So that i can easily identify cheapest and expensive products
 */
 function SortAsc(marketplace){
  return marketplace.sort((a, b) => a.price - b.price);
}
function SortDesc(marketplace){
  return marketplace.sort((b, a) => a.price - b.price);
}

/**
 * 🎯 Feature 6 - Sort by date
 * 
 * As a user
 * I want to sort by date
 * So that i can easily identify recent and old products
 */
function SortDateAsc(marketplace){
  return marketplace.sort((b,a)=> new Date(b.released) - new Date(a.released));
}
function SortDateDesc(marketplace){
  return marketplace.sort((a,b)=> new Date(b.released) - new Date(a.released));
}

selectSort.addEventListener("change", event => {
  //const sortByValue = sortByDropdown.value; // price or ram value
  const choice = selectSort.value; // asc or desc value
  var temp=[];
  if(choice == "price-desc")
  {
    //temp="price";
    temp=SortDesc(currentProducts);
  }
  if(choice=='price-asc')
  {
    temp=SortAsc(currentProducts);
  }
  /*
  if(choice=='date-asc')
  {
    temp=SortDateDesc(currentProducts);
  }
  if(choice=='date-desc')
  {
    temp=SortDateAsc(currentProducts);
  }
  */
  console.log(temp);
  fetchProducts(currentPagination.currentPage,currentPagination.size)
    .then(setCurrentProducts)
    .then(() => render(temp, currentPagination));

});

/**
 * 🎯 Feature 8 - Number of products indicator
 * 
 * As a user 
 * I want to indicate the total number of products
 * So that i can understand how many products is available
 */
 const renderIndicators = pagination => {
  const {count} = pagination;
  spanNbProducts.innerHTML = count;
};

/**
 * 🎯 Feature 9 - Number of recent products indicator
 * 
 * As a user
 * I want to indicate the total number of recent products
 * So that i can understand howw many new products are available
 */
/*
 const renderNewProducts = products => {
  let count = 0;
  var today=new Date();
  for (let i=0;i<products.length;i++)
  {
    var test=products[i].released;
    var test2=new Date(test);
    var rep=Math.floor((today-test2)/(1000*60*60*24));
    if(rep<=14)
    {
      count=count+1;
    }
  }
  spanNewproducts.innerHTML = count;
};
*/
/**
 * 🎯 Feature 10 - p50, p90 and p95 price value indicator
 * 
 * As a user
 * I want to indicate p50, p90 and p95 price value
 * So that i can understand the price values of the products 
 */
 const renderP90 = products =>{
  var idx=parseInt(products.length*0.9);
  var sorted=SortAsc(products);
  var count=sorted[idx].price;
  spanp90.innerHTML=count;
}
const renderP50 = products =>{
  var idx=parseInt(products.length*0.5);
  var sorted=SortAsc(products);
  var count=sorted[idx].price;
  spanp50.innerHTML=count;
}
const renderP95 = products =>{
  var idx=parseInt(products.length*0.95);
  var sorted=SortAsc(products);
  var count=sorted[idx].price;
  spanp95.innerHTML=count;
}

/**
 * 🎯 Feature 11 - Last released date indicator
 * 
 * As a user
 * I want to indicate the last released date
 * So that i can understand if we have new products
 */
/*
const renderLastReleased = products=>{
  console.log(products);
  var sorted=SortDateDesc(products);
  var count=sorted[0].released;
  spanReleased.innerHTML=count;
}
*/
const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
  renderP90(products);
  renderP50(products);
  renderP95(products);
  //renderLastReleased(products);
  //renderNewProducts(products);
};

/**
 * 🎯 Feature 12 - Open product link
 * 
 * As a user
 * I want to open product link in a new page
 * So that i can buy the product easily
 */

//See Render Products



/**
 * 🎯 Feature 13 - Save as favorite
 * 
 * As a user
 * I want to save a product as favorite
 * So that i can retreive this product later
 */
 function SaveAsFavorite(product_uiid){
  const index = Object.keys(currentProducts).find(key => currentProducts[key]._id=== product_uiid)
  favorites.push(currentProducts[index]);
}

/**
 * 🎯 Feature 14 - Filter by favorite
 * 
 * As a user
 * I want to filter by favorite products
 * So that i can load only my favorite products
 */
 function Showfavorite(){
  fetchProducts(currentPagination.currentPage, currentPagination.size)
    .then(setCurrentProducts)
    .then(() => render(favorites, currentPagination));
}


/**
 * 🎯 Feature 15 - Usable and pleasant UX
 * 
 * As a user
 * I want to parse a usable and pleasant web page
 * So that i can find valuable and useful content
 */
