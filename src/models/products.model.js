const Sequelize = require("sequelize");
const sequelize = require("./connection");

const methods = {};

const productsDataModel = sequelize.define("products", {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  name: { type: Sequelize.STRING(50) },
  description: Sequelize.STRING(5000),
  price: Sequelize.INTEGER,
  cat_id: Sequelize.INTEGER,
});

methods.create = (product) => {
  return new Promise((resolve, reject) => {
    productsDataModel
      .create(product)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// methods.getAll = () => {
//   return new Promise((resolve, reject) => {
//     productsDataModel
//       .findAll()
//       .then((results) => {
//         resolve(results);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// };

methods.getAll = () => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `select P.id,P.name,P.description,P.price,C.title
      from ecommerce.products P
      inner join ecommerce.category C
      on P.cat_id=C.id`
      )
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

methods.findByIdAndUpdate = (id, product) => {
  return new Promise((resolve, reject) => {
    productsDataModel
      .update({ price: product.price }, { where: { id: id } })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

methods.removeById = (id) => {
  return new Promise((resolve, reject) => {
    productsDataModel
      .destroy({ where: { id: id } })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = methods;
