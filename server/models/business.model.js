const mongoose = require('mongoose')
const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_');

const Schema = new mongoose.Schema({
    __id: {
        type: String,
        default: shortid.generate()
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    content: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 20
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'categories'
    },
    tag: [{
        type: String
    }],
    location: {
        city: {
            type: mongoose.Types.ObjectId,
            ref: 'cities'
        },
        district: {
            type: String
        },
        latitude: {
            type: String
        },
        longitude: {
            type: String
        }
    },
    contact: {
        instagram: {
            type: String
        },
        twitter: {
            type: String
        },
        tel_no: {
            type: String
        },
        mail: {
            type: String
        },
    },
    time: {
        monday: {
            opening: {
                type: String,
                default: '0:0'
            },
            closing: {
                type: String,
                default: '0:0'
            }
        },
        tuesday: {
            opening: {
                type: String,
                default: '0:0'
            },
            closing: {
                type: String,
                default: '0:0'
            }
        },
        wednesday: {
            opening: {
                type: String,
                default: '0:0'
            },
            closing: {
                type: String,
                default: '0:0'
            }
        },
        thursday: {
            opening: {
                type: String,
                default: '0:0'
            },
            closing: {
                type: String,
                default: '0:0'
            }
        },
        friday: {
            opening: {
                type: String,
                default: '0:0'
            },
            closing: {
                type: String,
                default: '0:0'
            }
        },
        saturday: {
            opening: {
                type: String,
                default: '0:0'
            },
            closing: {
                type: String,
                default: '0:0'
            }
        },
        sunday: {
            opening: {
                type: String,
                default: '0:0'
            },
            closing: {
                type: String,
                default: '0:0'
            }
        }
    },
    images: [{
        type: String
    }],
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    status: {
        type: String,
        enum: ['draft', 'pending', 'published'],
        default: 'draft'
    },
    stats: {
        view: {
            type: Number,
            default: 0
        }
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

module.exports = mongoose.model('business', Schema)