const productsRouter = require("express").Router();
const {
  getAllProducts,
  getOneProductById,
  createOneProduct,
  updateOneProduct,
  deleteOneProduct,
} = require("../controllers/products");
const { authenticateWithJsonWebToken } = require("../controllers/jwt");

productsRouter.get("/", getAllProducts);

productsRouter.post(
  "/",
  authenticateWithJsonWebToken,
  createOneProduct,
  getOneProductById
);

productsRouter.put(
  "/:id",
  authenticateWithJsonWebToken,
  updateOneProduct,
  getOneProductById
);

productsRouter.delete("/:id", authenticateWithJsonWebToken, deleteOneProduct);

module.exports = productsRouter;
