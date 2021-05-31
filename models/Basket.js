const connection = require("../db-connection");

class Basket {
  constructor(orderId, productId, quantity) {
    this.orderId = orderId;
    this.productId = productId;
    this.quantity = quantity;
  }

  static fetchAllByOrderId(orderId) {
    const sql =
      "SELECT b.productId, b.quantity, p.title, p.price, p.image, p.rating FROM baskets b JOIN products p ON b.productId = p.id WHERE b.orderId=?";
    return connection.promise().query(sql, [orderId]);
  }

  static createOne(basket) {
    const sql = "INSERT INTO baskets SET ?";
    return connection.promise().query(sql, [basket]);
  }

  static createMultiple(baskets) {
    let sql = "INSERT INTO baskets (orderId, productId, quantity) VALUES ?";
    const values = [];
    baskets.forEach((basket) => {
      values.push(Object.values(basket));
    });
    return connection.promise().query(sql, [values]);
  }

  static updateOne(id, basketData) {
    let sql = "UPDATE baskets SET ";
    const values = Object.values(basketData);
    const properties = Object.keys(basketData);
    sql += properties.join("=?, ");
    sql += "=? WHERE id=?";
    return connection.promise().query(sql, [...values, id]);
  }
}

module.exports = Basket;
