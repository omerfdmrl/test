const Menu = require('../models/menu.model')
const Category = require('../models/category.model')
const City = require('../models/city.model')

module.exports = {
    async info(req, res) {
        const informations = {
            favicon: req.settings.favicon,
            head: req.settings.head,
            logo: req.settings.logo,
            name: req.settings.name,
            url: req.settings.url,
            social: req.settings.site.social
        }
        const user = req.user ? {
            name: req.user.name,
            image: req.user.image,
            username: req.user.username,
            can: {
                'business': req.user.role.permission.includes('panel-business-list'),
                'settings': req.user.role.permission.includes('admin-get-settings'),
                'menu': req.user.role.permission.includes('admin-get-menu'),
                'user': req.user.role.permission.includes('admin-get-user'),
                'page': req.user.role.permission.includes('admin-get-page'),
                'category': req.user.role.permission.includes('admin-get-category'),
                'role': req.user.role.permission.includes('admin-get-role'),
                'city': req.user.role.permission.includes('admin-get-city'),
            }
        } : false
        const menu = await Menu.find({}, { _id: 1, title: 1, href: 1, menu: 1, parent: 1, icon: 1 }).populate({
            path: 'parent',
            select: '_id title href menu parent'
        }).lean()
        return res.json({ status: 1, informations, user, menu, custom: req.settings.api.custom })
    },

    async categoryList(req, res) {
        const categories = await Category.find({}, { _id: 1, title: 1, slug: 1, icon: 1 })
        return res.json({ status: 1, categories })
    },

    async cityList(req, res) {
        const cities = await City.find({}, { _id: 1, title: 1, district: 1 })
        return res.json({ status: 1, cities })
    }
}