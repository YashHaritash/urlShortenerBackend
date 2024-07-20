const mongoose = require('mongoose');
const { Schema } = mongoose;

const urlSchema = new Schema({
    shortUrl: {
        type: String,
        unique: true,
        required: true
    },
    fullUrl: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '24h'
    }
});

module.exports = mongoose.model('Url', urlSchema);
