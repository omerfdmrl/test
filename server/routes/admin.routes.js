const express = require('express')
const router = express.Router();
const AdminController = require('../controllers/admin.controller')
const Can = require('../middlewares/can.middleware')

router.post('/get-settings', Can('admin-get-settings'), (req, res) => {
    AdminController.getSettings(req, res)
})
router.post('/change-image', Can('admin-save-settings'), (req, res) => {
    AdminController.changeImage(req, res)
})
router.post('/save-settings', Can('admin-save-settings'), (req, res) => {
    AdminController.saveSettings(req, res)
})
router.post('/menu-list', Can('admin-get-menu'), (req, res) => {
    AdminController.menuList(req, res)
})
router.post('/menu-add', Can('admin-save-menu'), (req, res) => {
    AdminController.menuAdd(req, res)
})
router.post('/menu-delete', Can('admin-save-menu'), (req, res) => {
    AdminController.menuDelete(req, res)
})
router.post('/menu-save', Can('admin-save-menu'), (req, res) => {
    AdminController.menuSave(req, res)
})
router.post('/user-list', Can('admin-get-user'), (req, res) => {
    AdminController.userList(req, res)
})
router.post('/user-save', Can('admin-save-user'), (req, res) => {
    AdminController.userSave(req, res)
})
router.post('/user-login-as', Can('admin-login-as'), (req, res) => {
    AdminController.userLoginAs(req, res)
})
router.post('/user-change-image', Can('admin-save-user'), (req, res) => {
    AdminController.userChangeImage(req, res)
})
router.post('/category-list', Can('admin-get-category'), (req, res) => {
    AdminController.categoryList(req, res)
})
router.post('/category-add', Can('admin-save-category'), (req, res) => {
    AdminController.categoryAdd(req, res)
})
router.post('/category-save', Can('admin-save-category'), (req, res) => {
    AdminController.categorySave(req, res)
})
router.post('/category-delete', Can('admin-save-category'), (req, res) => {
    AdminController.categoryDelete(req, res)
})
router.post('/page-list', Can('admin-get-page'), (req, res) => {
    AdminController.pageList(req, res)
})
router.post('/page-add', Can('admin-save-page'), (req, res) => {
    AdminController.pageAdd(req, res)
})
router.post('/page-save', Can('admin-save-page'), (req, res) => {
    AdminController.pageSave(req, res)
})
router.post('/page-delete', Can('admin-save-page'), (req, res) => {
    AdminController.pageDelete(req, res)
})
router.post('/city-delete', Can('admin-save-city'), (req, res) => {
    AdminController.cityDelete(req, res)
})
router.post('/role-list', Can('admin-get-role'), (req, res) => {
    AdminController.roleList(req, res)
})
router.post('/role-add', Can('admin-save-role'), (req, res) => {
    AdminController.roleAdd(req, res)
})
router.post('/role-save', Can('admin-save-role'), (req, res) => {
    AdminController.roleSave(req, res)
})
router.post('/city-list', Can('admin-get-city'), (req, res) => {
    AdminController.cityList(req, res)
})
router.post('/city-add', Can('admin-save-city'), (req, res) => {
    AdminController.cityAdd(req, res)
})
router.post('/city-save', Can('admin-save-city'), (req, res) => {
    AdminController.citySave(req, res)
})
router.post('/permission-list', Can('admin-get-role'), (req, res) => {
    AdminController.permissionList(req, res)
})
router.post('/report-list', Can('admin-get-report'), (req, res) => {
    AdminController.reportList(req, res)
})
router.post('/report-delete', Can('admin-save-report'), (req, res) => {
    AdminController.reportDelete(req, res)
})
router.post('/report-action-delete', Can('admin-save-report'), (req, res) => {
    AdminController.reportActionDelete(req, res)
})
router.post('/report-action-ban', Can('admin-save-report'), (req, res) => {
    AdminController.reportActionBan(req, res)
})

module.exports = router