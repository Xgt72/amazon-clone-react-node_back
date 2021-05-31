const connection = require("../db-connection");

class Product {
  constructor(title, price, image, rating) {
    this.title = title;
    this.price = price;
    this.image = image;
    this.rating = rating;
  }

  static async fetchAll() {
    const sql = "SELECT * FROM products";
    return connection.promise().query(sql);
  }

  static fetchOneById(id) {
    const sql = "SELECT * FROM products WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static createOne(product) {
    const sql = "INSERT INTO products SET ?";
    return connection.promise().query(sql, [product]);
  }

  static updateOne(id, productData) {
    let sql = "UPDATE products SET ";
    const values = Object.values(productData);
    const properties = Object.keys(productData);
    sql += properties.join("=?, ");
    sql += "=? WHERE id=?";
    return connection.promise().query(sql, [...values, id]);
  }

  static deleteOne(id) {
    const sql = "DELETE FROM products WHERE id=?";
    return connection.promise().query(sql, [id]);
  }
}

module.exports = Product;
