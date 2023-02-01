const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    permission: {
        type: [String],
        enum: [
            'login-site', 'register-site',
            'admin-get-settings', 'admin-save-settings',
            'admin-get-menu', 'admin-save-menu',
            'admin-get-user', 'admin-save-user',
            'admin-login-as',
            'admin-get-role', 'admin-save-role',
            'admin-get-category', 'admin-save-category',
            'admin-get-city', 'admin-save-city',
            'admin-get-page', 'admin-save-page',
            'panel-business-list',
            'panel-business-add', 'panel-business-edit',
            'panel-business-save', 'panel-business-delete',
            'panel-user-edit'
        ]
    },
    default: {
        type: Boolean
    },
    banned: {
        type: Boolean
    },
    image: {
        type: String
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

module.exports = mongoose.model('roles', Schema)