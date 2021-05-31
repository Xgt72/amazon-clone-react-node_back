const User = require("../models/User");

const getAllUsers = async (req, res, next) => {
  User.fetchAll()
    .then(([allUsers]) => {
      res.json(allUsers);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const getOneUserById = async (req, res, next) => {
  let id;
  if (req.body.id) {
    id = req.body.id;
  } else if (req.params.id) {
    id = req.params.id;
  }

  User.fetchOneById(id)
    .then(([user]) => {
      if (!user) {
        res.status(404).json({ errorMessage: "User not found" });
      } else {
        if (req.body.id) {
          res.status(201);
        } else if (req.params.id) {
          res.status(200);
        }
        user[0].password = "hidden";
        res.json(user[0]);
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const getOneUserByEmail = async (req, res, next) => {
  const { email } = req.body;

  User.fetchOneByEmail(email)
    .then(([user]) => {
      if (user.length === 0) {
        res.status(404).json({ errorMessage: "User not found" });
      } else {
        req.body.user = user[0];
        next();
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const createOneUser = async (req, res, next) => {
  const { firstname, lastname, email, password, street, city, zip_code } =
    req.body;

  User.createOne({
    firstname,
    lastname,
    email,
    password,
    street,
    city,
    zip_code,
  })
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

const updateOneUser = async (req, res, next) => {
  const { userData } = req.body;
  const { id } = req.params;

  User.updateOne(id, userData)
    .then(([data]) => {
      if (data.affectedRows === 0) {
        res.status(404).json({ errorMessage: "User not found" });
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

const deleteOneUser = async (req, res, next) => {
  const { id } = req.params;
  User.deleteOne(id)
    .then(([data]) => {
      if (data.affectedRows === 0) {
        res.status(404).json({ errorMessage: "User not found" });
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

const passwordIsValid = async (req, res, next) => {
  const validPassword = User.passwordIsValid(
    req.body.password,
    req.body.user.password
  );
  if (validPassword) {
    next();
  } else {
    res.status(400).json({ errorMessage: "Email or Password is wrong" });
  }
};

module.exports = {
  getAllUsers,
  getOneUserById,
  getOneUserByEmail,
  createOneUser,
  updateOneUser,
  deleteOneUser,
  passwordIsValid,
};
