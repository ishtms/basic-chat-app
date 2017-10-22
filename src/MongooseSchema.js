var mongoose = require('mongoose')
var MongooseSchema = mongoose.Schema({
    name: {type: String, default: ''},
    message: {type: String, default: ''}
})

module.exports =  mongoose.model("Conversations", MongooseSchema);