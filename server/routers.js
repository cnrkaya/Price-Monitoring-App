const express = require('express');
const router = new express.Router();
const spawn = require('await-spawn')
var url = require('url');
const { save, load } = require('../src/utils/file');


// Scrape the given product
router.post('/scrape', async (req, res) => {
    const allowedDomains = ['www.hepsiburada.com', 
                            'www.gittigidiyor.com', 
                            'www.n11.com', 'urun.n11.com'];
    const productUrl = req.body.url;
    const hostname = url.parse(productUrl).hostname;
    const isValidHostname = allowedDomains.includes(hostname);
    if(!isValidHostname){
        return res.status(400).send({ error: 'Invalid hostname!' });
    }

    const scrape = async () => {
    try {
        const result = await spawn('python', ["./src/scripts/product_scraping.py",
            hostname, 
            productUrl
        ])
        res.status(201).send(JSON.parse(result));
    } catch (e) {
        res.status(400).send({ error: 'An error has occurred while scraping the given product!' });
    }
    }
    scrape()
    
});

// Scrape all discounted products
router.get('/discounted-products', async (req, res) => {
    const scrape = async () => {
        try {
            const discountedProducts = await spawn('python', ["./src/scripts/discounted_products_scraping.py"]);
            const dataJSON = JSON.parse(discountedProducts)
            save(dataJSON, './cache/discounted_products.json');
            res.status(201).send(dataJSON);
        } catch (e) {
            res.status(400).send({ error: 'An error has occurred while scraping discounted products!' });
        }
    }
    scrape()
});

// The most similar discounted product for the given product name
router.post('/most-similar-product', async (req, res) => {
    const discountedProducts = load('./cache/discounted_products.json');
    if (discountedProducts.length === 0) {
        res.status(400).send({ error: 'Discounted products could not be read!' })
    }
    const productName = req.body.productName;
    const scrape = async () => {
        try {
            const result = await spawn('python', ["./src/scripts/product_recommendation.py",
                productName
        ])
            res.status(201).send(JSON.parse(result));
        } catch (e) {
            res.status(400).send({ error: 'An error has occurred during product recommendation!' });
        }
    }
        scrape()
});

module.exports = router;