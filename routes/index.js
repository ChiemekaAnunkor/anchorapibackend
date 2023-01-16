const router = require("express").Router();
const userRoutes = require("./UserRoutes")
const tokenRoutes = require("./tokenRoutes")
const services = require("./services")

router.use("/api/users/", userRoutes)
router.use("/api/tokens/", tokenRoutes)
router.use("/endpoint", services)

module.exports = router