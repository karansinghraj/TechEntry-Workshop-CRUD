const mongoose = require('mongoose');

const RefreshTokenSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    }
}, {timeStamps: true})

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);