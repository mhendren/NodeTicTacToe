
var chai = require("chai");
var expect = chai.expect;

describe("New Board", function() {
    it("should return a board that has all dashes");
    it("should create a board based on the passed in layout");
    it("should throw an error if the passed in layout is invalid");
    it("should throw an error if the passed in board is an invalid type");
});

describe("Player Set Square", function() {
    it("should have a board with an X in the designated location (0,0)");
    it("should add an O at the designated location (1, 1)");
    it("should not allow an X to be placed at the designated location (1, 1)");
    it("should throw an error if there is no row specified");
    it("should throw an error if there is no column specified");
    it("should throw an error if the row is out of range > 2");
    it("should throw an error if the column is out of range > 2");
    it("should throw an error if the row is out of range < 0");
    it("should throw an error if the column is out of range < 0");
    it("should throw an error if the row is an invalid type");
    it("should throw an error if the column is an invalid type");
});

describe("Get square", function() {
    it("should return the appropriate value for all squares in layout [XO-XXOX-O]");
    it("should throw an error if the row is out of range > 2");
    it("should throw an error if the column is out of range > 2");
    it("should throw an error if the row is out of range < 0");
    it("should throw an error if the column is out of range < 0");
    it("should throw an error if the row is an invalid type");
    it("should throw an error if the column is an invalid type");
});

describe("Get Layout", function() {
    it("should return the empty board");
    it("should return the correct layout as was given to constructor");
    it("should return the correct layout as updated by a SetSquare");
});