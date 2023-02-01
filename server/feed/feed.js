const database = require('../configs/database.config')
const Role = require('../models/role.model')
const Setting = require('../models/settings.model')
const User = require('../models/user.model')
database.connect().then(async res => {
    await Role.insertMany(require('./roles.json'))
    await Setting.insertMany(require('./settings.json'))
    await User.insertMany(require('./users.json'))
})