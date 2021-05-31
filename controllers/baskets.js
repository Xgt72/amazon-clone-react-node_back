const Basket = require("../models/Basket");
const Order = require("../models/Order");

const getAllBasketsByOrderId = async (req, res, next) => {
  const { orderId } = req.params;
  Basket.fetchAllByOrderId(orderId)
    .then(([allBaskets]) => {
      res.json(allBaskets);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const getAllOrdersAndBasketsByUserId = async (req, res, next) => {
  const { id } = req.params;
  Order.fetchAllWithBasketsByUserId(id)
    .then(([allOrders]) => {
      const allOrdersWithBasketLines = [];
      allOrders.forEach((order) => {
        const indexOfOrder = allOrdersWithBasketLines.findIndex(
          (item) => item.id === order.id
        );
        if (indexOfOrder !== -1) {
          allOrdersWithBasketLines[indexOfOrder].baskets.push({
            id: order.productId,
            quantity: order.quantity,
            title: order.title,
            price: order.price,
            image: order.image,
            rating: order.rating,
          });
        } else {
          allOrdersWithBasketLines.push({
            id: order.id,
            paymentIntentId: order.paymentIntentId,
            amount: order.amount,
            created: order.created,
            baskets: [
              {
                id: order.productId,
                quantity: order.quantity,
                title: order.title,
                price: order.price,
                image: order.image,
                rating: order.rating,
              },
            ],
          });
        }
      });
      res.json(allOrdersWithBasketLines);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const createMultipleBaskets = async (req, res, next) => {
  let { baskets } = req.body;
  const { orderId } = req.params;

  baskets = baskets.map((basket) => {
    return { orderId: parseInt(orderId, 10), ...basket };
  });

  Basket.createMultiple(baskets)
    .then(([data]) => {
      // console.log("post baskets: ", data);
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

const updateOneBasketById = async (req, res, next) => {
  const { basketData } = req.body;
  const { id, orderId } = req.params;

  Basket.updateOne(id, { ...basketData, orderId: parseInt(orderId, 10) })
    .then(([data]) => {
      if (data.affectedRows === 0) {
        res.status(404).json({ errorMessage: "Basket not found" });
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

module.exports = {
  getAllBasketsByOrderId,
  getAllOrdersAndBasketsByUserId,
  createMultipleBaskets,
  updateOneBasketById,
};
