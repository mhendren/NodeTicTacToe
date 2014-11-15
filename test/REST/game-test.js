var request = require("supertest");

var url = "http://localhost:3000";

describe("NewGame", function() {

    it("should create a game inprogress with an empty board", function(done) {
        request(url)
            .post('/game')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                res.body.layout.should.equal("---------");
                res.body.state.should.equal("inprogress");
                done();
            })
    })
});