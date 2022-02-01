// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};

// inititiqte selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const selectBrand = document.querySelector('#brand-select');
const selectSort = document.querySelector('#sort-select');
const spanNewproducts = document.querySelector('#newProducts');
const spanp50 = document.querySelector('#p50');
const spanp90 = document.querySelector('#p90');
const spanp95 = document.querySelector('#p95');
const spanReleased=document.querySelector('#lastReleased');


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

/**
 * Fetch products from api
 * @param  {Number}  [page=selectPage] - current page to fetch
 * @param  {Number}  [size=selectShow] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};


/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
        
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
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

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;
  spanNbProducts.innerHTML = count;
};
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
const renderLastReleased = products=>{
  console.log(products);
  var sorted=SortDateDesc(products);
  var count=sorted[0].released;
  spanReleased.innerHTML=count;
}

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
  renderP90(products);
  renderP50(products);
  renderP95(products);
  renderLastReleased(products);
  renderNewProducts(products);
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 * @type {[type]}
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

selectPage.addEventListener('change',event => {
  //console.log(event.target.value);
  fetchProducts(parseInt(event.target.value), currentPagination.size)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
})

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
  if(choice=='date-asc')
  {
    temp=SortDateDesc(currentProducts);
  }
  if(choice=='date-desc')
  {
    temp=SortDateAsc(currentProducts);
  }
  console.log(temp);
  fetchProducts(currentPagination.currentPage,currentPagination.size)
    .then(setCurrentProducts)
    .then(() => render(temp, currentPagination));

  
  
});

function SortDateAsc(marketplace){
  return marketplace.sort((b,a)=> new Date(b.released) - new Date(a.released));
}
function SortDateDesc(marketplace){
  return marketplace.sort((a,b)=> new Date(b.released) - new Date(a.released));
}

function SortAsc(marketplace){
  return marketplace.sort((a, b) => a.price - b.price);
}
function SortDesc(marketplace){
  return marketplace.sort((b, a) => a.price - b.price);
}
selectBrand.addEventListener('change',event => {
  var brand=selectBrand.value;
  console.log(brand);
  var first=[];
  var second=[];
  var third=[];
  var fourth=[];
  var fifth=[];
  for (let i=0;i<currentProducts.length;i++)
  {
    if(currentProducts[i].brand=='1083')
    {
      first.push(currentProducts[i]);
    }
    if(currentProducts[i].brand=='aatise')
    {
      second.push(currentProducts[i]);
    }
    if(currentProducts[i].brand=='adresse')
    {
      third.push(currentProducts[i]);
    }
    if(currentProducts[i].brand=='dedicated')
    {
      fourth.push(currentProducts[i]);
    }
    if(currentProducts[i].brand=='loom')
    {
      fifth.push(currentProducts[i]);
    }
  }

  var dictBrands={}

  for(let i=0;i<currentProducts.length;i++)
  {
    if(currentProducts[i].brand=='1083')
    {
      console.log("hello");
      dictBrands[currentProducts[i].brand]=first;
    }
    if(currentProducts[i].brand=='aatise')
    {
      dictBrands[currentProducts[i].brand]=second;
    }
    if(currentProducts[i].brand=='adresse')
    {
      dictBrands[currentProducts[i].brand]=third;
    }
    if(currentProducts[i].brand=='dedicated')
    {
      dictBrands[currentProducts[i].brand]=fourth;
    }
    if(currentProducts[i].brand=='loom')
    {
      dictBrands[currentProducts[i].brand]=fifth;
    }
  }
  var temp= dictBrands[brand];
  console.log(temp);
  fetchProducts(currentPagination.currentPage, currentPagination.size)
    .then(setCurrentProducts)
    .then(() => render(temp, currentPagination));
})

