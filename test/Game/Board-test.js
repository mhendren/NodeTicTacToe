var Board = require("../../js/Game/Board.js");
var Player = require("../../js/Game/Player.js");

var chai = require("chai");
var expect = chai.expect;

describe("New Board", function() {
    it("should return a board that has all dashes", function(done) {
        var board = new Board.Board();
        expect(board.getLayout()).to.equal("---------");
        done();
    });
    it("should create a board based on the passed in layout", function(done) {
        var board = new Board.Board("XO-----OX");
        expect(board.getLayout()).to.equal("XO-----OX");
        done();

    });
    it("should throw an error if the passed in layout is invalid", function(done) {
        expect(Board.Board.bind(Board, "---n-----")).to.throw("Invalid square in board");
        done();
    });
    it("should throw an error if the passed in board is an invalid type", function(done) {
        expect(Board.Board.bind(Board, 8)).to.throw("Invalid type for layout");
        done();
    });
});

describe("Player Set Square", function() {
    it("should have a board with an X in the designated location (0,0)", function(done) {
        var board = new Board.Board();
        board.SetSquare(new Player.Player("X", "human"), 0, 0);
        expect(board.getLayout()).to.equal("X--------");
        done();
    });
    it("should add an O at the designated location (1, 1)", function(done) {
        var board = new Board.Board("X--------");
        board.SetSquare(new Player.Player("O", "human"), 1, 1);
        expect(board.getLayout()).to.equal("X---O----");
        done();
    });
    it("should not allow an X to be placed at the designated location (1, 1)", function(done) {
        var board = new Board.Board("X---O----");
        expect(board.SetSquare(new Player.Player("X", "human"), 1, 1)).to.be.false;
        done();
    });
    it("should throw an error if there is no row specified", function(done) {
        var board = new Board.Board();
        expect(board.SetSquare.bind(board, new Player.Player("X", "human"))).to.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if there is no column specified", function(done) {
        var board = new Board.Board();
        expect(board.SetSquare.bind(board, new Player.Player("X", "human"), 1)).to.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the row is out of range > 2", function(done) {
        var board = new Board.Board();
        expect(board.SetSquare.bind(board, new Player.Player("X", "human"), 4, 0)).to.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the column is out of range > 2", function(done) {
        var board = new Board.Board();
        expect(board.SetSquare.bind(board, new Player.Player("X", "human"), 0, 4)).to.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the row is out of range < 0", function(done) {
        var board = new Board.Board();
        expect(board.SetSquare.bind(board, new Player.Player("X", "human", -1, 0))).to.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the column is out of range < 0", function(done) {
        var board = new Board.Board();
        expect(board.SetSquare.bind(board, new Player.Player("X", "human"), 0, -2)).to.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the row is an invalid type (string)", function(done) {
        var board = new Board.Board();
        expect(board.SetSquare.bind(board, new Player.Player("X", "human"), "1", 0)).to.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the column is an invalid type (NaN)", function(done) {
        var board = new Board.Board();
        expect(board.SetSquare.bind(board, new Player.Player("X", "human"), 0, NaN)).to.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the row is an invalid type (float)", function(done) {
        var board = new Board.Board();
        expect(board.SetSquare.bind(board, new Player.Player("X", "human"), 1.4, 0)).to.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the Player is invalid (non-object)", function(done) {
        var board = new Board.Board();
        expect(board.SetSquare.bind(board, "X", 0, 0)).to.throw("Invalid player");
        done();
    });
    it("should throw an error if the Player does not have the getPlayer() method", function(done) {
        var board = new Board.Board();
        expect(board.SetSquare.bind(board, {x:1, y:2}, 0, 0)).to.throw("Invalid player");
        done();
    });
});

describe("Get square", function() {
    it("should return the appropriate value for all squares in layout [XO-XXOX-O]", function (done) {
        var board = new Board.Board("XO-XXOX-O");
        expect(board.GetSquare(0, 0)).to.equal("X");
        expect(board.GetSquare(0, 1)).to.equal("O");
        expect(board.GetSquare(0, 2)).to.equal("-");
        expect(board.GetSquare(1, 0)).to.equal("X");
        expect(board.GetSquare(1, 1)).to.equal("X");
        expect(board.GetSquare(1, 2)).to.equal("O");
        expect(board.GetSquare(2, 0)).to.equal("X");
        expect(board.GetSquare(2, 1)).to.equal("-");
        expect(board.GetSquare(2, 2)).to.equal("O");
        done();
    });
    it("should throw an error if the row is out of range > 2", function (done) {
        var board = new Board.Board();
        expect(board.GetSquare.bind(board, new Player.Player("X", "human"), 4, 0)).to.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the column is out of range > 2", function (done) {
        var board = new Board.Board();
        expect(board.GetSquare.bind(board, new Player.Player("X", "human"), 0, 4)).to.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the row is out of range < 0", function (done) {
        var board = new Board.Board();
        expect(board.GetSquare.bind(board, new Player.Player("X", "human"), -1, 0)).to.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the column is out of range < 0", function (done) {
        var board = new Board.Board();
        expect(board.GetSquare.bind(board, new Player.Player("X", "human"), 1, -2)).to.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the row is an invalid type (string)", function (done) {
        var board = new Board.Board();
        expect(board.GetSquare.bind(board, new Player.Player("X", "human"), "2", 0)).to.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the row is an invalid type (NaN)", function (done) {
        var board = new Board.Board();
        expect(board.GetSquare.bind(board, new Player.Player("X", "human"), NaN, 0)).to.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the row is an invalid type (float)", function (done) {
        var board = new Board.Board();
        expect(board.GetSquare.bind(board, new Player.Player("X", "human"), 1.2, 0)).to.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the column is an invalid type (string)", function (done) {
        var board = new Board.Board();
        expect(board.GetSquare.bind(board, new Player.Player("X", "human"), 1, "1")).to.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the column is an invalid type (NaN)", function(done) {
        var board = new Board.Board();
        expect(board.GetSquare.bind(board, new Player.Player("X", "human"), 1, NaN)).to.throw("Row or Column is invalid");
        done();
    });
    it("should throw an error if the column is an invalid type (float)", function(done) {
        var board = new Board.Board();
        expect(board.GetSquare.bind(board, new Player.Player("X", "human"), 1, 0.8)).to.throw("Row or Column is invalid");
        done();
    });

});

describe("Get Layout", function() {
    it("should return the empty board", function(done) {
        var board = new Board.Board();
        expect(board.getLayout()).to.equal("---------");
        done();
    });
    it("should return the correct layout as was given to constructor", function(done) {
        var board = new Board.Board("XOX---OXO");
        expect(board.getLayout()).to.equal("XOX---OXO");
        done();
    });
    it("should return the correct layout as updated by a SetSquare", function(done) {
        var board = new Board.Board();
        board.SetSquare(new Player.Player("X", "human"), 1, 1);
        expect(board.getLayout()).to.equal("----X----");
        done();
    });
});