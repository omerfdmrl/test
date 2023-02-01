const Business = require('../models/business.model')
const City = require('../models/city.model')
const Category = require('../models/category.model')
const Review = require('../models/review.model')
const Page = require('../models/page.model')
const Bookmark = require('../models/bookmark.model')
const Validator = require('../services/validator.service.js')

module.exports = {
    async home(req, res) {
        const cities = await City.find({}, { _id: 1, district: 1, title: 1 })
        const categories = await Category.find({}, { _id: 1, icon: 1, slug: 1, title: 1 })
        const lasts = await Business.find({}, { _id: 1, title: 1, slug: 1, category: 1, tag: 1, location: 1, images: 1, user: 1, price: 1 })
            .populate({
                path: 'user',
                select: 'username name image -_id'
            }).limit(10).lean()
        return res.json({ status: 1, cities, categories, lasts })
    },
    async bookmark(req, res) {
        const { slug } = req.body
        const business = await Business.findOne({ slug }, { _id: 1 })
        if (!business) {
            return res.sendStatus(403)
        }
        const bookmark = await Bookmark.findOne({ user: req.user._id, business: business._id }, { _id: 1 })
        if (bookmark) {
            Bookmark.findOneAndDelete({ _id: bookmark._id }, {}, (err, doc) => { return console.log(err) })
            return res.json({ status: 1, message: 'bookmark_deleted' })
        } else {
            new Bookmark({ user: req.user._id, business: business._id }).save()
            return res.json({ status: 1, message: 'bookmark_saved' })
        }
    },
    async postReview(req, res) {
        const { name, email, content, rating, slug } = req.body
        const business = await Business.findOne({ slug }, { _id: 1 })
        if (!business) {
            return res.sendStatus(403)
        }
        if (!req.user && Validator.isEmpty(name)) {
            return res.json({ status: 0, message: 'name_required' })
        }
        if (!req.user && !Validator.isEmail(email)) {
            return res.json({ status: 0, message: 'email_required' })
        }
        if (Validator.isEmpty(content)) {
            return res.json({ status: 0, message: 'content_required' })
        }
        if (!Validator.isNumber(rating)) {
            return res.json({ status: 0, message: 'rating_required' })
        }
        new Review({ name: (name ? name : req.user.name.first + ' ' + req.user.name.last), email : (email ? email : req.user.email), content, rating, business: business._id }).save()
        return res.json({ status: 1, message: 'review_posted' })
    },
    async businessIndex(req, res) {
        const { slug } = req.body
        const business = await Business.findOne({ slug }, { _id: 1, title: 1, slug: 1, images: 1, content: 1, category: 1, tag: 1, location: 1, user: 1, contact: 1, time: 1 })
            .populate({
                path: 'category',
                select: 'title slug icon -_id'
            })
            .populate({
                path: 'user',
                select: 'name image about username -_id'
            })
            .populate({
                path: 'location.city',
                select: 'title -_id'
            })
        if(!business) {
            return res.sendStatus(404)
        }
        const reviews = await Review.find({ business: business._id }, { _id: 0, name: 1, content: 1, rating: 1 })
        const bookmark = req.user ? await Bookmark.count({ user: req.user._id, business: business._id }) : 0
        const bookmarks = await Bookmark.count({ business: business._id })
        business._id = null
        return res.json({ status: 1, business, reviews, bookmark, bookmarks })
    },
    async pageIndex(req, res) {
        const { slug } = req.body
        const page = await Page.findOne({slug}, {title: 1, content: 1, slug: 1, _id: 0})
        if(!page) {
            return res.sendStatus(404)
        }
        return res.json({ status: 1, page })
    },
    async filter(req, res) {
        const { perPage, currentPage, city, district, category } = req.body
        if (!Validator.isNumber(perPage) || !Validator.isNumber(currentPage)) {
            return res.json({ status: 0 })
        }
        var query = {}
        if (city) {
            query['location.city'] = city
        }
        if (district) {
            query['location.district'] = district
        }
        if (category) {
            query.category = category
        }
        query.status = 'published'
        const items = await Business.find(query, { _id: 1, title: 1, slug: 1, category: 1, tag: 1, location: 1, images: 1, user: 1, price: 1 })
            .populate({
                path: 'user',
                select: 'username name image -_id'
            }).skip(perPage * currentPage).limit(perPage).sort('-created_at').lean()
        const total = await Business.find(query).count().lean()
        const pageCount = Math.ceil(total / perPage)
        return res.json({ status: 1, items, pageCount, total })
    },
}