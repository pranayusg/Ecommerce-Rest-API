const { validationResult } = require('express-validator');
const ordersModel = require('../models/orders.model');
const usersModel = require('../models/users.model');
const mailService = require('../services/mail.service');
const logger = require('../lib/logger');

const signUpValidationResult = validationResult.withDefaults({
  formatter: (error) => ({
    msg: error.msg,
    param: error.param,
    location: error.location,
  }),
});

const createOrder = (req, res) => {
  if (!req.body.orderDetails) {
    res.status(400).send('Please specify the order details');
  }

  res.locals.orderDetails = req.body.orderDetails;
  usersModel
    .getId(res.locals.userData.mail)
    .then((userId) => {
      ordersModel
        .idExists(userId)
        .then(async (order) => {
          if (order[0] === undefined) {
            try {
              res.locals.orderId = await ordersModel.saveOrder(userId);
            } catch (err) {
              res.status(500).json({
                message: 'Unable to save order ',
                err,
              });
            }
          } else res.locals.orderId = order[0].id;

          ordersModel
            .saveOrderDetails(res.locals.orderId, res.locals.orderDetails)
            .then((id) => {
              res.status(201).json({
                message: `Order details saved successfully on id=${id}`,
                orderDetails: res.locals.orderDetails,
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: 'Unable to save order details ',
                err,
              });
            });
        })
        .catch((err) => {
          res.status(500).json({
            message: 'Unable to check order id ',
            err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Unable to get user id ',
        err,
      });
    });
};

const getOrderDetails = (req, res) => {
  ordersModel
    .findOrderDetailsByMail(res.locals.userData.mail)
    .then((order_details) => {
      res.status(200).json(order_details);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Unable to retrieve orders',
        err,
      });
    });
};

const updateOrderDetails = (req, res) => {
  if (!req.params.orderDetailsId || !req.params.quantity) {
    res
      .status(400)
      .send(
        'Please specify order details id and quantity to update order details'
      );
  }

  ordersModel
    .findByIdAndUpdate(req.params.orderDetailsId, req.params.quantity)
    .then((count) => {
      if (count > 0) {
        res.status(201).json({
          message: 'Order details Updated',
        });
      } else {
        res.status(404).json({
          message: 'Quantity you have provided is same',
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Unable to update order details',
        err,
      });
    });
};

const deleteOrderDetails = (req, res) => {
  if (!req.query.id) {
    res.status(400).send('Please specify order details id to delete orders');
  }

  ordersModel
    .findByIdAndDelete(req.query.id)
    .then(() => {
      res.status(201).json({
        message: 'Order Deleted',
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Unable to delete order',
        error: err,
      });
    });
};

module.exports = {
  createOrder,
  getOrderDetails,
  updateOrderDetails,
  deleteOrderDetails,
};
