import bcrypt from 'bcrypt'
import userSchema from '../src/schema/userSchema.js'
import jwt from "jsonwebtoken"

const saltRounds = 10

export const hashPassword = (req, res, next) => {
    if (req.body?.userPassword) {
        bcrypt.genSalt(saltRounds, (_e, salt) => {
            bcrypt.hash(req.body.userPassword, salt, (error, hash) => {
                if (error) return res.status(500).json({ 'error': "Something went wrong with hash", error })
                req.body.userPassword = hash
                return next()
            })
        })
    } else next()
}

export const comparePassword = (req, res, next) => {
    const errorMsg = { message: "Invalid mail or password" }
    userSchema.getUserByMail(req.body.userEmail, (e, user) => {
        if (user) {
            bcrypt.compare(req.body.userPassword, user.userPassword, (_e, result) => {
                if (result) {
                    req.body = { token: sendToken(user) }
                    return next()
                } else return res.status(401).json(errorMsg)
            })
        } else return res.status(401).json(errorMsg)
    })
}

const sendToken = (userDatas) => {
    console.log(userDatas)
    return jwt.sign(
        {user: { 
            id: userDatas.id, 
            username: userDatas.username, 
            mail: userDatas.userEmail 
        }},
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
}

export const isGranted = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        req.auth = jwt.verify(token, process.env.JWT_SECRET).user
        return next()
    } catch (e) {
        res.status(401).json({ message: "You must be connected to access this route" });
    }
}