import mongoose from "mongoose";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import postRouter from './routes/post.js';
import multer from 'multer';
import verifyToken from "./middleware/auth.js";
import { updateAvatar } from "./controllers/user.js";



dotenv.config()
const app = express()

const PORT = process.env.PORT
const MONGO_DB_URI = process.env.MONGO_DB_URI


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,  './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, req.user.username + '-' + Date.now() + '.' + file.mimetype.split('/')[1])
    }
})

const upload = multer({ storage: storage })


// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//     // req.file es el archivo del `avatar`
//     // req.body contendrá los campos de texto, si los hubiera.
// })


app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(express.static('uploads'))


app.post('/avatar', verifyToken, upload.single('avatar'), updateAvatar)


app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/post', postRouter)


app.get('/secret', verifyToken, (req, res) => {
    res.status(200).json({
        message: 'You can see this!',
        user: req.user
    })
})


mongoose.set({ strictQuery: false })
mongoose.connect(MONGO_DB_URI).then(() => {

    console.log('Database Connected')
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`)
    })

})
    .catch(error => console.log(error))