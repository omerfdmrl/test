const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
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


module.exports = mongoose.model('reviews', Schema)