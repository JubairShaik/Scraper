const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

const apiKey = '022a832f482d3729002d88104981630a';


const generateScaperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`
// const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to FOODAPI');
});


// Get Products 

app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;
//   const {apiKey}= req.query;
  try {
    const response = await request(`${generateScaperUrl(apiKey)}&url=https://www.amazon.com/dp/${productId}`);
    // Process the response or send it back to the client
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});


// GET Product Reviews 

app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    // const {apiKey}= req.query;
  
    try {
      const response = await request(`${generateScaperUrl(apiKey)}&url=https://www.amazon.com/product-reviews/${productId}`);
      // Process the response or send it back to the client
      res.json(JSON.parse(response));
    } catch (error) {
      res.json(error);
    }
  });


// GET Product OFFERS

app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    // const {apiKey}= req.query;
     
    try {
      const response = await request(`${generateScaperUrl(apiKey)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
      // Process the response or send it back to the client
      res.json(JSON.parse(response));
    } catch (error) {
      res.json(error);
    }
  });



// GET Search Results

app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    // const {apiKey}= req.query;
  
    try {
      const response = await request(`${generateScaperUrl(apiKey)}&url=https://www.amazon.com/s?k=${searchQuery}`);
      // Process the response or send it back to the client
      res.json(JSON.parse(response));
    } catch (error) {
      res.json(error);
    }
  });

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
