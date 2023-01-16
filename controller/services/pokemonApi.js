require("dotenv").config()
const { Token } = require("../../model")
const data = require("../../seeds/pokemon.json")
// let rollbar = require("../../utils/rollbar")

module.exports = {
    getPokemon: async (req, res) => {

        try {

            let { api_key } = req.query
            let compareApi = await Token.findOne({ api_key })


            if (compareApi) {  // console.log(testData.data[0].aqi)
                // rollbar.info("working on the pokemon endpoint", { message: "data was sent successfully" }, compareApi)
                let updatedCount = compareApi.use_count
                updatedCount += 1
                let find = { api_key: api_key }
                let update = { use_count: updatedCount }
                await Token.findOneAndUpdate(find, update, {
                    new: true
                })
                res.status(200).json(data)

            } else {
                // rollbar.error("invalid api keys")

                res.status(200).json({ Error: "Bad Request", err: { Message: "INVALID API KEY", res: { resolve: "check api key or Create an account to get api key" } } })
            }
        } catch (error) {
            // rollbar.error("bad requests")
            res.status(400).json({ error, Message: "bad request" })

        }

    }
}