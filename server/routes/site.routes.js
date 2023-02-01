const express = require('express')
const router = express.Router();
const SiteController = require('../controllers/site.controller')
const Can = require('../middlewares/can.middleware')

router.post('/home', (req, res) => {
    SiteController.home(req, res)
})
router.post('/filter', (req, res) => {
    SiteController.filter(req, res)
})
router.post('/business-index', (req, res) => {
    SiteController.businessIndex(req, res)
})
router.post('/page-index', (req, res) => {
    SiteController.pageIndex(req, res)
})
router.post('/post-review', (req, res) => {
    SiteController.postReview(req, res)
})
router.post('/bookmark', Can(), (req, res) => {
    SiteController.bookmark(req, res)
})

module.exports = router