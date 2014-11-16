var request = require("supertest");

var url = "http://localhost:3000";

describe("Basic POST/PUT/GET/DELETE functions", function() {
    describe("POST", function () {

        it("should create a game inprogress with an empty board", function (done) {
            request(url)
                .post("/game")
                .expect(200)
                .expect("Content-Type", /json/)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.layout.should.equal("---------");
                    res.body.state.should.equal("inprogress");
                    done();
                })
        });
    });

    describe("PUT", function () {
        beforeEach(function (done) {
            request(url).post("/game").end(function () {
                done();
            });
        });
        it("should set the X player to human", function (done) {
            request(url)
                .put("/game")
                .query({"X": "human"})
                .expect(200)
                .expect("Content-Type", /json/)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.X.should.equal("human");
                    done();
                })
        });
        it("should set the O player to computer", function (done) {
            request(url)
                .put("/game")
                .query({"O": "computer"})
                .expect(200)
                .expect("Content-Type", /json/)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.O.should.equal("computer");
                    done();
                });
        });
        it("should set the position 0,0 to X, currentPlayer to O", function (done) {
            request(url)
                .put("/game")
                .query({"row": "0", "column": "0"})
                .expect(200)
                .expect("Content-Type", /json/)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.layout.should.equal("X--------");
                    res.body.currentPlayer.should.equal("O");
                    done();
                });
        });
        it("should set the errorMessage to 'Invalid player type' on incorrect type", function (done) {
            request(url)
                .put("/game")
                .query({"X": "cat"})
                .expect(200)
                .expect("Content-Type", /json/)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.errorMessage.should.equal("Invalid player type");
                    done();
                });
        });
        it("should set the errorMessage to 'Row or Column is invalid' on invalid row", function (done) {
            request(url)
                .put("/game")
                .query({"row": "3", "column": 0})
                .expect(200)
                .expect("Content-Type", /json/)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.errorMessage.should.equal("Row or Column is invalid");
                    done();
                });
        });
        it("should set the errorMessage to 'Row or Column is invalid' on invalid column", function (done) {
            request(url)
                .put("/game")
                .query({"row": 0, "column": "n"})
                .expect(200)
                .expect("Content-Type", /json/)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.errorMessage.should.equal("Row or Column is invalid");
                    done();
                });
        });
    });

    describe("GET", function () {
        beforeEach(function (done) {
            request(url).post("/game").end(function () {
                done();
            });
        });
        it("should return a game in progress with current player X", function (done) {
            request(url)
                .get("/game")
                .expect(200)
                .expect("Content-Type", /json/)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.layout.should.equal("---------");
                    res.body.state.should.equal("inprogress");
                    res.body.currentPlayer.should.equal("X");
                    done();
                })
        });
    });

    describe("DELETE", function () {
        beforeEach(function (done) {
            request(url).post("/game").end(function () {
                done();
            });
        });
        it("should set message to 'No game in progess", function (done) {
            request(url)
                .delete("/game")
                .expect(200)
                .expect("Content-Type", /json/)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.message.should.equal("No game in progress");
                    done();
                })
        })
    });
});

describe("Playing a game", function() {
    describe("tie game", function() {
        it("should reset the game", function(done) {request(url).post("/game").end(function() {done();});});
        it("should set playets to human", function(done) {request(url).put("/game").query({"X": "human", "O": "human"}).end(function(){done();});});
        it("should set 0,0", function(done) {request(url).put("/game").query({"row": "0", "column": "0"}).end(function(){done();});}); // X-- --- ---
        it("should set 1,1", function(done) {request(url).put("/game").query({"row": "1", "column": "1"}).end(function(){done();});}); // X-- -O- ---
        it("should set 2,0", function(done) {request(url).put("/game").query({"row": "2", "column": "0"}).end(function(){done();});}); // X-- -O- X--
        it("should set 1,0" ,function(done) {request(url).put("/game").query({"row": "1", "column": "0"}).end(function(){done();});}); // X-- OO- X--
        it("should set 1,2", function(done) {request(url).put("/game").query({"row": "1", "column": "2"}).end(function(){done();});}); // X-- OOX X--
        it("should set 0,1", function(done) {request(url).put("/game").query({"row": "0", "column": "1"}).end(function(){done();});}); // XO- OOX X--
        it("should set 2,1", function(done) {request(url).put("/game").query({"row": "2", "column": "1"}).end(function(){done();});}); // XO- OOX XX-
        it("should set 2,2", function(done) {request(url).put("/game").query({"row": "2", "column": "2"}).end(function(){done();});}); // XO- OOX XXO
        it("should set 0,2", function(done) {request(url).put("/game").query({"row": "0", "column": "2"}).end(function(){done();});}); // XOX OOX XXO
        it("should have state of 'tie'", function(done) {
            request(url)
                .get("/game")
                .expect(200)
                .expect("Content-Type", /json/)
                .end(function(err, res) {
                    if(err) {
                        throw err;
                    }
                    res.body.layout.should.equal("XOXOOXXXO");
                    res.body.state.should.equal("tie");
                    done();
                });
        });
    });
    describe("X wins row 0", function() {
        it("should reset the game", function(done) {request(url).post("/game").end(function() {done();});});
        it("should set playets to human", function(done) {request(url).put("/game").query({"X": "human", "O": "human"}).end(function(){done();});});
        it("should set 0,0", function(done) {request(url).put("/game").query({"row":"0", "column":"0"}).end(function(){done();});});
        it("should set 1,0", function(done) {request(url).put("/game").query({"row":"1", "column":"0"}).end(function(){done();});});
        it("should set 0,1", function(done) {request(url).put("/game").query({"row":"0", "column":"1"}).end(function(){done();});});
        it("should set 1,1", function(done) {request(url).put("/game").query({"row":"1", "column":"1"}).end(function(){done();});});
        it("should set 0,2", function(done) {request(url).put("/game").query({"row":"0", "column":"2"}).end(function(){done();});});
        it("should have a state of 'win' winner of 'X' and winAt of [0, 2, 3]", function(done) {
            request(url)
                .get("/game")
                .expect(200)
                .expect("Content-Type", /json/)
                .end(function(err, res) {
                    if(err) {
                        throw err;
                    }
                    res.body.layout.should.equal("XXXOO----");
                    res.body.state.should.equal("win");
                    res.body.winner.should.equal("X");
                    res.body.winAt.should.deep.equal([0, 1, 2]);
                    done();
                });
        });
    });
    describe("O wins column 2", function() {
        it("should reset the game", function(done) {request(url).post("/game").end(function() {done();});});
        it("should set playets to human", function(done) {request(url).put("/game").query({"X": "human", "O": "human"}).end(function(){done();});});
        it("should set 0,0", function(done) {request(url).put("/game").query({"row":"0", "column": "0"}).end(function(){done();});});
        it("should set 1,2", function(done) {request(url).put("/game").query({"row":"1", "column": "2"}).end(function(){done();});});
        it("should set 0,1", function(done) {request(url).put("/game").query({"row":"0", "column": "1"}).end(function(){done();});});
        it("should set 0,2", function(done) {request(url).put("/game").query({"row":"0", "column": "2"}).end(function(){done();});});
        it("should set 1,0", function(done) {request(url).put("/game").query({"row":"1", "column": "0"}).end(function(){done();});});
        it("should set 2,2", function(done) {request(url).put("/game").query({"row":"2", "column": "2"}).end(function(){done();});});
        it("should have a state of 'win', winner of 'O', and winAt of [2, 5, 8]", function(done) {
            request(url)
                .get("/game")
                .expect(200)
                .expect("Content-Type", /json/)
                .end(function(err, res) {
                    if(err) {
                        throw err;
                    }
                    res.body.layout.should.equal("XXOX-O--O");
                    res.body.state.should.equal("win");
                    res.body.winner.should.equal("O");
                    res.body.winAt.should.deep.equal([2, 5, 8]);
                    done();
                });
        });
    });
    describe("X wins top left to bottom right", function() {
        it("should reset the game", function(done) {request(url).post("/game").end(function() {done();});});
        it("should set playets to human", function(done) {request(url).put("/game").query({"X": "human", "O": "human"}).end(function(){done();});});
        it("should set 0,0", function(done) {request(url).put("/game").query({"row":"0", "column":"0"}).end(function(){done();});});
        it("should set 1,0", function(done) {request(url).put("/game").query({"row":"1", "column":"0"}).end(function(){done();});});
        it("should set 1,1", function(done) {request(url).put("/game").query({"row":"1", "column":"1"}).end(function(){done();});});
        it("should set 2,1", function(done) {request(url).put("/game").query({"row":"2", "column":"1"}).end(function(){done();});});
        it("should set 2,2", function(done) {request(url).put("/game").query({"row":"2", "column":"2"}).end(function(){done();});});
        it("should have a state of 'win', winner of 'X', and winAt of [0, 4, 8]", function(done) {
            request(url)
                .get("/game")
                .expect(200)
                .expect("Content-Type", /json/)
                .end(function(err, res) {
                    if(err) {
                        throw err;
                    }
                    res.body.layout.should.equal("X--OX--OX");
                    res.body.state.should.equal("win");
                    res.body.winner.should.equal("X");
                    res.body.winAt.should.deep.equal([0, 4, 8]);
                    done();
                });
        });
    });
});