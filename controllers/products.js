const Product = require("../models/Product");

const getAllProducts = async (req, res, next) => {
  Product.fetchAll()
    .then(([allProducts]) => {
      allProducts.forEach((product) => {
        product.price = parseFloat(product.price, 10);
      });
      res.json(allProducts);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const getOneProductById = async (req, res, next) => {
  let id;
  if (req.body.id) {
    id = req.body.id;
  } else if (req.params.id) {
    id = req.params.id;
  }

  Product.fetchOneById(id)
    .then(([product]) => {
      if (!product) {
        res.status(404).json({ errorMessage: "Product not found" });
      } else {
        if (req.body.id) {
          res.status(201);
        } else if (req.params.id) {
          res.status(200);
        }
        product.price = parseFloat(product.price, 10);
        res.json(product[0]);
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const createOneProduct = async (req, res, next) => {
  const { title, price, image, rating } = req.body;

  Product.createOne({ title, price, image, rating })
    .then(([data]) => {
      req.body.id = data.insertId;
      next();
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const updateOneProduct = async (req, res, next) => {
  const { productData } = req.body;
  const { id } = req.params;

  Product.updateOne(id, productData)
    .then(([data]) => {
      if (data.affectedRows === 0) {
        res.status(404).json({ errorMessage: "Product not found" });
      }
      next();
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const deleteOneProduct = async (req, res, next) => {
  const { id } = req.params;
  Product.deleteOne(id)
    .then(([data]) => {
      if (data.affectedRows === 0) {
        res.status(404).json({ errorMessage: "Product not found" });
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

module.exports = {
  getAllProducts,
  getOneProductById,
  createOneProduct,
  updateOneProduct,
  deleteOneProduct,
};
