import User from "../models/User.js"
import fs from 'fs'
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__filename)


export const getMyProfile = async (req, res) => {

    try {
        const { id } = req.user
        const userFind = await User.findById(id)

        if (!userFind) {
            return res.status(401).json({ error: 'There is no user authorized' })

        }

        const securedUser = userFind._doc

        delete securedUser.password

        res.status(200).json(securedUser)

    } catch (error) {
        res.status(501).json({ error: error.message })
    }
}



export const getUserProfile = async (req, res) => {

    try {
        const { username } = req.params

        const userFind = await User.findOne({ username })

        if (!userFind) {
            return res.status(501).json({ error: 'User does not exist' })
        }

        const securedUser = userFind._doc
        delete securedUser.password

        res.status(200).json(securedUser)

    } catch (error) {
        res.status(501).json({ error: error.message })
    }
}


export const addFriend = async (req, res) => {

    try {
        const userId = req.user.id
        const { id } = req.params

        console.log(userId, id)

        const user = await User.findById(userId)
        const friend = await User.findById(id)

        if (user.following.includes(id)) {
            user.following = user.following.filter((_id) => _id !== id)
            friend.followers = friend.followers.filter((_id) => _id !== userId)
        }
        else {
            user.following.push(id)
            friend.followers.push(userId)
        }

        await user.save()
        await friend.save()

        res.status(200).json({ followers: friend.followers, following: friend.following })




    } catch (error) {
        res.status(404).json({ msg: 'Something went wrong' })

    }




}

export const followers = async (req, res) => {
    try {
        const { username } = req.params

        let user = await User.findOne({ username: username })
        let followers = await Promise.all(user.followers.map(id => User.findById(id)))
        let formattedFollowers = followers.map(({ username, followers, following, _id }) => ({ username, followers, following, _id }))

        res.status(200).json(formattedFollowers)

    } catch (error) {
        res.status(404).json({ msg: 'Something went wrong' })

    }


}

export const following = async (req, res) => {
    try {
        const { username } = req.params

        let user = await User.findOne({ username: username })
        let following = await Promise.all(user.following.map(id => User.findById(id)))
        let formattedFollowing = following.map(({ username, followers, following, _id }) => ({ username, followers, following, _id }))

        res.status(200).json(formattedFollowing)

    } catch (error) {
        res.status(404).json({ msg: 'Something went wrong' })

    }


}

export const updateAvatar = async (req, res) => {
    try {
        const { id } = req.user

        const user = await User.findById(id)

        if (user.avatar) {
            let path = `C:\\Users\\Lucas\\Desktop\\Soziales-Netzwerk\\server\\uploads\\${user.avatar}`

            try {
                fs.unlinkSync(path);
                console.log("File removed:", path);
            } catch (err) {
                console.error(err, '--------------------------------------------');
            }
        }

        user.avatar = req.file.filename
        await user.save()

        res.status(200).json({ usuario: user })

    } catch (error) {
        console.log(error)

    }
}

export const getAvatar = async (req, res) => {
    try {
        const { username } = req.params


        const user = await User.findOne({ username })

        res.status(200).json({ avatar: user.avatar })


    } catch (error) {
        res.status(500).json({ msg: error.message })

    }
}