require("dotenv").config()
//import depenedencies and files 
const { User, Token } = require("../model")
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_TOKEN
const { generateApiKey } = require('generate-api-key');
const bcrypt = require("bcrypt")
//user endpoint
const icon = ["https://cdn2.iconfinder.com/data/icons/flat-animal-faces-icons/256/39-512.png", "https://cdn2.iconfinder.com/data/icons/flat-animal-faces-icons/256/26-512.png", "https://cdn2.iconfinder.com/data/icons/flat-animal-faces-icons/256/37-512.png", "https://cdn2.iconfinder.com/data/icons/flat-animal-faces-icons/256/43-512.png", "https://cdn2.iconfinder.com/data/icons/flat-animal-faces-icons/256/44-512.png", "https://cdn2.iconfinder.com/data/icons/flat-animal-faces-icons/256/02-512.png", "https://cdn2.iconfinder.com/data/icons/flat-animal-faces-icons/256/22-512.png", "https://cdn2.iconfinder.com/data/icons/flat-animal-faces-icons/256/15-512.png", "https://cdn2.iconfinder.com/data/icons/flat-animal-faces-icons/256/19-512.png", "https://cdn0.iconfinder.com/data/icons/science-volume-1-4/256/21-512.png", "https://cdn0.iconfinder.com/data/icons/seo-and-marketing-volume-1/256/76-512.png", "https://cdn2.iconfinder.com/data/icons/flat-animal-faces-icons/256/06-512.png", "https://cdn4.iconfinder.com/data/icons/halloween-vol-1/256/28-512.png", ""]

module.exports = {

    createUser: async (req, res) => {

        try {
            let userData = await new User(req.body).save()
            res.status(200).json(userData)
        } catch (error) {
            res.status(400).json({ error, message: "Bad request check body" })
        }


    },
    getUser: async (req, res) => {
        try {
            let userData = await User.find().populate("access_token_id")
            res.status(200).json(userData)
        } catch (error) {
            res.status(400).json(error)


        }
    },
    signIn: async (req, res) => {
        try {
            const { email, password } = req.body



            let userData = await User.findOne({ email }).populate("access_token_id")
            let emailExists = userData.email
            let nameExist = userData.first_name
            let lastExist = userData.last_name
            let accesskey = userData.access_token_id.api_key
            let checkPassword = await bcrypt.compare(password, userData.password)
            let roleExist = userData.role
            let urlExist = userData.url
            let createdAtExist = userData.access_token_id.createdAt
            let idExist = userData.id

            console.log(idExist)
            let usecount = userData.access_token_id.use_count



            if (checkPassword) {

                //great a session using jwt, creats a token to be sent to the front end.
                const token = jwt.sign({ email: emailExists, firstName: nameExist, lastName: lastExist, apiKey: accesskey, role: roleExist, url: urlExist, count: usecount, atCreate: createdAtExist, id: idExist }, secret, { expiresIn: "1h" });
                res.status(200).json({ token })
            }


            res.status(200).json({ token })
        } catch (error) {
            res.status(400).json({ error, message: "does not exist, Email or Password is incorrect" })


        }
    },
    signUp: async (req, res) => {
        try {
            let randomnum = Math.floor(Math.random() * 14);
            let randomurl = icon[randomnum]
            let apikey = generateApiKey({ method: "string", pool: "abcdefghijklmnopqrstuvwxyz1234567890", min: 30 })
            //create api key
            let creatApiData = await new Token({ api_key: apikey }).save()
            //retirve api key

            let apiData = await Token.findOne({ api_key: apikey }).populate("user_id")
            let accessTokenId = apiData.id

            const { first_name, last_name, email, password, role, } = req.body
            let hashed = await bcrypt.hash(password, 10);


            let userData = await new User({ first_name: first_name, last_name: last_name, email: email, password: hashed, role: role, url: randomurl, access_token_id: accessTokenId }).save()

            res.status(200).json(userData)

        } catch (error) {
            res.status(400).json(error)

        }
    },
    deleteUser: async (req, res) => {

        try {
            let { id } = req.params
            let userData = await User.findByIdAndRemove(id)
            let tokenid = userData.access_token_id.api_key
            console.log(tokenid)
            let tokenData = await Token.findOneAndRemove(tokenid)
            res.status(200).json({ userData, tokenData })
        } catch (error) {
            res.status(200).json({ Error: "Bad request" })
        }
    },
    updateInfo: async (req, res) => {
        try {
            let { email } = req.body
            let userData = await User.findOne({ email }).populate("access_token_id")
            res.status(200).json(userData)
        } catch (error) {
            res.status(200).json({ Error: "Bad request", error })
            console.log(error)
        }
    }


}

