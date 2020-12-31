const path = require('path');
const express = require('express');
const routers = require('./routers');

const app = express();

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(publicPath));
app.use(routers);

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});


