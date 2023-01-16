const { Token } = require("../../model")
const { validate } = require("../../model/User")
const jokes = require("../../seeds/jokes.json")
// let rollbar = require("../../utils/rollbar")

module.exports = {
    getJokes: async (req, res) => {

        try {

            let { api_key, count, type } = req.query
            let compareApi = await Token.findOne({ api_key })


            if (compareApi) {  // console.log(testData.data[0].aqi)
                let updatedCount = compareApi.use_count
                updatedCount += 1
                let find = { api_key: api_key }
                let update = { use_count: updatedCount }
                await Token.findOneAndUpdate(find, update, {
                    new: true
                })



                if (count || type) {
                    if (!count) {
                        count = 346
                    }

                    function byType(variable, count) {

                        let typeArr = []
                        const arrRandom = []
                        let typecount = count

                        for (let i = 0; i < jokes.length; i++) {
                            let type = jokes[i].type;
                            if (type == variable && typecount !== 0) {
                                typeArr.push(jokes[i])
                                typecount--

                            }

                        }
                        if (!type) {

                            for (let i = 0; i < count; i++) {
                                let random = Math.floor(Math.random() * 413);
                                arrRandom.push(jokes[random]);
                            }
                            res.status(200).json(arrRandom)


                        }


                        res.status(200).json(typeArr)
                    }
                    byType(type, count)
                }



                if (!type && !count) {
                    res.status(200).json(jokes)

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