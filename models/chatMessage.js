var mongoose = require('mongoose');
var v4 =  require("uuid");

var ChatMessageSchema = new mongoose.Schema({
    messageId: {type: String, unique: true, default: () => v4.replace(/\-/g, "")},
    message: String,
    chatRoomId: String,
    userID: String,
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now }
},
{
    collection: 'chatMessages'
});

module.exports = mongoose.model('ChatMessage', ChatMessageSchema); 

