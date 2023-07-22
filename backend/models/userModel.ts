import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        unique: true,
        max: 50
    }, 
    password: {
        type: String,
        unique: true,
        max: 20
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false
    },
    avatarImage: {
        type: String,
        default: ''
    }
})

// module.exports = mongoose.model('User', userSchema);