const request = require('request-promise');
const logger = require('../lib/logger');

function getCovidData(country) {
  return new Promise((resolve, reject) => {
    const countryClean = country.charAt(0).toUpperCase() + country.slice(1);
    let index;
    const options = {
      json: true,
      method: 'GET',
      url: process.env.COVID_URL,
    };

    request(options)
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].country === countryClean) {
            index = i;
            break;
          }
        }

        resolve({
          infected: data[index].infected,
          tested: data[index].tested,
          recovered: data[index].recovered,
          deceased: data[index].deceased,
          country: data[index].country,
          lastUpdated: data[index].lastUpdatedApify,
        });
      })
      .catch((err) => {
        logger.error(`Error while receiving covid data :${err}`);
        reject();
      });
  });
}

module.exports = { getCovidData };
