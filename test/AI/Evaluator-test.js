var evaluator = require("../../js/AI/Evaluator.js");

var chai = require("chai");
var expect = chai.expect;

describe("invalid board", function() {
    it("should have an invalid board if there are fewer than 9 squares", function(done) {
        expect(evaluator.isValid.bind(evaluator, "--------")).to.throw("Board size is not exactly 9 squares");
        done();
    });
    it("should have an invalid board if there are more than 9 squares", function(done) {
        expect(evaluator.isValid.bind(evaluator, "----------")).to.throw("Board size is not exactly 9 squares");
        done();
    });
    it("should not have an invalid board on an empty board with 9 squares", function(done) {
        expect(evaluator.isValid.bind(evaluator, "---------")).to.not.throw("Board size is not exactly 9 squares");
        done();
    })
    it("should have an invalid board if there is an invalid mark (not X, O, or empty) [---n-----]", function(done) {
        expect(evaluator.isValid.bind(evaluator, "---n-----")).to.throw("Invalid square in board");
        done();
    });
    it("should have an invalid board if both sides are winners [OOO---XXX]", function(done) {
        expect(evaluator.isValid.bind(evaluator, "OOO---XXX")).to.throw("Board contains more than one winner");
        done();
    });
    it("should have an invalid board on unbalanced play [OXXXOXXXO]", function(done) {
        expect(evaluator.isValid.bind(evaluator, "OXXXOXXXO")).to.throw("Board is off balance");
        done();
    });
    it("should have an invalid board on unbalanced play [OOXO-OXX-] (O went first)", function(done) {
        expect(evaluator.isValid.bind(evaluator, "OOXO-OXX-")).to.throw("Board is off balance");
        done();
    })
});

describe("winner with rows all Xs", function() {
    it('should find winner X [XXX------] with top row all Xs');
    it("should find winner X [---XXX---] with middle row all Xs");
    it("should find winner X [------XXX] with bottom row all Xs");
});

describe("winner with rows all Os", function() {
    it("should find winner O [OOO------] with top row all Os");
    it("should find winner O [---OOO---] with middle row all Os");
    it("should find winner O [------OOO] with bottom row all Os");
});

describe("winner with all columns Xs", function() {
    it("should find winner X [X--X--X--] with left column all Xs");
    it("should find winner X [-X--X--X-] with middle column all Xs");
    it("should find winner X [--X--X--X] with right column all Xs");
});

describe("winner with all columns Os", function() {
    it("should find winner O [O--O--O--] with left column all Os");
    it("should find winner O [-O--O--O-] with middle column all Os");
    it("should find winner O [--O--O--O] with right column all Os")
});

describe("winner with diagonal Xs", function() {
    it("should find winner X [X---X---X] with top left to bottom right diagonal all Xs");
    it("should find winner X [--X-X-X--] with top right to bottom left diagonal all Xs");
});

describe("winner with diagonal Os", function() {
    it("should find winner O [O---O---O] with top left to bottom right diagonal all Os");
    it("should find winner O [--O-O-O--] with top right to bottom left diagonal all Os");
});

describe("no winner incomplete board", function() {
    it("should not find a winner on empty board [---------]");
    it("should not find a winner on incomplete board1 [XO-------]");
    it("should not find a winner on incomplete board2 [XOX-XO---]");
    it("should not find a winner on incomplete board3 [OOXX-XOXO]");
    it("should not find a winner on incomplete board4 [XOXOXO-XO]");
});

describe("identify a complete board", function() {
    it("should not find a complete board on incomplete board1 [XO-------]");
    it("should not find a complete board on incomplete board2 [XOX-XO---]");
    it("should not find a complete board on incomplete board3 [OOXX-XOXO]");
    it("should not find a complete board on incomplete board4 [OOXX-XOXO]");
    it("should find a complete board on complete board1 [XOXXOOOXX]");
    it("should find a complete board on complete board2 [OXOXXOXOX]");
    it("should find a complete board on complete board3 [XXOOOXXOX]" );
    it("should find a complete board on complete board4 [OXXXOXOOX]");
});

describe("no winner complete board", function() {
    it("should not find a winner on tie board1 [XOXXOOOXX]");
    it("should not find a winner on tie board2 [OXOXXOXOX]");
    it("should not find a winner on tie board3 [XXOOOXXOX]");
    it("should not find a winner on tie board4 [OXXXOOOXX]");
});

describe("find a tie on a tie board", function() {
    it("should not find a tie on incomplete board1 [XOXXOOOXX]");
    it("should not find a tie on incomplete board2 (with winner) [OXXXOXOOX]");
    it("should not find a tie on complete board with winner X [XOXOOXOXX]]");
    it("should find a tie on tie board1 [XOXXOOOXX]");
    it("should find a tie on tie board2 [OXOXOXXOX]");
    it("should find a tie on tie board3 [XXOOOXXOX]");
    it("should find a tie on tie board4 [OXXXOOOXX]");
});