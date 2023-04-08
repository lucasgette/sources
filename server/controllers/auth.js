import User from "../models/User.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';


dotenv.config()



// REGISTER 

export const registerController = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return res.status(409).json({ error: 'Username already exists' });
        }

        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        return res.status(200).json(newUser)

    } catch (error) {
        return res.status(501).json({ error: error.message })
    }

}



// LOGIN




export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        const userExists = await User.findOne({ email })
        if (!userExists) {
            return res.status(501).json({ error: 'Email is incorrect or does not exists' });
        }

        const passwordMatch = await bcrypt.compare(password, userExists.password);

        if (!passwordMatch) return res.status(501).json({ error: 'Password is incorrect' });

        var token = jwt.sign({ username: userExists.username, id: userExists._id }, process.env.JWT_SECRET);

        res.json({
            msg: 'Login successfull',
            username: userExists.username,
            token,
            id: userExists._id
        })


    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}