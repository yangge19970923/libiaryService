var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MNovelSchema = new Schema({
    idCardNumber: {
        type: String,
        required: true
    },
    novelInfo: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('MNovel',MNovelSchema);