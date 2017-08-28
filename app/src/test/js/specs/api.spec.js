import nock from 'nock';
import {expect} from 'chai';
import API from '/api';

describe('API', () => {

  describe('getJSON', () => {

    afterEach(() => {
      nock.cleanAll();
    });

    it('should make a GET request', (done) => {
      const req = nock('http://localhost')
        .get('/test')
        .reply(200, {data: 'blah'});

      API.getJSON('/test')
        .then(json => {
          expect(json.data).to.equal('blah');
          req.done();
          done();
        });
    });

    it('should make a GET request with params in query string', (done) => {
      const req = nock('http://localhost')
        .get('/test?param1=value1')
        .reply(200, {data: 'blah'});

      API.getJSON('/test', {param1: 'value1'})
        .then(json => {
          expect(json.data).to.equal('blah');
          req.done();
          done();
        });
    });
  });

  describe('post', () => {
    it('should make a POST request with a body', (done) => {
      const req = nock('http://localhost')
        .post('/test', {param1: 'value1'})
        .reply(200, {data: 'blah'});

      API.post('/test', {param1: 'value1'})
        .then(resp => resp.json())
        .then(json => {
          expect(json.data).to.equal('blah');
          req.done();
          done();
        });
    });

    it('should make a POST request without a body', (done) => {
      const req = nock('http://localhost')
        .post('/test', {})
        .reply(200, {data: 'blah'});

      API.post('/test')
        .then(resp => resp.json())
        .then(json => {
          expect(json.data).to.equal('blah');
          req.done();
          done();
        });
    });
  });

  describe('put', () => {
    it('should make a PUT request with JSON', (done) => {
      const req = nock('http://localhost')
        .put('/test', {param1: 'value1'})
        .reply(200, {data: 'blah'});

      API.put('/test', {param1: 'value1'})
        .then(resp => resp.json())
        .then(json => {
          expect(json.data).to.equal('blah');
          req.done();
          done();
        });
    });

    it('should make a PUT request with plain text', (done) => {
      const req = nock('http://localhost')
        .put('/test', 'hello')
        .reply(200, {data: 'blah'});

      API.put('/test', 'hello')
        .then(resp => resp.json())
        .then(json => {
          expect(json.data).to.equal('blah');
          req.done();
          done();
        });
    });
  });
});
