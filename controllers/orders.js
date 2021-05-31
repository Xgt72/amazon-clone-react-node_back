const Order = require("../models/Order");

const getAllOrders = async (req, res, next) => {
  Order.fetchAll()
    .then(([allOrders]) => {
      allOrders.forEach((order) => {
        order.amount = parseFloat(order.anmount, 10);
      });
      res.json(allOrders);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const getOneOrderById = async (req, res, next) => {
  let id;
  if (req.body.id) {
    id = req.body.id;
  } else if (req.params.id) {
    id = req.params.id;
  }
  Order.fetchOneById(id)
    .then(([order]) => {
      if (!order.length) {
        res.status(404).json({ errorMessage: "Order not found" });
      } else {
        if (req.body.id) {
          res.status(201);
        } else if (req.params.id) {
          res.status(200);
        }
        order.amount = parseFloat(order.anmount, 10);
        res.json(order[0]);
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const getAllOrdersByUserId = async (req, res, next) => {
  const { id } = req.params;
  const { orderBy, flow } = req.query;

  Order.fetchAllByUserId(id, orderBy, flow)
    .then(([orders]) => {
      if (!orders.length) {
        res.status(404).json({ errorMessage: "Orders not found" });
      } else {
        orders.forEach((order) => {
          order.amount = parseFloat(order.amount, 10);
        });
        res.status(200).json(orders);
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const createOneOrder = async (req, res, next) => {
  const { paymentIntentId, amount, created } = req.body;
  const { id } = req.params;

  Order.createOne({ userId: id, paymentIntentId, amount, created })
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

const updateOneOrder = async (req, res, next) => {
  const { orderData } = req.body;
  const { id } = req.params;

  Order.updateOne(id, orderData)
    .then(([data]) => {
      if (data.affectedRows === 0) {
        res.status(404).json({ errorMessage: "Order not found" });
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

const deleteOneOrder = async (req, res, next) => {
  const { id } = req.params;
  Order.deleteOne(id)
    .then(([data]) => {
      if (data.affectedRows === 0) {
        res.status(404).json({ errorMessage: "Order not found" });
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
  getAllOrders,
  getOneOrderById,
  getAllOrdersByUserId,
  createOneOrder,
  updateOneOrder,
  deleteOneOrder,
};
