const express = require("express");
const checkAuth = require("../middlewares/checkAuth.middleware");
const ordersControllers = require("../controllers/orders.controller");

const router = express.Router();

router.all("*", checkAuth);

router
  .route("/")
  .get(ordersControllers.getOrderDetails)
  .post(ordersControllers.createOrder)
  .delete(ordersControllers.deleteOrderDetails);

router.patch(
  "/id/:orderDetailsId/quantity/:quantity",
  ordersControllers.updateOrderDetails
);

module.exports = router;
