import mongoose from 'mongoose';


const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please, provide unique username'],
        Unique: [true, 'User already exists']
    },
    email: {
        type: String,
        required: [true, 'Please, provide unique email'],
        Unique: [true, 'Email already exists']
    },
    password: {
        type: String,
        required: [true, 'Please, provide unique username'],
    },
    avatar: {
        type: String,
        Unique: true

    },
    following: {
        type: Array,
        default: []
    },
    followers: {
        type: Array,
        default: []

    },

})


const User = mongoose.model('User', UserSchema);

export default User;