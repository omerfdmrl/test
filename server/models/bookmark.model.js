const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    business: {
        type: mongoose.Types.ObjectId,
        ref: 'business'
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
})

Schema.pre('save', function(next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    return next()
})


module.exports = mongoose.model('bookmarks', Schema)