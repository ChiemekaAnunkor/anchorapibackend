require("dotenv").config()
const axios = require("axios")
const { Token } = require("../../model")
const { DEV_WEATHERAPIKEY } = process.env

module.exports = {
    getWeather: async (req, res) => {

        try {

            let { city, api_key } = req.query
            let compareApi = await Token.findOne({ api_key })

            if (compareApi) {  // console.log(testData.data[0].aqi)

                let updatedCount = compareApi.use_count
                updatedCount += 1
                let find = { api_key: api_key }
                let update = { use_count: updatedCount }
                await Token.findOneAndUpdate(find, update, {
                    new: true
                })
                axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${DEV_WEATHERAPIKEY}`).then((data) => {
                    let weather = data.data.data
                    let weatherArr = []
                    let cre = 6
                    for (let i = 0; i < cre; i++) {
                        let temp = weather[i].high_temp.toString()
                        let win = weather[i].wind_spd.toString()
                        let hum = weather[i].rh.toString()
                        // let pop = weather.pop
                        let descs = weather[i].weather.description.toString()
                        let vis = weather[i].vis.toString()
                        let onj = { temp: temp, wind: win, hum: hum, descs: descs, vis: vis }
                        console.log(onj)
                        weatherArr.push(onj)
                    }


                    res.status(200).json(weatherArr)

                }).catch((error) => {
                    res.status(400).json({ error, Message: "bad request" })
                });

            } else {
                res.status(200).json({ Error: "Bad Request", err: { Message: "INVALID API KEY", res: { resolve: "check api key or Create an account to get api key" } } })
            }
        } catch (error) {
            res.status(400).json({ error, Message: "bad request" })
        }

    }
}
