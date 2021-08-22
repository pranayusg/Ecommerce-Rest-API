const { DataTypes, QueryTypes } = require('sequelize');
const sequelize = require('./connection');

const methods = {};

const productsDataModel = sequelize.define(
  'products',
  {
    // id: { type: DataTypes.INTEGER, primaryKey: true },
    name: { type: DataTypes.STRING(500) },
    description: DataTypes.STRING(5000),
    price: DataTypes.INTEGER,
    cat_id: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  }
);

methods.saveProduct = (product) =>
  new Promise((resolve, reject) => {
    productsDataModel
      .create(product)
      .then((savedObj) => {
        // delete savedObj.dataValues.id;
        resolve(savedObj.dataValues);
      })
      .catch((err) => {
        reject(err);
      });
  });

methods.find = () =>
  new Promise((resolve, reject) => {
    sequelize
      .query(
        `select P.id,P.name,P.description,P.price,C.title as category
      from ecommerce.products P
      inner join ecommerce.category C
      on P.cat_id=C.id
      order by P.id`,
        { type: QueryTypes.SELECT }
      )
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        reject(err);
      });
  });

methods.findByIdAndUpdate = (id, product) =>
  new Promise((resolve, reject) => {
    productsDataModel
      .update({ price: product.price }, { where: { id } })
      .then((count) => {
        resolve(count[0]);
      })
      .catch((err) => {
        reject(err);
      });
  });

methods.removeById = (id) =>
  new Promise((resolve, reject) => {
    productsDataModel
      .destroy({ where: { id } })
      .then((count) => {
        resolve(count);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = methods;
