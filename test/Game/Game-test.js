var Game = require("../../js/Game/Game.js");

var should = require("chai").should();

describe("New Game", function() {
    var game = null;
    beforeEach(function() {
        game = new Game();
    });
    it("should exist", function() {
        game.should.exist;
    });
    it("should make a default layout", function() {
        game.toJSON().layout.should.equal("---------");
    });
    it("should have unset player types", function() {
        should.not.exist(game.toJSON().X);
        should.not.exist(game.toJSON().O);
    });
    it("should have current player of 'X", function() {
        game.toJSON().currentPlayer.should.equal("X");
    });
    it("should not have a row or column set", function() {
        should.not.exist(game.toJSON().row);
        should.not.exist(game.toJSON().column);
    });
    it("should have a state of inprogress", function() {
        game.toJSON().state.should.equal("inprogress");
    });
    it("should not have a winner or winAt set", function() {
        should.not.exist(game.toJSON().winner);
        should.not.exist(game.toJSON().winAt);
    });
    it("should not have an errorMessage set", function() {
        should.not.exist(game.toJSON().errorMessage);
    });
});

describe("PlaceMark" , function() {
    var game = null;
    beforeEach(function () {
        game = new Game();
    });

    it("should update the layout, and set the player to O", function () {
        game.PlaceMark("0", "0");
        game.toJSON().layout.should.equal("X--------");
        game.toJSON().currentPlayer.should.equal("O");
    });
    it("should set the errorMessage if the row is out of range", function() {
        game.PlaceMark("3", "0");
        game.toJSON().errorMessage.should.equal("Row or Column is invalid");
    });
    it("should set the errorMessage if the column is out of range", function() {
        game.PlaceMark("0", "3");
        game.toJSON().errorMessage.should.equal("Row or Column is invalid");
    });
    it("should have state='win', winner, and winAt if the mark is a winner", function() {
        game.PlaceMark("0", "0");
        game.PlaceMark("1", "0");
        game.PlaceMark("0", "1");
        game.PlaceMark("1", "1");
        game.PlaceMark("0", "2");
        game.toJSON().layout.should.equal("XXXOO----");
        game.toJSON().state.should.equal("win");
        game.toJSON().winner.should.equal("X");
        game.toJSON().winAt.should.deep.equal([0, 1, 2]);
    });
    it("should identify a tie game if the mark is a tie maker", function() {
        game.PlaceMark("0", "0"); //X-- --- ---
        game.PlaceMark("1", "1"); //X-- -O- ---
        game.PlaceMark("2", "2"); //X-- -O- --X
        game.PlaceMark("1", "0"); //X-- OO- --X
        game.PlaceMark("1", "2"); //X-- OOX --X
        game.PlaceMark("0", "2"); //X-O OOX --X
        game.PlaceMark("2", "0"); //X-O OOX X-X
        game.PlaceMark("2", "1"); //X-O OOX XOX
        game.PlaceMark("0", "1"); //XXO OOX XOX
        game.toJSON().layout.should.equal("XXOOOXXOX");
        game.toJSON().state.should.equal("tie");
    })
});

describe("ChangePlayerType", function() {
    var game = null;
    beforeEach(function() {
        game = new Game();
    });

    it("should set the player type for X to 'human'", function() {
        game.ChangePlayerType("X", "human");
        game.toJSON().X.should.equal("human");
    });
    it("should set the player type for O to 'human'", function() {
        game.ChangePlayerType("O", "human");
        game.toJSON().O.should.equal("human");
    });
    it("should set the player type for X to 'computer'", function() {
        game.ChangePlayerType("X", "computer");
        game.toJSON().X.should.equal("computer");
    });
    it("should set the player type for O to 'computer'", function() {
        game.ChangePlayerType("O", "computer");
        game.toJSON().O.should.equal("computer");
    });
    it("should set the errorMessage if the player is not X or O", function() {
        game.ChangePlayerType("q", "human");
        game.toJSON().errorMessage.should.equal("Invalid player");
    });
    it("should set the errorMessage if the playerType is not 'human' or 'computer'", function() {
        game.ChangePlayerType("X", "bad");
        game.toJSON().errorMessage.should.equal("Invalid player type");
    })
});