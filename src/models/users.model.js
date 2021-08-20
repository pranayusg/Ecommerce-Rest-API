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
  sequelize
    .query("select password from biqaepposeconcu0el3n.users where mail=?", {
      replacements: [userMail],
      type: Sequelize.QueryTypes.SELECT,
    })
    .then((result) => result[0].password);
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
  sequelize.query("delete from biqaepposeconcu0el3n.users where id>1");
};

methods.getId = (userMail) => {
  sequelize
    .query("select id from biqaepposeconcu0el3n.users where mail=?", {
      replacements: [userMail],
      type: Sequelize.QueryTypes.SELECT,
    })
    .then((result) => result[0].id);
};

module.exports = methods;
