var Router = require("router");
var router = Router();
var middleware = require("../middleware/checkauth");

router.use("/user", require("./userroute"));

router.use("/admin", require("./adminroute"));

router.use("/product", require("./productroute"));

router.use("/order", require("./orderrouter"));

router.use("/payment", require("./paymentroute"));

module.exports = router;
