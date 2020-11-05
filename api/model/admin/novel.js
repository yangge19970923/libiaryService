var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var novelSchema = new Schema({
    idCardNumber: {
        type: String,
        required: true
    },
    novelInfo: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('Novel',novelSchema);