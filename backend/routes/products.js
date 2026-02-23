const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Path to products JSON
const productsPath = path.join(__dirname, '../../test-product.json');

// GET all products
router.get('/', (req, res) => {
    try {
        const data = fs.readFileSync(productsPath, 'utf8');
        const products = JSON.parse(data);
        res.json(products);
    } catch (err) {
        console.error('Error reading products file:', err);
        res.status(500).json({ message: 'Error reading products data' });
    }
});

// POST and DELETE methods disabled in JSON-only mode

module.exports = router;
