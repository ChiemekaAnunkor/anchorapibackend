
const generateExcel = require("../../docs/excelGenerator")
module.exports = {
    GetExcel: async (req, res) => {

        try {

            let db = req.body
            generateExcel(db)


            await res.status(200).json(db)




        } catch (error) {
            res.status(400).json({ error, Message: "bad request" })
        }

    }
}
