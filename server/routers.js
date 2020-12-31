const express = require('express');
const router = new express.Router();
const spawn = require('await-spawn')
var url = require('url');

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
        const result = await spawn('python', ["./src/scrapping/product_scrapping.py",
            hostname, 
            productUrl
        ])
        res.status(201).send(JSON.parse(result));
    } catch (e) {
        res.status(400).send({ error: 'An error has ocurred while scraping the given product!' });
    }
    }
    scrape()
    
});

module.exports = router;