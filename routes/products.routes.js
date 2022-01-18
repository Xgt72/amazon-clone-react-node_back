const productsRouter = require("express").Router();
const {
  getAllProducts,
  getOneProductById,
  createOneProduct,
  updateOneProduct,
  deleteOneProduct,
  uploadFile,
} = require("../controllers/products");
const { authenticateWithJsonWebToken } = require("../controllers/jwt");

productsRouter.get("/", getAllProducts);

productsRouter.post(
  "/",
  authenticateWithJsonWebToken,
  createOneProduct,
  getOneProductById
);

productsRouter.post("/upload-file", authenticateWithJsonWebToken, uploadFile);

productsRouter.put(
  "/:id",
  authenticateWithJsonWebToken,
  updateOneProduct,
  getOneProductById
);

productsRouter.delete("/:id", authenticateWithJsonWebToken, deleteOneProduct);

module.exports = productsRouter;
