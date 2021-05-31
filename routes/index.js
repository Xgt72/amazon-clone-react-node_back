const router = require("express").Router();
const usersRoutes = require("./users.routes");
const paymentRoutes = require("./payments.routes");
const productsRoutes = require("./products.routes");
const ordersRoutes = require("./orders.routes");

router.use("/users", usersRoutes);
router.use("/payments", paymentRoutes);
router.use("/products", productsRoutes);
router.use("/orders", ordersRoutes);

module.exports = router;
