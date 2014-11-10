var Player = require("../../js/Game/Player.js");

var chai = require("chai");
var expect = chai.expect;

describe("Create player", function() {
    it("should create an unset player with no type");
    it("should create an 'X' player, with no type");
    it("should create an 'O' player, with no type");
    it("should create an 'X' player type 'human'");
    it("should create an 'O' player type 'human'");
    it("should create an 'X' player type 'computer'");
    it("should create an 'O' player type 'computer'");
    it("should throw an error if player is not a valid player");
    it("should throw an error if the player type is not a valid player type");
});

describe("Set player", function() {
    it("should set the player to 'X'");
    it("should set the player to 'O'");
    it("should throw an error if the player is not X, or O");
});

describe("Set player type", function() {
    it("should set the player type to 'human'");
    it("should set the player type to 'computer'");
    it("should throw an error if the player type is not 'human' or 'computer'");
});