var express = require('express');
var router = express.Router();

const {addItem} = require('../controllers/apis/cartController')

router
    .post('/add-item', addItem)

module.exports = router;