const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    title: {
        type: String
    },
    district: [{
        type: String
    }],
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

module.exports = mongoose.model('cities', Schema)