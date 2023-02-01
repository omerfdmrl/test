const Setting = require('../models/settings.model')
const Validator = require('../services/validator.service')
const Business = require('../models/business.model')
const multiparty = require('multiparty')
const User = require('../models/user.model')
const fs = require('fs')
const Bcrypt = require('bcrypt')
const Upload = require('../services/upload.service')
const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_');

module.exports = {
    async userGetEdit(req, res) {
        const user = {
            name: req.user.name,
            email: req.user.email,
            image: req.user.image,
            notification: req.user.notification,
            fac: req.user.fac,
            username: req.user.username,
            about: req.user.about,
            social: req.user.social
        }
        return res.json({ status: 1, user })
    },
    async userSaveEdit(req, res) {
        const { name, email, fac, pass, notification, about, social } = req.body
        var updateData = {}
        if (Validator.isEmpty(name.first)) {
            return res.json({ status: 0, message: 'firstname_required' })
        }
        if (Validator.isEmpty(name.last)) {
            return res.json({ status: 0, message: 'lastname_required' })
        }
        updateData.name = name
        if (email !== req.user.email && Validator.isEmail(email)) {
            const user = await User.findOne({ email })
            if (user) {
                return res.json({ status: 0, message: "email_is_already_exists" })
            }
            updateData.email = email
            updateData.verify = null
        }
        if (!Validator.isEmpty(fac) && !Validator.isEmpty(fac.type)) {
            updateData.fac = {}
            updateData.fac.type = fac.type
        }
        if (!Validator.isEmpty(pass)) {
            const compare = await Bcrypt.compare(pass.current, req.user.password)
            if (!compare) {
                return res.json({ status: 0, message: "wrong_password" })
            }
            if (!Validator.isStrong(pass.new)) {
                return res.json({ status: 0, message: 'password_is_not_strong_enough' })
            }
            if (!Validator.isEqual([pass.new, pass.confirm])) {
                return res.json({ status: 0, message: 'new_password_and_confirm_password_should_match' })
            }
            const hash = await Bcrypt.hash(pass.new, 10)
            updateData.password = hash
        }
        updateData.notification = notification
        updateData.social = social
        updateData.about = about
        User.findOneAndUpdate({ _id: req.user._id }, updateData, {}, (err, doc) => err ? console.log(err) : null)
        return res.json({ status: 1, message: 'successfully_saved' })
    },
    async userChangeImage(req, res) {
        const form = new multiparty.Form();
        form.parse(req, async function(err, fields, files) {
            var image = files.image
            if (!image) {
                return res.json({ status: 0, message: 'image_cant_upload' })
            }
            const upload = await Upload.file(image[0], req.user._id, 'user')
            if (upload.status == 0) {
                return res.json(upload)
            }
            User.findOneAndUpdate({ _id: req.user._id }, { image: upload.url }, {}, (err, doc) => err ? console.log(err) : null)
            return res.json({ status: 1, message: 'image_uploaded_successfully' })
        });
    },
    async businessList(req, res) {
        const { perPage, currentPage, search } = req.body
        if (!Validator.isNumber(perPage) || !Validator.isNumber(currentPage)) {
            return res.json({ status: 0 })
        }
        var query = {}
        if (search) {
            query.title = { $regex: search, $options: 'i' }
        }
        query.user = req.user._id
        const items = await Business.find(query, { _id: 1, title: 1, status: 1, created_at: 1, slug: 1 }).skip(perPage * currentPage).limit(perPage).sort('-created_at').lean()
        const total = await Business.find(query).count().lean()
        const pageCount = Math.ceil(total / perPage)
        return res.json({ status: 1, items, pageCount, total })
    },
    async businessAdd(req, res) {
        const form = new multiparty.Form();
        form.parse(req, async function(err, fields, files) {
            const title = fields.title
            const status = fields.status
            const content = fields.content
            const slug = fields.slug
            const tag = fields.tag
            const category = fields.category
            const city = fields.city
            const district = fields.district
            const latitude = fields.latitude
            const longitude = fields.longitude
            const instagram = fields.instagram
            const twitter = fields.twitter
            const tel_no = fields.tel_no
            const mail = fields.mail
            const price = fields.price
            const time_monday_opening = fields.time_monday_opening
            const time_tuesday_opening = fields.time_tuesday_opening
            const time_wednesday_opening = fields.time_wednesday_opening
            const time_thursday_opening = fields.time_thursday_opening
            const time_friday_opening = fields.time_friday_opening
            const time_saturday_opening = fields.time_saturday_opening
            const time_sunday_opening = fields.time_sunday_opening
            const time_monday_closing = fields.time_monday_closing
            const time_tuesday_closing = fields.time_tuesday_closing
            const time_wednesday_closing = fields.time_wednesday_closing
            const time_thursday_closing = fields.time_thursday_closing
            const time_friday_closing = fields.time_friday_closing
            const time_saturday_closing = fields.time_saturday_closing
            const time_sunday_closing = fields.time_sunday_closing
            if (!time_monday_opening || !time_tuesday_opening || !time_wednesday_opening || !time_wednesday_opening || !time_thursday_opening || !time_friday_opening || !time_saturday_opening || !time_sunday_opening ||
                !time_monday_closing || !time_tuesday_closing || !time_wednesday_closing || !time_thursday_closing || !time_friday_closing || !time_saturday_closing || !time_sunday_closing) {
                return res.json({ status: 0, message: 'dates_can_not_be_blank' })
            }
            if (!status || Validator.isEmpty(status[0]) || !['draft', 'pending', 'published'].includes(status[0])) {
                return res.json({ status: 0, message: 'status_required' })
            }
            if (!title || Validator.isEmpty(title[0])) {
                return res.json({ status: 0, message: 'title_required' })
            }
            if (!slug || Validator.isEmpty(slug[0])) {
                return res.json({ status: 0, message: 'slug_required' })
            }
            if (!category || Validator.isEmpty(category[0])) {
                return res.json({ status: 0, message: 'category_required' })
            }
            if (!content || Validator.isEmpty(content[0])) {
                return res.json({ status: 0, message: 'content_required' })
            }
            if (!price || Validator.isEmpty(price[0]) || price[0] < 20) {
                return res.json({ status: 0, message: 'price_required' })
            }
            if (!city || Validator.isEmpty(city[0])) {
                return res.json({ status: 0, message: 'city_required' })
            }
            if (!district || Validator.isEmpty(district[0])) {
                return res.json({ status: 0, message: 'district_required' })
            }
            if (!latitude || Validator.isEmpty(latitude[0])) {
                return res.json({ status: 0, message: 'latitude_required' })
            }
            if (!longitude || Validator.isEmpty(longitude[0])) {
                return res.json({ status: 0, message: 'longitude_required' })
            }
            const check = await Business.count({ slug: slug[0] })
            if (check) {
                return res.json({ status: 0, message: 'slug_already_exists' })
            }
            const insert = await new Business({
                contact: { instagram: instagram ? instagram[0] : null, twitter: twitter ? twitter[0] : null, tel_no: tel_no ? tel_no[0] : null, mail: mail ? mail[0] : mail },
                category: category[0],
                price: price[0],
                title: title[0],
                content: content[0],
                slug: slug[0],
                status: status[0],
                tag: tag[0],
                location: { longitude: longitude[0], latitude: latitude[0], city: city[0], district: district[0] },
                user: req.user._id,
                time: {
                    monday: {
                        opening: time_monday_opening[0],
                        closing: time_monday_closing[0]
                    },
                    tuesday: {
                        opening: time_tuesday_opening[0],
                        closing: time_tuesday_closing[0]
                    },
                    wednesday: {
                        opening: time_wednesday_opening[0],
                        closing: time_wednesday_closing[0]
                    },
                    thursday: {
                        opening: time_thursday_opening[0],
                        closing: time_thursday_closing[0]
                    },
                    friday: {
                        opening: time_friday_opening[0],
                        closing: time_friday_closing[0]
                    },
                    saturday: {
                        opening: time_saturday_opening[0],
                        closing: time_saturday_closing[0]
                    },
                    sunday: {
                        opening: time_sunday_opening[0],
                        closing: time_sunday_closing[0]
                    },
                }
            }).save()
            var _c = 0
            var images = []
            do {
                var image = files['images[' + _c + ']']
                if (image && image[0]) {
                    var upload = await Upload.file(image[0], shortid.generate().toString(), 'business/' + insert._id)
                    images.push(upload.url)
                } else {
                    _c = false
                    break;
                }
                _c++
            } while (_c !== false);
            Business.findOneAndUpdate({ _id: insert._id }, { images }, {}, (err, doc) => err ? console.log(err) : null)
            return res.json({ status: 1, message: 'successfully_saved', redirect: 'panel-business-list' })
        })
    },
    async businessGetEdit(req, res) {
        const { slug, id } = req.body
        const business = await Business.findOne({ slug, user: req.user._id, _id: id }).lean()
        if (!business) {
            return res.json({ status: 0, redirect: 'panel-business-list' })
        }
        return res.json({ status: 1, business })
    },
    async businessSaveEdit(req, res) {
        const form = new multiparty.Form();
        form.parse(req, async function(err, fields, files) {
            const title = fields.title
            const status = fields.status
            const content = fields.content
            const slug = fields.slug
            const tag = fields.tag
            const _id = fields._id[0]
            const o_slug = fields.o_slug[0]
            const category = fields.category
            const city = fields.city
            const district = fields.district
            const latitude = fields.latitude
            const longitude = fields.longitude
            const instagram = fields.instagram
            const twitter = fields.twitter
            const tel_no = fields.tel_no
            const mail = fields.mail
            const price = fields.price
            const time_monday_opening = fields.time_monday_opening
            const time_tuesday_opening = fields.time_tuesday_opening
            const time_wednesday_opening = fields.time_wednesday_opening
            const time_thursday_opening = fields.time_thursday_opening
            const time_friday_opening = fields.time_friday_opening
            const time_saturday_opening = fields.time_saturday_opening
            const time_sunday_opening = fields.time_sunday_opening
            const time_monday_closing = fields.time_monday_closing
            const time_tuesday_closing = fields.time_tuesday_closing
            const time_wednesday_closing = fields.time_wednesday_closing
            const time_thursday_closing = fields.time_thursday_closing
            const time_friday_closing = fields.time_friday_closing
            const time_saturday_closing = fields.time_saturday_closing
            const time_sunday_closing = fields.time_sunday_closing
            if (!time_monday_opening || !time_tuesday_opening || !time_wednesday_opening || !time_wednesday_opening || !time_thursday_opening || !time_friday_opening || !time_saturday_opening || !time_sunday_opening ||
                !time_monday_closing || !time_tuesday_closing || !time_wednesday_closing || !time_thursday_closing || !time_friday_closing || !time_saturday_closing || !time_sunday_closing) {
                return res.json({ status: 0, message: 'dates_can_not_be_blank' })
            }
            if (!status || Validator.isEmpty(status[0]) || !['draft', 'pending', 'published'].includes(status[0])) {
                return res.json({ status: 0, message: 'status_required' })
            }
            if (!title || Validator.isEmpty(title[0])) {
                return res.json({ status: 0, message: 'title_required' })
            }
            if (!slug || Validator.isEmpty(slug[0])) {
                return res.json({ status: 0, message: 'slug_required' })
            }
            if (!category || Validator.isEmpty(category[0])) {
                return res.json({ status: 0, message: 'category_required' })
            }
            if (!content || Validator.isEmpty(content[0])) {
                return res.json({ status: 0, message: 'content_required' })
            }
            if (!price || Validator.isEmpty(price[0]) || price[0] < 20) {
                return res.json({ status: 0, message: 'price_required' })
            }
            if (!city || Validator.isEmpty(city[0])) {
                return res.json({ status: 0, message: 'city_required' })
            }
            if (!district || Validator.isEmpty(district[0])) {
                return res.json({ status: 0, message: 'district_required' })
            }
            if (!latitude || Validator.isEmpty(latitude[0])) {
                return res.json({ status: 0, message: 'latitude_required' })
            }
            if (!longitude || Validator.isEmpty(longitude[0])) {
                return res.json({ status: 0, message: 'longitude_required' })
            }
            const check = await Business.count({ slug: slug[0] })
            if (check && slug[0] !== o_slug) {
                return res.json({ status: 0, message: 'slug_already_exists' })
            }
            Business.findOneAndUpdate({ _id: _id, user: req.user._id, slug: o_slug }, {
                contact: { instagram: instagram ? instagram[0] : null, twitter: twitter ? twitter[0] : null, tel_no: tel_no ? tel_no[0] : null, mail: mail ? mail[0] : mail },
                category: category[0],
                title: title[0],
                content: content[0],
                price: price[0],
                slug: slug[0],
                status: status[0],
                tag: tag[0],
                location: {
                    longitude: longitude[0],
                    latitude: latitude[0],
                    city: city[0],
                    district: district[0]
                },
                time: {
                    monday: {
                        opening: time_monday_opening[0],
                        closing: time_monday_closing[0]
                    },
                    tuesday: {
                        opening: time_tuesday_opening[0],
                        closing: time_tuesday_closing[0]
                    },
                    wednesday: {
                        opening: time_wednesday_opening[0],
                        closing: time_wednesday_closing[0]
                    },
                    thursday: {
                        opening: time_thursday_opening[0],
                        closing: time_thursday_closing[0]
                    },
                    friday: {
                        opening: time_friday_opening[0],
                        closing: time_friday_closing[0]
                    },
                    saturday: {
                        opening: time_saturday_opening[0],
                        closing: time_saturday_closing[0]
                    },
                    sunday: {
                        opening: time_sunday_opening[0],
                        closing: time_sunday_closing[0]
                    },
                }
            }, {}, (err, doc) => err ? console.log(err) : null)
            return res.json({ status: 1, message: 'successfully_saved', redirect: 'panel-business-list' })
        })
    },
    async businessDelete(req, res) {
        const { _id } = req.body
        fs.rmSync(global.__basedir + '/public/' + _id, { recursive: true, force: true })
        Business.findOneAndDelete({ _id: _id, user: req.user._id }, (err, doc) => err ? console.log(err) : null)
        return res.json({ status: 1, message: 'successfully_deleted' })
    },
    async businessDeleteImage(req, res) {
        const { _id, slug, url } = req.body
        const business = await Business.findOne({ _id: _id, user: req.user._id, slug }).lean()
        var path = url.replace(req.settings.url.backend, global.__basedir + "/")
        if (fs.existsSync(path)) {
            fs.rmSync(path)
        }
        var images = business.images
        images.splice(business.images.indexOf(url), 1)
        Business.findOneAndUpdate({ _id: business._id }, { images }, {}, (err, doc) => err ? console.log(err) : null)
        return res.sendStatus(200)
    },
    async businessUploadImage(req, res) {
        const form = new multiparty.Form();
        form.parse(req, async function(err, fields, files) {
            const _id = fields._id[0]
            const slug = fields.slug[0]
            const business = await Business.findOne({ _id: _id, user: req.user._id, slug }).lean()
            var _c = 0
            var images = business.images
            do {
                var image = files['images[' + _c + ']']
                if (image && image[0]) {
                    var upload = await Upload.file(image[0], shortid.generate(), 'business/' + business._id)
                    images.push(upload.url)
                } else {
                    _c = false
                    break;
                }
                _c++
            } while (_c !== false);
            Business.findOneAndUpdate({ _id: business._id }, { images: images }, {}, (err, doc) => err ? console.log(err) : null)
        })
        return res.sendStatus(200)
    },
}