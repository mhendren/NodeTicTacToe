var Player = require("../../js/Game/Player.js");

var chai = require("chai");
var should = chai.should();

describe("Create player", function() {
    it("should create an unset player with no type", function() {
        var player = new Player();
        should.exist(player);
        should.not.exist(player.getPlayer());
        should.not.exist(player.getPlayerType());
    });
    it("should create an 'X' player, with no type", function() {
        var player = new Player("X");
        player.getPlayer().should.equal("X");
        should.not.exist(player.getPlayerType());
    });
    it("should create an 'O' player, with no type", function() {
        var player = new Player("O");
        player.getPlayer().should.equal("O");
        should.not.exist(player.getPlayerType());
    });
    it("should create an 'X' player type 'human'", function() {
        var player = new Player("X", "human");
        player.getPlayer().should.equal("X");
        player.getPlayerType().should.equal("human");
    });
    it("should create an 'O' player type 'human'", function() {
        var player = new Player("O", "human");
        player.getPlayer().should.equal("O");
        player.getPlayerType().should.equal("human");
    });
    it("should create an 'X' player type 'computer'", function() {
        var player = new Player("X", "computer");
        player.getPlayer().should.equal("X");
        player.getPlayerType().should.equal("computer");
    });
    it("should create an 'O' player type 'computer'", function() {
        var player = new Player("O", "computer");
        player.getPlayer().should.equal("O");
        player.getPlayerType().should.equal("computer");
    });
    it("should throw an error if player is not a valid player", function() {
        Player.bind(Player, "n").should.throw("Invalid player");
    });
    it("should throw an error if the player type is not a valid player type", function() {
        Player.bind(Player, "X", "n").should.throw("Invalid player type");
    });
});

describe("setPlayer", function() {
    var player = null;

    beforeEach(function() {
        player = new Player();
    });

    it("should set the player to 'X'", function() {
        player.setPlayer("X");
        player.getPlayer().should.equal("X");
    });
    it("should set the player to 'O'", function() {
        player.setPlayer("O");
        player.getPlayer().should.equal("O");
    });
    it("should throw an error if the player is not X, or O", function() {
        player.setPlayer.bind(player, "n").should.throw("Invalid player");
    });
});

describe("setPlayerType", function() {
    var player = null;

    beforeEach(function() {
        player = new Player();
    });

    it("should set the player type to 'human'", function() {
        player.setPlayerType("human");
        player.getPlayerType().should.equal("human");
    });
    it("should set the player type to 'computer'", function() {
        player.setPlayerType("computer");
        player.getPlayerType().should.equal("computer");
    });
    it("should throw an error if the player type is not 'human' or 'computer'", function() {
        player.setPlayerType.bind(player, "n").should.throw("Invalid player type");
    });
});