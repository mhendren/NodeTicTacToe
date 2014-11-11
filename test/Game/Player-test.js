var Player = require("../../js/Game/Player.js");

var chai = require("chai");
var expect = chai.expect;

describe("Create player", function() {
    it("should create an unset player with no type", function(done) {
        var player = new Player();
        expect(player.getPlayer()).to.be.null;
        expect(player.getPlayerType()).to.be.null;
        done();
    });
    it("should create an 'X' player, with no type", function(done) {
        var player = new Player("X");
        expect(player.getPlayer()).to.equal("X");
        expect(player.getPlayerType()).to.be.null;
        done();
    });
    it("should create an 'O' player, with no type", function(done) {
        var player = new Player("O");
        expect(player.getPlayer()).to.equal("O");
        expect(player.getPlayerType()).to.be.null;
        done();
    });
    it("should create an 'X' player type 'human'", function(done) {
        var player = new Player("X", "human");
        expect(player.getPlayer()).to.equal("X");
        expect(player.getPlayerType()).to.equal("human");
        done();
    });
    it("should create an 'O' player type 'human'", function(done) {
        var player = new Player("O", "human");
        expect(player.getPlayer()).to.equal("O");
        expect(player.getPlayerType()).to.equal("human");
        done();
    });
    it("should create an 'X' player type 'computer'", function(done) {
        var player = new Player("X", "computer");
        expect(player.getPlayer()).to.equal("X");
        expect(player.getPlayerType()).to.equal("computer");
        done();
    });
    it("should create an 'O' player type 'computer'", function(done) {
        var player = new Player("O", "computer");
        expect(player.getPlayer()).to.equal("O");
        expect(player.getPlayerType()).to.equal("computer");
        done();
    });
    it("should throw an error if player is not a valid player", function(done) {
        expect(Player.bind(Player, "n")).to.throw("Invalid player");
        done();
    });
    it("should throw an error if the player type is not a valid player type", function(done) {
        expect(Player.bind(Player, "X", "n")).to.throw("Invalid player type");
        done();
    });
});

describe("Set player", function() {
    it("should set the player to 'X'", function(done) {
        var player = new Player();
        player.setPlayer("X");
        expect(player.getPlayer()).to.equal("X");
        done();
    });
    it("should set the player to 'O'", function(done) {
        var player = new Player();
        player.setPlayer("O");
        expect(player.getPlayer()).to.equal("O");
        done();
    });
    it("should throw an error if the player is not X, or O", function(done) {
        var player = new Player();
        expect(player.setPlayer.bind(player, "n")).to.throw("Invalid player");
        done();
    });
});

describe("Set player type", function() {
    it("should set the player type to 'human'", function(done) {
        var player = new Player();
        player.setPlayerType("human");
        expect(player.getPlayerType()).to.equal("human");
        done();
    });
    it("should set the player type to 'computer'", function(done) {
        var player = new Player();
        player.setPlayerType("computer");
        expect(player.getPlayerType()).to.equal("computer");
        done();
    });
    it("should throw an error if the player type is not 'human' or 'computer'", function(done) {
        var player = new Player();
        expect(player.setPlayerType.bind(player, "n")).to.throw("Invalid player type");
        done();
    });
});