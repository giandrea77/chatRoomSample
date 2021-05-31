var mongoose = require('mongoose');
var v4 =  require("uuid");

var ChatRoomSchema = new mongoose.Schema({
    chatRoomId: {type: String, unique: true, default: () => v4.replace(/\-/g, "")},
    chatRoomName: String,
    userIds: Array,
    userCreator: String,
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now }
},
{
    collection: 'chatRooms'
});

// Update dateTtime 
ChatRoomSchema.pre('save', function preSave(next) {
    const currentDate = new Date;
    this.updated_date = currentDate;
    next();
});

module.exports = mongoose.model('ChatRoom', ChatRoomSchema); 