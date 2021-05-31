const usersRouter = require("express").Router();

const {
  getAllUsers,
  getOneUserById,
  getOneUserByEmail,
  createOneUser,
  updateOneUser,
  deleteOneUser,
  passwordIsValid,
} = require("../controllers/users");

const {
  getAllOrdersByUserId,
  createOneOrder,
  getOneOrderById,
} = require("../controllers/orders");

const {
  getAllBasketsByOrderId,
  createMultipleBaskets,
  getAllOrdersAndBasketsByUserId,
} = require("../controllers/baskets");

const {
  createToken,
  authenticateWithJsonWebToken,
} = require("../controllers/jwt");

usersRouter.get("/", getAllUsers);
usersRouter.post("/register", createOneUser, getOneUserById);
usersRouter.post("/login", getOneUserByEmail, passwordIsValid, createToken);
usersRouter.put(
  "/:id",
  authenticateWithJsonWebToken,
  updateOneUser,
  getOneUserById
);
usersRouter.delete("/:id", authenticateWithJsonWebToken, deleteOneUser);

usersRouter.get("/:id/orders", getAllOrdersByUserId);
usersRouter.post("/:id/orders", createOneOrder, getOneOrderById);
usersRouter.post(
  "/:id/orders/:orderId/baskets",
  createMultipleBaskets,
  getAllBasketsByOrderId
);

usersRouter.get("/:id/orders/baskets", getAllOrdersAndBasketsByUserId);

module.exports = usersRouter;
