const ordersRouter = require("express").Router();
const {
  getAllOrders,
  getOneOrderById,
  createOneOrder,
  updateOneOrder,
  deleteOneOrder,
} = require("../controllers/orders");
const {
  getAllBasketsByOrderId,
  createMultipleBaskets,
  updateOneBasketById,
} = require("../controllers/baskets");
const { authenticateWithJsonWebToken } = require("../controllers/jwt");

ordersRouter.get("/", getAllOrders);

ordersRouter.get("/:id", getOneOrderById);

// ordersRouter.post(
//   "/",
//   //   authenticateWithJsonWebToken,
//   createOneOrder,
//   getOneOrderById
// );

ordersRouter.put(
  "/:id",
  authenticateWithJsonWebToken,
  updateOneOrder,
  getOneOrderById
);

ordersRouter.delete("/:id", authenticateWithJsonWebToken, deleteOneOrder);

ordersRouter.get("/:orderId/baskets", getAllBasketsByOrderId);
ordersRouter.post(
  "/:orderId/baskets",
  createMultipleBaskets,
  getAllBasketsByOrderId
);

module.exports = ordersRouter;
