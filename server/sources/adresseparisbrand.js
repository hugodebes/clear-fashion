const fetch = require('node-fetch');
const cheerio = require('cheerio');
const {'v5':uuidv5} = require('uuid');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.product_list.grid.row .product-container')
    .map((i, element) => {
      const name = $(element)
        .find('.product-name-container.versionpc')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt(
        $(element)
          .find('.price.product-price')
          .text()
      );

      let link = $(element)
        .find('.product_img_link')
        .attr('href');
      const prelink = 'https://adresse.paris/';
      //link = prelink + link;

      const picture = $(element)
        .find('img')
        .attr('data-original');
      //const id = uuidv5(link,uuidv5.URL);

      const materialInfo = $(element)

      return {name, price,link,picture};
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();

      return parse(body);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};