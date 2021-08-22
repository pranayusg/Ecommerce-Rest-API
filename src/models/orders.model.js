const sequelize = require('./connection');

const methods = {};

methods.findOrderDetailsByMail = (mail) =>
  new Promise((resolve, reject) => {
    sequelize
      .query(
        `select OD.id,P.name,P.description,C.title as category,OD.quantity,P.price
        from ecommerce.order_details OD
        inner join ecommerce.orders O on O.id=OD.order_id
        inner join ecommerce.users U on O.user_id=U.id
        inner join ecommerce.products P on P.id=OD.product_id
        inner join ecommerce.category C on C.id=P.cat_id
        where U.mail=?
        order by OD.id;`,
        { replacements: [mail], type: sequelize.QueryTypes.SELECT }
      )
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        reject(err);
      });
  });

methods.idExists = (userId) =>
  new Promise((resolve, reject) => {
    sequelize
      .query(`SELECT id FROM ecommerce.orders where user_id=?;`, {
        replacements: [userId],
        type: sequelize.QueryTypes.SELECT,
      })
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        reject(err);
      });
  });

methods.saveOrder = (userId) =>
  new Promise((resolve, reject) => {
    sequelize
      .query(`INSERT INTO ecommerce.orders(user_id) VALUES (?);`, {
        replacements: [userId],
        type: sequelize.QueryTypes.INSERT,
      })
      .then((results) => {
        resolve(results[0]);
      })
      .catch((err) => {
        reject(err);
      });
  });

methods.saveOrderDetails = (orderId, orderDetails) =>
  new Promise((resolve, reject) => {
    sequelize
      .query(
        `INSERT INTO ecommerce.order_details(order_id,product_id,quantity)VALUES(?,?,?);`,
        {
          replacements: [
            orderId,
            orderDetails.productId,
            orderDetails.quantity,
          ],
          type: sequelize.QueryTypes.INSERT,
        }
      )
      .then((insertedId) => {
        resolve(insertedId[0]);
      })
      .catch((err) => {
        reject(err);
      });
  });

methods.findByIdAndUpdate = (id, quantity) =>
  new Promise((resolve, reject) => {
    sequelize
      .query(`update ecommerce.order_details set quantity=? where id=?`, {
        replacements: [quantity, id],
        type: sequelize.QueryTypes.UPDATE,
      })
      .then((updateCount) => {
        resolve(updateCount[1]);
      })
      .catch((err) => {
        reject(err);
      });
  });

methods.findByIdAndDelete = (id) =>
  new Promise((resolve, reject) => {
    sequelize
      .query(`delete from ecommerce.order_details where id=?`, {
        replacements: [id],
        type: sequelize.QueryTypes.DELETE,
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = methods;
