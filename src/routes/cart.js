var express = require('express');
var router = express.Router();

const {addItem, list} = require('../controllers/apis/cartController')

router
    .post('/add-item', addItem)
    .get('/get-items', list)

module.exports = router;