var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    userName: String,
    firstName: String,
    lastName: String,
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now }
},{
    collection: 'users'
})

// Update dateTtime 
UserSchema.pre('save', function preSave(next) {
    const currentDate = new Date;
    this.updated_date = currentDate;
    next();
});

module.exports = mongoose.model('User', UserSchema);