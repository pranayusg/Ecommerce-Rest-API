const Sequelize = require("sequelize");
const sequelize = require("./connection");

const methods = {};

const userDataModel = sequelize.define(
  "users",
  {
    mail: { type: Sequelize.STRING(45) },
    password: Sequelize.STRING(200),
    id: { type: Sequelize.INTEGER, primaryKey: true },
  },
  { timestamps: false, charset: "utf-8" }
);

methods.checkMail = (userMail) => {
  return new Promise((resolve, reject) => {
    userDataModel
      .findOne({
        where: {
          mail: userMail,
        },
      })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject();
      });
  });
};

methods.getPassword = (userMail) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query("select password from ecommerce.users where mail=?", {
        replacements: [userMail],
        type: Sequelize.QueryTypes.SELECT,
      })
      .then((result) => resolve(result[0].password))
      .catch((err) => {
        reject(err);
      });
  });
};

methods.saveUser = (property) => {
  return new Promise((resolve, reject) => {
    console.log(property);
    userDataModel
      .upsert({
        mail: property.mail,
        password: property.password,
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

methods.deleteUsers = () => {
  sequelize.query("delete from ecommerce.users where id>1");
};

methods.getId = (userMail) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query("select id from ecommerce.users where mail=?", {
        replacements: [userMail],
        type: Sequelize.QueryTypes.SELECT,
      })
      .then((result) => resolve(result[0].id))
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = methods;
