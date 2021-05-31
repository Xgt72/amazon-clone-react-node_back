const connection = require("../db-connection");

class Order {
  constructor(userId, paymentIntentId, amount, created) {
    this.userId = userId;
    this.paymentIntentId = paymentIntentId;
    this.amount = amount;
    this.created = created;
  }

  static fetchAll() {
    const sql = "SELECT * FROM orders";
    return connection.promise().query(sql);
  }

  static fetchOneById(id) {
    const sql = "SELECT * FROM orders WHERE id = ?";
    return connection.promise().query(sql, [id]);
  }

  static fetchAllByUserId(userId, orderBy, flow) {
    let sql = "SELECT * FROM orders WHERE userId = ?";
    const sqlValues = [userId];
    if (orderBy === "created") {
      sql += " ORDER BY created";
      if (flow === "DESC") {
        sql += " DESC";
      }
    }

    return connection.promise().query(sql, sqlValues);
  }

  static fetchAllWithBasketsByUserId(userId) {
    const sql =
      "SELECT o.id, o.paymentIntentId, o.amount, o.created, b.productId, b.quantity, p.title, p.price, p.image, p.rating FROM orders o JOIN baskets b ON b.orderId=o.id JOIN products p ON p.id=b.productId WHERE userId=? ORDER BY o.created DESC";
    const sqlValues = [userId];
    return connection.promise().query(sql, sqlValues);
  }

  static createOne(orderData) {
    const sql = "INSERT INTO orders SET ?";
    return connection.promise().query(sql, [orderData]);
  }

  static updateOne(id, orderData) {
    let sql = "UPDATE orders SET ";
    const values = Object.values(orderData);
    const properties = Object.keys(orderData);
    sql += properties.join("=?, ");
    sql += "=? WHERE id=?";
    return connection.promise().query(sql, [...values, id]);
  }

  static deleteOne(id) {
    const sql = "DELETE FROM orders WHERE id=?";
    return connection.promise().query(sql, [id]);
  }
}

module.exports = Order;
