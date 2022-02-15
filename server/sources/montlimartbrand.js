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

  return $('.category-products .item')
    .map((i, element) => {
      const name = $(element)
        .find('.product-name')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt(
        $(element)
          .find('.price')
          .text()
      );

      let link = $(element)
        .find('.product-name a')
        .attr('href');
      const prelink = 'https://www.montlimart.com/';
      link = prelink + link;

      const picture = $(element)
        .find('img')
        .attr('src');
      const id = uuidv5(link,uuidv5.URL);

      const materialInfo = $(element)

      return {name, price,link,picture,id};
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
