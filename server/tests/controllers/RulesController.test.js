const chai = require('chai');
const chaiHttp = require('chai-http');
const _ = require('lodash');
const models = require('../../database/models');
const app = require('../../../app');

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

describe("rules controller", () => {

  it("should successfully create valid eligibility rule", (done) => {
    chai.request(app)
    .post('/api/rules')
    .send({
      label: 'eligible_seller',
      attribute: 'seller',
      operator: 'in',
      comparator: {
        model: 'Seller',
        attribute: 'username'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .end((err, res) => {
      res.body.should.have.property('id').equal(1);
      res.should.have.status(201);
      res.body.should.be.a('object');
      done();
    });
  });

  it("should successfully create valid eligibility rule", (done) => {
    chai.request(app)
    .post('/api/rules')
    .send({
      label: 'eligible_category',
      attribute: 'category',
      operator: 'in',
      comparator: {
        model: 'Category',
        attribute: 'ebay_id'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .end((err, res) => {
      res.body.should.have.property('id').equal(2);
      res.should.have.status(201);
      res.body.should.be.a('object');
      done();
    });
  });

  it("should get all eligibility rules", (done) => {
    chai.request(app)
    .get('/api/rules')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      done();
    });
  });

  it("should get eligibility rule by id", (done) => {
    let id = 1;
    chai.request(app)
    .get('/api/rules/' + id)
    .end((err, res) => {
      res.body.should.have.property('id').equal(id);
      res.should.have.status(200);
      res.body.should.be.a('object');
      done();
    });
  });

  it("should remove eligibility rule by label", (done) => {
    let label = 'eligible_seller';
    chai.request(app)
    .get('/api/rules/' + label)
    .end((err, res) => {
      res.body.should.have.property('label').equal(label);
      res.should.have.status(200);
      res.body.should.be.a('object');
      done();
    });
  });

  it("should remove eligibility rule by id", (done) => {
    let id = 1;
    chai.request(app)
    .delete('/api/rules/' + id)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('string');
      done();
    });
  });

  it("should remove eligibility rule by label", (done) => {
    let label = 'eligible_category';
    chai.request(app)
    .delete('/api/rules/' + label)
    .end((err, res) => {
      res.body.should.equal('rule with id: 2 and label: ' + label + ' removed');
      res.should.have.status(200);
      done();
    });
  });

  // label validator tests
  it("should return 422 code for missing label field", (done) => {
    chai.request(app)
    .post('/api/rules')
    .send({})
    .end((err, res) => {
      res.should.have.status(422);
      res.body.should.have.property('message').equal('required field \'label\' is missing');
      done();
    });
  });

  it("should return 422 code for invalid label field", (done) => {
    chai.request(app)
    .post('/api/rules')
    .send({label:[12]})
    .end((err, res) => {
      res.should.have.status(422);
      res.body.should.have.property('message').equal('required field \'label\' should be a string');
      done();
    });
  });

  // attribute validator tests
  it("should return 422 code for missing attribute field", (done) => {
    chai.request(app)
    .post('/api/rules')
    .send({
      label: 'label'
    })
    .end((err, res) => {
      res.should.have.status(422);
      res.body.should.have.property('message').equal('required field \'attribute\' is missing');
      done();
    });
  });

  it("should return 422 code for invalid attribute format", (done) => {
    chai.request(app)
    .post('/api/rules')
    .send({
      label: 'label',
      attribute:[12,12]
    })
    .end((err, res) => {
      res.should.have.status(422);
      res.body.should.have.property('message').equal('required field \'attribute\' should be a string');
      done();
    });
  });

  it("should return 422 code for invalid attribute value", (done) => {
    chai.request(app)
    .post('/api/rules')
    .send({
      label: 'label',
      attribute:'banana'
    })
    .end((err, res) => {
      res.should.have.status(422);
      res.body.should.have.property('message').equal('required field \'attribute\' must match an available fields: price, seller, category, date');
      done();
    });
  });

  // operator validator tests
  it("should return 422 code for missing operator field", (done) => {
    chai.request(app)
    .post('/api/rules')
    .send({
      label: 'label',
      attribute: 'seller'
    })
    .end((err, res) => {
      res.should.have.status(422);
      res.body.should.have.property('message').equal('required field \'operator\' is missing');
      done();
    });
  });

  it("should return 422 code for invalid operator format", (done) => {
    chai.request(app)
    .post('/api/rules')
    .send({
      label: 'label',
      attribute: 'seller',
      operator: '+'
    })
    .end((err, res) => {
      res.should.have.status(422);
      res.body.should.have.property('message').equal('required field \'operator\' must match an available operators: \'<\' \'>\' \'=\', \'between\', or \'in\'');
      done();
    });
  });

  // comparator validators
  it("should return 422 code for invalid comparator values", (done) => {
    chai.request(app)
    .post('/api/rules')
    .send({
      label: 'label',
      attribute: 'seller',
      operator: 'in',
      comparator: 'string'
    })
    .end((err, res) => {
      res.should.have.status(422);
      res.body.should.have.property('message').equal('required field \'comparator\' must be either an array with 1-2 numerical values or an object with valid model and attribute fields');
      done();
    });
  });

  it("should return 422 code for invalid comparator values", (done) => {
    chai.request(app)
    .post('/api/rules')
    .send({
      label: 'label',
      attribute: 'seller',
      operator: 'in',
      comparator: {
        model: 'seller'
      }
    })
    .end((err, res) => {
      res.should.have.status(422);
      res.body.should.have.property('message').equal('required field \'comparator\' must be either an array with 1-2 numerical values or an object with valid model and attribute fields');
      done();
    });
  });

  it("should return 422 code for invalid comparator values", (done) => {
    chai.request(app)
    .post('/api/rules')
    .send({
      label: 'label',
      attribute: 'seller',
      operator: 'in',
      comparator: {
        model: 'sailor',
        attribute: 'username'
      }
    })
    .end((err, res) => {
      res.should.have.status(422);
      res.body.should.have.property('message').equal('required field \'comparator\' must be either an array with 1-2 numerical values or an object with valid model and attribute fields');
      done();
    });
  });

  // combined validators
  it("should return 422 code for incompatible comparator & operator values", (done) => {
    chai.request(app)
    .post('/api/rules')
    .send({
      label: 'label',
      attribute: 'seller',
      operator: '>',
      comparator: {
        model: 'seller',
        attribute: 'username'
      }
    })
    .end((err, res) => {
      res.should.have.status(422);
      res.body.should.have.property('message').equal('\'=\', \'>\', \'<\', \'>=\', \'<=\' operators can only have one numeric comparator, \'between\' operator must have exactly two numeric comparators, and \'in\' operator is for use with models only');
      done();
    });
  });

  it("should return 422 code for incompatible comparator & operator values", (done) => {
    chai.request(app)
    .post('/api/rules')
    .send({
      label: 'label',
      attribute: 'seller',
      operator: '>',
      comparator: [12,12]
    })
    .end((err, res) => {
      res.should.have.status(422);
      res.body.should.have.property('message').equal('\'=\', \'>\', \'<\', \'>=\', \'<=\' operators can only have one numeric comparator, \'between\' operator must have exactly two numeric comparators, and \'in\' operator is for use with models only');
      done();
    });
  });

  it("should successfully create valid eligibility rule", (done) => {
    chai.request(app)
    .post('/api/rules')
    .send({
      label: 'eligible_seller',
      attribute: 'seller',
      operator: 'in',
      comparator: {
        model: 'Seller',
        attribute: 'username'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .end((err, res) => {
      res.body.should.have.property('id');
      res.should.have.status(201);
      res.body.should.be.a('object');
      done();
    });
  });

  it("should successfully create valid eligibility rule", (done) => {
    chai.request(app)
    .post('/api/rules')
    .send({
      label: 'eligible_category',
      attribute: 'category',
      operator: 'in',
      comparator: {
        model: 'Category',
        attribute: 'ebay_id'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .end((err, res) => {
      res.body.should.have.property('id');
      res.should.have.status(201);
      res.body.should.be.a('object');
      done();
    });
  });

  it("should successfully create valid eligibility rule", (done) => {
    chai.request(app)
    .post('/api/rules')
    .send({
      label: 'minimum_price',
      attribute: 'price',
      operator: '>',
      comparator: [1000],
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .end((err, res) => {
      res.body.should.have.property('id');
      res.should.have.status(201);
      res.body.should.be.a('object');
      done();
    });
  });

  it("should successfully create valid eligibility rule", (done) => {
    chai.request(app)
    .post('/api/rules')
    .send({
      label: 'active_season',
      attribute: 'date',
      operator: 'between',
      comparator: ['1591230018000', '1593822018000'],
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .end((err, res) => {
      res.body.should.have.property('id');
      res.should.have.status(201);
      res.body.should.be.a('object');
      done();
    });
  });

});
