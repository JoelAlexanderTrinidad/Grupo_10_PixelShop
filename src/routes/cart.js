var express = require('express');
var router = express.Router();

const {addItem, list, removeItem, removeAll} = require('../controllers/apis/cartController')

router
    .post('/add-item', addItem)
    .get('/get-items', list)
    .delete('/remove-item', removeItem)
    .delete('/remove-all', removeAll)
module.exports = router;