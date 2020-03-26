const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const models = require('../database/models');
const _ = require('lodash');

chai.use(chaiHttp);
chai.should();


// describe("regional shipping program eligibility tests", async () => {
//
//   describe("eligibility calls", async () => {
//
//     // it("should return not eligible", (done) => {
//     //   chai.request(app)
//     //     .get('/api/rules')
//     //     .end((err, res) => {
//     //       res.should.have.status(200);
//     //       res.body.should.be.a('array');
//     //     done();
//     //   });
//     // });
//     //
//     // it("should return not eligible", (done) => {
//     //   chai.request(app)
//     //     .get('/api/rules')
//     //     .end((err, res) => {
//     //       res.should.have.status(200);
//     //       res.body.should.be.a('array');
//     //     done();
//     //   });
//     // });
//     //
//     // it("should return not eligible", (done) => {
//     //   chai.request(app)
//     //     .get('/api/rules')
//     //     .end((err, res) => {
//     //       res.should.have.status(200);
//     //       res.body.should.be.a('array');
//     //     done();
//     //   });
//     // });
//     //
//     // it("should return eligible", (done) => {
//     //   chai.request(app)
//     //     .get('/api/rules')
//     //     .end((err, res) => {
//     //       res.should.have.status(200);
//     //       res.body.should.be.a('array');
//     //     done();
//     //   });
//     // });
//     //
//     // it("should return eligible", (done) => {
//     //   chai.request(app)
//     //     .get('/api/rules')
//     //     .end((err, res) => {
//     //       res.should.have.status(200);
//     //       res.body.should.be.a('array');
//     //     done();
//     //   });
//     // });
//     //
//     // it("should return eligible", (done) => {
//     //   chai.request(app)
//     //     .get('/api/rules')
//     //     .end((err, res) => {
//     //       res.should.have.status(200);
//     //       res.body.should.be.a('array');
//     //     done();
//     //   });
//     // });
//
//   });
//
// });
