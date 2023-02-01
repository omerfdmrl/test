const express = require('express')
const router = express.Router();
const MainController = require('../controllers/main.controller')

router.post('/info', (req, res) => {
    MainController.info(req, res)
})
router.post('/category-list', (req, res) => {
    MainController.categoryList(req, res)
})
router.post('/city-list', (req, res) => {
    MainController.cityList(req, res)
})

module.exports = router