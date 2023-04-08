import mongoose from 'mongoose';


const { Schema } = mongoose;

const PostSchema = new Schema({
    author: {
        type: String,
        required: [true, 'Please, provide unique username'],
        maxLength: 140,
        minLength: 1
    },
    content: {
        type: String,
        required: [true, 'Please, provide post content'],
    },
    date: {
        type: Number
    }
}, {
    timestamps: false
})


const Post = mongoose.model('Post', PostSchema);

export default Post;