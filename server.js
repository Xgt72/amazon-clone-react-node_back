require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PORT, CLIENT_URL } = process.env;
const router = require("./routes");
const errorController = require("./controllers/error");

const app = express();

const corsOptions = {
  origin: CLIENT_URL,
  optionsSuccessStatus: 200,
  methods: "GET, POST, PUT, DELETE, OPTIONS",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// error
app.use(errorController.get404);
app.use(errorController.get500);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
