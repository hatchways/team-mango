//const chai = require("chai");
// const chaiHttp = require("chai-http");
// //const app = require("../app.js");

// chai.should();
// chai.use(chaiHttp);

// describe("/POST ping", () => {
//   it("it should return 400", done => {
//     chai
//       .request(app)
//       .post(`/ping/`)
//       .send({ teamName: "Shums" })
//       .end((err, res) => {
//         res.should.have.status(400);
//         res.body.should.have
//           .property("response")
//           .eql("Shums is not part of the team. Modify your .env");
//         done();
//       });
//   });
// });

// var expect = require('chai').expect;
//   describe('#indexOf()', function () {
//     context('should return -1 when the value is not present', function () {
//       expect([1, 2, 3].indexOf(4), -1).to.equal(-1);
//     });
//   });

  it('Testing to see if Jest works', () => {
    expect(1).toBe(1)
  })

