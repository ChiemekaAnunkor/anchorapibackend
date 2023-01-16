const router = require("express").Router();
const { getWeather } = require("../../controller/services/weatherApi")
const { getPinterestApi } = require("../../controller/services/pinterestApi")
const { getAllNews } = require("../../controller/services/newsApi")
const { getPokemon } = require("../../controller/services/pokemonApi")
const { GetExcel } = require("../../controller/services/excelGenerator")
const { getJokes } = require("../../controller/services/jokesApi")
const { getCoffee } = require("../../controller/services/coffeeApi")


router.get("/weather", getWeather)
router.get("/pinterest", getPinterestApi)
router.get("/news", getAllNews)
router.get("/pokemon", getPokemon)
router.get("/jokes", getJokes)
router.get("/coffee", getCoffee)

router.post("/excel", GetExcel)


module.exports = router