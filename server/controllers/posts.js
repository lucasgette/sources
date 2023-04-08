import { now } from "mongoose"
import Post from "../models/Post.js"
import User from "../models/User.js"

export const getPosts = async (req, res) => {
    try {

        const { username, id } = req.user

        const posts = await Post.find({ author: username })

        res.status(200).json({ username, id, post: posts })


    } catch (error) {
        res.status(501).json({ error: error.message, msg: 'Something went wrong...' })


    }

}

export const getUserPosts = async (req, res) => {
    try {

        const { username } = req.params

        const posts = await Post.find({ author: username })

        res.status(200).json({ post: posts })


    } catch (error) {
        res.status(501).json({ error: error.message, msg: 'Something went wrong...' })
    }

}



export const createPost = async (req, res) => {
    try {

        const { username, id } = req.user

        const { content } = req.body

        const newPost = new Post({ author: username, content: content, date: Date.now() })

        await newPost.save()

        return res.status(200).json(newPost)

    } catch (error) {
        res.status(501).json({ error: error.message, msg: 'Something went wrong...' })
    }
}


export const deletePost = async (req, res) => {
    try {
        const { username } = req.user

        const { postAuthor, postId } = req.params

        if (postAuthor === username) {


            await Post.findByIdAndDelete(postId)

            // const posts = await Post.find({ author: username })

            // console.log(posts)

            return res.status(200).json({ msg: 'Post successfully deleted' })
        }
        else {
            res.status(501).json({ error: error.message, msg: 'This post belongs to other user, cannot be deleted by you...' })

        }

    }
    catch (error) {
        res.status(501).json({ error: error.message, msg: 'Something went wrong...' })


    }
}


export const timeline = async (req, res) => {
    try {
        const { id } = req.user

        const user = await User.findById(id)

        let users = await Promise.all(user.following.map(id => User.findById(id, 'username')))
        users.push(user)

        console.log(users)
        let posts = await Promise.all(users.map(user => Post.find({ author: user.username })))
        let timeline = posts.flat(1)

        res.json(timeline)

    } catch (error) {
        console.log(error)
        res.json(error)
    }



}