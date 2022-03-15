const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const collection = require('./db')

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);

app.get("/products", async(request, response)=>{
  try{
    let products = await collection.find({});
    response.send(products);
  }
  catch (error) {
    response.status(500).send(error);
  }
})


app.get("/products/:id",async (request,response)=>{
  try{
    result = await collection.find({"_id":request.params.id})
    response.send(result);
  }
  catch(error){
    response.status(500).send(error);
  }
})

app.get("/products/search",async(request,response)=>{
  try{
    let limit = 12;
    console.log(request);
    let filter = request.params;
    let sortby = "";
    let products;
    let currentPage = 1;
    let count = 0;
    console.log(request.params.id);
    if("limit" in filter){
      limit = parseInt(request.params.limit);
      delete filter["limit"];
    }
    if("sortby" in filter){
      sortby = request.params.sortby;
      delete filter["sortby"];
    }
    if("price" in filter){
      filter["price"] = {$lte:parseInt(filter["price"])}      
    }
    if("currentPage" in filter){
      currentPage = request.params.currentPage;
      delete filter["currentPage"];
    }

    switch(sortby){
      case "price":
        totalProducts = await collection.find(filter).sort({price:1});
        count = totalProducts.length;
        products = await collection.find(filter).sort({price:1}).limit(limit);
        break;
      default:
        totalProducts = await collection.find(filter);
        count = totalProducts.length;
        products = await collection.find(filter).limit(limit);
    }

    const meta = paginate(currentPage,count,products,limit);
    response.send(products);

  } catch (error){

    response.status(500).send(error);

  }
});
