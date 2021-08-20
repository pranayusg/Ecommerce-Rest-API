require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const logger = require("./src/lib/logger");
const morganMiddleware = require("./src/middlewares/morgan.middleware");
const productsRoutes = require("./src/routes/products.route");
// const ordersRoutes = require("./src/routes/orders.route");
const usersRoutes = require("./src/routes/users.route");

const app = express();

app.set("trust proxy", 1);
app.use(morganMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());

app.use("/products", productsRoutes);
// app.use("/orders", ordersRoutes);
app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Ecommerce Rest API</h1>");
});

app.use((error, req, res, next) => {
  res.status(500).json({
    message: error.message,
  });
  logger.error(
    `Error message: ${error.message},Req details: ${req.originalUrl} - ${req.method} - ${req.ip}`
  );
});

module.exports = app;
