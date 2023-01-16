const { Token } = require("../../model")
const coffee = require("../../seeds/coffeestore.json")
// let rollbar = require("../../utils/rollbar")

module.exports = {
    getCoffee: async (req, res) => {

        try {

            let { api_key, name } = req.query
            let compareApi = await Token.findOne({ api_key })


            if (compareApi) {  // console.log(testData.data[0].aqi)
                let updatedCount = compareApi.use_count
                updatedCount += 1
                let find = { api_key: api_key }
                let update = { use_count: updatedCount }
                await Token.findOneAndUpdate(find, update, {
                    new: true
                })

                if (name) {
                    let coffeeArr = []
                    for (let i = 0; i < coffee.length; i++) {
                        let title = coffee[i].title.toLowerCase();
                        if (name == title)
                            coffeeArr.push(coffee[i])

                    }
                    res.status(200).json(coffeeArr)

                } else {

                    res.status(200).json(coffee)
                }


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