const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const models = require('../database/models');
const _ = require('lodash');

chai.use(chaiHttp);
chai.should();

before('clearDb of data', async () => {
  await Promise.all(
    _.map(Object.keys(models), (key) => {
      if (['sequelize', 'Sequelize'].includes(key)) return null;
      console.log(key + ' cleared!');
      return models[key].destroy({ truncate : true, restartIdentity: true, cascade: true });
    })
  );
});

describe("regional shipping program eligibility test", async () => {

  describe("seed", async () => {

    // it("should return not eligible", (done) => {
    //   chai.request(app)
    //     .get('/api/rules')
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.should.be.a('array');
    //     done();
    //   });
    // });
    //
    // it("should return not eligible", (done) => {
    //   chai.request(app)
    //     .get('/api/rules')
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.should.be.a('array');
    //     done();
    //   });
    // });
    //
    // it("should return not eligible", (done) => {
    //   chai.request(app)
    //     .get('/api/rules')
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.should.be.a('array');
    //     done();
    //   });
    // });
    //
    // it("should return eligible", (done) => {
    //   chai.request(app)
    //     .get('/api/rules')
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.should.be.a('array');
    //     done();
    //   });
    // });
    //
    // it("should return eligible", (done) => {
    //   chai.request(app)
    //     .get('/api/rules')
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.should.be.a('array');
    //     done();
    //   });
    // });
    //
    // it("should return eligible", (done) => {
    //   chai.request(app)
    //     .get('/api/rules')
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.should.be.a('array');
    //     done();
    //   });
    // });

  });

});
