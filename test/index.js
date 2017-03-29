var api = require('../dist/api');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

describe('/GET ',function(){
  it('it should check root url',function(done){
    chai.request(api).get('/').end(function(err, res){
      expect(res.status).to.equal(200);
      done();
    });
  });
});