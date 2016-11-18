const chai = require('chai');
const mocha = require('mocha');
const should = chai.should();
const expect = chai.expect;

const Joi = require('joi');

describe('some example joi validation', () => {


  const options = {abortEarly: false, allowUnknown: false};
  const stringWithContents = Joi.string();
  const badString = Joi.string().allow('').allow(null);

  // https://github.com/hapijs/joi/issues/588
  
  // validation where you can have one in a set of fields is difficult.
  // Here, you specify every success criteria
  // (we leave out the success case of a and b and c, because that will pass either of the rule sets).
  const aAndB = Joi.object({
    a: stringWithContents.required(),
    b: stringWithContents.required(),
    c: badString
  });

  const aAndC = Joi.object({
    a: stringWithContents.required(),
    b: badString,
    c: stringWithContents.required()
  });

  const testObject = Joi.alternatives().try([aAndB, aAndC]);
  /*
  valid combinations:
   vA + vB + vC
   vA + +vB +iC
   vA + iB + vC
  invalid combindations:
   vA + iB + iC
   iA + vB + vC
   iA + vB + iC
   iA + iB + vC
   iA + iB + iC
   */

  const performTest = (payload, callback) => {
    Joi.validate(payload, testObject, options, callback);
  }

  it('accepts a and b and c', (done) => {
    const payload = {a: 'a', b: 'b', c: 'c'};
    performTest(payload, (err, value) => { 
      expect(err).to.be.null;
      done();
    });
  });

  describe('null properties', () => {
    const invalid = null;

    it('accepts a and b', (done) => {
      const payload = {a: 'a', b: 'b',  c: invalid};
      performTest(payload, (err, value) => { 
        expect(err).to.be.null;
        done();
      });
    });

    it('accepts a and c', (done) => {
      const payload = {a: 'a', b: invalid, c: 'c'};
      performTest(payload, (err, value) => { 
        expect(err).to.be.null;
        done();
      });
    });

    it('fails when a is valid, b is invalid, c is invalid', (done) => {
      const payload = {a: 'a', b: invalid, c: invalid};
      performTest(payload, (err, value) => { 
        expect(err).to.not.be.null;
        done();
      });
    });

    it('fails when a is invalid , b is valid , c is valid', (done) => {
      const payload = {a: invalid, b: 'b', c: 'c'};
      performTest(payload, (err, value) => { 
        expect(err).to.not.be.null;
        done();
      });
    });

    it('fails when a is invalid , b is valid , c is invalid', (done) => {
      const payload = {a: invalid, b: 'b', c: invalid};
      performTest(payload, (err, value) => { 
        expect(err).to.not.be.null;
        done();
      });
    });

    it('fails when a is invalid , b is invalid, c is valid', (done) => {
      const payload = {a: invalid, b: invalid, c: 'c'};
      performTest(payload, (err, value) => { 
        expect(err).to.not.be.null;
        done();
      });
    });

    it('fails when a is invalid , b is invalid, c is invalid', (done) => {
      const payload = {a: invalid, b: invalid, c: invalid};
      performTest(payload, (err, value) => { 
        expect(err).to.not.be.null;
        done();
      });
    });
  });

  describe('empty properties', () => {
    const invalid = '';

    it('accepts a and b', (done) => {
      const payload = {a: 'a', b: 'b',  c: invalid};
      performTest(payload, (err, value) => { 
        expect(err).to.be.null;
        done();
      });
    });

    it('accepts a and c', (done) => {
      const payload = {a: 'a', b: invalid, c: 'c'};
      performTest(payload, (err, value) => { 
        expect(err).to.be.null;
        done();
      });
    });

    it('fails when a is valid, b is invalid, c is invalid', (done) => {
      const payload = {a: 'a', b: invalid, c: invalid};
      performTest(payload, (err, value) => { 
        expect(err).to.not.be.null;
        done();
      });
    });

    it('fails when a is invalid , b is valid , c is valid', (done) => {
      const payload = {a: invalid, b: 'b', c: 'c'};
      performTest(payload, (err, value) => { 
        expect(err).to.not.be.null;
        done();
      });
    });

    it('fails when a is invalid , b is valid , c is invalid', (done) => {
      const payload = {a: invalid, b: 'b', c: invalid};
      performTest(payload, (err, value) => { 
        expect(err).to.not.be.null;
        done();
      });
    });

    it('fails when a is invalid , b is invalid, c is valid', (done) => {
      const payload = {a: invalid, b: invalid, c: 'c'};
      performTest(payload, (err, value) => { 
        expect(err).to.not.be.null;
        done();
      });
    });

    it('fails when a is invalid , b is invalid, c is invalid', (done) => {
      const payload = {a: invalid, b: invalid, c: invalid};
      performTest(payload, (err, value) => { 
        expect(err).to.not.be.null;
        done();
      });
    });
  });

});
