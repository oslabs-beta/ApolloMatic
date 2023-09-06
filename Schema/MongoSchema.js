const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        description: 'the full name of the user'
    },
    hiddenField: {
        type: Map,
        default: Date.now, 
        hidden: true
    },
    age: {
        type: Number,
        indexed: true,
        required: true
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const User = mongoose.model("User", UserSchema);
// export default User;
module.exports = User;