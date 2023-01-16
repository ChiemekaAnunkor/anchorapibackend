require("dotenv").config()
const axios = require("axios")
const { Token } = require("../../model")
const { DEV_WEATHERAPIKEY } = process.env
const puppeteer = require("puppeteer")
const { scrollPageToBottom } = require('puppeteer-autoscroll-down')
let rollbar = require("../../utils/rollbar")

module.exports = {
    getPinterestApi: async (req, res) => {


        try {
            let { interest, viewheight, api_key } = req.query
            let compareApi = await Token.findOne({ api_key })



            if (compareApi) {  // console.log(testData.data[0].aqi)

                let updatedCount = compareApi.use_count
                updatedCount += 1
                let find = { api_key: api_key }
                let update = { use_count: updatedCount }
                await Token.findOneAndUpdate(find, update, {
                    new: true
                })

                let newheight = parseInt(viewheight)
                findImages(interest, newheight)

                async function findImages(interest, viewport_height,) {
                    const browser = await puppeteer.launch();
                    const page = await browser.newPage();
                    await page.goto("https://www.pinterest.com/ideas/");

                    await page.type("input[data-test-id]", `${interest}`);

                    await page.keyboard.press("Enter");
                    await page.waitForSelector(".hCL");
                    //   await page.click();
                    // await Promise.all([page.click(".FinaEf"), page.waitForNavigation()]);
                    await page.setViewport({
                        width: 1200,
                        height: viewport_height
                    });

                    await scrollPageToBottom(page, {
                        size: 300,
                        delay: 300,
                    })

                    await page.waitForSelector(".hCL");

                    const data = await page.evaluate(() => {
                        const dataArr = [];
                        const imgs = document.querySelectorAll(".hCL");
                        dataArr.push({ count: imgs.length })
                        imgs.forEach((el) => dataArr.push({ imgs: el.src }));
                        return dataArr;
                    });
                    await res.json(data)

                    await browser.close();
                }



            } else {
                // rollbar.error("invalid api key")

                res.status(200).json({ Error: "Bad Request", err: { Message: "INVALID API KEY", res: { resolve: "check api key or Create an account to get api key" } } })
            }
        } catch (error) {
            // rollbar.error("endpoint failed, bad request")

            res.status(400).json({ error, Message: "bad request", msg: { msg: "check query params" } })
        }

    }
}


// async function findImages(interest, viewport_height,) {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
//     await page.goto("https://www.pinterest.com/ideas/");

//     await page.type("input[data-test-id]", `${interest}`);

//     await page.keyboard.press("Enter");
//     await page.waitForSelector(".hCL");
//     //   await page.click();
//     // await Promise.all([page.click(".FinaEf"), page.waitForNavigation()]);
//     await page.setViewport({
//         width: 1200,
//         height: viewport_height
//     });

//     await scrollPageToBottom(page, {
//         size: 300,
//         delay: 300,
//     })

//     await page.waitForSelector(".hCL");

//     const data = await page.evaluate(() => {
//         const dataArr = [];
//         const imgs = document.querySelectorAll(".hCL");
//         dataArr.push({ count: imgs.length })
//         imgs.forEach((el) => dataArr.push({ imgs: el.src }));

//         return dataArr;
//     });
//     console.log(data)

//     await browser.close();
// }

// console.log(findImages("food", 3600))

