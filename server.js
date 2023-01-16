const express = require("express");
const cors = require("cors")
const db = require("./config/configDB")
const dotenv = require("dotenv")
dotenv.config()
const routes = require("./routes")
const { PORT } = process.env
const serverless = requir("serverless-http")

const app = express()
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Your Server is up and running")
})

app.use("/.netlify/functions/server",routes)

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);

    })
})

module.exports.handler = serverless(app)
