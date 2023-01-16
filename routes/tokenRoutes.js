const router = require("express").Router();
const { createToken, getTokens, getOneToken, updateToken } = require("../controller/tokenController")


router.route("/").get(getTokens).post(createToken).put(updateToken);
router.route("/:api_key").get(getOneToken)




module.exports = router