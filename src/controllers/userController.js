import userSchema from "../schema/userSchema.js"

export default {
    register: (req, res) => {
        console.log("On register controller")
        userSchema.addUser(req.body, (err, datas) => {
            if (err) return res.status(500).json(err)
            return res.status(201).json(datas)
        })
    },
    login: (req, res) => {
        res.status(200).json({ message: 'Login OK', token: req.body.token })
    },
    getProfile: (req, res) => {
        res.status(200).json({ message: `Bonjour, ${req.auth.username} !`, datas: req.auth })
    }
}