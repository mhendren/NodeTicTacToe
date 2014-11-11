var Board = require("../../js/Game/Board.js");
var Player = require("../../js/Game/Player.js");

describe("New Board", function() {
    it("should return a board that has all dashes", function(done) {
        var board = new Board();
        board.getLayout().should.equal("---------");
        done();
    });
    it("should create a board based on the passed in layout", function(done) {
        var board = new Board("XO-----OX");
        board.getLayout().should.equal("XO-----OX");
        done();

    });
    it("should throw an error if the passed in layout is invalid", function(done) {
        Board.bind(Board, "---n-----").should.throw("Invalid square in board");
        done();
    });
    it("should throw an error if the passed in board is an invalid type", function(done) {
        Board.bind(Board, 8).should.throw("Invalid type for layout");
        done();
    });
});

describe("Player Set Square", function() {
    it("should have a board with an X in the designated location (0,0)", function(done) {
        var board = new Board();
        board.SetSquare(new Player("X", "human"), 0, 0);
        board.getLayout().should.equal("X--------");
        done();
    });
    it("should add an O at the designated location (1, 1)", function(done) {
        var board = new Board("X--------");
        board.SetSquare(new Player("O", "human"), 1, 1);
        board.getLayout().should.equal("X---O----");
        done();
    });
    it("should not allow an X to be placed at the designated location (1, 1)", function(done) {
        var board = new Board("X---O----");
        board.SetSquare(new Player("X", "human"), 1, 1).should.be.false;
        done();
    });
    it("should throw an error if there is no row specified", function(done) {
        var board = new Board();
        board.SetSquare.bind(board, new Player("X", "human")).should.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if there is no column specified", function(done) {
        var board = new Board();
        board.SetSquare.bind(board, new Player("X", "human"), 1).should.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the row is out of range > 2", function(done) {
        var board = new Board();
        board.SetSquare.bind(board, new Player("X", "human"), 4, 0).should.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the column is out of range > 2", function(done) {
        var board = new Board();
        board.SetSquare.bind(board, new Player("X", "human"), 0, 4).should.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the row is out of range < 0", function(done) {
        var board = new Board();
        board.SetSquare.bind(board, new Player("X", "human", -1, 0)).should.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the column is out of range < 0", function(done) {
        var board = new Board();
        board.SetSquare.bind(board, new Player("X", "human"), 0, -2).should.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the row is an invalid type (string)", function(done) {
        var board = new Board();
        board.SetSquare.bind(board, new Player("X", "human"), "1", 0).should.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the column is an invalid type (NaN)", function(done) {
        var board = new Board();
        board.SetSquare.bind(board, new Player("X", "human"), 0, NaN).should.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the row is an invalid type (float)", function(done) {
        var board = new Board();
        board.SetSquare.bind(board, new Player("X", "human"), 1.4, 0).should.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the Player is invalid (non-object)", function(done) {
        var board = new Board();
        board.SetSquare.bind(board, "X", 0, 0).should.throw("Invalid player");
        done();
    });
    it("should throw an error if the Player does not have the getPlayer() method", function(done) {
        var board = new Board();
        board.SetSquare.bind(board, {x:1, y:2}, 0, 0).should.throw("Invalid player");
        done();
    });
});

describe("GetSquare", function() {
    it("should return the appropriate value for all squares in layout [XO-XXOX-O]", function (done) {
        var board = new Board("XO-XXOX-O");
        board.GetSquare(0, 0).should.equal("X");
        board.GetSquare(0, 1).should.equal("O");
        board.GetSquare(0, 2).should.equal("-");
        board.GetSquare(1, 0).should.equal("X");
        board.GetSquare(1, 1).should.equal("X");
        board.GetSquare(1, 2).should.equal("O");
        board.GetSquare(2, 0).should.equal("X");
        board.GetSquare(2, 1).should.equal("-");
        board.GetSquare(2, 2).should.equal("O");
        done();
    });
    it("should throw an error if the row is out of range > 2", function (done) {
        var board = new Board();
        board.GetSquare.bind(board, new Player("X", "human"), 4, 0).should.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the column is out of range > 2", function (done) {
        var board = new Board();
        board.GetSquare.bind(board, new Player("X", "human"), 0, 4).should.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the row is out of range < 0", function (done) {
        var board = new Board();
        board.GetSquare.bind(board, new Player("X", "human"), -1, 0).should.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the column is out of range < 0", function (done) {
        var board = new Board();
        board.GetSquare.bind(board, new Player("X", "human"), 1, -2).should.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the row is an invalid type (string)", function (done) {
        var board = new Board();
        board.GetSquare.bind(board, new Player("X", "human"), "2", 0).should.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the row is an invalid type (NaN)", function (done) {
        var board = new Board();
        board.GetSquare.bind(board, new Player("X", "human"), NaN, 0).should.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the row is an invalid type (float)", function (done) {
        var board = new Board();
        board.GetSquare.bind(board, new Player("X", "human"), 1.2, 0).should.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the column is an invalid type (string)", function (done) {
        var board = new Board();
        board.GetSquare.bind(board, new Player("X", "human"), 1, "1").should.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the column is an invalid type (NaN)", function(done) {
        var board = new Board();
        board.GetSquare.bind(board, new Player("X", "human"), 1, NaN).should.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the column is an invalid type (float)", function(done) {
        var board = new Board();
        board.GetSquare.bind(board, new Player("X", "human"), 1, 0.8).should.throw("Row or Column is invalid");
        done();
    });

});

describe("GetLayout", function() {
    it("should return the empty board", function(done) {
        var board = new Board();
        board.getLayout().should.equal("---------");
        done();
    });
    it("should return the correct layout as was given to constructor", function(done) {
        var board = new Board("XOX---OXO");
        board.getLayout().should.equal("XOX---OXO");
        done();
    });
    it("should return the correct layout as updated by a SetSquare", function(done) {
        var board = new Board();
        board.SetSquare(new Player("X", "human"), 1, 1);
        board.getLayout().should.equal("----X----");
        done();
    });
});