const express = require('express')
const router = express.Router();
const PanelController = require('../controllers/panel.controller')
const Can = require('../middlewares/can.middleware')

router.post('/business-list', Can('panel-business-list'), (req, res) => {
    PanelController.businessList(req, res)
})
router.post('/business-add', Can('panel-business-add'), (req, res) => {
    PanelController.businessAdd(req, res)
})
router.post('/business-get-edit', Can('panel-business-edit'), (req, res) => {
    PanelController.businessGetEdit(req, res)
})
router.post('/business-save-edit', Can('panel-business-save'), (req, res) => {
    PanelController.businessSaveEdit(req, res)
})
router.post('/business-delete', Can('panel-business-delete'), (req, res) => {
    PanelController.businessDelete(req, res)
})
router.post('/business-delete-image', Can('panel-business-edit'), (req, res) => {
    PanelController.businessDeleteImage(req, res)
})
router.post('/business-upload-image', Can('panel-business-edit'), (req, res) => {
    PanelController.businessUploadImage(req, res)
})
router.post('/user-get-edit', Can('panel-user-edit'), (req, res) => {
    PanelController.userGetEdit(req, res)
})
router.post('/user-change-image', Can('panel-user-edit'), (req, res) => {
    PanelController.userChangeImage(req, res)
})
router.post('/user-save-edit', Can('panel-user-edit'), (req, res) => {
    PanelController.userSaveEdit(req, res)
})

module.exports = router