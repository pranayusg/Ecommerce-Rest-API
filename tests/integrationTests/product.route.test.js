const request = require('supertest');
const app = require('../../app');

const data = {
  mail: process.env.TEST_MAIL,
  password: process.env.TEST_PASS,
};

describe('/product', () => {
  test('Test GET product endpoint', async () => {
    const res = await request(app).post('/users/signin').send(data);
    const productRes = await request(app)
      .get(`/products`)
      .set({
        accept: 'application/json',
        authorization: `Bearer ${res.body.token}`,
      });

    expect(productRes.status).toBe(200);
    productRes.body.map((element) => {
      expect(element).toHaveProperty('category');
    });
  });
});
