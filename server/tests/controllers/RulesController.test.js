const chai = require('chai');
const chaiHttp = require('chai-http');
const _ = require('lodash');
const models = require('../../database/models');
const app = require('../../../app');

chai.use(chaiHttp);
chai.should();

describe("regional shipping program eligibility tests", async () => {

  describe("rules controller", async () => {

    it("should get all eligibility rules", (done) => {
      chai.request(app)
        .get('/api/rules')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
        done();
      });
    });

    it("should get eligibility rule by id or label", (done) => {
      chai.request(app)
      .get('/api/rules/1')
      .end((err, res) => {
        res.body.id.should.equal(1);
        res.should.have.status(200);
        res.body.should.be.a('object');
      });
      chai.request(app)
      .get('/api/rules/eligible_seller')
      .end((err, res) => {
        res.body.label.should.equal('eligible_seller');
        res.should.have.status(200);
        res.body.should.be.a('object');
      });
      done();
    });

    it("should remove eligibility rule by id or label", (done) => {
      chai.request(app)
      .delete('/api/rules/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('string');
      });
      chai.request(app)
      .delete('/api/rules/active_season')
      .end((err, res) => {
        res.body.label.should.equal('eligible_seller');
        res.should.have.status(200);
        res.body.should.be.a('object');
      });
      done();
    });


  });

});
