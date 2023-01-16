const { Token } = require("../model")

module.exports = {
    createToken: async (req, res) => {

        try {
            let apiData = await new Token(req.body).save()
            res.status(200).json(apiData)
        } catch (error) {
            res.status(400).json(error)
        }

    },
    getTokens: async (req, res) => {
        try {
            let apiData = await Token.find().populate("user_id")
            res.status(200).json(apiData)
        } catch (error) {
            res.status(400).json(error)

        }
    },
    getOneToken: async (req, res) => {

        let { api_key } = req.body
        try {
            let apiData = await Token.findOne({ api_key }).populate("user_id")
            res.status(200).json(apiData)
        } catch (error) {
            res.status(400).json(error)

        }
    },
    updateToken: async (req, res) => {
        let { id, user_id } = req.body


        try {
            let apiData = await Token.findOneAndUpdate(id, user_id, {
                new: true
            })
            res.status(200).json(apiData)

        } catch (error) {
            res.status(400).json(error)

        }
    }

}
