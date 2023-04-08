
import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {

    try {
        let token = req.header("Authorization")

        if (!token || token.includes('undefined')) {
            return res.status(401).json({ error: 'You are not authorized. Please, provide credentials' })
        }
        if (token.startsWith('Bearer')) {
            token = token.split(" ")[1]
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified;
        next()

    } catch (error) {
        res.status(501).json({ error: error.message })
    }
}

export default verifyToken;